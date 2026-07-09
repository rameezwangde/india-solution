const express = require('express');
const router = express.Router();
const { placeholder } = require('../controllers/authController');

router.get('/', placeholder);

module.exports = router;
