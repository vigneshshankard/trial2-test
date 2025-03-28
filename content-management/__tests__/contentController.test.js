const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../index');
const { MongoMemoryServer } = require('mongodb-memory-server');
const axios = require('axios');
const MockAdapter = require('axios-mock-adapter');

let mongoServer;
let mock;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);

  // Mock axios calls
  mock = new MockAdapter(axios);
  mock.onGet('https://api.example.com/study-materials').reply(200, { materials: ['Material 1', 'Material 2'] });
  mock.onGet('https://api.example.com/current-affairs').reply(200, { news: ['News 1', 'News 2'] });
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
  mock.restore();
});

describe('Content Management Tests', () => {
  it('should fetch study materials', async () => {
    const response = await request(app).get('/api/content/study-materials');
    expect(response.status).toBe(200);
    expect(response.body.materials).toEqual(['Material 1', 'Material 2']);
  }, 20000);

  it('should fetch current affairs', async () => {
    const response = await request(app).get('/api/content/current-affairs');
    expect(response.status).toBe(200);
    expect(response.body.news).toEqual(['News 1', 'News 2']);
  }, 20000);
});