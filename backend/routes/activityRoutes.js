const express = require('express');
const router = express.Router();
const { getActivities, getProductActivity, getRecentActivity } = require('../controllers/activityController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', protect, getActivities);
router.get('/recent', protect, getRecentActivity);
router.get('/product/:productId', protect, getProductActivity);

module.exports = router;
