const express = require('express');
const router = express.Router();
const { runDataAudit, repairData } = require('../controllers/auditController');
const { protect } = require('../middleware/authMiddleware');

router.use(protect);

router.get('/', runDataAudit);
router.post('/repair', repairData);

module.exports = router;
