const Product = require('../models/Product');
const Category = require('../models/Category');

const generateSlug = (name) => {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
};

const getUniqueSlug = async (baseSlug, productId = null) => {
  let slug = baseSlug;
  let counter = 2;
  while (true) {
    const query = { slug };
    if (productId) query._id = { $ne: productId };
    const existing = await Product.findOne(query);
    if (!existing) break;
    slug = `${baseSlug}-${counter}`;
    counter++;
  }
  return slug;
};

exports.getProducts = async (req, res) => {
  try {
    const { 
      search, category, department, status, featured, 
      minPrice, maxPrice, sort, page = 1, limit = 12 
    } = req.query;

    let query = {};
    
    if (status && status !== 'hidden') {
      query.status = status;
    } else {
      // Exclude hidden products for public endpoints
      query.status = { $ne: 'hidden' };
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { productCode: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { department: { $regex: search, $options: 'i' } }
      ];
    }

    if (category) {
      if (category.match(/^[0-9a-fA-F]{24}$/)) {
        query.category = category;
      } else {
        const cat = await Category.findOne({ slug: category });
        if (cat) query.category = cat._id;
        else return res.status(200).json({ success: true, count: 0, total: 0, page: 1, pages: 1, products: [] });
      }
    }

    if (department) {
      query.department = { $regex: new RegExp(`^${department}$`, 'i') };
    }

    if (featured === 'true' || featured === 'false') {
      query.isFeatured = featured === 'true';
    }

    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    let sortObj = { createdAt: -1 };
    if (sort === 'oldest') sortObj = { createdAt: 1 };
    else if (sort === 'name_asc') sortObj = { name: 1 };
    else if (sort === 'name_desc') sortObj = { name: -1 };
    else if (sort === 'price_asc') sortObj = { price: 1 };
    else if (sort === 'price_desc') sortObj = { price: -1 };
    else if (sort === 'quantity_asc') sortObj = { quantity: 1 };
    else if (sort === 'quantity_desc') sortObj = { quantity: -1 };

    const pageNum = parseInt(page, 10) || 1;
    let limitNum = parseInt(limit, 10) || 12;
    if (limitNum > 100) limitNum = 100;
    const skip = (pageNum - 1) * limitNum;

    const total = await Product.countDocuments(query);
    const products = await Product.find(query)
      .sort(sortObj)
      .skip(skip)
      .limit(limitNum)
      .populate('category', 'name slug');

    res.status(200).json({
      success: true,
      count: products.length,
      total,
      page: pageNum,
      pages: Math.ceil(total / limitNum) || 1,
      products
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    let query = { status: { $ne: 'hidden' } };
    
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
      query._id = id;
    } else {
      query.slug = id;
    }

    const product = await Product.findOne(query).populate('category', 'name slug');
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    res.status(200).json({ success: true, product });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.createProduct = async (req, res) => {
  try {
    const { name, category, quantity, productCode, department, description, size, price, image, status, isFeatured } = req.body;

    if (!name || !category || quantity === undefined) {
      return res.status(400).json({ success: false, message: 'Name, category, and quantity are required' });
    }

    if (quantity < 0) return res.status(400).json({ success: false, message: 'Quantity cannot be negative' });
    if (price !== undefined && price < 0) return res.status(400).json({ success: false, message: 'Price cannot be negative' });
    if (status && !['available', 'out_of_stock', 'hidden'].includes(status)) {
      return res.status(400).json({ success: false, message: 'Invalid status' });
    }

    const cat = await Category.findById(category);
    if (!cat) return res.status(404).json({ success: false, message: 'Category not found' });

    if (productCode) {
      const existingCode = await Product.findOne({ productCode });
      if (existingCode) return res.status(400).json({ success: false, message: 'Duplicate product code' });
    }

    const baseSlug = generateSlug(name);
    const uniqueSlug = await getUniqueSlug(baseSlug);

    const product = new Product({
      name,
      slug: uniqueSlug,
      category,
      quantity,
      productCode,
      department,
      description,
      size,
      price,
      image,
      status,
      isFeatured
    });

    await product.save();

    res.status(201).json({
      success: true,
      message: 'Product created successfully',
      product
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ success: false, message: 'Duplicate field entered' });
    }
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id.match(/^[0-9a-fA-F]{24}$/)) return res.status(400).json({ success: false, message: 'Invalid ObjectId' });

    const product = await Product.findById(id);
    if (!product) return res.status(404).json({ success: false, message: 'Product not found' });

    const { name, category, quantity, productCode, department, description, size, price, image, status, isFeatured } = req.body;

    if (category && category !== product.category.toString()) {
      const cat = await Category.findById(category);
      if (!cat) return res.status(404).json({ success: false, message: 'Category not found' });
      product.category = category;
    }

    if (quantity !== undefined) {
      if (quantity < 0) return res.status(400).json({ success: false, message: 'Quantity cannot be negative' });
      product.quantity = quantity;
    }
    if (price !== undefined) {
      if (price < 0) return res.status(400).json({ success: false, message: 'Price cannot be negative' });
      product.price = price;
    }
    if (status) {
      if (!['available', 'out_of_stock', 'hidden'].includes(status)) {
        return res.status(400).json({ success: false, message: 'Invalid status' });
      }
      product.status = status;
    }

    if (productCode && productCode !== product.productCode) {
      const existingCode = await Product.findOne({ productCode });
      if (existingCode) return res.status(400).json({ success: false, message: 'Duplicate product code' });
      product.productCode = productCode;
    }

    if (name && name !== product.name) {
      product.name = name;
      const baseSlug = generateSlug(name);
      product.slug = await getUniqueSlug(baseSlug, product._id);
    }

    if (department !== undefined) product.department = department;
    if (description !== undefined) product.description = description;
    if (size !== undefined) product.size = size;
    if (isFeatured !== undefined) product.isFeatured = isFeatured;
    if (image) {
      if (image.url !== undefined) product.image.url = image.url;
      if (image.publicId !== undefined) product.image.publicId = image.publicId;
    }

    await product.save();

    res.status(200).json({
      success: true,
      message: 'Product updated successfully',
      product
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ success: false, message: 'Duplicate field entered' });
    }
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id.match(/^[0-9a-fA-F]{24}$/)) return res.status(400).json({ success: false, message: 'Invalid ObjectId' });

    const product = await Product.findById(id);
    if (!product) return res.status(404).json({ success: false, message: 'Product not found' });

    if (product.image && product.image.publicId) {
      const { deleteCloudinaryImage } = require('../utils/cloudinaryUpload');
      await deleteCloudinaryImage(product.image.publicId);
    }

    await product.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Product deleted successfully'
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Clear entire inventory (Admin only)
// @route   DELETE /api/products/clear-inventory
// @access  Private/Admin
exports.clearInventory = async (req, res) => {
  try {
    const result = await Product.deleteMany({});
    
    if (result.deletedCount === 0) {
      return res.status(200).json({
        success: true,
        message: 'Inventory is already empty',
        deletedCount: 0
      });
    }

    res.status(200).json({
      success: true,
      message: 'Inventory cleared successfully',
      deletedCount: result.deletedCount
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to clear inventory: ' + error.message });
  }
};

// @desc    Clear department inventory (Admin only)
// @route   DELETE /api/products/clear-department
// @access  Private/Admin
exports.clearDepartmentInventory = async (req, res) => {
  try {
    const { department } = req.query;
    if (!department) {
      return res.status(400).json({ success: false, message: 'Department name is required' });
    }

    const result = await Product.deleteMany({ department });
    
    res.status(200).json({
      success: true,
      message: `Inventory for ${department} cleared successfully`,
      deletedCount: result.deletedCount
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to clear department inventory: ' + error.message });
  }
};

// @desc    Clear all test operational data (Admin only)
// @route   DELETE /api/products/clear-test-data
// @access  Private/Admin
exports.clearTestData = async (req, res) => {
  try {
    const Enquiry = require('../models/Enquiry');
    const ImportHistory = require('../models/ImportHistory');

    const prods = await Product.deleteMany({});
    const enqs = await Enquiry.deleteMany({});
    const history = await ImportHistory.deleteMany({});
    
    // Attempt to clear optional collections without failing
    const mongoose = require('mongoose');
    let smCount = 0, notifCount = 0;
    try { smCount = (await mongoose.model('StockMovement').deleteMany({})).deletedCount; } catch(e){}
    try { notifCount = (await mongoose.model('Notification').deleteMany({})).deletedCount; } catch(e){}

    res.status(200).json({
      success: true,
      message: 'Test data cleared successfully',
      deletedCounts: {
        products: prods.deletedCount,
        enquiries: enqs.deletedCount,
        importHistory: history.deletedCount,
        stockMovements: smCount,
        notifications: notifCount
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to clear test data: ' + error.message });
  }
};

// @desc    Get inventory grouped by departments
// @route   GET /api/products/departments
// @access  Public/Admin
exports.getDepartments = async (req, res) => {
  try {
    const departments = await Product.aggregate([
      {
        $group: {
          _id: "$department",
          totalProducts: { $sum: 1 },
          totalQuantity: { $sum: { $ifNull: ["$quantity", 0] } },
          inStock: {
            $sum: { $cond: [{ $gt: ["$quantity", 0] }, 1, 0] }
          },
          outOfStock: {
            $sum: { $cond: [{ $or: [{ $eq: ["$quantity", 0] }, { $eq: ["$status", "out_of_stock"] }] }, 1, 0] }
          },
          lowStock: {
            $sum: { $cond: [{ $and: [{ $gt: ["$quantity", 0] }, { $lte: ["$quantity", 5] }] }, 1, 0] }
          },
          activeProducts: {
            $sum: { $cond: [{ $ne: ["$status", "hidden"] }, 1, 0] }
          },
          inactiveProducts: {
            $sum: { $cond: [{ $eq: ["$status", "hidden"] }, 1, 0] }
          }
        }
      },
      {
        $sort: { _id: 1 }
      }
    ]);

    const formatted = departments.map(d => {
      const name = d._id || 'Main Inventory';
      return {
        name,
        slug: name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''),
        totalProducts: d.totalProducts,
        totalQuantity: d.totalQuantity,
        inStock: d.inStock,
        outOfStock: d.outOfStock,
        lowStock: d.lowStock,
        activeProducts: d.activeProducts,
        inactiveProducts: d.inactiveProducts
      };
    });

    res.status(200).json({
      success: true,
      count: formatted.length,
      departments: formatted
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
