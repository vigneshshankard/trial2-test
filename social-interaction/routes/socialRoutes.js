const express = require('express');
const router = express.Router();
const socialController = require('../controllers/socialController');

// Routes for social interactions
router.post('/posts', socialController.createPost);
router.get('/posts', socialController.getPosts);
router.post('/friend-requests', socialController.sendFriendRequest);

module.exports = router;