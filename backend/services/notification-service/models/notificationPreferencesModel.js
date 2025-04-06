const mongoose = require('mongoose');

const NotificationPreferencesSchema = new mongoose.Schema({
  user_id: {
    type: String,
    required: true,
    unique: true
  },
  email_enabled: {
    type: Boolean,
    default: true
  },
  sms_enabled: {
    type: Boolean,
    default: true
  },
  in_app_enabled: {
    type: Boolean,
    default: true
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: Date.now
  }
});

// Update timestamp middleware
NotificationPreferencesSchema.pre('save', function(next) {
  this.updated_at = Date.now();
  next();
});

module.exports = mongoose.model('NotificationPreferences', NotificationPreferencesSchema);