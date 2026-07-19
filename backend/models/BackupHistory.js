const mongoose = require('mongoose');

const backupHistorySchema = new mongoose.Schema({
  fileName: {
    type: String,
    required: true
  },
  backupType: {
    type: String, // e.g., 'manual', 'automated'
    default: 'manual'
  },
  recordCounts: {
    type: mongoose.Schema.Types.Mixed,
    default: {}
  },
  fileSize: {
    type: Number, // in bytes
    required: true,
    default: 0
  },
  createdBy: {
    type: String,
    required: true,
    default: 'System'
  },
  status: {
    type: String,
    enum: ['completed', 'failed', 'restored'],
    default: 'completed'
  },
  notes: {
    type: String
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('BackupHistory', backupHistorySchema);
