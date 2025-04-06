// Mock implementation of circuit breaker for testing
class CircuitBreaker {
  constructor(fn, options = {}) {
    this.fn = fn;
    this.options = options;
  }

  async fire(...args) {
    try {
      return await this.fn(...args);
    } catch (error) {
      error.type = 'circuit-breaker';
      throw error;
    }
  }
}

function createCircuitBreaker(fn, options) {
  return new CircuitBreaker(fn, options);
}

module.exports = {
  createCircuitBreaker
};