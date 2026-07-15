const express = require('express');
const router = express.Router();
const { 
  getProducts, 
  getProductById, 
  createProduct, 
  updateProduct, 
  deleteProduct 
} = require('../controllers/productController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', getProducts);
router.post('/', protect, createProduct);

router.get('/:id', getProductById);
router.put('/:id', protect, updateProduct);
router.delete('/:id', protect, deleteProduct);

module.exports = router;
