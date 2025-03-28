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
  await mongoose.connect(uri, {}); // Removed deprecated options

  // Generate a valid JWT token for the tests
  const JWT_SECRET = process.env.JWT_SECRET || 'default_jwt_secret';
  token = jwt.sign({ id: new mongoose.Types.ObjectId(), roles: ['user'], permissions: [] }, JWT_SECRET);
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe('Social Interaction Tests', () => {
  it('should create a post', async () => {
    const response = await request(app)
      .post('/api/social/posts')
      .set('Authorization', `Bearer ${token}`) // Include the token in the Authorization header
      .send({ content: 'Test post', userId: new mongoose.Types.ObjectId() });
    expect(response.status).toBe(201);
  }, 30000);

  it('should fetch all posts', async () => {
    const response = await request(app)
      .get('/api/social/posts')
      .set('Authorization', `Bearer ${token}`); // Include the token in the Authorization header
    expect(response.status).toBe(200);
  }, 30000);

  it('should send a friend request', async () => {
    const response = await request(app)
      .post('/api/social/friend-requests')
      .set('Authorization', `Bearer ${token}`) // Include the token in the Authorization header
      .send({
        senderId: new mongoose.Types.ObjectId(), // Add senderId as required by the API
        receiverId: new mongoose.Types.ObjectId(), // Ensure receiverId is correctly passed
        status: 'pending', // Explicitly include the status field
      });
    expect(response.status).toBe(201);
    expect(response.body.request).toHaveProperty('_id'); // Ensure the response contains a request ID
  }, 30000);
});