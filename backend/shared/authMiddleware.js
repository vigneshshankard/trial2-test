const jwt = require('jsonwebtoken');
const helmet = require('helmet');
const redisClient = require('./redisClient');
const { AppError } = require('./errorUtils');

module.exports = (app = null, requiredRoles = []) => {
    // Add helmet for enhanced security if app is provided
    if (app) {
        app.use(helmet());
    }

    return (req, res, next) => {
        const token = req.headers['authorization']?.split(' ')[1];
        if (!token) {
            throw new AppError('Unauthorized: No token provided', 401, {
                status: 'fail',
                message: 'Authentication failed'
            });
        }

        const JWT_SECRET = process.env.JWT_SECRET || 'default_jwt_secret';

        jwt.verify(token, JWT_SECRET, async (err, decoded) => {
            if (err) {
                throw new AppError('Unauthorized: Invalid token', 401, {
                    status: 'fail',
                    message: 'Invalid credentials'
                });
            }

            const isRevoked = await redisClient.get(`revoked_token:${token}`);
            if (isRevoked) {
                throw new AppError('Token has been revoked', 401, {
                    status: 'fail',
                    message: 'Session expired'
                });
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