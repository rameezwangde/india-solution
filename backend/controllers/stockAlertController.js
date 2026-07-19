const Product = require('../models/Product');
const InventoryActivity = require('../models/InventoryActivity');
const { ACTIVITY_TYPES } = require('../services/activityLogger');
const { calculateStockStatus, handleStockStatusChange } = require('../services/stockStatusHelper');

// @desc    Get stock alerts summary
// @route   GET /api/inventory/stock-alerts/summary
exports.getStockAlertsSummary = async (req, res) => {
  try {
    const products = await Product.find({ stockStatus: { $ne: 'IN_STOCK' } }).lean();
    
    let lowStock = 0, criticalStock = 0, outOfStock = 0;
    const deptMap = {};

    products.forEach(p => {
      if (p.stockStatus === 'LOW_STOCK') lowStock++;
      else if (p.stockStatus === 'CRITICAL_STOCK') criticalStock++;
      else if (p.stockStatus === 'OUT_OF_STOCK') outOfStock++;

      const dept = p.department || 'Unassigned';
      if (!deptMap[dept]) {
        deptMap[dept] = { department: dept, total: 0, lowStock: 0, criticalStock: 0, outOfStock: 0 };
      }
      deptMap[dept].total++;
      if (p.stockStatus === 'LOW_STOCK') deptMap[dept].lowStock++;
      else if (p.stockStatus === 'CRITICAL_STOCK') deptMap[dept].criticalStock++;
      else if (p.stockStatus === 'OUT_OF_STOCK') deptMap[dept].outOfStock++;
    });

    const summary = {
      totalAttentionRequired: products.length,
      lowStock,
      criticalStock,
      outOfStock,
      departmentsAffected: Object.keys(deptMap).length
    };

    res.status(200).json({ success: true, summary, departments: Object.values(deptMap) });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get stock alerts list
// @route   GET /api/inventory/stock-alerts
exports.getStockAlerts = async (req, res) => {
  try {
    const { page = 1, limit = 50, search, department, category, status, acknowledged, sortBy = 'severity', sortOrder = 'desc' } = req.query;

    const query = { stockStatus: { $ne: 'IN_STOCK' } };

    if (department) query.department = department;
    if (category) query.category = category;
    if (status) query.stockStatus = status;
    if (acknowledged === 'true') query.stockAlertAcknowledged = true;
    if (acknowledged === 'false') query.stockAlertAcknowledged = false;

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { productCode: { $regex: search, $options: 'i' } }
      ];
    }

    let sortObj = {};
    if (sortBy === 'severity') {
      // Need aggregation for exact severity sorting, but we can fake it or rely on frontend.
      // We will sort by stockStatus normally, but since frontend usually handles sorting or we use a map:
      // Let's sort by quantity by default if severity is asked
      sortObj = { quantity: sortOrder === 'asc' ? 1 : -1 };
    } else {
      sortObj[sortBy] = sortOrder === 'asc' ? 1 : -1;
    }

    const total = await Product.countDocuments(query);
    const products = await Product.find(query)
      .populate('category', 'name')
      .sort(sortObj)
      .skip((page - 1) * limit)
      .limit(Number(limit));

    res.status(200).json({
      success: true,
      count: products.length,
      total,
      page: Number(page),
      totalPages: Math.ceil(total / limit),
      products
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Quick update quantity
// @route   PATCH /api/products/:productId/quantity
exports.quickUpdateQuantity = async (req, res) => {
  try {
    const { mode, value, remarks } = req.body;
    const performedBy = req.admin ? (req.admin.email || req.admin._id) : 'System';
    
    const product = await Product.findById(req.params.productId);
    if (!product) return res.status(404).json({ success: false, message: 'Product not found' });

    let newQty = product.quantity;
    const val = Number(value);

    if (mode === 'set') newQty = val;
    else if (mode === 'increase') newQty += val;
    else if (mode === 'decrease') newQty -= val;

    if (newQty < 0) return res.status(400).json({ success: false, message: 'Quantity cannot be negative' });

    const oldQty = product.quantity;
    const oldStatus = product.stockStatus;
    product.quantity = newQty;
    
    await product.save(); // pre-save calculates stockStatus

    if (product.stockStatus !== oldStatus) {
      await handleStockStatusChange(product, oldStatus, product.stockStatus, performedBy);
    }

    const activity = await InventoryActivity.create({
      productId: product._id,
      productCode: product.productCode || 'N/A',
      productName: product.name,
      department: product.department || 'Unassigned',
      category: product.category,
      activityType: ACTIVITY_TYPES.MANUAL_ADJUSTMENT,
      performedBy,
      referenceType: 'Manual',
      newQuantity: newQty,
      previousQuantity: oldQty,
      quantityDifference: newQty - oldQty,
      remarks: remarks || `Quantity updated via Quick Action (${mode})`
    });

    res.status(200).json({ success: true, product, activity });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update stock thresholds
// @route   PATCH /api/products/:productId/stock-thresholds
exports.updateStockThresholds = async (req, res) => {
  try {
    let { lowStockThreshold, criticalStockThreshold } = req.body;
    lowStockThreshold = Number(lowStockThreshold);
    criticalStockThreshold = Number(criticalStockThreshold);

    if (criticalStockThreshold > lowStockThreshold) {
      return res.status(400).json({ success: false, message: 'Critical threshold cannot be greater than low threshold' });
    }

    const product = await Product.findById(req.params.productId);
    if (!product) return res.status(404).json({ success: false, message: 'Product not found' });

    product.lowStockThreshold = lowStockThreshold;
    product.criticalStockThreshold = criticalStockThreshold;
    await product.save(); // pre-save recalculates status

    res.status(200).json({ success: true, product });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Acknowledge alert
// @route   PATCH /api/products/:productId/stock-alert/acknowledge
exports.acknowledgeAlert = async (req, res) => {
  try {
    const performedBy = req.admin ? (req.admin.email || req.admin._id) : 'System';
    const product = await Product.findById(req.params.productId);
    if (!product) return res.status(404).json({ success: false, message: 'Product not found' });

    product.stockAlertAcknowledged = true;
    product.stockAlertAcknowledgedBy = performedBy;
    product.stockAlertAcknowledgedAt = new Date();
    await product.save();

    res.status(200).json({ success: true, product });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Unacknowledge alert
// @route   PATCH /api/products/:productId/stock-alert/unacknowledge
exports.unacknowledgeAlert = async (req, res) => {
  try {
    const product = await Product.findById(req.params.productId);
    if (!product) return res.status(404).json({ success: false, message: 'Product not found' });

    product.stockAlertAcknowledged = false;
    product.stockAlertAcknowledgedBy = null;
    product.stockAlertAcknowledgedAt = null;
    await product.save();

    res.status(200).json({ success: true, product });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
