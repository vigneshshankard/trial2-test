const analyticsController = require('../controllers/analyticsController');
const AnalyticsService = require('../services/analyticsService');

// Mock service layer
jest.mock('../services/analyticsService');

describe('Analytics Controller', () => {
  let mockReq, mockRes, mockNext;

  beforeEach(() => {
    mockReq = { 
      user: { id: 'user123' } 
    };
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    mockNext = jest.fn();
  });

  describe('getAdvancedAnalytics', () => {
    it('should return heatmaps and benchmarks', async () => {
      const mockResults = {
        heatmaps: { /* mock data */ },
        peerBenchmarks: { /* mock data */ }
      };

      AnalyticsService.generateHeatmaps.mockResolvedValue(mockResults.heatmaps);
      AnalyticsService.getPeerBenchmarks.mockResolvedValue(mockResults.peerBenchmarks);

      await analyticsController.getAdvancedAnalytics(mockReq, mockRes, mockNext);

      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith(mockResults);
    });
  });

  describe('predictCompletionDate', () => {
    it('should return completion prediction', async () => {
      const mockPrediction = { date: '2025-12-01' };
      AnalyticsService.predictCompletionDate.mockResolvedValue(mockPrediction);

      await analyticsController.predictCompletionDate(mockReq, mockRes, mockNext);

      expect(mockRes.json).toHaveBeenCalledWith({ prediction: mockPrediction });
    });
  });
});