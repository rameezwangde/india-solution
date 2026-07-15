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
