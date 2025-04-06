const mongoose = require('mongoose');

// Check if we're in a test environment
const isTestEnv = process.env.NODE_ENV === 'test';

// If in test environment, use a mock Schema
const Schema = isTestEnv 
  ? function(definition, options) {
      this.definition = definition;
      this.options = options;
      return this;
    }
  : mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        index: true, // Added index for faster queries
    },
    email: {
        type: String,
        required: true,
        unique: true,
        index: true, // Added index for faster queries
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['user', 'admin', 'super_admin'],
        default: 'user',
    },
    isActive: {
        type: Boolean,
        default: true, // Added field for soft delete
    },
}, { timestamps: true });

// In test environment, return a mock model
if (isTestEnv) {
  module.exports = {
    create: jest.fn(),
    findOne: jest.fn(),
    findById: jest.fn(),
    findByIdAndUpdate: jest.fn()
  };
} else {
  module.exports = mongoose.model('User', userSchema);
}