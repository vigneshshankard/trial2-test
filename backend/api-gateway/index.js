/**
 * # API Gateway Documentation
 *
 * ## Overview
 * The API Gateway serves as the central entry point for all microservices. It routes requests to the appropriate service and handles cross-cutting concerns like authentication, rate-limiting, and logging.
 *
 * ## Key Features
 * - **Authentication**: Validates JWT tokens for secure access.
 * - **Rate Limiting**: Prevents abuse by limiting the number of requests per IP.
 * - **Service Routing**: Routes requests to the appropriate microservice based on the endpoint.
 *
 * ## Example Routes
 * - `/user-management/*` → User Management Service
 * - `/content-management/*` → Content Management Service
 * - `/exam-management/*` → Exam Management Service
 * - `/billing-service/*` → Billing Service
 * - `/social-interaction/*` → Social Interaction Service
 * - `/current-affairs-service/*` → Current Affairs Service
 * - `/analytics-service/*` → Analytics Service
 * - `/admin-dashboard-service/*` → Admin Dashboard Service
 */

require('dotenv').config();

const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const axios = require('axios');
const jwt = require('jsonwebtoken');
const Consul = require('consul');
const rateLimit = require('express-rate-limit');
const winston = require('winston');
const http = require('http');
const { Server } = require('socket.io');
const xss = require('xss-clean');
const expressSanitizer = require('express-sanitizer');
const session = require('express-session');
const createCircuitBreaker = require('../shared/circuitBreaker');
const healthcheck = require('express-healthcheck');
const authMiddleware = require('../shared/authMiddleware');
const helmet = require('helmet');
const morgan = require('morgan');
const app = express();
const PORT = process.env.PORT || 3000;

// Configure Winston logger
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'api-gateway.log' })
  ]
});

// Initialize Consul client
const consul = new Consul();

// Register API Gateway with Consul
consul.agent.service.register({
  name: process.env.SERVICE_NAME || 'api-gateway',
  address: process.env.SERVICE_ADDRESS || 'localhost',
  port: PORT,
}, (err) => {
  if (err) {
    logger.error({
      message: 'Error registering API Gateway with Consul',
      error: err.message,
      stack: err.stack
    });
    console.error('Error registering API Gateway with Consul:', err);
  } else {
    logger.info({ message: 'API Gateway registered with Consul' });
    console.log('API Gateway registered with Consul');
  }
});

// Function to discover services
const discoverService = (serviceName) => {
  return new Promise((resolve, reject) => {
    consul.catalog.service.nodes(serviceName, (err, result) => {
      if (err) {
        logger.error({
          message: `Error discovering service ${serviceName}`,
          error: err.message,
          stack: err.stack
        });
        return reject(err);
      }
      if (result.length === 0) {
        const error = new Error(`Service ${serviceName} not found`);
        logger.error({
          message: `Service discovery failed for ${serviceName}`,
          error: error.message
        });
        return reject(error);
      }
      resolve(result[0].ServiceAddress + ':' + result[0].ServicePort);
    });
  });
};

// Middleware for parsing JSON
app.use(express.json());

// Enforce HTTPS
app.use((req, res, next) => {
  if (req.headers['x-forwarded-proto'] !== 'https' && process.env.NODE_ENV === 'production') {
    return res.redirect(`https://${req.headers.host}${req.url}`);
  }
  next();
});

// Middleware to sanitize inputs and protect against XSS
app.use(xss());

// Middleware to protect against SQL injection
app.use(expressSanitizer());

// Middleware for session management
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Set to true if using HTTPS
}));

// Middleware for security headers
app.use(helmet());

// Middleware for logging requests
app.use((req, res, next) => {
  logger.info({
    message: 'Incoming request',
    method: req.method,
    url: req.originalUrl,
    headers: req.headers
  });
  next();
});

// Middleware for rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
});
app.use(limiter);

// Middleware for logging
app.use(morgan('combined'));

// Use environment variable for JWT secret
const JWT_SECRET = process.env.JWT_SECRET || 'default_jwt_secret';

// Enhance JWT middleware for centralized authentication and RBAC
app.use((req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized: No token provided' });
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      logger.error({
        message: 'Unauthorized: Invalid token',
        error: err.message,
        stack: err.stack
      });
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
});

// Apply authentication middleware to all routes
app.use(authMiddleware());

// Centralized routing configuration
const routesConfig = [
  { path: '/api/users', serviceName: 'user-management' },
  { path: '/api/content', serviceName: 'content-management' },
  { path: '/api/exams', serviceName: 'exam-management' },
  { path: '/api/notifications', serviceName: 'notification-service' },
  { path: '/api/social', serviceName: 'social-interaction' },
  { path: '/api/study-planner', serviceName: 'ai-study-planner' },
];

// Health check endpoint
app.use('/health', healthcheck({
  healthy: () => {
    return { uptime: process.uptime(), message: 'API Gateway is healthy' };
  }
}));

// Enhance service discovery with health checks
const checkServiceHealth = async (serviceAddress) => {
  try {
    const response = await axios.get(`http://${serviceAddress}/health`);
    return response.data.healthy;
  } catch (error) {
    logger.error({
      message: `Health check failed for service at ${serviceAddress}`,
      error: error.message
    });
    return false;
  }
};

// Middleware for forwarding requests dynamically with circuit breaker
routesConfig.forEach(({ path, serviceName }) => {
  app.use(path, async (req, res) => {
    try {
      const serviceAddress = await discoverService(serviceName);
      
      // Check service health before proceeding
      const isHealthy = await checkServiceHealth(serviceAddress);
      if (!isHealthy) {
        throw new Error(`Service ${serviceName} is unhealthy`);
      }

      const makeRequest = async () => {
        const url = `http://${serviceAddress}${req.originalUrl}`;
        const response = await axios({
          method: req.method,
          url,
          data: req.body,
          headers: req.headers
        });
        return response.data;
      };

      // Create circuit breaker for the service
      const breaker = createCircuitBreaker(makeRequest, {
        fallback: () => ({ error: `${serviceName} is currently unavailable` })
      });

      const result = await breaker.fire();
      res.status(200).json(result);
    } catch (error) {
      logger.error({
        message: `Error processing request for ${serviceName}`,
        error: error.message,
        stack: error.stack
      });
      res.status(503).json({ message: `Service ${serviceName} is unavailable`, error: error.message });
    }
  });
});

// Example usage of service discovery
app.use('/api/example', async (req, res) => {
  try {
    const serviceAddress = await discoverService('example-service');
    const url = `http://${serviceAddress}${req.originalUrl}`;
    axios({ method: req.method, url, data: req.body })
      .then(response => res.status(response.status).json(response.data))
      .catch(error => {
        logger.error({
          message: 'Error forwarding request to example-service',
          error: error.message,
          stack: error.stack
        });
        res.status(error.response?.status || 500).json(error.response?.data || { message: 'Error forwarding request' });
      });
  } catch (error) {
    logger.error({
      message: 'Service discovery failed for example-service',
      error: error.message
    });
    res.status(500).json({ message: 'Service discovery failed', error: error.message });
  }
});

// Add a route for serving the homepage
app.get('/homepage', (req, res) => {
  if (req.session && req.session.user) {
    // Serve logged-in homepage
    res.json({
      message: 'Welcome to your personalized homepage!',
      user: req.session.user
    });
  } else {
    // Serve general homepage
    res.json({
      message: 'Welcome to the general homepage! Please log in for a personalized experience.'
    });
  }
});

// Example route for forwarding requests (to be expanded)
app.get('/', (req, res) => {
  res.send('API Gateway is running');
});

// Update error handling to log errors
app.use((err, req, res, next) => {
  logger.error({
    message: 'Error occurred',
    error: err.message,
    stack: err.stack
  });
  res.status(500).json({ message: 'Internal Server Error' });
});

// Create HTTP server and initialize Socket.IO
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*', // Allow all origins for now (update in production)
    methods: ['GET', 'POST']
  }
});

// Handle Socket.IO connections
io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  // Example event listener
  socket.on('example-event', (data) => {
    console.log('Received example-event with data:', data);
    socket.emit('example-response', { message: 'Acknowledged' });
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('A user disconnected:', socket.id);
  });
});

// Update server start to use HTTP server
server.listen(PORT, () => {
  logger.info({ message: `API Gateway is running on port ${PORT}` });
  console.log(`API Gateway is running on port ${PORT}`);
});