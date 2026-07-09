const express = require('express');
const router = express.Router();
const { placeholder } = require('../controllers/productController');

router.get('/', placeholder);

module.exports = router;
