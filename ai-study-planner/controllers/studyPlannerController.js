const { validationResult } = require('express-validator');
const StudyPlan = require('../models/studyPlanModel');

// Generate a new study plan
exports.generatePlan = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const planData = {
            ...req.body,
            userId: req.user.id, // Associate plan with the user
        };

        // Add advanced features for Subscribers
        if (req.user.role === 'subscriber') {
            planData.advancedFeatures = true;
        }

        const newPlan = await StudyPlan.create(planData);
        res.status(201).json({ message: 'Study plan generated successfully', plan: newPlan });
    } catch (error) {
        next(error);
    }
};

// Retrieve a user's study plan
exports.getPlan = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const plan = await StudyPlan.findOne({ userId: req.params.userId });
        if (!plan) {
            return res.status(404).json({ message: 'Study plan not found' });
        }

        // Restrict advanced details for non-Subscribers
        if (req.user.role !== 'subscriber') {
            delete plan.advancedFeatures;
        }

        res.status(200).json(plan);
    } catch (error) {
        next(error);
    }
};

// Update a study plan
exports.updatePlan = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const updatedPlan = await StudyPlan.findOneAndUpdate(
            { userId: req.params.userId },
            req.body,
            { new: true }
        );
        if (!updatedPlan) {
            return res.status(404).json({ message: 'Study plan not found' });
        }

        res.status(200).json({ message: 'Study plan updated successfully', plan: updatedPlan });
    } catch (error) {
        next(error);
    }
};