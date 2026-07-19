const express = require('express');
const router = express.Router();
const multer = require('multer');
const { protect } = require('../middleware/authMiddleware');
const {
  generateBackup,
  getBackupHistory,
  previewRestore,
  executeRestore
} = require('../controllers/backupController');

const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 50 * 1024 * 1024 }, // 50MB limit
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/json' || file.originalname.endsWith('.json')) {
      cb(null, true);
    } else {
      cb(new Error('Only JSON files are allowed'), false);
    }
  }
});

router.use(protect);

router.get('/', getBackupHistory);
router.post('/generate', generateBackup);
router.post('/preview', upload.single('backup'), previewRestore);
router.post('/restore', upload.single('backup'), executeRestore);

module.exports = router;
