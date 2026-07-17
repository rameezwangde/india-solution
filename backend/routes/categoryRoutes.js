const express = require('express');
const router = express.Router();
const {
  getCategories,
  getAdminCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory
} = require('../controllers/categoryController');
const { protect } = require('../middleware/authMiddleware');

router.get('/admin/all', protect, getAdminCategories);
router.get('/', getCategories);
router.post('/', protect, createCategory);

router.get('/:id', getCategoryById);
router.put('/:id', protect, updateCategory);
router.delete('/:id', protect, deleteCategory);

module.exports = router;
