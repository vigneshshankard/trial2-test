const axios = require('axios');
const StudyMaterial = require('../models/studyMaterialModel');
const Quiz = require('../../exam-management/models/quizModel');

// Fetch study materials from external API
exports.getStudyMaterials = async (req, res, next) => {
    try {
        const response = await axios.get('https://api.example.com/study-materials');
        let materials = response.data;

        // Restrict access for Visitors
        if (req.user.role === 'visitor') {
            materials = materials.slice(0, 5); // Limit to 5 items for Visitors
        }

        res.status(200).json(materials);
    } catch (error) {
        next(error);
    }
};

// Fetch current affairs from external API
exports.getCurrentAffairs = async (req, res, next) => {
    try {
        const response = await axios.get('https://api.example.com/current-affairs');
        let affairs = response.data;

        // Restrict access for Visitors
        if (req.user.role === 'visitor') {
            affairs = affairs.filter(item => {
                const date = new Date(item.date);
                const sevenDaysAgo = new Date();
                sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
                return date >= sevenDaysAgo;
            });
        }

        res.status(200).json(affairs);
    } catch (error) {
        next(error);
    }
};

// Fetch suggested topics
exports.getSuggestedTopics = async (req, res, next) => {
    try {
        // Fetch trending topics based on most accessed study materials
        const trendingMaterials = await StudyMaterial.find().sort({ accessCount: -1 }).limit(5);

        // Fetch topics based on user's recent activity (e.g., saved materials, completed quizzes)
        const userSavedMaterials = await StudyMaterial.find({ savedBy: req.user.id }).limit(5);
        const userCompletedQuizzes = await Quiz.find({ completedBy: req.user.id }).limit(5);

        const suggestedTopics = [
            ...new Set([
                ...trendingMaterials.map((material) => material.topic),
                ...userSavedMaterials.map((material) => material.topic),
                ...userCompletedQuizzes.map((quiz) => quiz.topic),
            ]),
        ];

        res.status(200).json(suggestedTopics);
    } catch (err) {
        next(err);
    }
};