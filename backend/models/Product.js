const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    productCode: {
      type: String,
      unique: true,
      sparse: true,
      uppercase: true,
      trim: true,
    },
    name: {
      type: String,
      required: [true, 'Product name is required'],
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: [true, 'Product category is required'],
    },
    department: {
      type: String,
      trim: true,
      default: 'Main Inventory',
    },
    description: {
      type: String,
      trim: true,
      default: '',
    },
    size: {
      type: String,
      trim: true,
      default: '',
    },
    price: {
      type: Number,
      min: [0, 'Price cannot be negative'],
      default: 0,
    },
    quantity: {
      type: Number,
      min: [0, 'Quantity cannot be negative'],
      default: 0,
      required: [true, 'Quantity is required'],
    },
    quantityUnit: {
      type: String,
      trim: true,
      default: '',
    },
    quantityOriginal: {
      type: String,
      trim: true,
      default: '',
    },
    inventorySection: {
      type: String,
      trim: true,
      default: '',
    },
    lowStockThreshold: { type: Number, default: 5 },
    criticalStockThreshold: { type: Number, default: 2 },
    stockStatus: { 
      type: String, 
      enum: ['IN_STOCK', 'LOW_STOCK', 'CRITICAL_STOCK', 'OUT_OF_STOCK'],
      default: 'OUT_OF_STOCK'
    },
    lastStockAlertAt: { type: Date },
    stockAlertAcknowledged: { type: Boolean, default: false },
    stockAlertAcknowledgedBy: { type: String, default: null },
    stockAlertAcknowledgedAt: { type: Date },
    image: {
      url: { type: String, default: '' },
      publicId: { type: String, default: '' },
    },
    status: {
      type: String,
      enum: ['available', 'out_of_stock', 'hidden'],
      default: 'available',
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Pre-validate hook to generate slug
productSchema.pre('validate', function () {
  if (this.name && (!this.slug || (this.isModified('name') && !this.isModified('slug')))) {
    this.slug = this.name
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');
  }
});

// Pre-save hook to update status based on quantity (legacy status + new stockStatus)
productSchema.pre('save', function () {
  if (this.isModified('quantity') || this.isModified('status')) {
    if (this.quantity === 0 && this.status !== 'hidden') {
      this.status = 'out_of_stock';
    } else if (this.quantity > 0 && this.status === 'out_of_stock') {
      this.status = 'available';
    }
  }

  if (this.isModified('quantity') || this.isModified('lowStockThreshold') || this.isModified('criticalStockThreshold') || this.isNew) {
    if (this.quantity <= 0) {
      this.stockStatus = 'OUT_OF_STOCK';
    } else if (this.quantity <= this.criticalStockThreshold) {
      this.stockStatus = 'CRITICAL_STOCK';
    } else if (this.quantity <= this.lowStockThreshold) {
      this.stockStatus = 'LOW_STOCK';
    } else {
      this.stockStatus = 'IN_STOCK';
    }
  }
});


productSchema.index({ slug: 1 });
productSchema.index({ category: 1 });
productSchema.index({ department: 1 });
productSchema.index({ status: 1 });
productSchema.index({ stockStatus: 1 });
productSchema.index({ stockAlertAcknowledged: 1 });
productSchema.index({ department: 1, stockStatus: 1 });

module.exports = mongoose.model('Product', productSchema);
