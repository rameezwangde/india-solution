const Product = require('../models/Product');
const ExportHistory = require('../models/ExportHistory');
const ExcelJS = require('exceljs');
const PDFDocument = require('pdfkit-table');
const { format } = require('date-fns');

const sanitizeSpreadsheetCell = (value) => {
  if (typeof value === 'string') {
    if (/^[=+\-@]/.test(value)) {
      return `'${value}`;
    }
  }
  return value;
};

// @desc    Generate Export
// @route   POST /api/export/generate
exports.generateExport = async (req, res) => {
  try {
    const { format: exportFormat, scope, filters, productIds } = req.body;
    const performedBy = req.admin ? (req.admin.email || req.admin._id) : 'System';

    if (!['excel', 'csv', 'pdf'].includes(exportFormat)) {
      return res.status(400).json({ success: false, message: 'Invalid export format' });
    }

    let query = {};
    let exportNamePrefix = 'Inventory';

    if (scope === 'selected') {
      if (!productIds || !Array.isArray(productIds) || productIds.length === 0) {
        return res.status(400).json({ success: false, message: 'No products selected for export' });
      }
      query._id = { $in: productIds };
      exportNamePrefix = 'SelectedProducts';
    } else if (scope === 'filtered') {
      if (filters.category) query.category = filters.category;
      if (filters.department) {
        query.department = filters.department;
        exportNamePrefix = `${filters.department.replace(/\s+/g, '')}`;
      }
      if (filters.status) {
        if (filters.status === 'out_of_stock') query.quantity = 0;
        else if (filters.status === 'low_stock') query.quantity = { $gt: 0, $lte: 5 }; // Based on previous filter logic, or use stockStatus
      }
      if (filters.search) {
        query.$or = [
          { name: { $regex: filters.search, $options: 'i' } },
          { productCode: { $regex: filters.search, $options: 'i' } }
        ];
        exportNamePrefix = 'SearchResults';
      }
    } else if (scope === 'low_stock') {
      query.stockStatus = { $ne: 'IN_STOCK' };
      exportNamePrefix = 'LowStockProducts';
    } else {
      // Entire Inventory
      exportNamePrefix = 'IndiaSolutions_Inventory';
    }

    const products = await Product.find(query).populate('category', 'name').lean();
    if (products.length === 0) {
      return res.status(404).json({ success: false, message: 'No products found to export' });
    }

    // Save Export History
    const fileName = `${exportNamePrefix}_${format(new Date(), 'yyyyMMdd_HHmmss')}.${exportFormat === 'excel' ? 'xlsx' : exportFormat}`;
    await ExportHistory.create({
      fileName,
      format: exportFormat,
      filters: filters || {},
      productsExported: products.length,
      exportedBy: performedBy
    });

    res.setHeader('Access-Control-Expose-Headers', 'Content-Disposition');

    if (exportFormat === 'excel' || exportFormat === 'csv') {
      const workbook = new ExcelJS.Workbook();
      workbook.creator = 'India Solutions';
      workbook.lastModifiedBy = performedBy;
      workbook.created = new Date();

      if (scope === 'entire') {
        // Multi-sheet approach
        const summarySheet = workbook.addWorksheet('Summary');
        summarySheet.columns = [
          { header: 'Metric', key: 'metric', width: 30 },
          { header: 'Value', key: 'value', width: 30 }
        ];
        summarySheet.getRow(1).font = { bold: true };
        summarySheet.addRow({ metric: 'Export Date', value: format(new Date(), 'PPpp') });
        summarySheet.addRow({ metric: 'Exported By', value: performedBy });
        summarySheet.addRow({ metric: 'Total Products', value: products.length });
        
        let totalQty = 0;
        const deptMap = {};
        products.forEach(p => {
          totalQty += (p.quantity || 0);
          const dept = p.department || 'Unassigned';
          if (!deptMap[dept]) deptMap[dept] = [];
          deptMap[dept].push(p);
        });

        summarySheet.addRow({ metric: 'Total Quantity', value: totalQty });
        summarySheet.addRow({ metric: 'Total Departments', value: Object.keys(deptMap).length });

        for (const [dept, deptProducts] of Object.entries(deptMap)) {
          const safeSheetName = dept.replace(/[*?:\/\[\]]/g, '').substring(0, 31);
          const sheet = workbook.addWorksheet(safeSheetName);
          setupProductSheet(sheet, deptProducts);
        }
      } else {
        // Single sheet
        const sheet = workbook.addWorksheet(exportNamePrefix.substring(0, 31));
        setupProductSheet(sheet, products);
      }

      if (exportFormat === 'excel') {
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', `attachment; filename=${fileName}`);
        await workbook.xlsx.write(res);
        res.end();
      } else {
        res.setHeader('Content-Type', 'text/csv');
        res.setHeader('Content-Disposition', `attachment; filename=${fileName}`);
        // For CSV, we can only write one active sheet. We'll write the first one or just create a new merged sheet.
        // Easiest is to create a temp workbook for CSV
        const csvWorkbook = new ExcelJS.Workbook();
        const csvSheet = csvWorkbook.addWorksheet('Export');
        setupProductSheet(csvSheet, products);
        await csvWorkbook.csv.write(res);
        res.end();
      }
    } else if (exportFormat === 'pdf') {
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', `attachment; filename=${fileName}`);

      const doc = new PDFDocument({ margin: 30, size: 'A4', layout: 'landscape' });
      doc.pipe(res);

      doc.fontSize(20).text('India Solutions Inventory Export', { align: 'center' });
      doc.fontSize(10).text(`Export Date: ${format(new Date(), 'PPpp')} | Exported By: ${performedBy} | Total Products: ${products.length}`, { align: 'center' });
      doc.moveDown(2);

      const tableData = {
        headers: ['Product Code', 'Name', 'Department', 'Category', 'Quantity', 'Status'],
        rows: products.map(p => [
          p.productCode || 'N/A',
          p.name,
          p.department || 'N/A',
          p.category?.name || 'N/A',
          `${p.quantity} ${p.quantityUnit || 'pcs'}`,
          p.stockStatus || (p.isActive ? 'Active' : 'Inactive')
        ])
      };

      await doc.table(tableData, {
        prepareHeader: () => doc.font('Helvetica-Bold').fontSize(10),
        prepareRow: (row, i) => doc.font('Helvetica').fontSize(9)
      });

      doc.end();
    }
  } catch (error) {
    console.error('Export error:', error);
    if (!res.headersSent) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
};

function setupProductSheet(sheet, products) {
  sheet.columns = [
    { header: 'Product Code', key: 'productCode', width: 20 },
    { header: 'Product Name', key: 'name', width: 35 },
    { header: 'Department', key: 'department', width: 25 },
    { header: 'Category', key: 'category', width: 20 },
    { header: 'Inventory Section', key: 'inventorySection', width: 20 },
    { header: 'Quantity', key: 'quantity', width: 15 },
    { header: 'Unit', key: 'quantityUnit', width: 10 },
    { header: 'Original Quantity', key: 'originalQuantity', width: 15 },
    { header: 'Stock Status', key: 'stockStatus', width: 20 },
    { header: 'Low Stock Threshold', key: 'lowStockThreshold', width: 18 },
    { header: 'Critical Threshold', key: 'criticalStockThreshold', width: 18 },
    { header: 'Active', key: 'isActive', width: 10 },
    { header: 'Created Date', key: 'createdAt', width: 20 },
    { header: 'Updated Date', key: 'updatedAt', width: 20 }
  ];

  sheet.getRow(1).font = { bold: true };
  sheet.views = [{ state: 'frozen', xSplit: 0, ySplit: 1 }];

  products.forEach(p => {
    sheet.addRow({
      productCode: sanitizeSpreadsheetCell(p.productCode),
      name: sanitizeSpreadsheetCell(p.name),
      department: sanitizeSpreadsheetCell(p.department),
      category: p.category ? sanitizeSpreadsheetCell(p.category.name) : '',
      inventorySection: sanitizeSpreadsheetCell(p.inventorySection),
      quantity: p.quantity,
      quantityUnit: sanitizeSpreadsheetCell(p.quantityUnit),
      originalQuantity: p.originalQuantity,
      stockStatus: sanitizeSpreadsheetCell(p.stockStatus),
      lowStockThreshold: p.lowStockThreshold,
      criticalStockThreshold: p.criticalStockThreshold,
      isActive: p.isActive ? 'Yes' : 'No',
      createdAt: p.createdAt ? format(new Date(p.createdAt), 'yyyy-MM-dd HH:mm') : '',
      updatedAt: p.updatedAt ? format(new Date(p.updatedAt), 'yyyy-MM-dd HH:mm') : ''
    });
  });
}
