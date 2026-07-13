const express = require('express');
const router = express.Router();
const { loginAdmin, getCurrentAdmin, logoutAdmin } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

router.post('/login', loginAdmin);
router.get('/me', protect, getCurrentAdmin);
router.post('/logout', protect, logoutAdmin);

module.exports = router;
