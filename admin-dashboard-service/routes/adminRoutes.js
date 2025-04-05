router.get('/users', authMiddleware, adminController.listUsers);
router.post('/audit-log', authMiddleware, adminController.logAdminAction);