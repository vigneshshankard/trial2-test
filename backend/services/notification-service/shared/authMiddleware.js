// Mock authentication middleware for testing
const mockAuthMiddleware = (req, res, next) => {
  // Simulate authenticated user
  if (!req.user) {
    req.user = {
      id: 'user123',
      role: 'regular'
    };
  }
  next();
};

// Middleware to check user role
const checkUserRole = (allowedRoles) => {
  return (req, res, next) => {
    const userRole = req.user.role;
    
    if (allowedRoles.includes(userRole)) {
      next();
    } else {
      res.status(403).json({ 
        message: 'Access denied. Insufficient permissions.' 
      });
    }
  };
};

module.exports = {
  mockAuthMiddleware,
  checkUserRole
};