const express = require('express');
const request = require('supertest');
const adminRoutes = require('../routes/adminRoutes');
const adminController = require('../controllers/adminController');

// Mock dependencies
jest.mock('../controllers/adminController');
jest.mock('../../../shared/authMiddleware', () => ({
  requireAuth: jest.fn((req, res, next) => {
    req.user = { id: 'admin123', role: 'admin' };
    next();
  })
}));
jest.mock('mongoose', () => {
  const actualMongoose = jest.requireActual('mongoose');
  return {
    ...actualMongoose,
    Schema: jest.fn(() => ({})),
    model: jest.fn(() => ({})),
    Types: { ObjectId: jest.fn(() => 'mockedObjectId') }
  };
});

describe('Admin Routes', () => {
  let app;

  beforeEach(() => {
    app = express();
    app.use(express.json());
    app.use('/', adminRoutes);
  });

  describe('GET /users', () => {
    it('should fetch filtered users', async () => {
      const mockUsers = [{ id: 'user1', role: 'user' }];
      adminController.listUsers.mockImplementation((req, res) => {
        res.status(200).json({ users: mockUsers });
      });

      const response = await request(app)
        .get('/users?role=user')
        .set('Authorization', 'Bearer token');

      expect(response.status).toBe(200);
      expect(response.body).toEqual({ users: mockUsers });
    });
  });

  describe('POST /audit-log', () => {
    it('should log admin actions', async () => {
      adminController.logAdminAction.mockImplementation((req, res) => {
        res.status(201).json({ message: 'Logged successfully' });
      });

      const response = await request(app)
        .post('/audit-log')
        .set('Authorization', 'Bearer token')
        .send({ 
          action: 'USER_MODIFIED', 
          details: 'Changed user role' 
        });

      expect(response.status).toBe(201);
      expect(response.body.message).toBe('Logged successfully');
    });
  });
});