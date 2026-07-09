const express = require('express');
const router = express.Router();
const { placeholder } = require('../controllers/dashboardController');

router.get('/', placeholder);

module.exports = router;
