router.get('/advanced', authMiddleware, analyticsController.getAdvancedAnalytics);
router.post('/predict', authMiddleware, analyticsController.predictCompletionDate);