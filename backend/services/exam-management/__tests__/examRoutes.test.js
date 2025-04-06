const request = require('supertest');
const express = require('express');
const examRoutes = require('../routes/examRoutes');
const examController = require('../controllers/examController');

// Mock controller methods
jest.mock('../controllers/examController');

const app = express();
app.use(express.json());
app.use('/', examRoutes);

describe('Exam Routes', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('POST /quizzes should create quiz (admin only)', async () => {
    examController.createQuiz.mockImplementation((req, res) => 
      res.status(201).json({ message: 'Quiz created' })
    );

    const response = await request(app)
      .post('/quizzes')
      .set('Authorization', 'Bearer adminToken')
      .send({
        title: 'Test Quiz',
        questions: [{
          questionText: 'Q1',
          options: ['A', 'B'],
          correctOption: 0
        }]
      });

    expect(response.statusCode).toBe(201);
    expect(examController.createQuiz).toHaveBeenCalled();
  });

  it('GET /quizzes/:id/start should start quiz (users only)', async () => {
    examController.startQuiz.mockImplementation((req, res) => 
      res.status(200).json({ message: 'Quiz started' })
    );

    const response = await request(app)
      .get('/quizzes/quiz123/start')
      .set('Authorization', 'Bearer userToken');

    expect(response.statusCode).toBe(200);
    expect(examController.startQuiz).toHaveBeenCalled();
  });
});