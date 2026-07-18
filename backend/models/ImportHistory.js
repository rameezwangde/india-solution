const mongoose = require('mongoose');

const importHistorySchema = new mongoose.Schema(
  {
    fileName: {
      type: String,
      required: true,
    },
    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Admin',
      required: true,
    },
    duplicateMode: {
      type: String,
      enum: ['skip', 'update_quantity', 'update_all'],
      default: 'skip',
    },
    totalRows: { type: Number, default: 0 },
    createdCount: { type: Number, default: 0 },
    updatedCount: { type: Number, default: 0 },
    skippedCount: { type: Number, default: 0 },
    failedCount: { type: Number, default: 0 },
    categoriesCreated: { type: Number, default: 0 },
    status: {
      type: String,
      enum: ['completed', 'completed_with_errors', 'failed'],
      default: 'completed',
    },
    errorDetails: [
      {
        sheet: String,
        row: Number,
        reason: String,
      }
    ]
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('ImportHistory', importHistorySchema);
