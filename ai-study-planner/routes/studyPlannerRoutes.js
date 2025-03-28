const express = require('express');
const router = express.Router();
const studyPlannerController = require('../controllers/studyPlannerController');

// Routes for study planner
router.post('/plans', studyPlannerController.generatePlan);
router.get('/plans/:userId', studyPlannerController.getPlan);
router.put('/plans/:userId', studyPlannerController.updatePlan);

module.exports = router;