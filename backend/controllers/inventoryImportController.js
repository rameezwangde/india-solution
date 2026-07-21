const xlsx = require('xlsx');
const Product = require('../models/Product');
const Category = require('../models/Category');
const ImportHistory = require('../models/ImportHistory');
const InventoryActivity = require('../models/InventoryActivity');
const { logActivity, ACTIVITY_TYPES } = require('../services/activityLogger');
const { calculateStockStatus } = require('../services/stockStatusHelper');
const mongoose = require('mongoose');

// Utility to normalize sheet name based on strict mapping rules
const normalizeSheetName = (name) => {
  if (!name) return 'Main Inventory';
  let cleaned = name.trim();
  
  const mapping = {
    'MAIN INVENTORY': 'Main Inventory',
    'FLOWER INVENTORY': 'Flower Inventory',
    'TRUSSFRAMESPANELS': 'Truss Frames & Panels',
    'SOUND INVENTORY': 'Sound Inventory',
    'LIGHT INVENTORY': 'Light Inventory',
    'CABLE INVENTORY': 'Cable Inventory',
    'CLOTH INVENTORY': 'Cloth Inventory',
    'Tent House Kitchen Items': 'Tent House Kitchen Items',
    'Raaga Inventory': 'Raaga Inventory',
    'Raaga party Hall': 'Raaga Party Hall',
    'RJ Inventory': 'RJ Inventory'
  };
  
  if (mapping[cleaned]) return mapping[cleaned];
  
  // Fallback to title case for unknowns
  return cleaned
    .replace(/\s+/g, ' ')
    .split(' ')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(' ');
};

// Map keywords to standard categories with strict word boundaries
const mapCategory = (text) => {
  if (!text) return 'Decor';
  const upper = text.toUpperCase();
  
  // Create word boundary regex tester allowing optional S for plurals
  const hasWord = (word) => new RegExp(`\\b${word}S?\\b`).test(upper);
  
  if (hasWord('SOFA')) return 'Sofas';
  if (hasWord('CHAIR') || hasWord('STOOL')) return 'Chairs';
  if (hasWord('TABLE') || hasWord('TEAPOY')) return 'Tables';
  if (hasWord('CONSOLE')) return 'Console Tables';
  if (hasWord('LIGHT') || hasWord('LED') || hasWord('SERIAL') || hasWord('SHARPY')) return 'Lighting';
  if (hasWord('SPEAKER') || hasWord('MIC') || hasWord('MIXER') || hasWord('AMPLIFIER') || hasWord('AUDIO')) return 'Sound';
  if (hasWord('FLOWER') || hasWord('ROSE') || hasWord('GARLAND') || hasWord('THORANA')) return 'Flowers';
  if (hasWord('CLOTH') || hasWord('FABRIC') || hasWord('COVER') || hasWord('SCREEN') || hasWord('CURTAIN')) return 'Cloth and Fabric';
  if (hasWord('TRUSS') || hasWord('FRAME') || hasWord('PANEL') || hasWord('ARCH')) return 'Truss and Frames';
  if (hasWord('COOLER') || hasWord('FAN') || hasWord('AC') || hasWord('AIR CONDITIONER')) return 'Cooling Equipment';
  if (hasWord('STOVE') || hasWord('PLATE') || hasWord('SPOON') || hasWord('TRAY') || hasWord('KETTLE')) return 'Kitchen Equipment';
  
  return 'Decor'; // Fallback
};

// Parse Quantity
const parseQuantity = (qtyRaw) => {
  if (qtyRaw === null || qtyRaw === undefined || String(qtyRaw).trim() === '') {
    return { quantity: 0, quantityUnit: '', quantityOriginal: '', warning: 'Missing quantity' };
  }
  
  let str = String(qtyRaw).trim().toUpperCase();
  let quantity = 0;
  let quantityUnit = '';
  let quantityOriginal = str;
  let warning = null;
  
  // Check for simple addition like "26+2"
  if (/^\s*\d+\s*\+\s*\d+\s*$/.test(str)) {
    const parts = str.split('+');
    quantity = parseInt(parts[0], 10) + parseInt(parts[1], 10);
  } else {
    // Extract number and possible text unit
    const numMatch = str.match(/(\d+)/);
    if (numMatch) {
      quantity = parseInt(numMatch[1], 10);
      quantityUnit = str.replace(numMatch[1], '').trim();
    } else {
      // If no number, check for common unit keywords
      const keywords = ['BOWL', 'PC', 'PCS', 'BAG', 'BAGS', 'BOX', 'BOXES', 'PKT', 'PKTS'];
      const hasKeyword = keywords.some(k => str.includes(k));
      if (hasKeyword) {
        quantity = 1;
        quantityUnit = str;
      } else {
        warning = 'Non-numeric quantity parsed as 0';
      }
    }
  }
  
  return { quantity, quantityUnit, quantityOriginal, warning };
};

// Clean string helper
const cleanStr = (str) => {
  if (str === null || str === undefined) return '';
  return String(str).trim().replace(/\s+/g, ' ');
};

const PRODUCT_ALIASES = ['PARTICULARS', 'DESCRIPTION'];
const QTY_ALIASES = ['QNTY', 'QTY'];
const SERIAL_ALIASES = ['SL NO', 'SL NO.'];

// Main parsing logic
const parseWorkbook = (buffer, fileName) => {
  const workbook = xlsx.read(buffer, { type: 'buffer' });
  const parsedSheets = [];
  let totalRowsFound = 0;
  
  for (const sheetName of workbook.SheetNames) {
    if (sheetName.trim().toUpperCase() === 'SHEET15') continue; // Rule 1
    
    const sheet = workbook.Sheets[sheetName];
    // Convert sheet to json array of arrays to find header row dynamically
    const rawData = xlsx.utils.sheet_to_json(sheet, { header: 1, defval: '' });
    
    if (rawData.length === 0) continue;
    
    // Find header row index (Search first 10 rows)
    let headerRowIdx = -1;
    let colMap = { product: -1, qty: -1, serial: -1 };
    
    for (let i = 0; i < Math.min(10, rawData.length); i++) {
      const row = rawData[i];
      let tempColMap = { product: -1, qty: -1, serial: -1 };
      
      for (let j = 0; j < row.length; j++) {
        const cell = cleanStr(row[j]).toUpperCase();
        if (PRODUCT_ALIASES.includes(cell)) tempColMap.product = j;
        else if (QTY_ALIASES.includes(cell)) tempColMap.qty = j;
        else if (SERIAL_ALIASES.includes(cell)) tempColMap.serial = j;
      }
      
      // We need at least PRODUCT and QTY to consider it a valid header
      if (tempColMap.product !== -1 && tempColMap.qty !== -1) {
        headerRowIdx = i;
        colMap = tempColMap;
        break;
      }
    }
    
    if (headerRowIdx === -1) continue; // Skip sheet if no header found
    
    let baseDepartment = normalizeSheetName(sheetName);
    
    if (fileName && (baseDepartment === 'Main Inventory' || sheetName.toUpperCase().startsWith('SHEET'))) {
       const baseName = fileName.replace(/\.[^/.]+$/, "").trim(); // remove extension
       const fileMappedName = normalizeSheetName(baseName);
       if (fileMappedName !== 'Main Inventory') {
           baseDepartment = fileMappedName;
       } else if (baseName.length > 0) {
           baseDepartment = baseName.replace(/\s+/g, ' ').split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' ');
       }
    }
    
    let currentDepartment = baseDepartment;
    let currentSection = '';
    
    const validRows = [];
    const invalidRows = [];
    
    for (let i = headerRowIdx + 1; i < rawData.length; i++) {
      const row = rawData[i];
      // Skip totally empty rows
      if (!row || row.length === 0 || row.every(cell => cleanStr(cell) === '')) continue;
      
      const colA = cleanStr(row[colMap.serial]);
      const productNameRaw = cleanStr(row[colMap.product]);
      const qtyRaw = cleanStr(row[colMap.qty]);
      
      // If product name is empty, skip
      if (!productNameRaw) continue;
      
      // Rule 4: Raaga party Hall section in MAIN INVENTORY
      if (baseDepartment === 'Main Inventory' && productNameRaw.toUpperCase() === 'RAAGA PARTY HALL') {
        currentDepartment = 'Raaga Party Hall';
        continue; // Do not import heading
      }
      
      // Rule 5: Section headings in TRUSSFRAMESPANELS
      if (baseDepartment === 'Truss Frames & Panels' && qtyRaw === '') {
        currentSection = productNameRaw;
        continue; // Do not import heading
      }
      
      // Parse quantity
      const { quantity, quantityUnit, quantityOriginal, warning } = parseQuantity(qtyRaw);
      
      let finalProductName = productNameRaw;
      if (currentSection && baseDepartment === 'Truss Frames & Panels') {
        finalProductName = `${currentSection} - ${productNameRaw}`;
      }
      
      const productCodeRaw = colA; // Sl No
      
      let mappedCategory = currentDepartment;
      if (currentDepartment === 'Main Inventory' || currentDepartment.startsWith('Sheet')) {
        mappedCategory = mapCategory(productNameRaw);
      }
      
      // Update department to match category if it was auto-detected from generic sheet
      const finalDepartment = (currentDepartment === 'Main Inventory' && mappedCategory !== 'Decor') 
        ? `${mappedCategory} Inventory` 
        : currentDepartment;

      const warnings = [];
      if (warning) warnings.push(warning);
      
      validRows.push({
        sheetName,
        department: finalDepartment,
        inventorySection: currentSection,
        productCodeRaw,
        nameRaw: productNameRaw,
        name: finalProductName,
        quantity,
        quantityUnit,
        quantityOriginal,
        categoryName: mappedCategory,
        rowIndex: i + 1,
        warnings
      });
      totalRowsFound++;
    }
    
    parsedSheets.push({
      sheetName,
      department: baseDepartment,
      validRows,
      invalidRows,
      headerRowDetected: headerRowIdx + 1
    });
  }
  
  return { parsedSheets, totalRowsFound };
};

// Generate codes for rows without codes
const generateCodes = async (validRowsArray) => {
  // Find highest existing code index
  const lastProducts = await Product.find({ productCode: /^[A-Z]+-\d+$/ }).lean();
  let maxCodeNum = 0;
  for (const p of lastProducts) {
    const match = p.productCode.match(/^([A-Z]+)-(\d+)$/);
    if (match) {
      const num = parseInt(match[2], 10);
      if (num > maxCodeNum) maxCodeNum = num;
    }
  }
  
  let currentNum = maxCodeNum + 1;
  const processed = [];
  
  for (const r of validRowsArray) {
    let finalCode = r.productCodeRaw;
    if (!finalCode || finalCode.length < 2 || /^\d+$/.test(finalCode.trim())) {
      // Generate one
      const deptPrefix = (r.department || 'INV').split(' ')[0].toUpperCase().replace(/[^A-Z]/g, '').substring(0, 6) || 'INV';
      finalCode = `${deptPrefix}-${currentNum.toString().padStart(4, '0')}`;
      currentNum++;
    }
    
    processed.push({
      ...r,
      productCode: finalCode
    });
  }
  
  return processed;
};

// @desc    Preview inventory workbook
// @route   POST /api/inventory-import/preview
exports.previewInventoryWorkbook = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ success: false, message: 'No file uploaded' });
    
    const { parsedSheets, totalRowsFound } = parseWorkbook(req.file.buffer, req.file.originalname);
    
    // Flatten valid rows
    let allValidRows = [];
    let allInvalidRows = [];
    
    parsedSheets.forEach(s => {
      allValidRows.push(...s.validRows);
      allInvalidRows.push(...s.invalidRows);
    });
    
    // Generate missing codes
    const finalizedRows = await generateCodes(allValidRows);
    
    // Find possible duplicates in existing DB
    const codesToFind = finalizedRows.map(r => r.productCode).filter(c => c);
    const existingProducts = await Product.find({
      $or: [
        { productCode: { $in: codesToFind } },
        { department: { $exists: true } } // Fetch all to match by name+dept+section
      ]
    }).lean();
    
    let duplicateCandidates = [];
    let previewRows = [];
    
    // Map to check duplicates inside the same uploaded file
    const internalDuplicateMap = new Set();
    
    finalizedRows.forEach((r, idx) => {
      // Check existing DB duplicate
      let isDuplicate = false;
      let matchedProduct = null;
      
      const matchByCode = existingProducts.find(ep => ep.productCode && ep.productCode.toUpperCase() === r.productCode.toUpperCase());
      const matchByName = existingProducts.find(ep => 
        ep.name.toLowerCase() === r.name.toLowerCase() && 
        ep.department.toLowerCase() === r.department.toLowerCase() &&
        (ep.inventorySection || '').toLowerCase() === r.inventorySection.toLowerCase()
      );
      
      if (matchByCode) {
        isDuplicate = true;
        matchedProduct = matchByCode;
      } else if (matchByName) {
        isDuplicate = true;
        matchedProduct = matchByName;
      }
      
      // Check internal duplicate
      const internalKey = `${r.name.toLowerCase()}|${r.department.toLowerCase()}|${r.inventorySection.toLowerCase()}`;
      if (internalDuplicateMap.has(internalKey)) {
        r.warnings.push('Duplicate product within the same department and section in upload');
      } else {
        internalDuplicateMap.add(internalKey);
      }
      
      const enrichedRow = { ...r, isDuplicate, matchedProduct };
      if (isDuplicate) duplicateCandidates.push(enrichedRow);
      
      if (idx < 100) previewRows.push(enrichedRow);
    });
    
    res.json({
      success: true,
      summary: {
        sheetsDetected: parsedSheets.length,
        totalRows: totalRowsFound + allInvalidRows.length,
        validRows: finalizedRows.length,
        invalidRows: allInvalidRows.length,
        possibleDuplicates: duplicateCandidates.length
      },
      sheets: parsedSheets.map(s => ({
        sheetName: s.sheetName,
        department: s.department,
        headerRowDetected: s.headerRowDetected,
        validRows: s.validRows.length,
        invalidRows: s.invalidRows.length
      })),
      previewRows,
      invalidRows: allInvalidRows,
      duplicateCandidates
    });
    
  } catch (error) {
    console.error('Preview error:', error);
    res.status(500).json({ success: false, message: 'Failed to preview workbook: ' + error.message });
  }
};

// @desc    Execute inventory import
// @route   POST /api/inventory-import/execute
exports.executeInventoryImport = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ success: false, message: 'No file uploaded' });
    
    const duplicateMode = req.body.duplicateMode || 'skip'; // skip, update_quantity, update_all
    const createMissingCategories = req.body.createMissingCategories === 'true';
    
    const { parsedSheets } = parseWorkbook(req.file.buffer, req.file.originalname);
    
    let allValidRows = [];
    let allInvalidRows = [];
    
    parsedSheets.forEach(s => {
      allValidRows.push(...s.validRows);
      allInvalidRows.push(...s.invalidRows);
    });
    
    const finalizedRows = await generateCodes(allValidRows);
    
    // Pre-fetch all categories
    let existingCategories = await Category.find().lean();
    let categoriesCreated = 0;
    
    const getCategoryId = async (categoryName) => {
      const match = existingCategories.find(c => c.name.toLowerCase() === categoryName.toLowerCase());
      if (match) return match._id;
      
      if (createMissingCategories) {
        try {
          const newCat = await Category.create({ name: categoryName });
          existingCategories.push(newCat);
          categoriesCreated++;
          return newCat._id;
        } catch (e) {
          return existingCategories[0]?._id;
        }
      }
      return existingCategories[0]?._id; 
    };
    
    const sheetStats = {};
    parsedSheets.forEach(s => {
      sheetStats[s.sheetName] = {
        sheetName: s.sheetName,
        department: s.department,
        scanned: s.validRows.length + s.invalidRows.length,
        created: 0,
        updated: 0,
        skipped: 0,
        failed: s.invalidRows.length,
        totalQuantity: 0
      };
    });

    let created = 0;
    let updated = 0;
    let skipped = 0;
    let failed = 0;
    const errors = [];
    const bulkOps = [];
    const activityDocs = [];
    const performedBy = req.admin ? (req.admin.email || req.admin._id) : 'System';
    const fileName = req.file.originalname;
    
    // Prevent internal duplicates from creating multiple docs
    const processedInternalKeys = new Set();
    
    for (const r of finalizedRows) {
      try {
        const catId = await getCategoryId(r.categoryName);
        if (!catId) {
          failed++;
          sheetStats[r.sheetName].failed++;
          errors.push({ sheet: r.sheetName, row: r.rowIndex, reason: 'No category found and auto-create disabled' });
          continue;
        }
        
        const internalKey = `${r.name.toLowerCase()}|${r.department.toLowerCase()}|${r.inventorySection.toLowerCase()}`;
        if (processedInternalKeys.has(internalKey) && duplicateMode !== 'update_quantity' && duplicateMode !== 'update_all') {
          // For simplicity, skip internal duplicates entirely if duplicateMode is 'skip'
          if (duplicateMode === 'skip') {
             skipped++;
             sheetStats[r.sheetName].skipped++;
             continue;
          }
        }
        processedInternalKeys.add(internalKey);
        
        const escapeRegExp = (string) => {
          return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
        };

        const existingByCode = await Product.findOne({ productCode: r.productCode });
        const existingByName = await Product.findOne({ 
          name: { $regex: new RegExp(`^${escapeRegExp(r.name)}$`, 'i') }, 
          department: { $regex: new RegExp(`^${escapeRegExp(r.department)}$`, 'i') },
          inventorySection: r.inventorySection ? { $regex: new RegExp(`^${escapeRegExp(r.inventorySection)}$`, 'i') } : { $in: ['', null] }
        });
        
        const existing = existingByCode || existingByName;
        const status = r.quantity > 0 ? 'available' : 'out_of_stock';
        
        if (existing) {
          if (duplicateMode === 'skip') {
            skipped++;
            sheetStats[r.sheetName].skipped++;
            continue;
          } else if (duplicateMode === 'update_quantity') {
            bulkOps.push({
              updateOne: {
                filter: { _id: existing._id },
                update: { $set: { 
                  quantity: r.quantity, 
                  quantityUnit: r.quantityUnit || existing.quantityUnit,
                  quantityOriginal: r.quantityOriginal || existing.quantityOriginal,
                  status,
                  stockStatus: calculateStockStatus(r.quantity, existing.criticalStockThreshold || 2, existing.lowStockThreshold || 5)
                } }
              }
            });
            activityDocs.push({
               productId: existing._id,
               productCode: existing.productCode || r.productCode,
               productName: existing.name || r.name,
               department: existing.department || r.department,
               category: existing.category,
               activityType: ACTIVITY_TYPES.EXCEL_IMPORT,
               performedBy,
               referenceType: 'Import',
               referenceId: fileName,
               newQuantity: r.quantity,
               previousQuantity: existing.quantity,
               quantityDifference: r.quantity - existing.quantity,
               remarks: `Imported from ${fileName} (Worksheet: ${r.sheetName})`
            });
            updated++;
            sheetStats[r.sheetName].updated++;
            sheetStats[r.sheetName].totalQuantity += r.quantity;
          } else if (duplicateMode === 'update_all') {
            bulkOps.push({
              updateOne: {
                filter: { _id: existing._id },
                update: { $set: { 
                  quantity: r.quantity, 
                  quantityUnit: r.quantityUnit,
                  quantityOriginal: r.quantityOriginal,
                  status,
                  stockStatus: calculateStockStatus(r.quantity, existing.criticalStockThreshold || 2, existing.lowStockThreshold || 5),
                  name: r.name,
                  department: r.department,
                  inventorySection: r.inventorySection,
                  category: catId
                } } 
              }
            });
            activityDocs.push({
               productId: existing._id,
               productCode: r.productCode,
               productName: r.name,
               department: r.department,
               category: catId,
               activityType: ACTIVITY_TYPES.EXCEL_IMPORT,
               performedBy,
               referenceType: 'Import',
               referenceId: fileName,
               newQuantity: r.quantity,
               previousQuantity: existing.quantity,
               quantityDifference: r.quantity - existing.quantity,
               remarks: `Imported from ${fileName} (Worksheet: ${r.sheetName})`
            });
            updated++;
            sheetStats[r.sheetName].updated++;
            sheetStats[r.sheetName].totalQuantity += r.quantity;
          }
        } else {
          // Create new
          const newId = new mongoose.Types.ObjectId();
          bulkOps.push({
            insertOne: {
              document: {
                _id: newId,
                productCode: r.productCode,
                name: r.name,
                category: catId,
                department: r.department,
                inventorySection: r.inventorySection,
                price: 0,
                quantity: r.quantity,
                quantityUnit: r.quantityUnit,
                quantityOriginal: r.quantityOriginal,
                status,
                stockStatus: calculateStockStatus(r.quantity, 2, 5),
                lowStockThreshold: 5,
                criticalStockThreshold: 2,
                description: '',
                size: '',
                isFeatured: false,
              }
            }
          });
          activityDocs.push({
               productId: newId,
               productCode: r.productCode,
               productName: r.name,
               department: r.department,
               category: catId,
               activityType: ACTIVITY_TYPES.EXCEL_IMPORT,
               performedBy,
               referenceType: 'Import',
               referenceId: fileName,
               newQuantity: r.quantity,
               previousQuantity: 0,
               quantityDifference: r.quantity,
               remarks: `Imported from ${fileName} (Worksheet: ${r.sheetName})`
          });
          created++;
          sheetStats[r.sheetName].created++;
          sheetStats[r.sheetName].totalQuantity += r.quantity;
        }
      } catch (err) {
        failed++;
        sheetStats[r.sheetName].failed++;
        errors.push({ sheet: r.sheetName, row: r.rowIndex, reason: err.message });
      }
    }
    
    if (bulkOps.length > 0) {
      await Product.bulkWrite(bulkOps, { ordered: false });
    }
    
    if (activityDocs.length > 0) {
      await InventoryActivity.insertMany(activityDocs, { ordered: false }).catch(err => console.error('Failed inserting activities:', err));
    }
    
    const history = new ImportHistory({
      fileName: req.file.originalname,
      uploadedBy: req.admin._id,
      duplicateMode,
      totalRows: finalizedRows.length + allInvalidRows.length,
      createdCount: created,
      updatedCount: updated,
      skippedCount: skipped,
      failedCount: failed + allInvalidRows.length,
      categoriesCreated,
      status: failed === 0 && allInvalidRows.length === 0 ? 'completed' : 'completed_with_errors',
      errorDetails: [
        ...allInvalidRows.map(ir => ({ sheet: ir.sheetName, row: ir.row, reason: ir.reason })),
        ...errors
      ].slice(0, 100)
    });
    
    await history.save();
    
    res.json({
      success: true,
      message: 'Inventory import completed',
      summary: { created, updated, skipped, failed: failed + allInvalidRows.length, categoriesCreated },
      sheetSummaries: Object.values(sheetStats),
      errors: history.errorDetails
    });
    
  } catch (error) {
    console.error('Execute import error:', error);
    res.status(500).json({ success: false, message: 'Failed to execute import: ' + error.message });
  }
};

exports.downloadInventoryTemplate = (req, res) => {
  const ws = xlsx.utils.aoa_to_sheet([
    ['SL NO', 'PARTICULARS', 'QNTY'],
    ['MAIN-0001', 'Example Sofa 3 Seater', 5]
  ]);
  const wb = xlsx.utils.book_new();
  xlsx.utils.book_append_sheet(wb, ws, 'MAIN INVENTORY');
  const buffer = xlsx.write(wb, { type: 'buffer', bookType: 'xlsx' });
  res.setHeader('Content-Disposition', 'attachment; filename="Inventory_Template.xlsx"');
  res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
  res.send(buffer);
};

exports.exportInventory = async (req, res) => {
  try {
    const products = await Product.find().populate('category', 'name').lean();
    const data = products.map(p => ({
      'SL NO': p.productCode || '',
      'PARTICULARS': p.name,
      'QNTY': p.quantityOriginal || p.quantity || 0,
      'Category': p.category?.name || 'Uncategorized',
      'Department': p.department,
      'Section': p.inventorySection,
      'Status': p.status
    }));
    const ws = xlsx.utils.json_to_sheet(data);
    const wb = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(wb, ws, 'Current Inventory');
    const buffer = xlsx.write(wb, { type: 'buffer', bookType: 'xlsx' });
    res.setHeader('Content-Disposition', 'attachment; filename="CRM_Inventory_Export.xlsx"');
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.send(buffer);
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to export inventory' });
  }
};
