const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Subscription = require('../models/subscriptionModel');

class PaymentGateway {
  static async createSubscription(userId, planId) {
    try {
      // Fetch plan details from Stripe
      const plan = await stripe.plans.retrieve(planId);

      // Create Stripe customer if not exists
      let customer = await this._findOrCreateCustomer(userId);

      // Create subscription in Stripe
      const stripeSubscription = await stripe.subscriptions.create({
        customer: customer.id,
        items: [{ plan: planId }],
        expand: ['latest_invoice']
      });

      // Save subscription in our database
      const newSubscription = new Subscription({
        user_id: userId,
        plan_id: planId,
        payment_id: stripeSubscription.id,
        amount: plan.amount / 100, // Convert cents to dollars
        currency: plan.currency,
        start_date: new Date(stripeSubscription.start_date * 1000),
        end_date: new Date(stripeSubscription.current_period_end * 1000),
        features: plan.metadata.features ? plan.metadata.features.split(',') : []
      });

      await newSubscription.save();

      return {
        id: newSubscription._id,
        stripeSubscriptionId: stripeSubscription.id,
        amount: newSubscription.amount,
        currency: newSubscription.currency,
        startDate: newSubscription.start_date,
        endDate: newSubscription.end_date
      };
    } catch (error) {
      throw new Error(`Subscription creation failed: ${error.message}`);
    }
  }

  static async processRefund(subscriptionId, refundAmount) {
    try {
      // Retrieve the Stripe subscription
      const stripeSubscription = await stripe.subscriptions.retrieve(subscriptionId);

      // Process refund
      const refund = await stripe.refunds.create({
        payment_intent: stripeSubscription.latest_invoice.payment_intent,
        amount: Math.round(refundAmount * 100), // Convert to cents
        reason: 'requested_by_customer'
      });

      return {
        refundId: refund.id,
        amount: refund.amount / 100, // Convert back to dollars
        status: refund.status
      };
    } catch (error) {
      throw new Error(`Refund processing failed: ${error.message}`);
    }
  }

  // Private method to find or create Stripe customer
  static async _findOrCreateCustomer(userId) {
    try {
      // Check if customer already exists in our system
      const existingCustomer = await stripe.customers.list({ 
        email: `user_${userId}@platform.com` 
      });

      if (existingCustomer.data.length > 0) {
        return existingCustomer.data[0];
      }

      // Create new Stripe customer
      const newCustomer = await stripe.customers.create({
        email: `user_${userId}@platform.com`,
        metadata: { user_id: userId }
      });

      return newCustomer;
    } catch (error) {
      throw new Error(`Customer creation failed: ${error.message}`);
    }
  }
}

module.exports = PaymentGateway;