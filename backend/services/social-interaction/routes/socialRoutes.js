const express = require('express');
const router = express.Router();
const socialController = require('../controllers/socialController');
const authMiddleware = require('../../shared/authMiddleware');
const { body } = require('express-validator');

// Middleware to check user role
const checkUserRole = (allowedRoles) => (req, res, next) => {
    if (!allowedRoles.includes(req.user.role)) {
        return res.status(403).json({ message: 'Access denied' });
    }
    next();
};

// Routes for social interactions

/**
 * @route POST /posts
 * @desc Create a new post (User and Subscriber only)
 * @access User, Subscriber
 * @body {string} content - Content of the post
 */
router.post(
  '/posts',
  authMiddleware,
  checkUserRole(['user', 'subscriber']),
  [
    body('content').notEmpty().withMessage('Content is required'),
  ],
  socialController.createPost
);

/**
 * @route GET /posts
 * @desc Get all posts (User and Subscriber only)
 * @access User, Subscriber
 */
router.get('/posts', authMiddleware, checkUserRole(['user', 'subscriber']), socialController.getPosts);

/**
 * @route POST /friend-requests
 * @desc Send a friend request (User and Subscriber only)
 * @access User, Subscriber
 * @body {string} receiverId - Receiver's User ID (MongoDB ObjectId)
 */
router.post(
  '/friend-requests',
  authMiddleware,
  checkUserRole(['user', 'subscriber']),
  [
    body('receiverId').isMongoId().withMessage('Invalid receiver ID'),
  ],
  socialController.sendFriendRequest
);

// Route to fetch all posts
router.get('/posts', authMiddleware, socialController.getPosts);

// Route to create a new post
router.post('/posts', authMiddleware, socialController.createPost);

// Route to fetch chat messages between two users
router.get('/chats/:userId', authMiddleware, socialController.getChatMessages);

// Route to send a chat message
router.post('/chats/:userId', authMiddleware, socialController.sendChatMessage);

// Route to create a new group
router.post('/groups', authMiddleware, socialController.createGroup);

// Route to fetch group details
router.get('/groups/:groupId', authMiddleware, socialController.getGroupDetails);

// Route to send a message in a group
router.post('/groups/:groupId/messages', authMiddleware, socialController.sendGroupMessage);

// Route to accept a friend request
router.post('/friend-requests/:requestId/accept', authMiddleware, socialController.acceptFriendRequest);

// Route to reject a friend request
router.post('/friend-requests/:requestId/reject', authMiddleware, socialController.rejectFriendRequest);

// Route to fetch suggested friends
router.get('/suggested-friends', authMiddleware, socialController.getSuggestedFriends);

// Route to send a friend request
router.post('/friends/requests', authMiddleware, socialController.sendFriendRequest);

// Route to accept a friend request
router.patch('/friends/requests/:id', authMiddleware, socialController.acceptFriendRequest);

// Route to reject a friend request
router.delete('/friends/requests/:id', authMiddleware, socialController.rejectFriendRequest);

// Route to list friends
router.get('/friends', authMiddleware, socialController.listFriends);

// Route to report abusive chat messages or posts
router.post('/report', authMiddleware, socialController.reportContent);

module.exports = router;