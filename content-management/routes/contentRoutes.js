const express = require('express');
const router = express.Router();
const contentController = require('../controllers/contentController');
const authMiddleware = require('../../shared/authMiddleware'); // Updated path to shared middleware

// Routes for fetching content
router.get('/study-materials', authMiddleware, contentController.getStudyMaterials);

router.get('/current-affairs', authMiddleware, contentController.getCurrentAffairs);

module.exports = router;