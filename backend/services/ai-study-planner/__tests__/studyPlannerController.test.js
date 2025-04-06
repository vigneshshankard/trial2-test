const { validationResult } = require('express-validator');
const StudyPlan = require('../models/studyPlanModel');
const { 
  generatePlan, 
  getPlan, 
  updatePlan 
} = require('../controllers/studyPlannerController');
const { createCircuitBreaker } = require('../../../shared/circuitBreaker');

// Mock dependencies
jest.mock('../models/studyPlanModel');
jest.mock('express-validator', () => ({
  validationResult: jest.fn()
}));
jest.mock('../../../shared/circuitBreaker', () => ({
  createCircuitBreaker: jest.fn()
}));

describe('Study Planner Controller', () => {
  let mockReq, mockRes, mockNext;

  beforeEach(() => {
    mockReq = {
      body: {},
      params: {},
      user: { 
        id: 'user123', 
        role: 'user',
        roles: ['user']
      },
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

    // Reset mocks
    validationResult.mockReturnValue({
      isEmpty: () => true,
      array: () => []
    });
    StudyPlan.create.mockReset();
    StudyPlan.findOne.mockReset();
    StudyPlan.findOneAndUpdate.mockReset();
    createCircuitBreaker.mockReset();
  });

  describe('generatePlan', () => {
    it('should generate a study plan successfully', async () => {
      // Setup
      mockReq.body = {
        subject: 'Mathematics',
        duration: 30
      };

      const mockGeneratedPlan = {
        topics: ['Algebra', 'Geometry'],
        dailySchedule: ['Study 2 hours']
      };

      mockReq.app.get().fire.mockResolvedValue(mockGeneratedPlan);

      const mockSavedPlan = {
        _id: 'plan123',
        userId: 'user123',
        subject: 'Mathematics',
        duration: 30,
        ...mockGeneratedPlan
      };

      StudyPlan.create.mockResolvedValue(mockSavedPlan);

      // Execute
      await generatePlan(mockReq, mockRes, mockNext);

      // Assertions
      expect(mockReq.app.get().fire).toHaveBeenCalledWith(expect.objectContaining({
        userId: 'user123',
        subject: 'Mathematics',
        duration: 30
      }));
      expect(StudyPlan.create).toHaveBeenCalledWith(expect.objectContaining({
        userId: 'user123',
        subject: 'Mathematics',
        duration: 30
      }));
      expect(mockRes.status).toHaveBeenCalledWith(201);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: 'Study plan generated successfully',
        plan: mockSavedPlan
      });
    });

    it('should handle validation errors', async () => {
      // Setup
      validationResult.mockReturnValue({
        isEmpty: () => false,
        array: () => [{ msg: 'Invalid input' }]
      });

      // Execute
      await generatePlan(mockReq, mockRes, mockNext);

      // Assertions
      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith({
        errors: [{ msg: 'Invalid input' }]
      });
    });

    it('should handle circuit breaker errors', async () => {
      // Setup
      mockReq.body = {
        subject: 'Mathematics',
        duration: 30
      };

      const circuitBreakerError = new Error('AI service unavailable');
      circuitBreakerError.type = 'circuit-breaker';
      mockReq.app.get().fire.mockRejectedValue(circuitBreakerError);

      // Execute
      await generatePlan(mockReq, mockRes, mockNext);

      // Assertions
      expect(mockRes.status).toHaveBeenCalledWith(503);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: 'AI Study Planner temporarily unavailable',
        error: 'AI service unavailable'
      });
    });
  });

  describe('getPlan', () => {
    it('should retrieve a study plan successfully', async () => {
      // Setup
      mockReq.params.userId = 'user123';

      const mockPlan = {
        _id: 'plan123',
        userId: 'user123',
        subject: 'Mathematics',
        duration: 30
      };

      const mockCircuitBreaker = {
        fire: jest.fn().mockResolvedValue(mockPlan)
      };
      createCircuitBreaker.mockReturnValue(mockCircuitBreaker);

      // Execute
      await getPlan(mockReq, mockRes, mockNext);

      // Assertions
      expect(createCircuitBreaker).toHaveBeenCalledWith(
        expect.any(Function),
        expect.objectContaining({
          timeout: 3000,
          errorThresholdPercentage: 20,
          resetTimeout: 5000
        })
      );
      expect(mockCircuitBreaker.fire).toHaveBeenCalled();
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith(mockPlan);
    });

    it('should handle plan not found', async () => {
      // Setup
      mockReq.params.userId = 'user123';

      const mockCircuitBreaker = {
        fire: jest.fn().mockRejectedValue(new Error('Study plan not found'))
      };
      createCircuitBreaker.mockReturnValue(mockCircuitBreaker);

      // Execute
      await getPlan(mockReq, mockRes, mockNext);

      // Assertions
      expect(mockRes.status).toHaveBeenCalledWith(404);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: 'Study plan not found'
      });
    });
  });

  describe('updatePlan', () => {
    it('should update a study plan successfully', async () => {
      // Setup
      mockReq.params.userId = 'user123';
      mockReq.body = {
        subject: 'Advanced Mathematics',
        duration: 45
      };

      const mockUpdatedPlan = {
        _id: 'plan123',
        userId: 'user123',
        subject: 'Advanced Mathematics',
        duration: 45
      };

      const mockCircuitBreaker = {
        fire: jest.fn().mockResolvedValue(mockUpdatedPlan)
      };
      createCircuitBreaker.mockReturnValue(mockCircuitBreaker);

      // Execute
      await updatePlan(mockReq, mockRes, mockNext);

      // Assertions
      expect(createCircuitBreaker).toHaveBeenCalledWith(
        expect.any(Function),
        expect.objectContaining({
          timeout: 3000,
          errorThresholdPercentage: 20,
          resetTimeout: 5000
        })
      );
      expect(mockCircuitBreaker.fire).toHaveBeenCalled();
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: 'Study plan updated successfully',
        plan: mockUpdatedPlan
      });
    });

    it('should handle plan not found during update', async () => {
      // Setup
      mockReq.params.userId = 'user123';
      mockReq.body = {
        subject: 'Advanced Mathematics'
      };

      const mockCircuitBreaker = {
        fire: jest.fn().mockRejectedValue(new Error('Study plan not found'))
      };
      createCircuitBreaker.mockReturnValue(mockCircuitBreaker);

      // Execute
      await updatePlan(mockReq, mockRes, mockNext);

      // Assertions
      expect(mockRes.status).toHaveBeenCalledWith(404);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: 'Study plan not found'
      });
    });
  });
});