const express = require('express');
const request = require('supertest');
const currentAffairsRoutes = require('../routes/currentAffairsRoutes');
const currentAffairsController = require('../controllers/currentAffairsController');
const authMiddleware = require('../../../shared/authMiddleware');

// Mock dependencies
jest.mock('../controllers/currentAffairsController');
jest.mock('../../../shared/authMiddleware', () => 
  jest.fn((req, res, next) => {
    req.user = { 
      id: 'user123', 
      role: 'admin' 
    };
    next();
  })
);

describe('Current Affairs Routes', () => {
  let app;

  beforeEach(() => {
    app = express();
    app.use(express.json());
    app.use('/current-affairs', currentAffairsRoutes);
  });

  describe('GET /current-affairs', () => {
    it('should call getCurrentAffairs controller method', async () => {
      currentAffairsController.getCurrentAffairs.mockImplementation((req, res) => {
        res.status(200).json({
          currentAffairs: [{ _id: 'affair1', title: 'Test Affair' }],
          total: 1,
          page: 1,
          totalPages: 1
        });
      });

      const response = await request(app)
        .get('/current-affairs')
        .query({ category: 'Politics', limit: 10 });

      expect(currentAffairsController.getCurrentAffairs).toHaveBeenCalled();
      expect(response.status).toBe(200);
      expect(response.body.currentAffairs).toEqual([{ _id: 'affair1', title: 'Test Affair' }]);
    });
  });

  describe('GET /current-affairs/:id', () => {
    it('should call getCurrentAffairById controller method', async () => {
      currentAffairsController.getCurrentAffairById.mockImplementation((req, res) => {
        res.status(200).json({ 
          _id: 'affair123', 
          title: 'Test Current Affair' 
        });
      });

      const response = await request(app)
        .get('/current-affairs/affair123');

      expect(currentAffairsController.getCurrentAffairById).toHaveBeenCalledWith(
        expect.objectContaining({
          params: { id: 'affair123' }
        }),
        expect.any(Object),
        expect.any(Function)
      );
      expect(response.status).toBe(200);
      expect(response.body).toEqual({ 
        _id: 'affair123', 
        title: 'Test Current Affair' 
      });
    });
  });

  describe('GET /current-affairs/:id/quiz', () => {
    it('should call getQuizForCurrentAffair controller method', async () => {
      currentAffairsController.getQuizForCurrentAffair.mockImplementation((req, res) => {
        res.status(200).json({ 
          quiz: { 
            _id: 'quiz123', 
            title: 'Test Quiz' 
          } 
        });
      });

      const response = await request(app)
        .get('/current-affairs/affair123/quiz');

      expect(currentAffairsController.getQuizForCurrentAffair).toHaveBeenCalledWith(
        expect.objectContaining({
          params: { id: 'affair123' }
        }),
        expect.any(Object),
        expect.any(Function)
      );
      expect(response.status).toBe(200);
      expect(response.body).toEqual({ 
        quiz: { 
          _id: 'quiz123', 
          title: 'Test Quiz' 
        } 
      });
    });
  });

  describe('POST /current-affairs', () => {
    it('should call createCurrentAffair controller method', async () => {
      const mockCurrentAffair = {
        title: 'New Current Affair',
        description: 'Detailed description',
        category: 'Politics',
        source_url: 'https://example.com/news'
      };

      currentAffairsController.createCurrentAffair.mockImplementation((req, res) => {
        res.status(201).json({
          message: 'Current affair created successfully',
          currentAffair: { 
            _id: 'affair123', 
            ...mockCurrentAffair 
          }
        });
      });

      const response = await request(app)
        .post('/current-affairs')
        .set('Authorization', 'Bearer mocktoken')
        .send(mockCurrentAffair);

      expect(currentAffairsController.createCurrentAffair).toHaveBeenCalledWith(
        expect.objectContaining({
          body: mockCurrentAffair
        }),
        expect.any(Object),
        expect.any(Function)
      );
      expect(response.status).toBe(201);
      expect(response.body.message).toBe('Current affair created successfully');
    });
  });

  describe('PUT /current-affairs/:id', () => {
    it('should call updateCurrentAffair controller method', async () => {
      const updateData = {
        title: 'Updated Current Affair'
      };

      currentAffairsController.updateCurrentAffair.mockImplementation((req, res) => {
        res.status(200).json({
          message: 'Current affair updated successfully',
          currentAffair: { 
            _id: 'affair123', 
            ...updateData 
          }
        });
      });

      const response = await request(app)
        .put('/current-affairs/affair123')
        .set('Authorization', 'Bearer mocktoken')
        .send(updateData);

      expect(currentAffairsController.updateCurrentAffair).toHaveBeenCalledWith(
        expect.objectContaining({
          params: { id: 'affair123' },
          body: updateData
        }),
        expect.any(Object),
        expect.any(Function)
      );
      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Current affair updated successfully');
    });
  });

  describe('DELETE /current-affairs/:id', () => {
    it('should call deleteCurrentAffair controller method', async () => {
      currentAffairsController.deleteCurrentAffair.mockImplementation((req, res) => {
        res.status(200).json({
          message: 'Current affair deleted successfully',
          currentAffair: { 
            _id: 'affair123', 
            title: 'Deleted Current Affair' 
          }
        });
      });

      const response = await request(app)
        .delete('/current-affairs/affair123')
        .set('Authorization', 'Bearer mocktoken');

      expect(currentAffairsController.deleteCurrentAffair).toHaveBeenCalledWith(
        expect.objectContaining({
          params: { id: 'affair123' }
        }),
        expect.any(Object),
        expect.any(Function)
      );
      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Current affair deleted successfully');
    });
  });
});