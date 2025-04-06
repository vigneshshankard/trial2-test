// Jest setup file for configuring test environment
require('dotenv').config();

// Mock Mongoose more comprehensively
jest.mock('mongoose', () => {
  const originalModule = jest.requireActual('mongoose');
  
  // Create a mock constructor for Schema
  const mockSchemaConstructor = function(definition, options) {
    this.definition = definition;
    this.options = options;
    
    // Simulate Schema methods
    this.index = jest.fn();
    this.set = jest.fn();
    this.plugin = jest.fn();
    this.virtual = jest.fn().mockReturnThis();
    this.pre = jest.fn().mockReturnThis();
    this.post = jest.fn().mockReturnThis();

    return this;
  };

  // Add static properties to the mock Schema
  mockSchemaConstructor.Types = {
    String: String,
    Number: Number,
    Date: Date,
    Boolean: Boolean,
    ObjectId: {
      ref: jest.fn(),
      isValid: jest.fn().mockReturnValue(true)
    }
  };

  // Create a mock model function
  const mockModel = jest.fn(() => ({
    create: jest.fn(),
    findOne: jest.fn(),
    findById: jest.fn().mockReturnThis(),
    findByIdAndUpdate: jest.fn(),
    findByIdAndDelete: jest.fn(),
    select: jest.fn().mockReturnThis(),
    lean: jest.fn().mockResolvedValue(null)
  }));

  // Return the mock Mongoose object
  return {
    Schema: mockSchemaConstructor,
    model: mockModel,
    Types: {
      ObjectId: {
        isValid: jest.fn().mockReturnValue(true)
      }
    },
    connect: jest.fn(),
    connection: {
      on: jest.fn(),
      once: jest.fn()
    }
  };
});

// Optional: Global test configurations
jest.setTimeout(10000); // Increase timeout for async tests

// Suppress console errors during tests
global.console = {
  ...global.console,
  error: jest.fn()
};

// Global setup
module.exports = {
  globalSetup: async () => {
    // Any global setup logic before all tests
  },
  globalTeardown: async () => {
    // Clear all mocks and reset modules after all tests
    jest.clearAllMocks();
    jest.resetAllMocks();
  }
};