const mongoose = require('mongoose');
const Post = require('../models/postModel');
const FriendRequest = require('../models/friendRequestModel');
const { validationResult } = require('express-validator');

// Create a new post
exports.createPost = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const newPost = await Post.create(req.body);
        res.status(201).json({ message: 'Post created successfully', post: newPost });
    } catch (error) {
        console.error('Error in createPost:', error);
        res.status(500).json({ message: 'Error creating post', error: error.message });
    }
};

// Get all posts
exports.getPosts = async (req, res) => {
    try {
        const posts = await Post.find();
        res.status(200).json(posts);
    } catch (error) {
        console.error('Error in getPosts:', error);
        res.status(500).json({ message: 'Error fetching posts', error: error.message });
    }
};

// Send a friend request
exports.sendFriendRequest = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const newRequest = await FriendRequest.create(req.body);
        res.status(201).json({ message: 'Friend request sent', request: newRequest });
    } catch (error) {
        console.error('Error in sendFriendRequest:', error);
        res.status(500).json({ message: 'Error sending friend request', error: error.message });
    }
};