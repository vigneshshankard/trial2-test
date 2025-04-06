const mongoose = require('mongoose');

const subscriptionSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  plan_id: {
    type: String,
    required: true
  },
  payment_id: {
    type: String,
    required: true,
    unique: true
  },
  amount: {
    type: Number,
    required: true
  },
  currency: {
    type: String,
    default: 'USD'
  },
  start_date: {
    type: Date,
    default: Date.now
  },
  end_date: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    enum: ['active', 'canceled', 'expired'],
    default: 'active'
  },
  refund_processed: {
    type: Boolean,
    default: false
  },
  features: {
    type: [String],
    default: []
  }
}, { 
  timestamps: true,
  indexes: [
    { fields: { user_id: 1, status: 1 } },
    { fields: { end_date: 1 } }
  ]
});

// Pre-save hook to validate dates
subscriptionSchema.pre('save', function(next) {
  if (this.start_date >= this.end_date) {
    next(new Error('End date must be after start date'));
  }
  next();
});

// Method to check if subscription is active
subscriptionSchema.methods.isActive = function() {
  return this.status === 'active' && new Date() <= this.end_date;
};

module.exports = mongoose.model('Subscription', subscriptionSchema);