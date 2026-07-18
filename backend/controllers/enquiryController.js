const Enquiry = require('../models/Enquiry');
const Product = require('../models/Product');

// @desc    Create a new enquiry (Public)
// @route   POST /api/enquiries
exports.createEnquiry = async (req, res) => {
  try {
    const { 
      customerName, phone, email, companyName, 
      eventType, eventDate, eventLocation, city, 
      message, notes, products 
    } = req.body;

    if (!customerName || !phone || !products || !Array.isArray(products) || products.length === 0) {
      return res.status(400).json({ success: false, message: 'Customer name, phone, and at least one product are required' });
    }

    let totalItems = 0;
    const processedProducts = [];

    for (const item of products) {
      const qty = Number(item.quantity) || 0;
      if (qty <= 0) {
        return res.status(400).json({ success: false, message: 'Product quantities must be > 0' });
      }
      
      const productDoc = await Product.findById(item.product);
      if (!productDoc) {
        return res.status(400).json({ success: false, message: `Product not found or invalid ID` });
      }

      processedProducts.push({
        product: productDoc._id,
        productName: productDoc.name,
        quantity: qty,
        price: Number(productDoc.price) || 0
      });
      totalItems += qty;
    }

    const enquiry = new Enquiry({
      customerName: customerName.trim(),
      phone: phone.trim(),
      email: email ? email.trim() : '',
      companyName: companyName ? companyName.trim() : '',
      eventType: eventType ? eventType.trim() : '',
      eventDate: eventDate || null,
      eventLocation: eventLocation ? eventLocation.trim() : '',
      city: city ? city.trim() : '',
      message: message ? message.trim() : '',
      notes: notes ? notes.trim() : '',
      products: processedProducts,
      totalItems,
      status: 'Pending'
    });

    await enquiry.save();

    res.status(201).json({ 
      success: true, 
      message: 'Enquiry submitted successfully', 
      referenceNumber: enquiry.referenceNumber,
      enquiry
    });
  } catch (error) {
    console.error('Create Enquiry Error:', error);
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ success: false, message: messages.join(', ') });
    }
    if (error.code === 11000) {
      return res.status(400).json({ success: false, message: 'Duplicate reference number generated. Please try again.' });
    }
    res.status(500).json({ success: false, message: 'Internal server error: ' + error.message });
  }
};

// @desc    Get all enquiries (Admin)
// @route   GET /api/enquiries
exports.getEnquiries = async (req, res) => {
  try {
    const { search, status, sort, page = 1, limit = 20 } = req.query;
    
    let query = {};
    
    if (status) {
      query.status = status;
    }

    if (search) {
      query.$or = [
        { referenceNumber: { $regex: search, $options: 'i' } },
        { customerName: { $regex: search, $options: 'i' } },
        { phone: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { companyName: { $regex: search, $options: 'i' } }
      ];
    }

    let sortStage = { createdAt: -1 };
    if (sort === 'oldest') {
      sortStage = { createdAt: 1 };
    }

    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);
    const skip = (pageNum - 1) * limitNum;

    const total = await Enquiry.countDocuments(query);
    const enquiries = await Enquiry.find(query)
      .sort(sortStage)
      .skip(skip)
      .limit(limitNum)
      .lean();

    res.status(200).json({
      success: true,
      count: enquiries.length,
      pagination: {
        total,
        page: pageNum,
        pages: Math.ceil(total / limitNum)
      },
      enquiries
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get single enquiry (Admin)
// @route   GET /api/enquiries/:id
exports.getEnquiryById = async (req, res) => {
  try {
    const enquiry = await Enquiry.findById(req.params.id).populate('products.product', 'image productCode category department quantity name price status');
    if (!enquiry) {
      return res.status(404).json({ success: false, message: 'Enquiry not found' });
    }
    res.status(200).json({ success: true, enquiry });
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ success: false, message: 'Enquiry not found' });
    }
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update enquiry status and notes (Admin)
// @route   PUT /api/enquiries/:id
exports.updateEnquiry = async (req, res) => {
  try {
    const { status, notes } = req.body;
    
    // We need to fetch the enquiry first to compare status and handle stock
    const enquiry = await Enquiry.findById(req.params.id).populate('products.product', 'quantity status name');
    
    if (!enquiry) {
      return res.status(404).json({ success: false, message: 'Enquiry not found' });
    }

    if (notes !== undefined) enquiry.notes = notes;

    if (status && status !== enquiry.status) {
      // 1. Prevent completed -> cancelled
      if (enquiry.status === 'Completed' && status === 'Cancelled') {
        return res.status(409).json({ success: false, message: 'Completed enquiries cannot be cancelled automatically' });
      }

      // 2. Confirming (Pending -> Confirmed, or Cancelled -> Confirmed)
      if (status === 'Confirmed' && (!enquiry.stockProcessed || enquiry.stockRestored)) {
        const insufficientItems = [];
        for (const item of enquiry.products) {
          if (!item.product) {
            insufficientItems.push({ productId: 'deleted', productName: item.productName, requested: item.quantity, available: 0 });
            continue;
          }
          if (item.product.quantity < item.quantity) {
            insufficientItems.push({ 
              productId: item.product._id, 
              productName: item.productName, 
              requested: item.quantity, 
              available: item.product.quantity 
            });
          }
        }

        if (insufficientItems.length > 0) {
          return res.status(409).json({ 
            success: false, 
            message: 'Insufficient stock for one or more products', 
            insufficientItems 
          });
        }

        const bulkOps = [];
        for (const item of enquiry.products) {
          const newQty = item.product.quantity - item.quantity;
          const finalStatus = (newQty === 0 && item.product.status !== 'hidden') ? 'out_of_stock' : item.product.status;
          bulkOps.push({
            updateOne: {
              filter: { _id: item.product._id },
              update: { $inc: { quantity: -item.quantity }, $set: { status: finalStatus } }
            }
          });
        }
        if (bulkOps.length > 0) await Product.bulkWrite(bulkOps);

        enquiry.stockProcessed = true;
        enquiry.stockProcessedAt = new Date();
        enquiry.stockRestored = false;
        enquiry.stockRestoredAt = null;
      }

      // 3. Cancelling (Confirmed -> Cancelled)
      if (status === 'Cancelled' && enquiry.stockProcessed && !enquiry.stockRestored) {
        const bulkOps = [];
        for (const item of enquiry.products) {
          if (!item.product) continue;
          const newQty = item.product.quantity + item.quantity;
          const finalStatus = (newQty > 0 && item.product.status === 'out_of_stock') ? 'available' : item.product.status;
          bulkOps.push({
            updateOne: {
              filter: { _id: item.product._id },
              update: { $inc: { quantity: item.quantity }, $set: { status: finalStatus } }
            }
          });
        }
        if (bulkOps.length > 0) await Product.bulkWrite(bulkOps);

        enquiry.stockRestored = true;
        enquiry.stockRestoredAt = new Date();
      }

      enquiry.status = status;
    }

    await enquiry.save();
    
    // Repopulate for response
    const updatedEnquiry = await Enquiry.findById(enquiry._id).populate('products.product', 'image productCode category department quantity name price status');

    res.status(200).json({ success: true, message: 'Enquiry updated', enquiry: updatedEnquiry });
  } catch (error) {
    console.error('Update Enquiry Error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Delete enquiry (Admin)
// @route   DELETE /api/enquiries/:id
exports.deleteEnquiry = async (req, res) => {
  try {
    const enquiry = await Enquiry.findByIdAndDelete(req.params.id);
    if (!enquiry) {
      return res.status(404).json({ success: false, message: 'Enquiry not found' });
    }
    res.status(200).json({ success: true, message: 'Enquiry deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
