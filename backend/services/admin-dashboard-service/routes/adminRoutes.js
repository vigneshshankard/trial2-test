const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { requireAuth } = require('../../../shared/authMiddleware');

router.get('/users', requireAuth, adminController.listUsers);
router.post('/audit-log', requireAuth, adminController.logAdminAction);

module.exports = router;