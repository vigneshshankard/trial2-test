module.exports = (req, res, next) => {
    // Mock authentication middleware
    req.user = { id: '123' }; // Mock user ID
    next();
};