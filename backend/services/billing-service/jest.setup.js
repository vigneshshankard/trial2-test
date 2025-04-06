// Mock Stripe
jest.mock('stripe', () => {
  return jest.fn(() => ({
    customers: {
      create: jest.fn(),
      list: jest.fn()
    },
    subscriptions: {
      create: jest.fn(),
      retrieve: jest.fn()
    },
    plans: {
      retrieve: jest.fn()
    },
    refunds: {
      create: jest.fn()
    }
  }));
});

// Mock environment variables
process.env.STRIPE_SECRET_KEY = 'test_stripe_secret_key';