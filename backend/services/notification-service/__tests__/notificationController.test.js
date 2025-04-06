// Mock express before any imports
jest.mock('express', () => {
  return {
    Router: jest.fn(() => ({
      post: jest.fn(),
      get: jest.fn(),
      put: jest.fn(),
      use: jest.fn()
    })),
    json: jest.fn(),
    urlencoded: jest.fn()
  };
});

// Mock body-parser
jest.mock('body-parser', () => ({
  json: jest.fn(),
  urlencoded: jest.fn()
}));

const axios = require('axios');
const { 
  sendNotification, 
  getNotifications, 
  getPriorityNotifications, 
  updateNotificationPreferences 
} = require('../controllers/notificationController');
const Notification = require('../models/notificationModel');
const NotificationPreferences = require('../models/notificationPreferencesModel');
const { createCircuitBreaker } = require('../shared/circuitBreaker');

// Mock other dependencies
jest.mock('axios');
jest.mock('../models/notificationModel');
jest.mock('../models/notificationPreferencesModel');
jest.mock('../shared/circuitBreaker');
jest.mock('express-validator', () => {
  const originalModule = jest.requireActual('express-validator');
  return {
    ...originalModule,
    body: jest.fn(() => ({
      isString: jest.fn(() => ({
        notEmpty: jest.fn(() => ({
          withMessage: jest.fn(() => true)
        }))
      })),
      optional: jest.fn(() => ({
        isBoolean: jest.fn(() => ({
          withMessage: jest.fn(() => true)
        }))
      }))
    })),
    param: jest.fn(() => ({
      isString: jest.fn(() => ({
        notEmpty: jest.fn(() => ({
          withMessage: jest.fn(() => true)
        }))
      }))
    })),
    validationResult: jest.fn(() => ({
      isEmpty: jest.fn(() => true),
      array: jest.fn(() => [])
    }))
  };
});

describe('Notification Controller', () => {
  let mockReq, mockRes, mockNext;

  beforeEach(() => {
    mockReq = {
      body: {},
      params: {},
      user: { id: 'user123', role: 'regular' },
      app: {
        get: jest.fn().mockReturnValue({
          fire: jest.fn()
        })
      }
    };
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    mockNext = jest.fn();

    // Reset all mocks
    jest.clearAllMocks();
  });

  describe('sendNotification', () => {
    it('should send a notification successfully', async () => {
      // Setup
      mockReq.body = {
        userId: 'user123',
        type: 'info',
        message: 'Test notification'
      };

      const mockSavedNotification = {
        _id: 'notification123',
        userId: 'user123',
        type: 'info',
        message: 'Test notification'
      };

      // Mock Notification save
      Notification.prototype.save.mockResolvedValue(mockSavedNotification);

      // Execute
      await sendNotification(mockReq, mockRes, mockNext);

      // Assertions
      expect(mockReq.app.get).toHaveBeenCalledWith('notificationDispatcher');
      expect(mockReq.app.get().fire).toHaveBeenCalledWith({
        userId: 'user123',
        type: 'info',
        message: 'Test notification'
      });
      expect(mockRes.status).toHaveBeenCalledWith(201);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: 'Notification sent successfully',
        notification: mockSavedNotification
      });
    });

    it('should handle validation errors', async () => {
      // Setup
      const mockValidationResult = {
        isEmpty: () => false,
        array: () => [{ msg: 'Invalid input' }]
      };
      require('express-validator').validationResult.mockReturnValue(mockValidationResult);

      // Execute
      await sendNotification(mockReq, mockRes, mockNext);

      // Assertions
      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith({
        errors: [{ msg: 'Invalid input' }]
      });
    });

    it('should handle circuit breaker errors', async () => {
      // Setup
      mockReq.body = {
        userId: 'user123',
        type: 'info',
        message: 'Test notification'
      };

      // Mock validation result to pass
      const mockValidationResult = {
        isEmpty: () => true,
        array: jest.fn()
      };
      require('express-validator').validationResult.mockReturnValue(mockValidationResult);

      // Mock circuit breaker error
      const circuitBreakerError = new Error('Service unavailable');
      circuitBreakerError.type = 'circuit-breaker';
      mockReq.app.get().fire.mockRejectedValue(circuitBreakerError);

      // Execute
      await sendNotification(mockReq, mockRes, mockNext);

      // Assertions
      expect(mockRes.status).toHaveBeenCalledWith(503);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: 'Notification service temporarily unavailable',
        error: 'Service unavailable'
      });
    });
  });

  describe('getNotifications', () => {
    it('should fetch user notifications successfully', async () => {
      // Setup
      mockReq.params.userId = 'user123';

      const mockNotifications = [
        { _id: 'notif1', userId: 'user123', message: 'Notification 1' },
        { _id: 'notif2', userId: 'user123', message: 'Notification 2' }
      ];

      // Mock validation result to pass
      const mockValidationResult = {
        isEmpty: () => true,
        array: jest.fn()
      };
      require('express-validator').validationResult.mockReturnValue(mockValidationResult);

      // Mock circuit breaker
      const mockCircuitBreaker = {
        fire: jest.fn().mockResolvedValue(mockNotifications)
      };
      createCircuitBreaker.mockReturnValue(mockCircuitBreaker);

      // Mock Notification find
      Notification.find.mockResolvedValue(mockNotifications);

      // Execute
      await getNotifications(mockReq, mockRes, mockNext);

      // Assertions
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith(mockNotifications);
    });

    it('should handle validation errors', async () => {
      // Setup
      const mockValidationResult = {
        isEmpty: () => false,
        array: () => [{ msg: 'Invalid input' }]
      };
      require('express-validator').validationResult.mockReturnValue(mockValidationResult);

      // Execute
      await getNotifications(mockReq, mockRes, mockNext);

      // Assertions
      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith({
        errors: [{ msg: 'Invalid input' }]
      });
    });

    it('should handle circuit breaker errors', async () => {
      // Setup
      mockReq.params.userId = 'user123';

      // Mock validation result to pass
      const mockValidationResult = {
        isEmpty: () => true,
        array: jest.fn()
      };
      require('express-validator').validationResult.mockReturnValue(mockValidationResult);

      // Mock circuit breaker error
      const circuitBreakerError = new Error('Service unavailable');
      circuitBreakerError.type = 'circuit-breaker';
      const mockCircuitBreaker = {
        fire: jest.fn().mockRejectedValue(circuitBreakerError)
      };
      createCircuitBreaker.mockReturnValue(mockCircuitBreaker);

      // Execute
      await getNotifications(mockReq, mockRes, mockNext);

      // Assertions
      expect(mockRes.status).toHaveBeenCalledWith(503);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: 'Unable to fetch notifications at this time',
        error: 'Service unavailable'
      });
    });
  });

  describe('getPriorityNotifications', () => {
    it('should fetch priority notifications successfully', async () => {
      // Setup
      const mockPriorityNotifications = [
        { _id: 'notif1', type: 'priority', message: 'High Priority 1' },
        { _id: 'notif2', type: 'priority', message: 'High Priority 2' }
      ];

      // Mock Notification find
      Notification.find.mockResolvedValue(mockPriorityNotifications);

      // Execute
      await getPriorityNotifications(mockReq, mockRes, mockNext);

      // Assertions
      expect(Notification.find).toHaveBeenCalledWith({ type: 'priority' });
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith(mockPriorityNotifications);
    });

    it('should handle errors when fetching priority notifications', async () => {
      // Setup
      const mockError = new Error('Database error');
      Notification.find.mockRejectedValue(mockError);

      // Execute
      await getPriorityNotifications(mockReq, mockRes, mockNext);

      // Assertions
      expect(mockNext).toHaveBeenCalledWith(mockError);
    });
  });

  describe('updateNotificationPreferences', () => {
    it('should update notification preferences successfully', async () => {
      // Setup
      mockReq.body = {
        email_enabled: true,
        sms_enabled: false,
        in_app_enabled: true
      };

      const mockUpdatedPreferences = {
        user_id: 'user123',
        email_enabled: true,
        sms_enabled: false,
        in_app_enabled: true
      };

      // Mock NotificationPreferences update
      NotificationPreferences.findOneAndUpdate.mockResolvedValue(mockUpdatedPreferences);

      // Execute
      await updateNotificationPreferences(mockReq, mockRes, mockNext);

      // Assertions
      expect(NotificationPreferences.findOneAndUpdate).toHaveBeenCalledWith(
        { user_id: 'user123' },
        { 
          email_enabled: true, 
          sms_enabled: false, 
          in_app_enabled: true 
        },
        { new: true, upsert: true }
      );
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: 'Preferences updated successfully',
        preferences: mockUpdatedPreferences
      });
    });

    it('should handle errors when updating preferences', async () => {
      // Setup
      mockReq.body = {
        email_enabled: true,
        sms_enabled: false,
        in_app_enabled: true
      };

      const mockError = new Error('Update failed');
      NotificationPreferences.findOneAndUpdate.mockRejectedValue(mockError);

      // Execute
      await updateNotificationPreferences(mockReq, mockRes, mockNext);

      // Assertions
      expect(mockNext).toHaveBeenCalledWith(mockError);
    });
  });
});