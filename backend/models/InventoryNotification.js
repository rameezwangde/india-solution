const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['LOW_STOCK', 'CRITICAL_STOCK', 'OUT_OF_STOCK', 'STOCK_RESTORED', 'THRESHOLD_CHANGED'],
    required: true
  },
  title: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  productCode: {
    type: String
  },
  productName: {
    type: String,
    required: true
  },
  department: {
    type: String
  },
  severity: {
    type: String,
    enum: ['low', 'medium', 'high', 'critical', 'info'],
    default: 'info'
  },
  isRead: {
    type: Boolean,
    default: false
  },
  readBy: {
    type: String
  },
  readAt: {
    type: Date
  }
}, {
  timestamps: true
});

notificationSchema.index({ isRead: 1, createdAt: -1 });
notificationSchema.index({ productId: 1 });

module.exports = mongoose.model('InventoryNotification', notificationSchema);
