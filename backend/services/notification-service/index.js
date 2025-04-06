const express = require('express');
const bodyParser = require('body-parser');
const notificationRoutes = require('./routes/notificationRoutes');
const healthcheck = require('express-healthcheck');
const { createCircuitBreaker } = require('./shared/circuitBreaker');
require('dotenv').config();

// Notification dispatcher with circuit breaker
const notificationDispatcher = createCircuitBreaker(async (notification) => {
  // Broadcast notification 
  console.log('Notification dispatched:', notification);
}, {
  timeout: 2000,
  errorThresholdPercentage: 20,
  resetTimeout: 5000
});

module.exports = { notificationDispatcher };