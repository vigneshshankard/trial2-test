const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../index');
const { MongoMemoryServer } = require('mongodb-memory-server');

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe('Notification Service Tests', () => {
  it('should send a notification', async () => {
    const response = await request(app)
      .post('/api/notifications/send')
      .send({ userId: new mongoose.Types.ObjectId(), type: 'email', message: 'Test notification' });
    expect(response.status).toBe(201);
  }, 20000);

  it('should fetch notifications for a user', async () => {
    const response = await request(app).get(`/api/notifications/${new mongoose.Types.ObjectId()}`);
    expect(response.status).toBe(200);
  }, 20000);
});