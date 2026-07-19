const Product = require('../models/Product');
const Category = require('../models/Category');
const Enquiry = require('../models/Enquiry');
const ImportHistory = require('../models/ImportHistory');
const InventoryActivity = require('../models/InventoryActivity');
const BackupHistory = require('../models/BackupHistory');
const ExportHistory = require('../models/ExportHistory');
const { format } = require('date-fns');

// Helper to get size of object in bytes
const getObjectSize = (obj) => {
  let bytes = 0;
  if (obj !== null && obj !== undefined) {
    bytes = Buffer.byteLength(JSON.stringify(obj), 'utf8');
  }
  return bytes;
};

// @desc    Generate a JSON backup of the system
// @route   POST /api/admin/backups/generate
exports.generateBackup = async (req, res) => {
  try {
    const performedBy = req.admin ? (req.admin.email || req.admin._id) : 'System';

    // Fetch all collections
    const products = await Product.find({}).lean();
    const categories = await Category.find({}).lean();
    const enquiries = await Enquiry.find({}).lean();
    const importHistory = await ImportHistory.find({}).lean();
    const inventoryActivity = await InventoryActivity.find({}).lean();
    const exportHistory = await ExportHistory.find({}).lean();

    const recordCounts = {
      products: products.length,
      categories: categories.length,
      enquiries: enquiries.length,
      importHistory: importHistory.length,
      inventoryActivity: inventoryActivity.length,
      exportHistory: exportHistory.length
    };

    const backupData = {
      metadata: {
        application: "India Solutions Inventory CRM",
        version: "1.0.0",
        createdAt: new Date().toISOString(),
        createdBy: performedBy,
        recordCounts
      },
      data: {
        products,
        categories,
        enquiries,
        importHistory,
        inventoryActivity,
        exportHistory,
        settings: []
      }
    };

    const fileName = `IndiaSolutions_Backup_${format(new Date(), 'yyyy-MM-dd_HH-mm')}.json`;
    const fileSize = getObjectSize(backupData);

    await BackupHistory.create({
      fileName,
      backupType: 'manual',
      recordCounts,
      fileSize,
      createdBy: performedBy,
      status: 'completed'
    });

    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Content-Disposition', `attachment; filename=${fileName}`);
    res.send(JSON.stringify(backupData));
  } catch (error) {
    console.error('Backup generation failed:', error);
    res.status(500).json({ success: false, message: 'Failed to generate backup' });
  }
};

// @desc    Get backup history
// @route   GET /api/admin/backups
exports.getBackupHistory = async (req, res) => {
  try {
    const backups = await BackupHistory.find({}).sort({ createdAt: -1 }).lean();
    res.status(200).json({ success: true, backups });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Preview Restore JSON
// @route   POST /api/admin/backups/preview
exports.previewRestore = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No backup file provided' });
    }

    const fileBuffer = req.file.buffer;
    const backupJson = JSON.parse(fileBuffer.toString('utf8'));

    if (!backupJson.metadata || backupJson.metadata.application !== 'India Solutions Inventory CRM') {
      return res.status(400).json({ success: false, message: 'Invalid backup format' });
    }

    const existingCounts = {
      products: await Product.countDocuments(),
      categories: await Category.countDocuments(),
      enquiries: await Enquiry.countDocuments(),
      activities: await InventoryActivity.countDocuments()
    };

    res.status(200).json({
      success: true,
      metadata: backupJson.metadata,
      existingCounts
    });
  } catch (error) {
    console.error('Restore preview failed:', error);
    res.status(400).json({ success: false, message: 'Failed to parse or validate backup file' });
  }
};

// @desc    Execute Restore
// @route   POST /api/admin/backups/restore
exports.executeRestore = async (req, res) => {
  try {
    const { mode, confirmation } = req.body; // mode: 'merge', 'update', 'replace'
    
    if (mode === 'replace' && confirmation !== 'RESTORE AND REPLACE') {
      return res.status(400).json({ success: false, message: 'Invalid confirmation text for replace mode' });
    }

    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No backup file provided' });
    }

    const fileBuffer = req.file.buffer;
    const backupJson = JSON.parse(fileBuffer.toString('utf8'));

    if (!backupJson.metadata || backupJson.metadata.application !== 'India Solutions Inventory CRM') {
      return res.status(400).json({ success: false, message: 'Invalid backup format' });
    }

    const data = backupJson.data;
    
    if (mode === 'replace') {
      // Clear all
      await Product.deleteMany({});
      await Category.deleteMany({});
      await Enquiry.deleteMany({});
      await ImportHistory.deleteMany({});
      await InventoryActivity.deleteMany({});
      await ExportHistory.deleteMany({});
    }

    // A more robust implementation would loop and handle _id collisions via upsert or insertMany({ordered: false})
    // For simplicity and speed with small datasets:
    if (data.categories && data.categories.length > 0) {
       for (const cat of data.categories) {
           await Category.findByIdAndUpdate(cat._id, cat, { upsert: true });
       }
    }
    
    if (data.products && data.products.length > 0) {
       for (const prod of data.products) {
           await Product.findByIdAndUpdate(prod._id, prod, { upsert: true });
       }
    }

    if (data.enquiries && data.enquiries.length > 0) {
       for (const enq of data.enquiries) {
           await Enquiry.findByIdAndUpdate(enq._id, enq, { upsert: true });
       }
    }

    if (data.inventoryActivity && data.inventoryActivity.length > 0) {
       for (const act of data.inventoryActivity) {
           await InventoryActivity.findByIdAndUpdate(act._id, act, { upsert: true });
       }
    }
    
    if (data.importHistory && data.importHistory.length > 0) {
       for (const ih of data.importHistory) {
           await ImportHistory.findByIdAndUpdate(ih._id, ih, { upsert: true });
       }
    }

    const performedBy = req.admin ? (req.admin.email || req.admin._id) : 'System';
    await BackupHistory.create({
      fileName: `Restored_${backupJson.metadata.createdAt}.json`,
      backupType: 'manual',
      recordCounts: backupJson.metadata.recordCounts,
      fileSize: 0,
      createdBy: performedBy,
      status: 'restored',
      notes: `Restored with mode: ${mode}`
    });

    res.status(200).json({ success: true, message: 'Database restored successfully' });
  } catch (error) {
    console.error('Restore execution failed:', error);
    res.status(500).json({ success: false, message: 'Failed to restore backup' });
  }
};
