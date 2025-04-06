const mongoose = require('mongoose');

const invoiceSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  subscription_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Subscription',
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  currency: {
    type: String,
    default: 'USD'
  },
  status: {
    type: String,
    enum: ['paid', 'pending', 'failed', 'refunded'],
    default: 'pending'
  },
  payment_method: {
    type: String,
    enum: ['credit_card', 'debit_card', 'paypal', 'stripe', 'razorpay'],
    required: true
  },
  transaction_id: {
    type: String,
    unique: true
  },
  description: {
    type: String
  },
  metadata: {
    type: mongoose.Schema.Types.Mixed
  }
}, { 
  timestamps: true,
  indexes: [
    { fields: { user_id: 1, status: 1 } },
    { fields: { transaction_id: 1 } }
  ]
});

// Pre-save hook to validate amount
invoiceSchema.pre('save', function(next) {
  if (this.amount === 0) {
    next(new Error('Invoice amount cannot be zero'));
  }
  next();
});

// Method to check if invoice is paid
invoiceSchema.methods.isPaid = function() {
  return this.status === 'paid';
};

module.exports = mongoose.model('Invoice', invoiceSchema);