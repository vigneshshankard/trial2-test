const mongoose = require('mongoose');
const Post = require('../models/postModel');
const FriendRequest = require('../models/friendRequestModel');
const Chat = require('../models/chatModel');
const Group = require('../models/groupModel');
const User = require('../../user-management/models/userModel');
const { validationResult } = require('express-validator');

// Fetch all posts
exports.getPosts = async (req, res, next) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.status(200).json(posts);
  } catch (err) {
    next(err);
  }
};

// Create a new post
exports.createPost = async (req, res, next) => {
  try {
    const { content } = req.body;
    const post = new Post({ content, author: req.user.name });
    await post.save();
    res.status(201).json(post);
  } catch (err) {
    next(err);
  }
};

// Send a friend request
exports.sendFriendRequest = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const newRequest = await FriendRequest.create({
            senderId: req.user.id, // Associate request with the sender
            ...req.body,
        });
        res.status(201).json({ message: 'Friend request sent', request: newRequest });
    } catch (error) {
        console.error('Error in sendFriendRequest:', error);
        res.status(500).json({ message: 'Error sending friend request', error: error.message });
    }
};

// Accept a friend request
exports.acceptFriendRequest = async (req, res, next) => {
  try {
    const { requestId } = req.params;
    const request = await FriendRequest.findById(requestId);

    if (!request) {
      return res.status(404).json({ message: 'Friend request not found' });
    }

    if (request.receiverId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'You are not authorized to accept this request' });
    }

    // Add each other as friends (logic depends on your user model)
    // Example:
    // await User.findByIdAndUpdate(req.user.id, { $push: { friends: request.senderId } });
    // await User.findByIdAndUpdate(request.senderId, { $push: { friends: req.user.id } });

    await request.remove();
    res.status(200).json({ message: 'Friend request accepted' });
  } catch (err) {
    next(err);
  }
};

// Reject a friend request
exports.rejectFriendRequest = async (req, res, next) => {
  try {
    const { requestId } = req.params;
    const request = await FriendRequest.findById(requestId);

    if (!request) {
      return res.status(404).json({ message: 'Friend request not found' });
    }

    if (request.receiverId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'You are not authorized to reject this request' });
    }

    await request.remove();
    res.status(200).json({ message: 'Friend request rejected' });
  } catch (err) {
    next(err);
  }
};

// Fetch chat messages between two users
exports.getChatMessages = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const chat = await Chat.findOne({
      participants: { $all: [req.user.id, userId] },
    }).populate('messages.sender', 'name');

    if (!chat) {
      return res.status(404).json({ message: 'Chat not found' });
    }

    res.status(200).json(chat.messages);
  } catch (err) {
    next(err);
  }
};

// Send a chat message
exports.sendChatMessage = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { content } = req.body;

    let chat = await Chat.findOne({
      participants: { $all: [req.user.id, userId] },
    });

    if (!chat) {
      chat = new Chat({ participants: [req.user.id, userId], messages: [] });
    }

    const message = { sender: req.user.id, content };
    chat.messages.push(message);
    await chat.save();

    res.status(201).json(message);
  } catch (err) {
    next(err);
  }
};

// Create a new group
exports.createGroup = async (req, res, next) => {
  try {
    const { name, description } = req.body;
    const group = new Group({
      name,
      description,
      members: [req.user.id],
    });
    await group.save();
    res.status(201).json(group);
  } catch (err) {
    next(err);
  }
};

// Fetch group details
exports.getGroupDetails = async (req, res, next) => {
  try {
    const { groupId } = req.params;
    const group = await Group.findById(groupId).populate('members', 'name').populate('messages.sender', 'name');

    if (!group) {
      return res.status(404).json({ message: 'Group not found' });
    }

    res.status(200).json(group);
  } catch (err) {
    next(err);
  }
};

// Send a message in a group
exports.sendGroupMessage = async (req, res, next) => {
  try {
    const { groupId } = req.params;
    const { content } = req.body;

    const group = await Group.findById(groupId);

// Fetch suggested friends
exports.getSuggestedFriends = async (req, res, next) => {
  try {
    // Fetch mutual connections
    const user = await User.findById(req.user.id).populate('friends');
    const mutualConnections = await User.find({
      _id: { $nin: [req.user.id, ...user.friends.map((friend) => friend._id)] },
      friends: { $in: user.friends.map((friend) => friend._id) },
    }).limit(5);

    // Fetch users with common interests (e.g., shared groups)
    const sharedGroups = await User.find({
      _id: { $nin: [req.user.id, ...user.friends.map((friend) => friend._id)] },
      groups: { $in: user.groups },
    }).limit(5);

    const suggestedFriends = [...new Set([...mutualConnections, ...sharedGroups])];

    res.status(200).json(suggestedFriends);
  } catch (err) {
    next(err);
  }
};
