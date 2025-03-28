const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }

    const JWT_SECRET = process.env.JWT_SECRET;
    if (!JWT_SECRET) {
        console.error('JWT_SECRET is not set in the environment variables.');
        return res.status(500).json({ message: 'Internal Server Error: Missing configuration' });
    }

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Unauthorized: Invalid token' });
        }

        // Extract roles and permissions from the token
        const { roles, permissions } = decoded;
        req.user = { id: decoded.id, roles, permissions };

        // Helper method for role-based access control
        req.checkRole = (requiredRole) => {
            if (!roles.includes(requiredRole)) {
                const error = new Error(`Forbidden: Requires ${requiredRole} role`);
                error.status = 403;
                throw error;
            }
        };

        // Helper method for permission-based access control
        req.checkPermission = (requiredPermission) => {
            if (!permissions.includes(requiredPermission)) {
                const error = new Error(`Forbidden: Requires ${requiredPermission} permission`);
                error.status = 403;
                throw error;
            }
        };

        next();
    });
};

/**
 * Middleware Usage:
 * - Validates JWT tokens from the `Authorization` header.
 * - Extracts `roles` and `permissions` for role-based and permission-based access control.
 * - Provides `req.checkRole` and `req.checkPermission` for enforcing access control in routes.
 *
 * Example:
 * router.get('/example', authMiddleware, (req, res) => {
 *     req.checkRole('admin');
 *     res.send('Access granted');
 * });
 */