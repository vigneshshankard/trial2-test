const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../index');
const { MongoMemoryServer } = require('mongodb-memory-server');
const User = require('../models/userModel'); // Corrected import path for User model
const bcrypt = require('bcrypt'); // Import bcrypt for password hashing

let mongoServer;
let createdUser;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
});

beforeEach(async () => {
  // Clear the database before each test
  await User.deleteMany();

  // Create a user for testing
  const hashedPassword = await bcrypt.hash('password123', 10);
  createdUser = await User.create({
    username: 'testuser',
    email: 'test@example.com',
    password: hashedPassword,
  });

  // Mock req.user for profile test with a valid ObjectId
  app.use('/api/users/profile', (req, res, next) => {
    req.user = { id: createdUser._id }; // Use ObjectId directly
    next();
  });
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe('User Management Tests', () => {
  it('should register a user', async () => {
    const response = await request(app)
      .post('/api/users/register')
      .send({ username: 'newuser', email: 'new@example.com', password: 'newpassword123' });
    expect(response.status).toBe(201);
  }, 20000);

  it('should login a user', async () => {
    const response = await request(app)
      .post('/api/users/login')
      .send({ email: 'test@example.com', password: 'password123' });
    expect(response.status).toBe(200);
  }, 20000);

  it('should fetch user profile', async () => {
    // Explicitly set req.user.id to the correct ObjectId format
    app.use((req, res, next) => {
      req.user = { id: createdUser._id }; // Use ObjectId directly
      next();
    });

    const response = await request(app).get('/api/users/profile');
    expect(response.status).toBe(200);
  }, 20000);
});