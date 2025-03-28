const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }

    const JWT_SECRET = process.env.JWT_SECRET || 'default_jwt_secret';

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Unauthorized: Invalid token' });
        }

        // Extract roles and permissions from the token
        const { roles, permissions } = decoded;
        req.user = { id: decoded.id, roles, permissions };

        // Example RBAC enforcement (can be customized per route)
        if (req.path.startsWith('/admin') && !roles.includes('admin')) {
            return res.status(403).json({ message: 'Forbidden: Insufficient permissions' });
        }

        next();
    });
};