const PaymentGateway = require('../services/paymentGateway');
const Subscription = require('../models/subscriptionModel');
const Invoice = require('../models/invoiceModel');

// Helper function to calculate refund amount
const calculateRefundAmount = (totalAmount, endDate) => {
  const today = new Date();
  const subscriptionEnd = new Date(endDate);
  const totalDays = Math.ceil((subscriptionEnd - new Date(today.getFullYear(), 0, 1)) / (1000 * 60 * 60 * 24));
  const remainingDays = Math.ceil((subscriptionEnd - today) / (1000 * 60 * 60 * 24));
  
  return (remainingDays / totalDays) * totalAmount;
};

exports.createSubscription = async (req, res, next) => {
  try {
    const { plan_id } = req.body;
    const userId = req.user.id;

    // Create subscription via payment gateway
    const subscription = await PaymentGateway.createSubscription(userId, plan_id);

    // Create invoice record
    const invoice = new Invoice({
      user_id: userId,
      subscription_id: subscription.id,
      amount: subscription.amount,
      currency: subscription.currency,
      status: 'paid',
      payment_method: 'stripe'
    });
    await invoice.save();

    res.status(201).json({ 
      message: 'Subscription created successfully', 
      subscription,
      invoice: invoice._id 
    });
  } catch (error) {
    next(error);
  }
};

exports.getInvoices = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const invoices = await Invoice.find({ user_id: userId })
      .sort({ createdAt: -1 });

    res.status(200).json({ invoices });
  } catch (error) {
    next(error);
  }
};

exports.processRefund = async (req, res, next) => {
  try {
    const { subscriptionId } = req.body;
    const userId = req.user.id;

    // Find the subscription
    const subscription = await Subscription.findOne({ 
      _id: subscriptionId, 
      user_id: userId 
    });

    if (!subscription) {
      return res.status(404).json({ message: 'Subscription not found' });
    }

    // Calculate refund amount
    const refundAmount = calculateRefundAmount(
      subscription.amount, 
      subscription.end_date
    );

    // Process refund via payment gateway
    const refundResult = await PaymentGateway.processRefund(
      subscription.payment_id, 
      refundAmount
    );

    // Update subscription status
    subscription.status = 'canceled';
    await subscription.save();

    // Create refund invoice
    const refundInvoice = new Invoice({
      user_id: userId,
      subscription_id: subscriptionId,
      amount: -refundAmount,
      status: 'refunded',
      payment_method: 'stripe'
    });
    await refundInvoice.save();

    res.status(200).json({ 
      message: 'Refund processed successfully', 
      refundAmount,
      refundInvoice: refundInvoice._id
    });
  } catch (error) {
    next(error);
  }
};