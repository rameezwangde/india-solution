const mongoose = require('mongoose');

const departmentConfigSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    isHidden: {
      type: Boolean,
      default: false,
    }
  },
  {
    timestamps: true,
  }
);

departmentConfigSchema.index({ isHidden: 1 });

module.exports = mongoose.model('DepartmentConfig', departmentConfigSchema);
