const InventoryActivity = require('../models/InventoryActivity');
const mongoose = require('mongoose');

// @desc    Get all activities (Admin)
// @route   GET /api/inventory/activity
exports.getActivities = async (req, res) => {
  try {
    const { 
      search, department, activityType, 
      startDate, endDate, performedBy,
      page = 1, limit = 20
    } = req.query;

    let query = {};

    if (department) {
      query.department = { $regex: new RegExp(`^${department}$`, 'i') };
    }

    if (activityType) {
      query.activityType = activityType;
    }
    
    if (performedBy) {
      query.performedBy = { $regex: performedBy, $options: 'i' };
    }

    if (startDate || endDate) {
      query.performedAt = {};
      if (startDate) query.performedAt.$gte = new Date(startDate);
      if (endDate) query.performedAt.$lte = new Date(endDate);
    }

    if (search) {
      query.$or = [
        { productName: { $regex: search, $options: 'i' } },
        { productCode: { $regex: search, $options: 'i' } },
        { referenceId: { $regex: search, $options: 'i' } },
        { remarks: { $regex: search, $options: 'i' } }
      ];
    }

    const pageNum = parseInt(page, 10) || 1;
    const limitNum = parseInt(limit, 10) || 20;
    const skip = (pageNum - 1) * limitNum;

    const total = await InventoryActivity.countDocuments(query);
    const activities = await InventoryActivity.find(query)
      .sort({ performedAt: -1 })
      .skip(skip)
      .limit(limitNum)
      .lean();

    res.status(200).json({
      success: true,
      count: activities.length,
      pagination: {
        total,
        page: pageNum,
        pages: Math.ceil(total / limitNum) || 1
      },
      activities
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get activity for a specific product
// @route   GET /api/inventory/activity/product/:productId
exports.getProductActivity = async (req, res) => {
  try {
    const { productId } = req.params;
    
    if (!productId.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ success: false, message: 'Invalid product ID' });
    }

    const activities = await InventoryActivity.find({ productId })
      .sort({ performedAt: -1 })
      .limit(50)
      .lean();

    res.status(200).json({
      success: true,
      activities
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get recent activity (Dashboard)
// @route   GET /api/inventory/activity/recent
exports.getRecentActivity = async (req, res) => {
  try {
    const limitNum = parseInt(req.query.limit, 10) || 10;
    
    const activities = await InventoryActivity.find()
      .sort({ performedAt: -1 })
      .limit(limitNum)
      .lean();

    res.status(200).json({
      success: true,
      activities
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
