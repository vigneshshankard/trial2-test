const StudyPlan = require('../models/studyPlanModel');

// Generate a new study plan
exports.generatePlan = async (req, res) => {
    try {
        const newPlan = await StudyPlan.create(req.body);
        res.status(201).json({ message: 'Study plan generated successfully', plan: newPlan });
    } catch (error) {
        console.error('Error in generatePlan:', error);
        res.status(500).json({ message: 'Error generating study plan', error: error.message });
    }
};

// Retrieve a user's study plan
exports.getPlan = async (req, res) => {
    try {
        const plan = await StudyPlan.findOne({ userId: req.params.userId });
        if (!plan) {
            return res.status(404).json({ message: 'Study plan not found' });
        }
        res.status(200).json(plan);
    } catch (error) {
        console.error('Error in getPlan:', error);
        res.status(500).json({ message: 'Error retrieving study plan', error: error.message });
    }
};

// Update a study plan
exports.updatePlan = async (req, res) => {
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
        console.error('Error in updatePlan:', error);
        res.status(500).json({ message: 'Error updating study plan', error: error.message });
    }
};