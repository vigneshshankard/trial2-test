// Jest setup file for configuring test environment
require('dotenv').config();

// Mock global dependencies
jest.mock('axios');
jest.mock('../../shared/redisClient');
jest.mock('express-validator');

// Optional: Global test configurations
jest.setTimeout(10000);