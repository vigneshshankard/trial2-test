const examController = require('../controllers/examController');
const Quiz = require('../models/quizModel');

// Mock dependencies
jest.mock('../models/quizModel');
jest.mock('../../../../shared/redisClient', () => ({
  get: jest.fn(),
  set: jest.fn(),
  del: jest.fn(),
  keys: jest.fn()
}));

describe('Exam Controller', () => {
  let mockReq, mockRes, mockNext;

  beforeEach(() => {
    mockReq = {
      params: {},
      body: {},
      user: { id: 'user123', role: 'subscriber' }
    };
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    mockNext = jest.fn();
  });

  describe('createQuiz', () => {
    it('should create quiz successfully with valid input', async () => {
      mockReq.body = {
        title: 'Test Quiz',
        questions: [{
          questionText: 'Q1',
          options: ['A', 'B'],
          correctOption: 0
        }],
        duration: 30
      };

      const mockQuiz = {
        _id: 'quiz123',
        ...mockReq.body,
        save: jest.fn().mockResolvedValue(true)
      };

      Quiz.mockImplementation(() => mockQuiz);

      await examController.createQuiz(mockReq, mockRes, mockNext);

      expect(mockRes.status).toHaveBeenCalledWith(201);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: 'Quiz created successfully',
        quiz: mockQuiz
      });
    });
  });
});