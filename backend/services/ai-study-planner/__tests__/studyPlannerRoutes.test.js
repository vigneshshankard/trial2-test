const express = require('express');
const request = require('supertest');
const studyPlannerRoutes = require('../routes/studyPlannerRoutes');
const studyPlannerController = require('../controllers/studyPlannerController');

// Mock auth middleware
jest.mock('../../../shared/authMiddleware', () => ({
  requireAuth: jest.fn((req, res, next) => {
    req.user = { id: 'user123', role: 'subscriber' }; // Changed to subscriber for PUT test
    next();
  }),
  requireSameUserOrAdmin: jest.fn((req, res, next) => {
    if (req.params.userId !== req.user.id) {
      return res.status(403).json({
        message: 'Forbidden: Access to this plan is denied'
      });
    }
    next();
  })
}));

// Mock controller
jest.mock('../controllers/studyPlannerController');

describe('Study Planner Routes', () => {
  let app;

  beforeEach(() => {
    app = express();
    app.use(express.json());
    app.use('/', studyPlannerRoutes);
  });

  describe('POST /plans', () => {
    it('should generate a study plan', async () => {
      studyPlannerController.generatePlan.mockImplementation((req, res) => {
        res.status(201).json({
          message: 'Plan generated',
          plan: { id: 'plan123' }
        });
      });

      const response = await request(app)
        .post('/plans')
        .send({ subject: 'Math', duration: 30 });

      expect(response.status).toBe(201);
    });
  });

  describe('GET /plans/:userId', () => {
    it('should allow access to own plan', async () => {
      studyPlannerController.getPlan.mockImplementation((req, res) => {
        res.status(200).json({ id: 'plan123' });
      });

      const response = await request(app)
        .get('/plans/user123');

      expect(response.status).toBe(200);
    });

    it('should block access to other user plan', async () => {
      const response = await request(app)
        .get('/plans/otheruser');

      expect(response.status).toBe(403);
    });
  });

  describe('PUT /plans/:userId', () => {
    it('should allow updates to own plan', async () => {
      studyPlannerController.updatePlan.mockImplementation((req, res) => {
        res.status(200).json({
          message: 'Plan updated'
        });
      });

      const response = await request(app)
        .put('/plans/user123')
        .send({ subject: 'Math' });

      expect(response.status).toBe(200);
    });

    it('should block updates to other user plan', async () => {
      const response = await request(app)
        .put('/plans/otheruser')
        .send({ subject: 'Math' });

      expect(response.status).toBe(403);
    });
  });
});