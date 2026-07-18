const express = require('express');
const router = express.Router();
const { loginAdmin, getCurrentAdmin, logoutAdmin } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');
const { loginLimiter } = require('../middleware/rateLimiter');

router.post('/login', loginLimiter, loginAdmin);
router.get('/me', protect, getCurrentAdmin);
router.post('/logout', protect, logoutAdmin);

module.exports = router;
