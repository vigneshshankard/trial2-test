const mongoose = require('mongoose');
const { register, login, getProfile, getUserById, updateUserRole, deleteUser, resetPassword, verifyEmail } = require('../controllers/userController');
const User = require('../models/userModel');
const AuthService = require('../../../shared/authService');
const { AppError } = require('../../../shared/errorUtils');

// Mock dependencies
jest.mock('../models/userModel');
jest.mock('../../../shared/authService');
jest.mock('../../../shared/errorUtils');
jest.mock('mongoose', () => ({
  Types: {
    ObjectId: {
      isValid: jest.fn()
    }
  }
}));

describe('User Management Controller', () => {
  let mockReq, mockRes, mockNext;

  beforeEach(() => {
    mockReq = {
      body: {},
      params: {},
      user: { 
        id: 'user123', 
        role: 'super_admin' 
      }
    };
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    mockNext = jest.fn();

    // Reset mocks
    User.findById.mockReset();
    User.findOne.mockReset();
    User.findByIdAndUpdate.mockReset();
    mongoose.Types.ObjectId.isValid.mockReset();
    mockRes.status.mockClear();
    mockRes.json.mockClear();
  });

  describe('User Registration', () => {
    it('should successfully register a new user', async () => {
      mockReq.body = {
        username: 'testuser',
        email: 'test@example.com',
        password: 'password123'
      };

      User.findOne.mockResolvedValue(null);
      AuthService.hashPassword.mockResolvedValue('hashedpassword');
      User.create.mockResolvedValue({ _id: 'user123' });

      await register(mockReq, mockRes, mockNext);

      expect(User.findOne).toHaveBeenCalledWith({ email: 'test@example.com' });
      expect(AuthService.hashPassword).toHaveBeenCalledWith('password123');
      expect(User.create).toHaveBeenCalledWith({
        username: 'testuser',
        email: 'test@example.com',
        password: 'hashedpassword'
      });
      expect(mockRes.status).toHaveBeenCalledWith(201);
      expect(mockRes.json).toHaveBeenCalledWith({
        status: 'success',
        data: { userId: 'user123' }
      });
    });

    it('should prevent registration of existing user', async () => {
      mockReq.body = {
        username: 'testuser',
        email: 'test@example.com',
        password: 'password123'
      };

      User.findOne.mockResolvedValue({ email: 'test@example.com' });

      await register(mockReq, mockRes, mockNext);

      expect(mockNext).toHaveBeenCalledWith(expect.any(AppError));
    });
  });

  describe('User Login', () => {
    it('should successfully login a user', async () => {
      mockReq.body = {
        email: 'test@example.com',
        password: 'password123'
      };

      const mockUser = { 
        _id: 'user123', 
        password: 'hashedpassword' 
      };

      User.findOne.mockResolvedValue(mockUser);
      AuthService.comparePasswords.mockResolvedValue(true);
      AuthService.generateToken.mockReturnValue('mocktoken');

      await login(mockReq, mockRes, mockNext);

      expect(User.findOne).toHaveBeenCalledWith({ email: 'test@example.com' });
      expect(AuthService.comparePasswords).toHaveBeenCalledWith('password123', 'hashedpassword');
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({
        status: 'success',
        data: { 
          token: 'mocktoken', 
          userId: 'user123' 
        }
      });
    });

    it('should reject login with invalid credentials', async () => {
      mockReq.body = {
        email: 'test@example.com',
        password: 'wrongpassword'
      };

      User.findOne.mockResolvedValue(null);

      await login(mockReq, mockRes, mockNext);

      expect(mockNext).toHaveBeenCalledWith(expect.any(AppError));
    });
  });

  describe('User Profile', () => {
    it('should retrieve user profile', async () => {
      mongoose.Types.ObjectId.isValid.mockReturnValue(true);
      
      const mockUser = { 
        _id: 'user123', 
        username: 'testuser', 
        email: 'test@example.com' 
      };

      const mockChain = {
        select: jest.fn().mockReturnThis(),
        lean: jest.fn().mockResolvedValue(mockUser)
      };
      User.findById.mockReturnValue(mockChain);

      await getProfile(mockReq, mockRes, mockNext);

      expect(mongoose.Types.ObjectId.isValid).toHaveBeenCalledWith('user123');
      expect(User.findById).toHaveBeenCalledWith('user123');
      expect(mockChain.select).toHaveBeenCalledWith('-password');
      expect(mockChain.lean).toHaveBeenCalled();
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({
        status: 'success',
        data: mockUser
      });
    });

    it('should throw error for invalid user ID', async () => {
      mongoose.Types.ObjectId.isValid.mockReturnValue(false);

      await getProfile(mockReq, mockRes, mockNext);

      expect(mockNext).toHaveBeenCalledWith(expect.any(AppError));
    });

    it('should throw error when user not found', async () => {
      mongoose.Types.ObjectId.isValid.mockReturnValue(true);
      
      const mockChain = {
        select: jest.fn().mockReturnThis(),
        lean: jest.fn().mockResolvedValue(null)
      };
      User.findById.mockReturnValue(mockChain);

      await getProfile(mockReq, mockRes, mockNext);

      expect(mockNext).toHaveBeenCalledWith(expect.any(AppError));
    });
  });

  describe('Get User By ID', () => {
    it('should retrieve user by ID for super admin', async () => {
      mockReq.params = { id: 'user123' };

      const mockUser = { 
        _id: 'user123', 
        username: 'testuser'
      };

      User.findById.mockReturnValue({
        select: jest.fn().mockResolvedValue(mockUser)
      });

      await getUserById(mockReq, mockRes, mockNext);

      expect(User.findById).toHaveBeenCalledWith('user123');
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith(mockUser);
    });

    it('should prevent access for non-super admin with different user ID', async () => {
      mockReq.user.role = 'regular';
      mockReq.user.id = 'user456';
      mockReq.params = { id: 'user123' };

      await getUserById(mockReq, mockRes, mockNext);

      expect(mockRes.status).toHaveBeenCalledWith(403);
      expect(mockRes.json).toHaveBeenCalledWith({ message: 'Access denied' });
    });

    it('should allow access when requesting own user ID', async () => {
      mockReq.user.role = 'regular';
      mockReq.user.id = 'user123';
      mockReq.params = { id: 'user123' };

      const mockUser = { 
        _id: 'user123', 
        username: 'testuser'
      };

      User.findById.mockReturnValue({
        select: jest.fn().mockResolvedValue(mockUser)
      });

      await getUserById(mockReq, mockRes, mockNext);

      expect(User.findById).toHaveBeenCalledWith('user123');
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith(mockUser);
    });

    it('should return 404 when user is not found', async () => {
      mockReq.params = { id: 'user123' };

      User.findById.mockReturnValue({
        select: jest.fn().mockResolvedValue(null)
      });

      await getUserById(mockReq, mockRes, mockNext);

      expect(User.findById).toHaveBeenCalledWith('user123');
      expect(mockRes.status).toHaveBeenCalledWith(404);
      expect(mockRes.json).toHaveBeenCalledWith({ message: 'User not found' });
    });
  });

  describe('Role Management', () => {
    it('should update user role for super admin', async () => {
      mockReq.params = { id: 'user123' };
      mockReq.body = { role: 'admin' };

      const mockUpdatedUser = { 
        _id: 'user123', 
        role: 'admin' 
      };

      User.findByIdAndUpdate.mockResolvedValue(mockUpdatedUser);

      await updateUserRole(mockReq, mockRes, mockNext);

      expect(User.findByIdAndUpdate).toHaveBeenCalledWith('user123', { role: 'admin' }, { new: true });
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: 'Role updated successfully',
        user: mockUpdatedUser
      });
    });

    it('should prevent role update for non-super admin', async () => {
      mockReq.user.role = 'regular';
      mockReq.params = { id: 'user123' };
      mockReq.body = { role: 'admin' };

      await updateUserRole(mockReq, mockRes, mockNext);

      expect(mockRes.status).toHaveBeenCalledWith(403);
      expect(mockRes.json).toHaveBeenCalledWith({ message: 'Access denied' });
    });
  });

  describe('User Deletion', () => {
    it('should anonymize user data for self or super admin', async () => {
      mockReq.params = { id: 'user123' };

      User.findByIdAndUpdate.mockResolvedValue({});

      await deleteUser(mockReq, mockRes, mockNext);

      expect(User.findByIdAndUpdate).toHaveBeenCalledWith('user123', {
        email: null, 
        name: 'Deleted User', 
        isDeleted: true
      });
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({ 
        message: 'User data anonymized successfully' 
      });
    });

    it('should prevent user deletion without proper authorization', async () => {
      mockReq.user.role = 'regular';
      mockReq.user.id = 'user456';
      mockReq.params = { id: 'user123' };

      await deleteUser(mockReq, mockRes, mockNext);

      expect(mockRes.status).toHaveBeenCalledWith(403);
      expect(mockRes.json).toHaveBeenCalledWith({ message: 'Access denied' });
    });
  });

  describe('Authentication Routes', () => {
    it('should handle password reset request', async () => {
      mockReq.body = { email: 'test@example.com' };

      const mockUser = { 
        email: 'test@example.com',
        resetToken: undefined,
        resetTokenExpiry: undefined,
        save: jest.fn()
      };

      User.findOne.mockResolvedValue(mockUser);

      // Mock global functions
      global.generateResetToken = jest.fn().mockReturnValue('resettoken');
      global.EmailService = { sendResetEmail: jest.fn() };

      await resetPassword(mockReq, mockRes, mockNext);

      expect(User.findOne).toHaveBeenCalledWith({ email: 'test@example.com' });
      expect(mockUser.resetToken).toBe('resettoken');
      expect(mockUser.resetTokenExpiry).toBeDefined();
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({ message: 'Password reset email sent' });
    });

    it('should handle email verification', async () => {
      mockReq.params = { token: 'verifytoken' };

      const mockUser = { 
        emailVerificationToken: 'verifytoken',
        isEmailVerified: false,
        save: jest.fn()
      };

      User.findOne.mockResolvedValue(mockUser);

      await verifyEmail(mockReq, mockRes, mockNext);

      expect(User.findOne).toHaveBeenCalledWith({ emailVerificationToken: 'verifytoken' });
      expect(mockUser.isEmailVerified).toBe(true);
      expect(mockUser.emailVerificationToken).toBeUndefined();
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({ message: 'Email verified successfully' });
    });
  });
});