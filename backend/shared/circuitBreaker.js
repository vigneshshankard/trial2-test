const CircuitBreaker = require('opossum');

const defaultOptions = {
    timeout: 3000, // Time in milliseconds to wait for a response
    errorThresholdPercentage: 50, // Error percentage at which to open circuit
    resetTimeout: 30000, // Time in milliseconds to wait before attempting to recover
    volumeThreshold: 10 // Minimum number of requests needed before tripping circuit
};

function createCircuitBreaker(asyncFunction, options = {}) {
    const breaker = new CircuitBreaker(asyncFunction, {
        ...defaultOptions,
        ...options
    });

    // Add listeners for circuit breaker events
    breaker.on('open', () => {
        console.log('Circuit Breaker opened - service is unavailable');
    });

    breaker.on('halfOpen', () => {
        console.log('Circuit Breaker half-open - testing service availability');
    });

    breaker.on('close', () => {
        console.log('Circuit Breaker closed - service is available');
    });

    breaker.on('fallback', () => {
        console.log('Circuit Breaker fallback - using fallback response');
    });

    return breaker;
}

module.exports = createCircuitBreaker;