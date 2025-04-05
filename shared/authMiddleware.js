const jwt = require('jsonwebtoken');
const helmet = require('helmet');
const redisClient = require('./redisClient');

module.exports = (app, requiredRoles = []) => {
    // Add helmet for enhanced security
    app.use(helmet());

    return (req, res, next) => {
        const token = req.headers['authorization']?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized: No token provided' });
        }

        const JWT_SECRET = process.env.JWT_SECRET || 'default_jwt_secret';

        jwt.verify(token, JWT_SECRET, async (err, decoded) => {
            if (err) {
                return res.status(401).json({ message: 'Unauthorized: Invalid token' });
            }

            const isRevoked = await redisClient.get(`revoked_token:${token}`);
            if (isRevoked) {
                return res.status(401).json({ message: 'Token has been revoked' });
            }

            req.user = decoded;

            if (requiredRoles.length > 0 && !requiredRoles.some(role => req.user.roles.includes(role))) {
                return res.status(403).json({ message: 'Forbidden: Insufficient permissions' });
            }

            next();
        });
    };
};

/**
 * Middleware Usage:
 * - Validates JWT tokens from the `Authorization` header.
 * - Extracts `roles` for role-based access control.
 * - Allows specifying required roles for securing endpoints.
 *
 * Example:
 * router.get('/example', authMiddleware(app, ['admin']), (req, res) => {
 *     res.send('Access granted');
 * });
 */