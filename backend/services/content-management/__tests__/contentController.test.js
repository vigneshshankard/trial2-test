const { 
  createContent, 
  getContent, 
  updateContent, 
  deleteContent,
  searchContent 
} = require('../controllers/contentController');
const ContentModel = require('../models/studyMaterialModel');
const CurrentAffairModel = require('../models/currentAffairModel');
const { createCircuitBreaker } = require('../shared/circuitBreaker');

// Mock dependencies
jest.mock('../models/studyMaterialModel');
jest.mock('../models/currentAffairModel');
jest.mock('../shared/circuitBreaker');
jest.mock('express-validator', () => {
  return {
    body: jest.fn(() => ({
      isString: jest.fn(() => ({
        notEmpty: jest.fn(() => ({
          withMessage: jest.fn(() => true)
        }))
      })),
      optional: jest.fn(() => ({
        isString: jest.fn(() => ({
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

describe('Content Controller', () => {
  let mockReq, mockRes, mockNext;

  beforeEach(() => {
    mockReq = {
      body: {},
      params: {},
      user: { id: 'user123', role: 'admin' }
    };
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    mockNext = jest.fn();

    // Reset all mocks
    jest.clearAllMocks();
    
    // Reset prototype mocks
    ContentModel.prototype.save.mockReset();
    CurrentAffairModel.prototype.save.mockReset();
  });

  describe('createContent', () => {
    it('should create study material content successfully', async () => {
      // Setup
      mockReq.body = {
        type: 'study_material',
        title: 'Test Study Material',
        content: 'Detailed study content',
        subject: 'Mathematics',
        difficulty: 'intermediate'
      };

      const mockCreatedContent = {
        _id: 'content123',
        type: 'study_material',
        title: 'Test Study Material',
        content: 'Detailed study content',
        subject: 'Mathematics',
        difficulty: 'intermediate'
      };

      // Mock content creation
      ContentModel.prototype.save.mockResolvedValue(mockCreatedContent);

      // Execute
      await createContent(mockReq, mockRes, mockNext);

      // Assertions
      expect(mockRes.status).toHaveBeenCalledWith(201);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: 'Content created successfully',
        content: mockCreatedContent
      });
    });

    it('should create current affairs content successfully', async () => {
      // Setup
      mockReq.body = {
        type: 'current_affair',
        title: 'Latest News',
        content: 'Detailed current affairs content',
        category: 'Politics'
      };

      const mockCreatedContent = {
        _id: 'content456',
        type: 'current_affair',
        title: 'Latest News',
        content: 'Detailed current affairs content',
        category: 'Politics'
      };

      // Mock content creation
      CurrentAffairModel.prototype.save.mockResolvedValue(mockCreatedContent);

      // Execute
      await createContent(mockReq, mockRes, mockNext);

      // Assertions
      expect(mockRes.status).toHaveBeenCalledWith(201);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: 'Content created successfully',
        content: mockCreatedContent
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
      await createContent(mockReq, mockRes, mockNext);

      // Assertions
      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith({
        errors: [{ msg: 'Invalid input' }]
      });
    });

    it('should handle invalid content type', async () => {
      // Setup
      // Mock validationResult to return empty (no validation errors)
      const mockValidationResult = {
        isEmpty: () => true,
        array: () => []
      };
      require('express-validator').validationResult.mockReturnValue(mockValidationResult);

      mockReq.body = {
        type: 'invalid_type',
        title: 'Test Content'
      };

      // Execute
      await createContent(mockReq, mockRes, mockNext);

      // Assertions
      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith({
        errors: [{ msg: 'Invalid content type' }]
      });
    });
  });

  // Rest of the test file remains the same as in the previous implementation
  describe('getContent', () => {
    it('should fetch content by ID successfully', async () => {
      // Setup
      mockReq.params.id = 'content123';

      const mockContent = {
        _id: 'content123',
        type: 'study_material',
        title: 'Test Study Material',
        content: 'Detailed study content'
      };

      // Mock content retrieval
      ContentModel.findById.mockResolvedValue(mockContent);

      // Execute
      await getContent(mockReq, mockRes, mockNext);

      // Assertions
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith(mockContent);
    });

    it('should handle content not found', async () => {
      // Setup
      mockReq.params.id = 'nonexistent123';

      // Mock content not found
      ContentModel.findById.mockResolvedValue(null);

      // Execute
      await getContent(mockReq, mockRes, mockNext);

      // Assertions
      expect(mockRes.status).toHaveBeenCalledWith(404);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: 'Content not found'
      });
    });
  });

  // Rest of the test file remains the same
  describe('updateContent', () => {
    it('should update content successfully', async () => {
      // Setup
      mockReq.params.id = 'content123';
      mockReq.body = {
        title: 'Updated Study Material',
        content: 'Updated detailed study content'
      };

      const mockUpdatedContent = {
        _id: 'content123',
        type: 'study_material',
        title: 'Updated Study Material',
        content: 'Updated detailed study content'
      };

      // Mock content update
      ContentModel.findByIdAndUpdate.mockResolvedValue(mockUpdatedContent);

      // Execute
      await updateContent(mockReq, mockRes, mockNext);

      // Assertions
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: 'Content updated successfully',
        content: mockUpdatedContent
      });
    });

    it('should handle content not found during update', async () => {
      // Setup
      mockReq.params.id = 'nonexistent123';
      mockReq.body = {
        title: 'Updated Study Material'
      };

      // Mock content not found
      ContentModel.findByIdAndUpdate.mockResolvedValue(null);

      // Execute
      await updateContent(mockReq, mockRes, mockNext);

      // Assertions
      expect(mockRes.status).toHaveBeenCalledWith(404);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: 'Content not found'
      });
    });
  });

  describe('deleteContent', () => {
    it('should delete content successfully', async () => {
      // Setup
      mockReq.params.id = 'content123';

      const mockDeletedContent = {
        _id: 'content123',
        type: 'study_material',
        title: 'Test Study Material'
      };

      // Mock content deletion
      ContentModel.findByIdAndDelete.mockResolvedValue(mockDeletedContent);

      // Execute
      await deleteContent(mockReq, mockRes, mockNext);

      // Assertions
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: 'Content deleted successfully',
        content: mockDeletedContent
      });
    });

    it('should handle content not found during deletion', async () => {
      // Setup
      mockReq.params.id = 'nonexistent123';

      // Mock content not found
      ContentModel.findByIdAndDelete.mockResolvedValue(null);

      // Execute
      await deleteContent(mockReq, mockRes, mockNext);

      // Assertions
      expect(mockRes.status).toHaveBeenCalledWith(404);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: 'Content not found'
      });
    });
  });

  describe('searchContent', () => {
    it('should search content successfully', async () => {
      // Setup
      mockReq.query = {
        type: 'study_material',
        subject: 'Mathematics',
        difficulty: 'intermediate'
      };

      const mockSearchResults = [
        {
          _id: 'content1',
          type: 'study_material',
          title: 'Math Basics',
          subject: 'Mathematics',
          difficulty: 'intermediate'
        },
        {
          _id: 'content2',
          type: 'study_material',
          title: 'Advanced Math',
          subject: 'Mathematics',
          difficulty: 'intermediate'
        }
      ];

      // Mock content search
      ContentModel.find.mockResolvedValue(mockSearchResults);

      // Execute
      await searchContent(mockReq, mockRes, mockNext);

      // Assertions
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith(mockSearchResults);
    });

    it('should handle empty search results', async () => {
      // Setup
      mockReq.query = {
        type: 'study_material',
        subject: 'Physics'
      };

      // Mock empty search results
      ContentModel.find.mockResolvedValue([]);

      // Execute
      await searchContent(mockReq, mockRes, mockNext);

      // Assertions
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith([]);
    });

    describe('Error Handling', () => {
      it('should handle database errors in createContent', async () => {
        // Setup
        mockReq.body = {
          type: 'study_material',
          title: 'Test Study Material'
        };

        // Mock database error
        const mockError = new Error('Database connection error');
        ContentModel.prototype.save.mockRejectedValue(mockError);

        // Execute
        try {
          await createContent(mockReq, mockRes, mockNext);
        } catch (error) {
          // Assertions
          expect(mockNext).toHaveBeenCalledWith(mockError);
        }
      });
      
      it('should handle database errors in getContent', async () => {
        // Setup
        mockReq.params.id = 'content123';

        // Mock database error
        const mockError = new Error('Database query error');
        ContentModel.findById.mockRejectedValue(mockError);

        // Execute
        await getContent(mockReq, mockRes, mockNext);

        // Assertions
        expect(mockNext).toHaveBeenCalledWith(mockError);
      });
    
      it('should handle database errors in updateContent', async () => {
        // Setup
        mockReq.params.id = 'content123';
        mockReq.body = { title: 'Updated Title' };

        // Mock database error
        const mockError = new Error('Database update error');
        ContentModel.findByIdAndUpdate.mockRejectedValue(mockError);

        // Execute
        await updateContent(mockReq, mockRes, mockNext);

        // Assertions
        expect(mockNext).toHaveBeenCalledWith(mockError);
      });
    
      it('should handle database errors in deleteContent', async () => {
        // Setup
        mockReq.params.id = 'content123';

        // Mock database error
        const mockError = new Error('Database delete error');
        ContentModel.findByIdAndDelete.mockRejectedValue(mockError);

        // Execute
        await deleteContent(mockReq, mockRes, mockNext);

        // Assertions
        expect(mockNext).toHaveBeenCalledWith(mockError);
      });
    
      it('should handle database errors in searchContent', async () => {
        // Setup
        mockReq.query = { type: 'study_material' };

        // Mock database error
        const mockError = new Error('Database search error');
        ContentModel.find.mockRejectedValue(mockError);

        // Execute
        await searchContent(mockReq, mockRes, mockNext);

        // Assertions
        expect(mockNext).toHaveBeenCalledWith(mockError);
      });
    });
  });
});