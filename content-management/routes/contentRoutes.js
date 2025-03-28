const express = require('express');
const router = express.Router();
const contentController = require('../controllers/contentController');

// Routes for fetching content
router.get('/study-materials', contentController.getStudyMaterials);
router.get('/current-affairs', contentController.getCurrentAffairs);

module.exports = router;