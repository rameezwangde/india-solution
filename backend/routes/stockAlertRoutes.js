const express = require('express');
const router = express.Router();
const { 
  getStockAlertsSummary, 
  getStockAlerts, 
  quickUpdateQuantity, 
  updateStockThresholds, 
  acknowledgeAlert, 
  unacknowledgeAlert 
} = require('../controllers/stockAlertController');
const { protect } = require('../middleware/authMiddleware');

router.use(protect);

router.get('/', getStockAlerts);
router.get('/summary', getStockAlertsSummary);
router.patch('/:productId/quantity', quickUpdateQuantity);
router.patch('/:productId/stock-thresholds', updateStockThresholds);
router.patch('/:productId/stock-alert/acknowledge', acknowledgeAlert);
router.patch('/:productId/stock-alert/unacknowledge', unacknowledgeAlert);

module.exports = router;
