const express = require('express');
const router = express.Router();
const { 
  getProducts, 
  getProductById, 
  createProduct, 
  updateProduct, 
  deleteProduct,
  clearInventory,
  getDepartments,
  clearTestData,
  toggleDepartmentVisibility
} = require('../controllers/productController');
const {
  uploadProductImage,
  deleteProductImage
} = require('../controllers/productImageController');
const { protect, optionalAuth } = require('../middleware/authMiddleware');
const { uploadMiddleware } = require('../middleware/uploadMiddleware');
const rateLimit = require('express-rate-limit');

const clearInventoryLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour window
  max: 3, // start blocking after 3 requests
  message: 'Too many clear inventory requests from this IP, please try again after an hour'
});

router.delete('/clear-inventory', protect, clearInventoryLimiter, clearInventory);
router.delete('/clear-department', protect, clearInventoryLimiter, require('../controllers/productController').clearDepartmentInventory);
router.delete('/clear-test-data', protect, clearInventoryLimiter, clearTestData);

router.get('/departments', optionalAuth, getDepartments);
router.put('/departments/visibility', protect, toggleDepartmentVisibility);
router.get('/', optionalAuth, getProducts);
router.post('/', protect, createProduct);

router.get('/:id', getProductById);
router.put('/:id', protect, updateProduct);
router.delete('/:id', protect, deleteProduct);

// Image routes
router.post('/:id/image', protect, uploadMiddleware, uploadProductImage);
router.delete('/:id/image', protect, deleteProductImage);

module.exports = router;
