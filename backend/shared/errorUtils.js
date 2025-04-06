const logger = require('./logger');

class AppError extends Error {
  constructor(message, statusCode, data) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.data = data;
    this.isOperational = true;
    this.isAppError = true;
    Error.captureStackTrace(this, this.constructor);
  }
}

const handleErrors = (err, req, res, next) => {
  logger.error(err.stack);

  // Format AppError responses
  if (err.isAppError || err.isOperational) {
    const response = {
      status: err.status || (err.statusCode >= 500 ? 'error' : 'fail'),
      message: err.message
    };
    if (err.data) response.data = err.data;
    return res.status(err.statusCode).json(response);
  }

  // Handle other error types
  if (err.name === 'ValidationError') {
    return res.status(400).json({
      status: 'fail',
      message: err.message,
      errors: err.errors
    });
  }

  if (err.name === 'UnauthorizedError') {
    return res.status(401).json({
      status: 'fail',
      message: 'Authentication failed'
    });
  }

  // Default error handler
  res.status(err.statusCode || 500).json({
    status: 'error',
    message: err.message || 'Internal Server Error'
  });
};

module.exports = {
  AppError,
  handleErrors
};