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
    const enquiry = await Enquiry.findById(req.params.id).populate('products.product', 'image code category department');
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
    
    let updateFields = {};
    if (status) updateFields.status = status;
    if (notes !== undefined) updateFields.notes = notes;

    const enquiry = await Enquiry.findByIdAndUpdate(
      req.params.id,
      { $set: updateFields },
      { new: true, runValidators: true }
    );

    if (!enquiry) {
      return res.status(404).json({ success: false, message: 'Enquiry not found' });
    }

    res.status(200).json({ success: true, message: 'Enquiry updated', enquiry });
  } catch (error) {
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
