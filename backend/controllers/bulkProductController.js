const Product = require('../models/Product');
const InventoryActivity = require('../models/InventoryActivity');
const Category = require('../models/Category');
const { ACTIVITY_TYPES } = require('../services/activityLogger');
const { calculateStockStatus } = require('../services/stockStatusHelper');

// Helper to log bulk activities safely
const logBulkActivities = async (products, actionDesc, performedBy, activityType, changes = {}) => {
  try {
    const activities = products.map(product => ({
      productId: product._id,
      productCode: product.productCode || 'N/A',
      productName: product.name,
      department: product.department || 'Unassigned',
      category: product.category,
      activityType,
      performedBy,
      referenceType: 'Bulk Action',
      remarks: `${actionDesc}. ${changes.remarks || ''}`.trim()
    }));
    await InventoryActivity.insertMany(activities);
  } catch (error) {
    console.error('Failed to log bulk activities', error);
  }
};

// @desc    Bulk Update Department
// @route   POST /api/products/bulk/update-department
exports.bulkUpdateDepartment = async (req, res) => {
  try {
    const { productIds, newDepartment } = req.body;
    const performedBy = req.admin ? (req.admin.email || req.admin._id) : 'System';

    if (!productIds || !Array.isArray(productIds) || productIds.length === 0) {
      return res.status(400).json({ success: false, message: 'No products selected' });
    }
    if (!newDepartment) {
      return res.status(400).json({ success: false, message: 'New department is required' });
    }

    const products = await Product.find({ _id: { $in: productIds } });
    if (products.length === 0) {
      return res.status(404).json({ success: false, message: 'Products not found' });
    }

    await Product.updateMany(
      { _id: { $in: productIds } },
      { $set: { department: newDepartment } }
    );

    await logBulkActivities(products, `Bulk moved to department: ${newDepartment}`, performedBy, ACTIVITY_TYPES.SYSTEM_UPDATE);

    res.status(200).json({ success: true, message: `Successfully updated ${products.length} products to ${newDepartment}` });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Bulk Update Category
// @route   POST /api/products/bulk/update-category
exports.bulkUpdateCategory = async (req, res) => {
  try {
    const { productIds, newCategoryId } = req.body;
    const performedBy = req.admin ? (req.admin.email || req.admin._id) : 'System';

    if (!productIds || !Array.isArray(productIds) || productIds.length === 0) {
      return res.status(400).json({ success: false, message: 'No products selected' });
    }
    if (!newCategoryId) {
      return res.status(400).json({ success: false, message: 'New category is required' });
    }

    const category = await Category.findById(newCategoryId);
    if (!category) {
      return res.status(404).json({ success: false, message: 'Category not found' });
    }

    const products = await Product.find({ _id: { $in: productIds } });
    
    await Product.updateMany(
      { _id: { $in: productIds } },
      { $set: { category: newCategoryId } }
    );

    await logBulkActivities(products, `Bulk category updated to: ${category.name}`, performedBy, ACTIVITY_TYPES.SYSTEM_UPDATE);

    res.status(200).json({ success: true, message: `Successfully updated ${products.length} products to ${category.name}` });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Bulk Activate Products
// @route   POST /api/products/bulk/activate
exports.bulkActivate = async (req, res) => {
  try {
    const { productIds } = req.body;
    const performedBy = req.admin ? (req.admin.email || req.admin._id) : 'System';

    if (!productIds || !Array.isArray(productIds) || productIds.length === 0) {
      return res.status(400).json({ success: false, message: 'No products selected' });
    }

    const products = await Product.find({ _id: { $in: productIds } });
    
    await Product.updateMany(
      { _id: { $in: productIds } },
      { $set: { isActive: true } }
    );

    await logBulkActivities(products, 'Bulk activated', performedBy, ACTIVITY_TYPES.SYSTEM_UPDATE);

    res.status(200).json({ success: true, message: `Successfully activated ${products.length} products` });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Bulk Deactivate Products
// @route   POST /api/products/bulk/deactivate
exports.bulkDeactivate = async (req, res) => {
  try {
    const { productIds } = req.body;
    const performedBy = req.admin ? (req.admin.email || req.admin._id) : 'System';

    if (!productIds || !Array.isArray(productIds) || productIds.length === 0) {
      return res.status(400).json({ success: false, message: 'No products selected' });
    }

    const products = await Product.find({ _id: { $in: productIds } });
    
    await Product.updateMany(
      { _id: { $in: productIds } },
      { $set: { isActive: false } }
    );

    await logBulkActivities(products, 'Bulk deactivated', performedBy, ACTIVITY_TYPES.SYSTEM_UPDATE);

    res.status(200).json({ success: true, message: `Successfully deactivated ${products.length} products` });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Bulk Delete Products
// @route   POST /api/products/bulk/delete
exports.bulkDelete = async (req, res) => {
  try {
    const { productIds } = req.body;
    
    if (!productIds || !Array.isArray(productIds) || productIds.length === 0) {
      return res.status(400).json({ success: false, message: 'No products selected' });
    }

    const products = await Product.find({ _id: { $in: productIds } });
    if (products.length === 0) {
      return res.status(404).json({ success: false, message: 'Products not found' });
    }

    // Optional: Delete associated inventory activities? The requirements say:
    // "Delete associated inventory activity if configured"
    await InventoryActivity.deleteMany({ productId: { $in: productIds } });
    await Product.deleteMany({ _id: { $in: productIds } });

    res.status(200).json({ success: true, message: `Successfully deleted ${products.length} products and their history` });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Bulk Update Thresholds
// @route   POST /api/products/bulk/update-thresholds
exports.bulkUpdateThresholds = async (req, res) => {
  try {
    const { productIds, lowStockThreshold, criticalStockThreshold } = req.body;
    const performedBy = req.admin ? (req.admin.email || req.admin._id) : 'System';

    if (!productIds || !Array.isArray(productIds) || productIds.length === 0) {
      return res.status(400).json({ success: false, message: 'No products selected' });
    }

    const low = Number(lowStockThreshold);
    const critical = Number(criticalStockThreshold);

    if (critical > low) {
      return res.status(400).json({ success: false, message: 'Critical threshold cannot be greater than low threshold' });
    }

    const products = await Product.find({ _id: { $in: productIds } });
    
    // updateMany doesn't trigger pre-save hooks so we need to calculate stockStatus per product, or just loop through and save.
    // For large bulk (e.g. 50-100), Promise.all(save) is fine.
    
    let updatedCount = 0;
    for (let product of products) {
      product.lowStockThreshold = low;
      product.criticalStockThreshold = critical;
      // Pre-save hook will handle stockStatus recalculation
      await product.save();
      updatedCount++;
    }

    await logBulkActivities(products, `Bulk thresholds updated. Low: ${low}, Critical: ${critical}`, performedBy, ACTIVITY_TYPES.SYSTEM_UPDATE);

    res.status(200).json({ success: true, message: `Successfully updated thresholds for ${updatedCount} products` });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
