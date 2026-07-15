const express = require('express');
const router = express.Router();
const { 
  getProducts, 
  getProductById, 
  createProduct, 
  updateProduct, 
  deleteProduct 
} = require('../controllers/productController');
const {
  uploadProductImage,
  deleteProductImage
} = require('../controllers/productImageController');
const { protect } = require('../middleware/authMiddleware');
const { uploadMiddleware } = require('../middleware/uploadMiddleware');

router.get('/', getProducts);
router.post('/', protect, createProduct);

router.get('/:id', getProductById);
router.put('/:id', protect, updateProduct);
router.delete('/:id', protect, deleteProduct);

// Image routes
router.post('/:id/image', protect, uploadMiddleware, uploadProductImage);
router.delete('/:id/image', protect, deleteProductImage);

module.exports = router;
