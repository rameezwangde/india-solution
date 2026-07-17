const Category = require('../models/Category');
const Product = require('../models/Product');

const generateSlug = (name) => {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
};

const getUniqueSlug = async (baseSlug, categoryId = null) => {
  let slug = baseSlug;
  let counter = 2;
  while (true) {
    const query = { slug };
    if (categoryId) query._id = { $ne: categoryId };
    const existing = await Category.findOne(query);
    if (!existing) break;
    slug = `${baseSlug}-${counter}`;
    counter++;
  }
  return slug;
};

exports.getCategories = async (req, res) => {
  try {
    const { search, active, sort } = req.query;
    let matchStage = {};

    if (active === 'true' || active === 'false') {
      matchStage.isActive = active === 'true';
    } else {
      matchStage.isActive = true;
    }

    if (search) {
      matchStage.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    let sortStage = { name: 1 };
    if (sort === 'name_desc') sortStage = { name: -1 };
    else if (sort === 'newest') sortStage = { createdAt: -1 };
    else if (sort === 'oldest') sortStage = { createdAt: 1 };

    const categories = await Category.aggregate([
      { $match: matchStage },
      {
        $lookup: {
          from: 'products',
          localField: '_id',
          foreignField: 'category',
          as: 'products'
        }
      },
      {
        $addFields: {
          productCount: { $size: '$products' }
        }
      },
      { $project: { products: 0 } },
      { $sort: sortStage }
    ]);

    res.status(200).json({
      success: true,
      count: categories.length,
      categories
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getAdminCategories = async (req, res) => {
  try {
    const { search, active, sort } = req.query;
    let matchStage = {};

    if (active === 'true' || active === 'false') {
      matchStage.isActive = active === 'true';
    }

    if (search) {
      matchStage.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    let sortStage = { name: 1 };
    if (sort === 'name_desc') sortStage = { name: -1 };
    else if (sort === 'newest') sortStage = { createdAt: -1 };
    else if (sort === 'oldest') sortStage = { createdAt: 1 };

    const categories = await Category.aggregate([
      { $match: matchStage },
      {
        $lookup: {
          from: 'products',
          localField: '_id',
          foreignField: 'category',
          as: 'products'
        }
      },
      {
        $addFields: {
          productCount: { $size: '$products' }
        }
      },
      { $project: { products: 0 } },
      { $sort: sortStage }
    ]);

    res.status(200).json({
      success: true,
      count: categories.length,
      categories
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    let query = { isActive: true };

    if (id.match(/^[0-9a-fA-F]{24}$/)) {
      query._id = id;
    } else {
      query.slug = id;
    }

    const category = await Category.findOne(query).lean();
    if (!category) {
      return res.status(404).json({ success: false, message: 'Category not found' });
    }

    const productCount = await Product.countDocuments({ category: category._id });
    category.productCount = productCount;

    res.status(200).json({ success: true, category });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.createCategory = async (req, res) => {
  try {
    const { name, description, isActive } = req.body;
    
    if (!name || name.trim() === '') {
      return res.status(400).json({ success: false, message: 'Category name is required' });
    }

    const existingName = await Category.findOne({ name: { $regex: new RegExp(`^${name.trim()}$`, 'i') } });
    if (existingName) {
      return res.status(400).json({ success: false, message: 'Duplicate category name' });
    }

    const baseSlug = generateSlug(name.trim());
    const slug = await getUniqueSlug(baseSlug);

    const category = new Category({
      name: name.trim(),
      slug,
      description,
      isActive
    });

    await category.save();

    res.status(201).json({ success: true, message: 'Category created successfully', category });
  } catch (error) {
    if (error.code === 11000) return res.status(400).json({ success: false, message: 'Duplicate category name or slug' });
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id.match(/^[0-9a-fA-F]{24}$/)) return res.status(400).json({ success: false, message: 'Invalid ObjectId' });

    const category = await Category.findById(id);
    if (!category) return res.status(404).json({ success: false, message: 'Category not found' });

    const { name, description, isActive } = req.body;

    if (name && name.trim() !== category.name) {
      const existingName = await Category.findOne({ name: { $regex: new RegExp(`^${name.trim()}$`, 'i') }, _id: { $ne: id } });
      if (existingName) return res.status(400).json({ success: false, message: 'Duplicate category name' });

      category.name = name.trim();
      const baseSlug = generateSlug(category.name);
      category.slug = await getUniqueSlug(baseSlug, id);
    }

    if (description !== undefined) category.description = description;
    if (isActive !== undefined) category.isActive = isActive;

    await category.save();

    res.status(200).json({ success: true, message: 'Category updated successfully', category });
  } catch (error) {
    if (error.code === 11000) return res.status(400).json({ success: false, message: 'Duplicate category name or slug' });
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    let category;
    
    // Find category by ObjectId or slug
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
      category = await Category.findById(id);
    } else {
      category = await Category.findOne({ slug: id });
    }

    if (!category) {
      return res.status(404).json({ success: false, message: 'Category not found' });
    }

    // Count products using the actual ObjectId
    const productCount = await Product.countDocuments({ category: category._id });
    
    if (productCount > 0) {
      return res.status(409).json({
        success: false,
        message: 'Category cannot be deleted because products are linked to it',
        productCount
      });
    }

    await category.deleteOne();

    res.status(200).json({ success: true, message: 'Category deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
