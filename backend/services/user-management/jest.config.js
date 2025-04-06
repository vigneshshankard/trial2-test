module.exports = {
  rootDir: '.',
  testEnvironment: 'node',
  setupFiles: ['<rootDir>/jest.setup.js'],
  testMatch: ['<rootDir>/__tests__/**/*.test.js'],
  collectCoverageFrom: [
    'controllers/**/*.js',
    'models/**/*.js',
    'routes/**/*.js'
  ],
  coveragePathIgnorePatterns: ['/node_modules/', '/__tests__/'],
  testTimeout: 10000,
  forceExit: true,
  clearMocks: true,
  verbose: true
};