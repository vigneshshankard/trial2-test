const Notification = require('../models/notificationModel');
const request = require('supertest');
const app = require('../index');

// Send a notification
exports.sendNotification = async (req, res) => {
    try {
        const { userId, type, message } = req.body;
        const newNotification = new Notification({ userId, type, message });
        await newNotification.save();
        res.status(201).json({ message: 'Notification sent successfully', notification: newNotification });
    } catch (error) {
        console.error('Error in sendNotification:', error);
        res.status(500).json({ message: 'Error sending notification', error });
    }
};

// Get notifications for a user
exports.getNotifications = async (req, res) => {
    try {
        const notifications = await Notification.find({ userId: req.params.userId });
        res.status(200).json(notifications);
    } catch (error) {
        console.error('Error in getNotifications:', error);
        res.status(500).json({ message: 'Error fetching notifications', error });
    }
};