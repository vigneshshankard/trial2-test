module.exports = {
  testEnvironment: 'node',
  verbose: true,
  forceExit: true,
  testTimeout: 10000,
  collectCoverage: true,
  coverageReporters: ['text', 'lcov'],
  coverageDirectory: 'coverage',
  testMatch: [
    '**/__tests__/**/*.test.js'
  ]
};