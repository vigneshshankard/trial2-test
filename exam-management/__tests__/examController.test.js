const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../index');
const { MongoMemoryServer } = require('mongodb-memory-server');
const Quiz = require('../models/quizModel'); // Assuming Quiz model is defined in models/quizModel.js

let mongoServer;
let createdQuiz;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

  // Create a quiz for testing
  createdQuiz = await Quiz.create({
    title: 'Sample Quiz',
    questions: [{ questionText: 'What is 2+2?', options: ['3', '4'], correctAnswer: '4' }],
  });
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe('Exam Management Tests', () => {
  it('should create a quiz', async () => {
    const response = await request(app)
      .post('/api/exams/quizzes')
      .send({ title: 'Sample Quiz', questions: [{ questionText: 'What is 2+2?', options: ['3', '4'], correctAnswer: '4' }] });
    expect(response.status).toBe(201);
  }, 30000);

  it('should fetch all quizzes', async () => {
    const response = await request(app).get('/api/exams/quizzes');
    expect(response.status).toBe(200);
  }, 30000);

  it('should fetch a quiz by ID', async () => {
    const response = await request(app).get(`/api/exams/quizzes/${createdQuiz._id}`);
    expect(response.status).toBe(200);
  }, 30000);
});