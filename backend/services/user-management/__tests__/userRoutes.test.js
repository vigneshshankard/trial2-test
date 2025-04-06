const express = require('express');
const request = require('supertest');
const mongoose = require('mongoose');
const userRoutes = require('../routes/userRoutes');
const AuthMiddleware = require('../../../shared/authMiddleware');
const { register, login, getProfile, getUserById, updateUserRole, deleteUser, resetPassword, verifyEmail } = require('../controllers/userController');

// Mock dependencies
jest.mock('../../../shared/authMiddleware', () => 
  jest.fn((req, res, next) => {
    req.user = { 
      id: 'user123', 
      role: 'super_admin' 
    };
    next();
  })
);

jest.mock('../controllers/userController', () => ({
  register: jest.fn(),
  login: jest.fn(),
  getProfile: jest.fn(),
  getUserById: jest.fn(),
  updateUserRole: jest.fn(),
  deleteUser: jest.fn(),
  resetPassword: jest.fn(),
  verifyEmail: jest.fn()
}));

describe('User Routes', () => {
  let app;

  beforeEach(() => {
    app = express();
    app.use(express.json());
    app.use('/users', userRoutes);
  });

  describe('POST /users/register', () => {
    it('should call register controller method', async () => {
      const mockUser = {
        username: 'testuser',
        email: 'test@example.com',
        password: 'password123'
      };

      register.mockImplementation((req, res) => {
        res.status(201).json({ status: 'success', data: { userId: 'user123' } });
      });

      const response = await request(app)
        .post('/users/register')
        .send(mockUser);

      expect(register).toHaveBeenCalled();
      expect(response.status).toBe(201);
      expect(response.body).toEqual({ status: 'success', data: { userId: 'user123' } });
    });
  });

  describe('POST /users/login', () => {
    it('should call login controller method', async () => {
      const mockCredentials = {
        email: 'test@example.com',
        password: 'password123'
      };

      login.mockImplementation((req, res) => {
        res.status(200).json({ 
          status: 'success', 
          data: { 
            token: 'mocktoken', 
            userId: 'user123' 
          } 
        });
      });

      const response = await request(app)
        .post('/users/login')
        .send(mockCredentials);

      expect(login).toHaveBeenCalled();
      expect(response.status).toBe(200);
      expect(response.body).toEqual({ 
        status: 'success', 
        data: { 
          token: 'mocktoken', 
          userId: 'user123' 
        } 
      });
    });
  });

  describe('GET /users/profile', () => {
    it('should call getProfile controller method', async () => {
      getProfile.mockImplementation((req, res) => {
        res.status(200).json({ 
          status: 'success', 
          data: { 
            _id: 'user123', 
            username: 'testuser' 
          } 
        });
      });

      const response = await request(app)
        .get('/users/profile')
        .set('Authorization', 'Bearer mocktoken');

      expect(getProfile).toHaveBeenCalled();
      expect(response.status).toBe(200);
      expect(response.body).toEqual({ 
        status: 'success', 
        data: { 
          _id: 'user123', 
          username: 'testuser' 
        } 
      });
    });
  });

  describe('GET /users/:id', () => {
    it('should call getUserById controller method', async () => {
      getUserById.mockImplementation((req, res) => {
        res.status(200).json({ 
          _id: 'user123', 
          username: 'testuser' 
        });
      });

      const response = await request(app)
        .get('/users/user123')
        .set('Authorization', 'Bearer mocktoken');

      expect(getUserById).toHaveBeenCalled();
      expect(response.status).toBe(200);
      expect(response.body).toEqual({ 
        _id: 'user123', 
        username: 'testuser' 
      });
    });
  });

  describe('PUT /users/:id/role', () => {
    it('should call updateUserRole controller method', async () => {
      updateUserRole.mockImplementation((req, res) => {
        res.status(200).json({ 
          message: 'Role updated successfully',
          user: { 
            _id: 'user123', 
            role: 'admin' 
          } 
        });
      });

      const response = await request(app)
        .put('/users/user123/role')
        .send({ role: 'admin' })
        .set('Authorization', 'Bearer mocktoken');

      expect(updateUserRole).toHaveBeenCalled();
      expect(response.status).toBe(200);
      expect(response.body).toEqual({ 
        message: 'Role updated successfully',
        user: { 
          _id: 'user123', 
          role: 'admin' 
        } 
      });
    });
  });

  describe('DELETE /users/:id', () => {
    it('should call deleteUser controller method', async () => {
      deleteUser.mockImplementation((req, res) => {
        res.status(200).json({ 
          message: 'User data anonymized successfully' 
        });
      });

      const response = await request(app)
        .delete('/users/user123')
        .set('Authorization', 'Bearer mocktoken');

      expect(deleteUser).toHaveBeenCalled();
      expect(response.status).toBe(200);
      expect(response.body).toEqual({ 
        message: 'User data anonymized successfully' 
      });
    });
  });

  describe('POST /users/reset-password', () => {
    it('should call resetPassword controller method', async () => {
      resetPassword.mockImplementation((req, res) => {
        res.status(200).json({ 
          message: 'Password reset email sent' 
        });
      });

      const response = await request(app)
        .post('/users/reset-password')
        .send({ email: 'test@example.com' });

      expect(resetPassword).toHaveBeenCalled();
      expect(response.status).toBe(200);
      expect(response.body).toEqual({ 
        message: 'Password reset email sent' 
      });
    });
  });

  describe('GET /users/verify-email/:token', () => {
    it('should call verifyEmail controller method', async () => {
      verifyEmail.mockImplementation((req, res) => {
        res.status(200).json({ 
          message: 'Email verified successfully' 
        });
      });

      const response = await request(app)
        .get('/users/verify-email/verifytoken');

      expect(verifyEmail).toHaveBeenCalled();
      expect(response.status).toBe(200);
      expect(response.body).toEqual({ 
        message: 'Email verified successfully' 
      });
    });
  });
});