const Notification = require('../models/notificationModel');
const request = require('supertest');
const app = require('../index');
const { validationResult } = require('express-validator');

// Send a notification
exports.sendNotification = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { userId, type, message } = req.body;
        const newNotification = new Notification({ userId, type, message });
        await newNotification.save();
        res.status(201).json({ message: 'Notification sent successfully', notification: newNotification });
    } catch (error) {
        next(error); // Pass error to global error handler
    }
};

// Get notifications for a user
exports.getNotifications = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const notifications = await Notification.find({ userId: req.params.userId });
        res.status(200).json(notifications);
    } catch (error) {
        next(error); // Pass error to global error handler
    }
};

// Get priority notifications for Subscribers
exports.getPriorityNotifications = async (req, res, next) => {
    try {
        const notifications = await Notification.find({ type: 'priority' });
        res.status(200).json(notifications);
    } catch (error) {
        next(error); // Pass error to global error handler
    }
};