const express = require('express');
const router = express.Router();
const { placeholder } = require('../controllers/categoryController');

router.get('/', placeholder);

module.exports = router;
