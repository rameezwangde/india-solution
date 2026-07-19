const Product = require('../models/Product');
const Category = require('../models/Category');
const Enquiry = require('../models/Enquiry');
const ImportHistory = require('../models/ImportHistory');
const InventoryActivity = require('../models/InventoryActivity');
const { calculateStockStatus } = require('../services/stockStatusHelper');

// @desc    Run data audit
// @route   GET /api/admin/data-audit
exports.runDataAudit = async (req, res) => {
  try {
    const checks = [];
    let issuesFound = 0;

    // 1. Total Product documents & Total inventory quantity
    const products = await Product.find({}).lean();
    const totalProducts = products.length;
    const totalQuantity = products.reduce((sum, p) => sum + (p.quantity || 0), 0);
    checks.push({ name: 'Total Products', status: 'pass', value: totalProducts });
    checks.push({ name: 'Total Quantity', status: 'pass', value: totalQuantity });

    // 2. Missing department
    const missingDept = products.filter(p => !p.department || p.department.trim() === '');
    if (missingDept.length > 0) {
      checks.push({ name: 'Missing Department', status: 'fail', count: missingDept.length });
      issuesFound += missingDept.length;
    }

    // 3. Missing category
    const missingCategory = products.filter(p => !p.category);
    if (missingCategory.length > 0) {
      checks.push({ name: 'Missing Category', status: 'fail', count: missingCategory.length });
      issuesFound += missingCategory.length;
    }

    // 4. Missing product code
    const missingCode = products.filter(p => !p.productCode || p.productCode.trim() === '');
    if (missingCode.length > 0) {
      checks.push({ name: 'Missing Product Code', status: 'fail', count: missingCode.length });
      issuesFound += missingCode.length;
    }

    // 5. Duplicate product codes
    const codes = products.map(p => p.productCode).filter(c => c);
    const uniqueCodes = new Set(codes);
    if (codes.length !== uniqueCodes.size) {
      checks.push({ name: 'Duplicate Product Codes', status: 'fail', count: codes.length - uniqueCodes.size });
      issuesFound += (codes.length - uniqueCodes.size);
    }

    // 6. Negative quantities
    const negativeQty = products.filter(p => p.quantity < 0);
    if (negativeQty.length > 0) {
      checks.push({ name: 'Negative Quantities', status: 'fail', count: negativeQty.length });
      issuesFound += negativeQty.length;
    }

    // 7. Missing quantity units
    const missingUnits = products.filter(p => !p.quantityUnit || p.quantityUnit.trim() === '');
    if (missingUnits.length > 0) {
      checks.push({ name: 'Missing Quantity Units', status: 'fail', count: missingUnits.length });
      issuesFound += missingUnits.length;
    }

    // 8. Invalid stock statuses
    const invalidStatus = products.filter(p => !['IN_STOCK', 'LOW_STOCK', 'CRITICAL_STOCK', 'OUT_OF_STOCK'].includes(p.stockStatus));
    if (invalidStatus.length > 0) {
      checks.push({ name: 'Invalid Stock Status', status: 'fail', count: invalidStatus.length });
      issuesFound += invalidStatus.length;
    }

    // 9. Threshold logic check
    const invalidThresholds = products.filter(p => p.criticalStockThreshold > p.lowStockThreshold);
    if (invalidThresholds.length > 0) {
      checks.push({ name: 'Invalid Threshold Logic', status: 'fail', count: invalidThresholds.length });
      issuesFound += invalidThresholds.length;
    }

    // 10. Orphan activity records
    const productIds = new Set(products.map(p => p._id.toString()));
    const activities = await InventoryActivity.find({}).lean();
    const orphanActivities = activities.filter(a => a.productId && !productIds.has(a.productId.toString()));
    if (orphanActivities.length > 0) {
      checks.push({ name: 'Orphan Activity Records', status: 'fail', count: orphanActivities.length });
      issuesFound += orphanActivities.length;
    }

    // 11. Departments with no valid products
    const departments = await Product.distinct('department');
    const deptCount = departments.length;
    checks.push({ name: 'Active Departments', status: 'pass', value: deptCount });

    res.status(200).json({
      success: true,
      status: issuesFound === 0 ? 'healthy' : 'warning',
      summary: {
        totalProducts,
        totalQuantity,
        issuesFound
      },
      checks
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Repair safe issues
// @route   POST /api/admin/data-audit/repair
exports.repairData = async (req, res) => {
  try {
    const { confirmation } = req.body;
    
    if (confirmation !== 'REPAIR SAFE ISSUES') {
      return res.status(400).json({ success: false, message: 'Invalid confirmation text' });
    }

    let repairsMade = 0;

    // Fetch all products
    const products = await Product.find({});
    
    for (let product of products) {
      let isModified = false;

      // 1. Missing quantity units -> default to 'pcs'
      if (!product.quantityUnit || product.quantityUnit.trim() === '') {
        product.quantityUnit = 'pcs';
        isModified = true;
      }

      // 2. Generate missing product code securely if missing
      if (!product.productCode || product.productCode.trim() === '') {
        product.productCode = `PRD-${Date.now().toString().slice(-6)}-${Math.floor(Math.random() * 1000)}`;
        isModified = true;
      }

      // 3. Recalculate stock statuses
      const newStatus = calculateStockStatus(product.quantity, product.lowStockThreshold, product.criticalStockThreshold);
      if (product.stockStatus !== newStatus) {
        product.stockStatus = newStatus;
        isModified = true;
      }
      
      // Fix negative quantity logically (set to 0)
      if (product.quantity < 0) {
        product.quantity = 0;
        isModified = true;
      }

      if (isModified) {
        await product.save();
        repairsMade++;
      }
    }

    res.status(200).json({ success: true, message: `Successfully repaired ${repairsMade} products` });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
