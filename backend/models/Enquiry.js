const mongoose = require('mongoose');

const enquirySchema = new mongoose.Schema(
  {
    customer: {
      name: {
        type: String,
        required: [true, 'Customer name is required'],
        trim: true,
      },
      phone: {
        type: String,
        required: [true, 'Customer phone is required'],
        trim: true,
      },
      email: {
        type: String,
        lowercase: true,
        trim: true,
      },
    },
    event: {
      date: {
        type: Date,
      },
      location: {
        type: String,
        trim: true,
      },
      notes: {
        type: String,
        trim: true,
      },
    },
    items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product',
          required: true,
        },
        productName: {
          type: String,
          required: true,
        },
        productCode: {
          type: String,
          default: '',
        },
        quantityRequested: {
          type: Number,
          required: true,
          min: [1, 'Quantity requested must be at least 1'],
        },
        price: {
          type: Number,
          min: 0,
          default: 0,
        },
        totalEstimatedAmount: {
          type: Number,
          min: 0,
          default: 0,
        },
      }
    ],
    status: {
      type: String,
      enum: ['new', 'contacted', 'confirmed', 'completed', 'cancelled'],
      default: 'new',
    },
  },
  {
    timestamps: true,
  }
);

enquirySchema.index({ status: 1 });
enquirySchema.index({ createdAt: -1 });

module.exports = mongoose.model('Enquiry', enquirySchema);
