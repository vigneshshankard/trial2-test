module.exports = {
  projects: [
    '<rootDir>/backend/services/user-management',
    '<rootDir>/backend/services/content-management',
    '<rootDir>/backend/services/notification-service'
  ],
  testMatch: [
    '**/__tests__/**/*.test.js',
    '**/?(*.)+(spec|test).js'
  ],
  collectCoverageFrom: [
    '**/*.{js,jsx}',
    '!**/node_modules/**',
    '!**/coverage/**',
    '!**/jest.config.js'
  ],
  coverageReporters: ['text', 'lcov'],
  testEnvironment: 'node',
  transform: {
    '^.+\\.js$': 'babel-jest'
  },
  verbose: true
};