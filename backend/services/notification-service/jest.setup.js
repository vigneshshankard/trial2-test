// Jest setup file for configuring test environment
require('dotenv').config();

// Mock global dependencies
jest.mock('axios');
jest.mock('../../shared/redisClient');
jest.mock('express-validator', () => ({
  body: jest.fn(() => ({
    isString: jest.fn(() => ({
      notEmpty: jest.fn(() => ({
        withMessage: jest.fn()
      }))
    })),
    optional: jest.fn(() => ({
      isBoolean: jest.fn(() => ({
        withMessage: jest.fn()
      }))
    }))
  })),
  param: jest.fn(() => ({
    isString: jest.fn(() => ({
      notEmpty: jest.fn(() => ({
        withMessage: jest.fn()
      }))
    }))
  }))
}));

// Optional: Global test configurations
jest.setTimeout(10000);