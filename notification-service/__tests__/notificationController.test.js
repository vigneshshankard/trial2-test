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
  token = jwt.sign({ id: new mongoose.Types.ObjectId(), roles: ['user'], permissions: [] }, JWT_SECRET);
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe('Notification Service Tests', () => {
  it('should send a notification', async () => {
    const response = await request(app)
      .post('/api/notifications/send')
      .set('Authorization', `Bearer ${token}`) // Include the token in the Authorization header
      .send({ userId: new mongoose.Types.ObjectId(), type: 'email', message: 'Test notification' });
    expect(response.status).toBe(201);
  }, 20000);

  it('should fetch notifications for a user', async () => {
    const response = await request(app)
      .get(`/api/notifications/${new mongoose.Types.ObjectId()}`)
      .set('Authorization', `Bearer ${token}`); // Include the token in the Authorization header
    expect(response.status).toBe(200);
  }, 20000);
});