const express = require('express');
const router = express.Router();
const {
  bulkUpdateDepartment,
  bulkUpdateCategory,
  bulkActivate,
  bulkDeactivate,
  bulkDelete,
  bulkUpdateThresholds
} = require('../controllers/bulkProductController');
const { protect } = require('../middleware/authMiddleware');

router.use(protect);

router.post('/update-department', bulkUpdateDepartment);
router.post('/update-category', bulkUpdateCategory);
router.post('/activate', bulkActivate);
router.post('/deactivate', bulkDeactivate);
router.post('/delete', bulkDelete);
router.post('/update-thresholds', bulkUpdateThresholds);

module.exports = router;
