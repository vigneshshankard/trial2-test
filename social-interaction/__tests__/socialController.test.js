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

describe('Social Interaction Tests', () => {
  it('should create a post', async () => {
    const response = await request(app)
      .post('/api/social/posts')
      .send({ content: 'Test post', userId: new mongoose.Types.ObjectId() });
    expect(response.status).toBe(201);
  }, 30000);

  it('should fetch all posts', async () => {
    const response = await request(app).get('/api/social/posts');
    expect(response.status).toBe(200);
  }, 30000);

  it('should send a friend request', async () => {
    const response = await request(app)
      .post('/api/social/friend-requests')
      .send({ senderId: new mongoose.Types.ObjectId(), receiverId: new mongoose.Types.ObjectId() });
    expect(response.status).toBe(201);
  }, 30000);
});