const quizController = require('../controllers/examController');
const Quiz = require('../models/quizModel');

// Minimal mocks
jest.mock('../models/quizModel');

describe('Quiz Controller Core Tests', () => {
  let mockReq, mockRes, mockNext;

  beforeEach(() => {
    mockReq = {
      params: {},
      body: {},
      user: { id: 'user123', role: 'admin' }
    };
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    mockNext = jest.fn();
  });

  describe('createQuiz', () => {
    it('should create quiz successfully', async () => {
      mockReq.body = {
        title: 'Test Quiz',
        questions: [{ 
          questionText: 'Q1', 
          options: ['A','B'] 
        }],
        duration: 30
      };

      const mockQuiz = {
        ...mockReq.body,
        _id: 'quiz123',
        save: jest.fn().mockResolvedValue(true)
      };

      Quiz.mockImplementation(() => mockQuiz);

      await quizController.createQuiz(mockReq, mockRes, mockNext);

      expect(mockRes.status).toHaveBeenCalledWith(201);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: 'Quiz created successfully',
        quiz: expect.objectContaining({
          title: 'Test Quiz',
          _id: 'quiz123'
        })
      });
    });
  });
});