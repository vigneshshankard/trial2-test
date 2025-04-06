const PaymentGateway = require('../services/paymentGateway');
const Subscription = require('../models/subscriptionModel');
const Invoice = require('../models/invoiceModel');
const { 
  createSubscription, 
  getInvoices, 
  processRefund 
} = require('../controllers/billingController');

// Mock dependencies
jest.mock('../services/paymentGateway');
jest.mock('../models/subscriptionModel');
jest.mock('../models/invoiceModel');

describe('Billing Controller', () => {
  let mockReq, mockRes, mockNext;

  beforeEach(() => {
    mockReq = {
      body: {},
      params: {},
      user: { 
        id: 'user123', 
        role: 'user' 
      }
    };
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    mockNext = jest.fn();
  });

  describe('getInvoices', () => {
    it('should fetch invoices successfully', async () => {
      const mockInvoices = [{ _id: 'inv1' }, { _id: 'inv2' }];
      Invoice.find.mockImplementation(() => ({
        sort: jest.fn().mockResolvedValue(mockInvoices)
      }));

      await getInvoices(mockReq, mockRes, mockNext);

      expect(Invoice.find).toHaveBeenCalledWith({ user_id: 'user123' });
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({ invoices: mockInvoices });
    });

    it('should handle invoice retrieval errors', async () => {
      const mockError = new Error('Database error');
      Invoice.find.mockImplementation(() => ({
        sort: jest.fn().mockRejectedValue(mockError)
      }));

      await getInvoices(mockReq, mockRes, mockNext);

      expect(mockNext).toHaveBeenCalledWith(mockError);
      expect(mockNext).toHaveBeenCalledTimes(1);
      expect(mockRes.status).not.toHaveBeenCalled();
    });
  });

  describe('createSubscription', () => {
    it('should create subscription successfully', async () => {
      mockReq.body = { plan_id: 'plan123' };
      const mockSubscription = { 
        id: 'sub123',
        amount: 100,
        currency: 'USD'
      };
      const mockInvoice = { _id: 'inv123' };
      PaymentGateway.createSubscription.mockResolvedValue(mockSubscription);
      Invoice.prototype.save.mockResolvedValue(mockInvoice);

      await createSubscription(mockReq, mockRes, mockNext);

      expect(PaymentGateway.createSubscription).toHaveBeenCalledWith('user123', 'plan123');
      expect(mockRes.status).toHaveBeenCalledWith(201);
    });
  });

  describe('processRefund', () => {
    it('should process refund successfully', async () => {
      mockReq.body = { subscriptionId: 'sub123' };
      const mockSubscription = {
        _id: 'sub123',
        user_id: 'user123',
        amount: 100,
        end_date: new Date(),
        payment_id: 'pay123',
        save: jest.fn().mockResolvedValue(true)
      };
      Subscription.findOne.mockResolvedValue(mockSubscription);
      PaymentGateway.processRefund.mockResolvedValue({});

      await processRefund(mockReq, mockRes, mockNext);

      expect(Subscription.findOne).toHaveBeenCalledWith({ 
        _id: 'sub123', 
        user_id: 'user123' 
      });
      expect(mockRes.status).toHaveBeenCalledWith(200);
    });
  });
});