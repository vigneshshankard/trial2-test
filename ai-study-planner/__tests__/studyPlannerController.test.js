const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../index');
const { MongoMemoryServer } = require('mongodb-memory-server');
const StudyPlan = require('../models/studyPlanModel'); // Assuming the StudyPlan model is defined in models/studyPlanModel.js

let mongoServer;
let createdPlan;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

  // Create a study plan for testing
  createdPlan = await StudyPlan.create({
    userId: new mongoose.Types.ObjectId(),
    targetExamDate: '2023-12-31',
    preferredSubjects: ['Math', 'History'],
  });
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe('AI Study Planner Tests', () => {
  it('should create a study plan', async () => {
    const response = await request(app)
      .post('/api/study-planner/plans')
      .send({ userId: new mongoose.Types.ObjectId(), targetExamDate: '2023-12-31', preferredSubjects: ['Math', 'History'] });
    expect(response.status).toBe(201);
  }, 30000);

  it('should retrieve a study plan', async () => {
    const response = await request(app).get(`/api/study-planner/plans/${createdPlan.userId}`);
    expect(response.status).toBe(200);
  }, 30000);

  it('should update a study plan', async () => {
    const response = await request(app)
      .put(`/api/study-planner/plans/${createdPlan.userId}`)
      .send({ progress: 50 });
    expect(response.status).toBe(200);
  }, 30000);
});