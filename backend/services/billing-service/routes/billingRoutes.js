const express = require('express');
const router = express.Router();
const billingController = require('../controllers/billingController');
const authMiddleware = require('../../../shared/authMiddleware')();

router.post('/create-subscription', authMiddleware, billingController.createSubscription);
router.get('/invoices', authMiddleware, billingController.getInvoices);
router.post('/refund', authMiddleware, billingController.processRefund);

module.exports = router;