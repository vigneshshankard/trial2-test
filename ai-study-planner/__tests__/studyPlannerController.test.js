const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../index');
const { MongoMemoryServer } = require('mongodb-memory-server');
const StudyPlan = require('../models/studyPlanModel'); // Assuming the StudyPlan model is defined in models/studyPlanModel.js
const jwt = require('jsonwebtoken'); // Import jsonwebtoken

let mongoServer;
let createdPlan;
let token; // Declare a token variable

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri, {}); // Removed deprecated options

  // Create a study plan for testing
  createdPlan = await StudyPlan.create({
    userId: new mongoose.Types.ObjectId(),
    targetExamDate: '2023-12-31',
    preferredSubjects: ['Math', 'History'],
  });

  // Generate a valid JWT token for the created user
  const JWT_SECRET = process.env.JWT_SECRET || 'default_jwt_secret';
  token = jwt.sign({ id: createdPlan.userId, roles: ['user'], permissions: [] }, JWT_SECRET);
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe('AI Study Planner Tests', () => {
  it('should create a study plan', async () => {
    const response = await request(app)
      .post('/api/study-planner/plans')
      .set('Authorization', `Bearer ${token}`) // Include the token in the Authorization header
      .send({ userId: new mongoose.Types.ObjectId(), targetExamDate: '2023-12-31', preferredSubjects: ['Math', 'History'] });
    expect(response.status).toBe(201);
  }, 30000);

  it('should retrieve a study plan', async () => {
    const response = await request(app)
      .get(`/api/study-planner/plans/${createdPlan.userId}`)
      .set('Authorization', `Bearer ${token}`); // Include the token in the Authorization header
    expect(response.status).toBe(200);
  }, 30000);

  it('should update a study plan', async () => {
    const response = await request(app)
      .put(`/api/study-planner/plans/${createdPlan.userId}`)
      .set('Authorization', `Bearer ${token}`) // Include the token in the Authorization header
      .send({ progress: 50 });
    expect(response.status).toBe(200);
  }, 30000);
});