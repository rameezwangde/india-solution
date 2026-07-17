const express = require('express');
const router = express.Router();
const { 
  createEnquiry, 
  getEnquiries, 
  getEnquiryById, 
  updateEnquiry, 
  deleteEnquiry 
} = require('../controllers/enquiryController');
const { protect } = require('../middleware/authMiddleware');

// Public route
router.post('/', createEnquiry);

// Protected Admin routes
router.get('/', protect, getEnquiries);
router.get('/:id', protect, getEnquiryById);
router.put('/:id', protect, updateEnquiry);
router.delete('/:id', protect, deleteEnquiry);

module.exports = router;
