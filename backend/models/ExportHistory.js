const mongoose = require('mongoose');

const exportHistorySchema = new mongoose.Schema({
  fileName: {
    type: String,
    required: true
  },
  format: {
    type: String,
    enum: ['excel', 'csv', 'pdf'],
    required: true
  },
  filters: {
    type: mongoose.Schema.Types.Mixed,
    default: {}
  },
  productsExported: {
    type: Number,
    required: true
  },
  exportedBy: {
    type: String, // String name/email since Admin model might just be strings in req.admin.email
    required: true,
    default: 'System'
  },
}, {
  timestamps: true
});

module.exports = mongoose.model('ExportHistory', exportHistorySchema);
