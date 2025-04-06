const mongoose = require('mongoose');
const CurrentAffair = require('../models/currentAffairModel');
const { 
  getCurrentAffairs, 
  getCurrentAffairById, 
  getQuizForCurrentAffair,
  createCurrentAffair,
  updateCurrentAffair,
  deleteCurrentAffair 
} = require('../controllers/currentAffairsController');

// Mock dependencies
jest.mock('../models/currentAffairModel');

describe('Current Affairs Controller', () => {
  let mockReq, mockRes, mockNext;

  beforeEach(() => {
    mockReq = {
      query: {},
      params: {},
      body: {}
    };
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    mockNext = jest.fn();

    // Reset mocks
    CurrentAffair.find.mockReset();
    CurrentAffair.findById.mockReset();
    CurrentAffair.countDocuments.mockReset();
    CurrentAffair.prototype.save.mockReset();
    CurrentAffair.findByIdAndUpdate.mockReset();
    CurrentAffair.findByIdAndDelete.mockReset();
  });

  describe('getCurrentAffairs', () => {
    it('should fetch current affairs with default pagination', async () => {
      mockReq.query = {};

      const mockCurrentAffairs = [
        { _id: 'affair1', title: 'Current Affair 1' },
        { _id: 'affair2', title: 'Current Affair 2' }
      ];

      CurrentAffair.find.mockResolvedValue(mockCurrentAffairs);
      CurrentAffair.countDocuments.mockResolvedValue(2);

      await getCurrentAffairs(mockReq, mockRes, mockNext);

      expect(CurrentAffair.find).toHaveBeenCalledWith({}, null, {
        limit: 10,
        skip: 0,
        sort: { publish_date: -1 }
      });
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({
        currentAffairs: mockCurrentAffairs,
        total: 2,
        page: 1,
        totalPages: 1
      });
    });

    it('should apply filters when provided', async () => {
      mockReq.query = {
        category: 'Politics',
        tags: 'election,policy',
        featured: 'true',
        limit: '5',
        page: '2'
      };

      const mockCurrentAffairs = [
        { _id: 'affair1', title: 'Political Affair' }
      ];

      CurrentAffair.find.mockResolvedValue(mockCurrentAffairs);
      CurrentAffair.countDocuments.mockResolvedValue(6);

      await getCurrentAffairs(mockReq, mockRes, mockNext);

      expect(CurrentAffair.find).toHaveBeenCalledWith(
        {
          category: 'Politics',
          tags: { $in: ['election', 'policy'] },
          is_featured: true
        },
        null,
        {
          limit: 5,
          skip: 5,
          sort: { publish_date: -1 }
        }
      );
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({
        currentAffairs: mockCurrentAffairs,
        total: 6,
        page: 2,
        totalPages: 2
      });
    });
  });

  describe('getCurrentAffairById', () => {
    it('should fetch a specific current affair', async () => {
      mockReq.params.id = 'affair123';

      const mockCurrentAffair = { 
        _id: 'affair123', 
        title: 'Test Current Affair' 
      };

      CurrentAffair.findById.mockResolvedValue(mockCurrentAffair);

      await getCurrentAffairById(mockReq, mockRes, mockNext);

      expect(CurrentAffair.findById).toHaveBeenCalledWith('affair123');
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith(mockCurrentAffair);
    });

    it('should handle current affair not found', async () => {
      mockReq.params.id = 'nonexistent';

      CurrentAffair.findById.mockResolvedValue(null);

      await getCurrentAffairById(mockReq, mockRes, mockNext);

      expect(mockNext).toHaveBeenCalledWith(expect.objectContaining({
        message: 'Current affair not found',
        statusCode: 404
      }));
    });
  });

  describe('getQuizForCurrentAffair', () => {
    it('should fetch quiz for a current affair', async () => {
      mockReq.params.id = 'affair123';

      const mockCurrentAffair = { 
        _id: 'affair123', 
        quiz_id: { _id: 'quiz123', title: 'Test Quiz' } 
      };

      CurrentAffair.findById.mockReturnValue({
        populate: jest.fn().mockResolvedValue(mockCurrentAffair)
      });

      await getQuizForCurrentAffair(mockReq, mockRes, mockNext);

      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({ 
        quiz: mockCurrentAffair.quiz_id 
      });
    });

    it('should handle current affair not found', async () => {
      mockReq.params.id = 'nonexistent';

      CurrentAffair.findById.mockReturnValue({
        populate: jest.fn().mockResolvedValue(null)
      });

      await getQuizForCurrentAffair(mockReq, mockRes, mockNext);

      expect(mockRes.status).toHaveBeenCalledWith(404);
      expect(mockRes.json).toHaveBeenCalledWith({ 
        message: 'Current affair not found' 
      });
    });
  });

  describe('createCurrentAffair', () => {
    it('should create a new current affair', async () => {
      mockReq.body = {
        title: 'New Current Affair',
        description: 'Detailed description',
        category: 'Politics',
        source_url: 'https://example.com/news',
        tags: ['election', 'policy'],
        is_featured: true
      };

      const mockSavedCurrentAffair = {
        _id: 'affair123',
        ...mockReq.body
      };

      CurrentAffair.prototype.save.mockResolvedValue(mockSavedCurrentAffair);

      await createCurrentAffair(mockReq, mockRes, mockNext);

      expect(mockRes.status).toHaveBeenCalledWith(201);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: 'Current affair created successfully',
        currentAffair: mockSavedCurrentAffair
      });
    });
  });

  describe('updateCurrentAffair', () => {
    it('should update an existing current affair', async () => {
      mockReq.params.id = 'affair123';
      mockReq.body = {
        title: 'Updated Current Affair',
        description: 'Updated description'
      };

      const mockUpdatedCurrentAffair = {
        _id: 'affair123',
        ...mockReq.body
      };

      CurrentAffair.findByIdAndUpdate.mockResolvedValue(mockUpdatedCurrentAffair);

      await updateCurrentAffair(mockReq, mockRes, mockNext);

      expect(CurrentAffair.findByIdAndUpdate).toHaveBeenCalledWith(
        'affair123', 
        mockReq.body, 
        { new: true, runValidators: true }
      );
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: 'Current affair updated successfully',
        currentAffair: mockUpdatedCurrentAffair
      });
    });

    it('should handle current affair not found during update', async () => {
      mockReq.params.id = 'nonexistent';
      mockReq.body = { title: 'Updated Title' };

      CurrentAffair.findByIdAndUpdate.mockResolvedValue(null);

      await updateCurrentAffair(mockReq, mockRes, mockNext);

      expect(mockNext).toHaveBeenCalledWith(expect.objectContaining({
        message: 'Current affair not found',
        statusCode: 404
      }));
    });
  });

  describe('deleteCurrentAffair', () => {
    it('should delete a current affair', async () => {
      mockReq.params.id = 'affair123';

      const mockDeletedCurrentAffair = {
        _id: 'affair123',
        title: 'Deleted Current Affair'
      };

      CurrentAffair.findByIdAndDelete.mockResolvedValue(mockDeletedCurrentAffair);

      await deleteCurrentAffair(mockReq, mockRes, mockNext);

      expect(CurrentAffair.findByIdAndDelete).toHaveBeenCalledWith('affair123');
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: 'Current affair deleted successfully',
        currentAffair: mockDeletedCurrentAffair
      });
    });

    it('should handle current affair not found during deletion', async () => {
      mockReq.params.id = 'nonexistent';

      CurrentAffair.findByIdAndDelete.mockResolvedValue(null);

      await deleteCurrentAffair(mockReq, mockRes, mockNext);

      expect(mockNext).toHaveBeenCalledWith(expect.objectContaining({
        message: 'Current affair not found',
        statusCode: 404
      }));
    });
  });
});