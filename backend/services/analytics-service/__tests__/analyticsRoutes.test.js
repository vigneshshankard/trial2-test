const express = require('express');
const request = require('supertest');
const analyticsRoutes = require('../routes/analyticsRoutes');
const analyticsController = require('../controllers/analyticsController');
const authMiddleware = require('../../../shared/authMiddleware')();

// Mock dependencies
jest.mock('../controllers/analyticsController');
jest.mock('../../../shared/authMiddleware', () => 
  jest.fn(() => (req, res, next) => {
    req.user = { 
      id: 'user123', 
      role: 'user' 
    };
    next();
  })
);

describe('Analytics Routes', () => {
  let app;

  beforeEach(() => {
    app = express();
    app.use(express.json());
    app.use('/analytics', analyticsRoutes);
  });

  describe('GET /analytics/advanced', () => {
    it('should call getAdvancedAnalytics controller method', async () => {
      const mockAnalytics = {
        heatmaps: {
          subjectEngagement: {},
          timeAllocation: {}
        },
        peerBenchmarks: {
          averageProgress: 0.75,
          performanceComparison: {}
        }
      };

      analyticsController.getAdvancedAnalytics.mockImplementation((req, res) => {
        res.status(200).json(mockAnalytics);
      });

      const response = await request(app)
        .get('/analytics/advanced');

      expect(analyticsController.getAdvancedAnalytics).toHaveBeenCalledWith(
        expect.objectContaining({
          user: { id: 'user123', role: 'user' }
        }),
        expect.any(Object),
        expect.any(Function)
      );
      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockAnalytics);
    });
  });

  describe('POST /analytics/predict', () => {
    it('should call predictCompletionDate controller method', async () => {
      const mockPrediction = {
        estimatedCompletionDate: new Date('2025-12-31'),
        confidenceLevel: 0.85
      };

      analyticsController.predictCompletionDate.mockImplementation((req, res) => {
        res.status(200).json({ 
          prediction: {
            ...mockPrediction,
            estimatedCompletionDate: mockPrediction.estimatedCompletionDate.toISOString()
          }
        });
      });

      const response = await request(app)
        .post('/analytics/predict');

      expect(analyticsController.predictCompletionDate).toHaveBeenCalledWith(
        expect.objectContaining({
          user: { id: 'user123', role: 'user' }
        }),
        expect.any(Object),
        expect.any(Function)
      );
      expect(response.status).toBe(200);
      expect(response.body).toEqual({ 
        prediction: {
          ...mockPrediction,
          estimatedCompletionDate: mockPrediction.estimatedCompletionDate.toISOString()
        }
      });
    });
  });
});