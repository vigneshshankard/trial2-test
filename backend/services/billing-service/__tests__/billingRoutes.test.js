const express = require('express');
const request = require('supertest');
const billingRoutes = require('../routes/billingRoutes');
const billingController = require('../controllers/billingController');
const authMiddleware = require('../../../shared/authMiddleware')();

// Mock dependencies
jest.mock('../controllers/billingController');
jest.mock('../../../shared/authMiddleware', () => 
  jest.fn(() => (req, res, next) => {
    req.user = { 
      id: 'user123', 
      role: 'user' 
    };
    next();
  })
);

describe('Billing Routes', () => {
  let app;

  beforeEach(() => {
    app = express();
    app.use(express.json());
    app.use('/billing', billingRoutes);
  });

  describe('POST /billing/create-subscription', () => {
    it('should call createSubscription controller method', async () => {
      const planData = { plan_id: 'plan_123' };
      const mockSubscription = {
        id: 'sub_123',
        amount: 49.99,
        currency: 'USD'
      };

      billingController.createSubscription.mockImplementation((req, res) => {
        res.status(201).json({ 
          message: 'Subscription created successfully',
          subscription: mockSubscription 
        });
      });

      const response = await request(app)
        .post('/billing/create-subscription')
        .send(planData);

      expect(billingController.createSubscription).toHaveBeenCalledWith(
        expect.objectContaining({
          body: planData,
          user: { id: 'user123', role: 'user' }
        }),
        expect.any(Object),
        expect.any(Function)
      );
      expect(response.status).toBe(201);
      expect(response.body).toEqual({ 
        message: 'Subscription created successfully',
        subscription: mockSubscription 
      });
    });
  });

  describe('GET /billing/invoices', () => {
    it('should call getInvoices controller method', async () => {
      const mockInvoices = [
        { _id: 'invoice1', amount: 49.99, status: 'paid' },
        { _id: 'invoice2', amount: 29.99, status: 'pending' }
      ];

      billingController.getInvoices.mockImplementation((req, res) => {
        res.status(200).json({ invoices: mockInvoices });
      });

      const response = await request(app)
        .get('/billing/invoices');

      expect(billingController.getInvoices).toHaveBeenCalledWith(
        expect.objectContaining({
          user: { id: 'user123', role: 'user' }
        }),
        expect.any(Object),
        expect.any(Function)
      );
      expect(response.status).toBe(200);
      expect(response.body).toEqual({ invoices: mockInvoices });
    });
  });

  describe('POST /billing/refund', () => {
    it('should call processRefund controller method', async () => {
      const refundData = { subscriptionId: 'sub_123' };
      const mockRefundResponse = {
        message: 'Refund processed successfully',
        refundAmount: 24.99
      };

      billingController.processRefund.mockImplementation((req, res) => {
        res.status(200).json(mockRefundResponse);
      });

      const response = await request(app)
        .post('/billing/refund')
        .send(refundData);

      expect(billingController.processRefund).toHaveBeenCalledWith(
        expect.objectContaining({
          body: refundData,
          user: { id: 'user123', role: 'user' }
        }),
        expect.any(Object),
        expect.any(Function)
      );
      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockRefundResponse);
    });
  });
});