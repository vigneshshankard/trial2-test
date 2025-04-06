const express = require('express');
const router = express.Router();
const { body, query, param } = require('express-validator');
const currentAffairsController = require('../controllers/currentAffairsController');
const authMiddleware = require('../../../shared/authMiddleware');
const { validateRequest } = require('../shared/validationMiddleware');

// Public routes
router.get('/', [
  query('category').optional().isString(),
  query('tags').optional().isString(),
  query('featured').optional().isBoolean(),
  query('limit').optional().isInt({ min: 1, max: 100 }),
  query('page').optional().isInt({ min: 1 }),
  validateRequest
], currentAffairsController.getCurrentAffairs);

router.get('/:id', [
  param('id').isMongoId(),
  validateRequest
], currentAffairsController.getCurrentAffairById);

router.get('/:id/quiz', [
  param('id').isMongoId(),
  validateRequest
], currentAffairsController.getQuizForCurrentAffair);

// Protected routes (Admin only)
router.post('/', [
  authMiddleware,
  body('title').isString().notEmpty(),
  body('description').isString().notEmpty(),
  body('category').isIn(['Politics', 'Economy', 'International', 'Science', 'Technology', 'Sports', 'Other']),
  body('source_url').isURL(),
  body('tags').optional().isArray(),
  body('is_featured').optional().isBoolean(),
  validateRequest
], currentAffairsController.createCurrentAffair);

router.put('/:id', [
  authMiddleware,
  param('id').isMongoId(),
  body('title').optional().isString().notEmpty(),
  body('description').optional().isString().notEmpty(),
  body('category').optional().isIn(['Politics', 'Economy', 'International', 'Science', 'Technology', 'Sports', 'Other']),
  body('source_url').optional().isURL(),
  body('tags').optional().isArray(),
  body('is_featured').optional().isBoolean(),
  validateRequest
], currentAffairsController.updateCurrentAffair);

router.delete('/:id', [
  authMiddleware,
  param('id').isMongoId(),
  validateRequest
], currentAffairsController.deleteCurrentAffair);

module.exports = router;