const express = require('express');
const router = express.Router();
const { body, param } = require('express-validator');
const studyPlannerController = require('../controllers/studyPlannerController');
const authMiddleware = require('../../shared/authMiddleware'); // Updated path to shared middleware

// Routes for study planner
router.post(
  '/plans',
  authMiddleware,
  [
    body('subject').notEmpty().withMessage('Subject is required'),
    body('duration').isInt({ min: 1 }).withMessage('Duration must be a positive integer'),
  ],
  (req, res, next) => {
    req.checkRole('user');
    next();
  },
  studyPlannerController.generatePlan
);

router.get(
  '/plans/:userId',
  authMiddleware,
  [
    param('userId').isMongoId().withMessage('Invalid user ID'),
  ],
  (req, res, next) => {
    if (req.user.id !== req.params.userId) {
      return res.status(403).json({ message: 'Forbidden: Access to this plan is denied' });
    }
    next();
  },
  studyPlannerController.getPlan
);

router.put(
  '/plans/:userId',
  authMiddleware,
  [
    param('userId').isMongoId().withMessage('Invalid user ID'),
    body('subject').optional().notEmpty().withMessage('Subject cannot be empty'),
    body('duration').optional().isInt({ min: 1 }).withMessage('Duration must be a positive integer'),
  ],
  (req, res, next) => {
    if (req.user.id !== req.params.userId) {
      return res.status(403).json({ message: 'Forbidden: Access to this plan is denied' });
    }
    next();
  },
  studyPlannerController.updatePlan
);

module.exports = router;