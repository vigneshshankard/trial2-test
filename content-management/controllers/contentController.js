const axios = require('axios');

// Fetch study materials from external API
exports.getStudyMaterials = async (req, res) => {
    try {
        const response = await axios.get('https://api.example.com/study-materials');
        res.status(200).json(response.data);
    } catch (error) {
        console.error('Error in getStudyMaterials:', error);
        res.status(500).json({ message: 'Error fetching study materials', error: error.message });
    }
};

// Fetch current affairs from external API
exports.getCurrentAffairs = async (req, res) => {
    try {
        const response = await axios.get('https://api.example.com/current-affairs');
        res.status(200).json(response.data);
    } catch (error) {
        console.error('Error in getCurrentAffairs:', error);
        res.status(500).json({ message: 'Error fetching current affairs', error: error.message });
    }
};