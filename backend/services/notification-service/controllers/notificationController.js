const app = require('../index');
const { validationResult } = require('express-validator');
const { createCircuitBreaker } = require('../shared/circuitBreaker');
const Notification = require('../models/notificationModel');
const NotificationPreferences = require('../models/notificationPreferencesModel');

// Send a notification with circuit breaker
exports.sendNotification = async (req, res, next) => {
  try {
    // Validate request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { userId, type, message } = req.body;

    // Create new notification
    const notification = new Notification({
      userId,
      type,
      message
    });

    try {
      // Dispatch notification via circuit breaker
      const notificationDispatcher = req.app.get('notificationDispatcher');
      await notificationDispatcher.fire({
        userId,
        type,
        message
      });

      // Save notification to database
      const savedNotification = await notification.save();

      res.status(201).json({
        message: 'Notification sent successfully',
        notification: savedNotification
      });
    } catch (dispatchError) {
      if (dispatchError.type === 'circuit-breaker') {
        return res.status(503).json({
          message: 'Notification service temporarily unavailable',
          error: dispatchError.message
        });
      }
      next(dispatchError);
    }
  } catch (error) {
    next(error);
  }
};

// Get notifications for a user
exports.getNotifications = async (req, res, next) => {
  try {
    // Validate request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { userId } = req.params;

    try {
      // Use circuit breaker for fetching notifications
      const notificationFetcher = createCircuitBreaker(async () => {
        return await Notification.find({ userId });
      });

      const notifications = await notificationFetcher.fire();
      res.status(200).json(notifications);
    } catch (fetchError) {
      if (fetchError.type === 'circuit-breaker') {
        return res.status(503).json({
          message: 'Unable to fetch notifications at this time',
          error: fetchError.message
        });
      }
      next(fetchError);
    }
  } catch (error) {
    next(error);
  }
};

// Get priority notifications
exports.getPriorityNotifications = async (req, res, next) => {
  try {
    const priorityNotifications = await Notification.find({ type: 'priority' });
    res.status(200).json(priorityNotifications);
  } catch (error) {
    next(error);
  }
};

// Update notification preferences
exports.updateNotificationPreferences = async (req, res, next) => {
  try {
    const { email_enabled, sms_enabled, in_app_enabled } = req.body;
    const userId = req.user.id;

    const updatedPreferences = await NotificationPreferences.findOneAndUpdate(
      { user_id: userId },
      { 
        email_enabled, 
        sms_enabled, 
        in_app_enabled 
      },
      { new: true, upsert: true }
    );

    res.status(200).json({
      message: 'Preferences updated successfully',
      preferences: updatedPreferences
    });
  } catch (error) {
    next(error);
  }
};