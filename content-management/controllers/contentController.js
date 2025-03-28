const axios = require('axios');

// Fetch study materials from external API
exports.getStudyMaterials = async (req, res, next) => {
    try {
        const response = await axios.get('https://api.example.com/study-materials');
        res.status(200).json(response.data);
    } catch (error) {
        next(error); // Pass error to global error handler
    }
};

// Fetch current affairs from external API
exports.getCurrentAffairs = async (req, res, next) => {
    try {
        const response = await axios.get('https://api.example.com/current-affairs');
        res.status(200).json(response.data);
    } catch (error) {
        next(error); // Pass error to global error handler
    }
};