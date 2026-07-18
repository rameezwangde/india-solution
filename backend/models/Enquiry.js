const mongoose = require('mongoose');

const enquirySchema = new mongoose.Schema(
  {
    referenceNumber: {
      type: String,
      unique: true
    },
    customerName: {
      type: String,
      required: [true, 'Customer name is required'],
      trim: true,
    },
    companyName: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      lowercase: true,
      trim: true,
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      trim: true,
    },
    eventType: {
      type: String,
      trim: true,
    },
    eventDate: {
      type: Date,
    },
    eventLocation: {
      type: String,
      trim: true,
    },
    city: {
      type: String,
      trim: true,
    },
    message: {
      type: String,
      trim: true,
    },
    notes: {
      type: String,
      trim: true,
    },
    products: [
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
        quantity: {
          type: Number,
          required: true,
          min: [1, 'Quantity must be at least 1'],
        },
        price: {
          type: Number,
          min: 0,
          default: 0,
        }
      }
    ],
    totalItems: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: ['Pending', 'Contacted', 'Quotation Sent', 'Confirmed', 'Completed', 'Cancelled'],
      default: 'Pending',
    },
    stockProcessed: {
      type: Boolean,
      default: false,
    },
    stockProcessedAt: {
      type: Date,
      default: null,
    },
    stockRestored: {
      type: Boolean,
      default: false,
    },
    stockRestoredAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

// Pre-save hook to generate sequential reference number
enquirySchema.pre('save', async function () {
  if (!this.isNew) {
    return;
  }
  
  const lastEnquiry = await this.constructor.findOne().sort({ createdAt: -1 });
  let nextNum = 1;
  
  if (lastEnquiry && lastEnquiry.referenceNumber) {
    const match = lastEnquiry.referenceNumber.match(/ISCRM-(\d+)/);
    if (match) {
      nextNum = parseInt(match[1], 10) + 1;
    }
  }
  
  this.referenceNumber = `ISCRM-${nextNum.toString().padStart(6, '0')}`;
});

enquirySchema.index({ status: 1 });
enquirySchema.index({ createdAt: -1 });
enquirySchema.index({ referenceNumber: 1 });

module.exports = mongoose.model('Enquiry', enquirySchema);
