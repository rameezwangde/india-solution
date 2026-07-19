const express = require('express');
const router = express.Router();
const { generateExport } = require('../controllers/exportController');
const { protect } = require('../middleware/authMiddleware');

router.use(protect);

router.post('/generate', generateExport);

module.exports = router;
