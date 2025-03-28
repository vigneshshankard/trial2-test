const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../index');
const { MongoMemoryServer } = require('mongodb-memory-server');
const jwt = require('jsonwebtoken'); // Import jsonwebtoken

let mongoServer;
let token; // Declare a token variable

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri, {});

  // Generate a valid JWT token for the tests
  const JWT_SECRET = process.env.JWT_SECRET || 'default_jwt_secret';
  token = jwt.sign({ id: new mongoose.Types.ObjectId(), roles: ['admin'], permissions: [] }, JWT_SECRET); // Add 'admin' role to the token
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe('Notification Service Tests', () => {
  // Update the test to include 'userId' and 'type' fields
  it('should send a notification', async () => {
    const response = await request(app)
      .post('/api/notifications/send')
      .set('Authorization', `Bearer ${token}`) // Include the token in the Authorization header
      .send({
        title: 'Test Notification', // Add title as required by the API
        message: 'Test notification',
        recipients: [new mongoose.Types.ObjectId()], // Add recipients array as required by the API
        userId: new mongoose.Types.ObjectId(), // Add userId as required by the API
        type: 'email', // Add type as required by the API
      });
    expect(response.status).toBe(201);
  }, 20000);
});