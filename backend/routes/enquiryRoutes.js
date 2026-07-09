const express = require('express');
const router = express.Router();
const { placeholder } = require('../controllers/enquiryController');

router.get('/', placeholder);

module.exports = router;
