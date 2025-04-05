exports.createSubscription = async (req, res, next) => {
  try {
    const { plan_id } = req.body;
    const userId = req.user.id;

    // Placeholder for Stripe/Razorpay integration
    const subscription = await PaymentGateway.createSubscription(userId, plan_id);

    res.status(201).json({ message: 'Subscription created successfully', subscription });
  } catch (error) {
    next(error);
  }
};

exports.getInvoices = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const invoices = await Invoice.find({ user_id: userId });

    res.status(200).json({ invoices });
  } catch (error) {
    next(error);
  }
};

exports.processRefund = async (req, res, next) => {
  try {
    const { subscriptionId } = req.body;
    const userId = req.user.id;

    const subscription = await Subscription.findOne({ _id: subscriptionId, user_id: userId });

    if (!subscription) {
      return res.status(404).json({ message: 'Subscription not found' });
    }

    const unusedDays = calculateUnusedDays(subscription.endDate); // Function to calculate unused days
    const refundAmount = calculateRefundAmount(subscription.amount, unusedDays); // Function to calculate refund

    // Process refund via payment gateway (placeholder)
    await PaymentGateway.processRefund(subscription.paymentId, refundAmount);

    subscription.status = 'canceled';
    await subscription.save();

    res.status(200).json({ message: 'Refund processed successfully', refundAmount });
  } catch (error) {
    next(error);
  }
};