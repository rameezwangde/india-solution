const express = require('express');
const router = express.Router();
const multer = require('multer');
const { protect } = require('../middleware/authMiddleware');
const {
  previewInventoryWorkbook,
  executeInventoryImport,
  downloadInventoryTemplate,
  exportInventory
} = require('../controllers/inventoryImportController');

const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 15 * 1024 * 1024 }, // 15MB limit
  fileFilter: (req, file, cb) => {
    const isExcel = file.mimetype.includes('excel') || 
                    file.mimetype.includes('spreadsheetml') ||
                    file.originalname.endsWith('.xlsx') ||
                    file.originalname.endsWith('.xls');
                    
    if (isExcel) {
      cb(null, true);
    } else {
      cb(new Error('Unsupported file type. Please upload an .xlsx or .xls file.'), false);
    }
  }
});

// All import routes are protected
router.use(protect);

router.post('/preview', upload.single('inventoryFile'), previewInventoryWorkbook);
router.post('/execute', upload.single('inventoryFile'), executeInventoryImport);
router.get('/template', downloadInventoryTemplate);
router.get('/export', exportInventory);

module.exports = router;
