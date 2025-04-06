const adminController = require('../controllers/adminController');

// Set up mocks
jest.mock('mongoose', () => ({
  Schema: jest.fn(() => ({})),
  model: jest.fn(() => ({}))
}));
jest.mock('../models/userModel', () => ({
  find: jest.fn()
}));
jest.mock('../models/adminAuditLogModel', () => ({
  create: jest.fn()
}));

const User = require('../models/userModel');
const AdminAuditLog = require('../models/adminAuditLogModel');

describe('Admin Controller', () => {
  let mockReq, mockRes, mockNext;

  beforeEach(() => {
    mockReq = {
      query: {},
      body: {},
      user: { id: 'admin123' }
    };
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    mockNext = jest.fn();
  });

  describe('listUsers', () => {
    it('should list users with filters', async () => {
      mockReq.query = { role: 'user' };
      const mockUsers = [{ id: 'user1', role: 'user' }];
      User.find.mockResolvedValue(mockUsers);

      await adminController.listUsers(mockReq, mockRes, mockNext);

      expect(User.find).toHaveBeenCalledWith({ role: 'user' });
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({ users: mockUsers });
    });

    it('should handle errors', async () => {
      const mockError = new Error('Database error');
      User.find.mockRejectedValue(mockError);

      await adminController.listUsers(mockReq, mockRes, mockNext);

      expect(mockNext).toHaveBeenCalledWith(mockError);
    });
  });

  describe('logAdminAction', () => {
    it('should log admin actions', async () => {
      mockReq.body = { 
        action: 'USER_DELETED', 
        details: 'Deleted user user123' 
      };
      const mockLog = { id: 'log123' };
      AdminAuditLog.create.mockResolvedValue(mockLog);

      await adminController.logAdminAction(mockReq, mockRes, mockNext);

      expect(AdminAuditLog.create).toHaveBeenCalledWith({
        adminId: 'admin123',
        action: 'USER_DELETED',
        details: 'Deleted user user123',
        timestamp: expect.any(Date)
      });
      expect(mockRes.status).toHaveBeenCalledWith(201);
    });

    it('should handle logging errors', async () => {
      const mockError = new Error('Logging failed');
      AdminAuditLog.create.mockRejectedValue(mockError);
      mockReq.body = { action: 'TEST', details: 'test' };

      await adminController.logAdminAction(mockReq, mockRes, mockNext);

      expect(mockNext).toHaveBeenCalledWith(mockError);
    });
  });
});