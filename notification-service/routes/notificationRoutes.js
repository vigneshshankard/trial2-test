const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notificationController');

// Routes for notifications
router.post('/send', notificationController.sendNotification);
router.get('/:userId', notificationController.getNotifications);

module.exports = router;