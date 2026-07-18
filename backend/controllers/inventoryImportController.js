const xlsx = require('xlsx');
const Product = require('../models/Product');
const Category = require('../models/Category');
const ImportHistory = require('../models/ImportHistory');

// Utility to normalize sheet name
const normalizeSheetName = (name) => {
  if (!name) return 'Main Inventory';
  let cleaned = name.trim().replace(/\s+/g, ' ');
  
  const lower = cleaned.toLowerCase();
  if (lower === 'tent house kitchen items') return 'Kitchen Inventory';
  
  // Title case
  return cleaned
    .split(' ')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(' ');
};

// Map keywords to standard categories
const mapCategory = (text) => {
  if (!text) return 'Decor';
  const lower = text.toLowerCase();
  
  if (lower.includes('sofa')) return 'Sofas';
  if (lower.includes('chair')) return 'Chairs';
  if (lower.includes('table') || lower.includes('teapoy')) return 'Tables';
  if (lower.includes('console')) return 'Console Tables';
  if (lower.includes('light') || lower.includes('led')) return 'Lighting';
  if (lower.includes('speaker') || lower.includes('mic') || lower.includes('mixer') || lower.includes('amplifier') || lower.includes('sound')) return 'Sound';
  if (lower.includes('flower') || lower.includes('rose') || lower.includes('garland')) return 'Flowers';
  if (lower.includes('cloth') || lower.includes('fabric') || lower.includes('screen') || lower.includes('cover')) return 'Cloth and Fabric';
  if (lower.includes('truss') || lower.includes('frame') || lower.includes('panel')) return 'Truss and Frames';
  if (lower.includes('cooler') || lower.includes('fan') || lower.includes('ac') || lower.includes('air')) return 'Cooling Equipment';
  if (lower.includes('kitchen') || lower.includes('stove') || lower.includes('plate') || lower.includes('spoon') || lower.includes('tray')) return 'Kitchen Equipment';
  
  return 'Decor'; // Fallback
};

// Clean string helper
const cleanStr = (str) => {
  if (str === null || str === undefined) return '';
  return String(str).trim().replace(/\s+/g, ' ');
};

const PRODUCT_ALIASES = ['PARTICULARS', 'DESCRIPTION', 'ITEM', 'ITEM NAME', 'PRODUCT', 'PRODUCT NAME', 'NAME'];
const QTY_ALIASES = ['QNTY', 'QTY', 'QUANTITY', 'STOCK', 'AVAILABLE', 'AVAILABLE QUANTITY'];
const SERIAL_ALIASES = ['SL NO', 'SL NO.', 'SL No.', 'SERIAL NO', 'S.NO', 'S NO', 'CODE', 'PRODUCT CODE'];
const PRICE_ALIASES = ['PRICE', 'RATE', 'AMOUNT'];

// Main parsing logic
const parseWorkbook = (buffer) => {
  const workbook = xlsx.read(buffer, { type: 'buffer' });
  const parsedSheets = [];
  let totalRowsFound = 0;
  
  for (const sheetName of workbook.SheetNames) {
    const sheet = workbook.Sheets[sheetName];
    // Convert sheet to json array of arrays to find header row dynamically
    const rawData = xlsx.utils.sheet_to_json(sheet, { header: 1, defval: '' });
    
    if (rawData.length === 0) continue;
    
    // Find header row index
    let headerRowIdx = -1;
    let colMap = { product: -1, qty: -1, serial: -1, price: -1 };
    
    for (let i = 0; i < Math.min(20, rawData.length); i++) {
      const row = rawData[i];
      let foundProduct = false;
      let tempColMap = { product: -1, qty: -1, serial: -1, price: -1 };
      
      for (let j = 0; j < row.length; j++) {
        const cell = cleanStr(row[j]).toUpperCase();
        if (PRODUCT_ALIASES.includes(cell)) tempColMap.product = j;
        else if (QTY_ALIASES.includes(cell)) tempColMap.qty = j;
        else if (SERIAL_ALIASES.includes(cell)) tempColMap.serial = j;
        else if (PRICE_ALIASES.includes(cell)) tempColMap.price = j;
      }
      
      if (tempColMap.product !== -1) {
        headerRowIdx = i;
        colMap = tempColMap;
        break;
      }
    }
    
    if (headerRowIdx === -1) continue; // Skip sheet if no product column found
    
    const department = normalizeSheetName(sheetName);
    const validRows = [];
    const invalidRows = [];
    
    for (let i = headerRowIdx + 1; i < rawData.length; i++) {
      const row = rawData[i];
      // Skip totally empty rows
      if (!row || row.length === 0 || row.every(cell => cleanStr(cell) === '')) continue;
      
      const productName = cleanStr(row[colMap.product]);
      if (!productName || productName.toLowerCase().includes('total') || productName.length < 2) {
        // Assume it's a subtotal or blank invalid row
        invalidRows.push({ sheet: sheetName, row: i + 1, reason: 'Missing or invalid product name' });
        continue;
      }
      
      const qtyStr = colMap.qty !== -1 ? cleanStr(row[colMap.qty]) : '0';
      let quantity = parseInt(qtyStr, 10);
      if (isNaN(quantity) || quantity < 0) quantity = 0;
      
      const priceStr = colMap.price !== -1 ? cleanStr(row[colMap.price]) : '0';
      let price = parseFloat(priceStr);
      if (isNaN(price) || price < 0) price = 0;
      
      const productCodeRaw = colMap.serial !== -1 ? cleanStr(row[colMap.serial]) : '';
      
      validRows.push({
        sheetName,
        department,
        productCodeRaw,
        name: productName,
        quantity,
        price,
        rowIndex: i + 1
      });
      totalRowsFound++;
    }
    
    parsedSheets.push({
      sheetName,
      department,
      validRows,
      invalidRows
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
    if (!finalCode || finalCode.length < 2) {
      // Generate one
      const deptPrefix = r.department.split(' ')[0].toUpperCase().replace(/[^A-Z]/g, '').substring(0, 6) || 'INV';
      finalCode = `${deptPrefix}-${currentNum.toString().padStart(4, '0')}`;
      currentNum++;
    }
    
    // Assign category mapping
    const categorySuggestion = mapCategory(r.department + ' ' + r.name);
    
    processed.push({
      ...r,
      productCode: finalCode,
      categoryName: categorySuggestion
    });
  }
  
  return processed;
};

// @desc    Preview inventory workbook
// @route   POST /api/inventory-import/preview
exports.previewInventoryWorkbook = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ success: false, message: 'No file uploaded' });
    
    const { parsedSheets, totalRowsFound } = parseWorkbook(req.file.buffer);
    
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
    // To do this efficiently, we gather all codes and names
    const codesToFind = finalizedRows.map(r => r.productCode).filter(c => c);
    const namesToFind = finalizedRows.map(r => r.name);
    
    const existingProducts = await Product.find({
      $or: [
        { productCode: { $in: codesToFind } },
        { name: { $in: namesToFind } }
      ]
    }).lean();
    
    let duplicateCandidates = [];
    let previewRows = [];
    
    finalizedRows.forEach((r, idx) => {
      const matchByCode = existingProducts.find(ep => ep.productCode && ep.productCode.toUpperCase() === r.productCode.toUpperCase());
      const matchByName = existingProducts.find(ep => ep.name.toLowerCase() === r.name.toLowerCase() && ep.department.toLowerCase() === r.department.toLowerCase());
      
      let isDuplicate = false;
      let matchedProduct = null;
      
      if (matchByCode) {
        isDuplicate = true;
        matchedProduct = matchByCode;
      } else if (matchByName) {
        isDuplicate = true;
        matchedProduct = matchByName;
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
    
    const { parsedSheets } = parseWorkbook(req.file.buffer);
    
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
          // Fallback to first available if creation fails
          return existingCategories[0]?._id;
        }
      }
      return existingCategories[0]?._id; // Fallback
    };
    
    let created = 0;
    let updated = 0;
    let skipped = 0;
    let failed = 0;
    const errors = [];
    
    const bulkOps = [];
    
    // We will do bulk operations in chunks to save memory
    for (const r of finalizedRows) {
      try {
        const catId = await getCategoryId(r.categoryName);
        if (!catId) {
          failed++;
          errors.push({ sheet: r.sheetName, row: r.rowIndex, reason: 'No category found and auto-create disabled/failed' });
          continue;
        }
        
        const existing = await Product.findOne({
          $or: [
            { productCode: r.productCode },
            { name: { $regex: new RegExp(`^${r.name}$`, 'i') }, department: r.department }
          ]
        });
        
        const status = r.quantity > 0 ? 'available' : 'out_of_stock';
        
        if (existing) {
          if (duplicateMode === 'skip') {
            skipped++;
            continue;
          } else if (duplicateMode === 'update_quantity') {
            bulkOps.push({
              updateOne: {
                filter: { _id: existing._id },
                update: { $set: { quantity: r.quantity, status } }
              }
            });
            updated++;
          } else if (duplicateMode === 'update_all') {
            bulkOps.push({
              updateOne: {
                filter: { _id: existing._id },
                update: { $set: { 
                  quantity: r.quantity, 
                  status,
                  name: r.name,
                  department: r.department,
                  price: r.price,
                  category: catId
                } }
              }
            });
            updated++;
          }
        } else {
          // Create new
          bulkOps.push({
            insertOne: {
              document: {
                productCode: r.productCode,
                name: r.name,
                category: catId,
                department: r.department,
                price: r.price,
                quantity: r.quantity,
                status,
                description: '',
                size: '',
                isFeatured: false,
              }
            }
          });
          created++;
        }
      } catch (err) {
        failed++;
        errors.push({ sheet: r.sheetName, row: r.rowIndex, reason: err.message });
      }
    }
    
    // Execute bulk write
    if (bulkOps.length > 0) {
      const result = await Product.bulkWrite(bulkOps, { ordered: false });
    }
    
    // Save history
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
      ].slice(0, 100) // limit error array size
    });
    
    await history.save();
    
    res.json({
      success: true,
      message: 'Inventory import completed',
      summary: {
        created,
        updated,
        skipped,
        failed: failed + allInvalidRows.length,
        categoriesCreated
      },
      errors: history.errorDetails
    });
    
  } catch (error) {
    console.error('Execute import error:', error);
    res.status(500).json({ success: false, message: 'Failed to execute import: ' + error.message });
  }
};

// @desc    Download inventory template
// @route   GET /api/inventory-import/template
exports.downloadInventoryTemplate = (req, res) => {
  const ws = xlsx.utils.aoa_to_sheet([
    ['PRODUCT CODE', 'PRODUCT NAME', 'QUANTITY', 'PRICE'],
    ['MAIN-0001', 'Example Sofa 3 Seater', 5, 1200]
  ]);
  
  const wb = xlsx.utils.book_new();
  xlsx.utils.book_append_sheet(wb, ws, 'Template');
  
  const buffer = xlsx.write(wb, { type: 'buffer', bookType: 'xlsx' });
  
  res.setHeader('Content-Disposition', 'attachment; filename="Inventory_Template.xlsx"');
  res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
  res.send(buffer);
};

// @desc    Export current inventory
// @route   GET /api/inventory-import/export
exports.exportInventory = async (req, res) => {
  try {
    const products = await Product.find().populate('category', 'name').lean();
    
    const data = products.map(p => ({
      'Product Code': p.productCode || '',
      'Product Name': p.name,
      'Category': p.category?.name || 'Uncategorized',
      'Department': p.department,
      'Description': p.description,
      'Size': p.size,
      'Price': p.price,
      'Quantity': p.quantity,
      'Status': p.status,
      'Image URL': p.image?.url || '',
      'Created At': p.createdAt,
      'Updated At': p.updatedAt
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
