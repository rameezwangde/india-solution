const mongoose = require('mongoose');

const inventoryActivitySchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  productCode: {
    type: String,
    required: true
  },
  productName: {
    type: String,
    required: true
  },
  department: {
    type: String,
    required: true
  },
  category: {
    type: String
  },
  activityType: {
    type: String,
    required: true,
    enum: [
      'PRODUCT_CREATED',
      'PRODUCT_UPDATED',
      'PRODUCT_DELETED',
      'EXCEL_IMPORT',
      'QUANTITY_INCREASED',
      'QUANTITY_DECREASED',
      'STOCK_RESERVED',
      'STOCK_RESTORED',
      'CATEGORY_CHANGED',
      'DEPARTMENT_CHANGED',
      'STATUS_CHANGED',
      'MANUAL_ADJUSTMENT'
    ]
  },
  performedBy: {
    type: String, // Can be user ID, user email, or "System"
    required: true
  },
  performedAt: {
    type: Date,
    default: Date.now
  },
  referenceType: {
    type: String,
    enum: ['Enquiry', 'Import', 'Manual', 'None'],
    default: 'None'
  },
  referenceId: {
    type: String // Enquiry ID, Import ID, etc.
  },
  previousQuantity: {
    type: Number,
    default: 0
  },
  newQuantity: {
    type: Number,
    default: 0
  },
  quantityDifference: {
    type: Number,
    default: 0
  },
  remarks: {
    type: String
  },
  metadata: {
    type: mongoose.Schema.Types.Mixed // For storing before/after values or other unstructured data
  }
}, {
  timestamps: true
});

// Indexes for fast querying
inventoryActivitySchema.index({ productId: 1, performedAt: -1 });
inventoryActivitySchema.index({ department: 1, performedAt: -1 });
inventoryActivitySchema.index({ performedAt: -1 });
inventoryActivitySchema.index({ activityType: 1 });

module.exports = mongoose.model('InventoryActivity', inventoryActivitySchema);
