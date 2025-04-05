const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const { validationResult } = require('express-validator');

// Register a new user
exports.register = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { username, email, password } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = new User({ username, email, password: hashedPassword });
        await newUser.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Login a user
exports.login = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { email, password } = req.body;

        // Find the user
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check the password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Generate a token
        const token = jwt.sign({ id: user._id }, 'your_jwt_secret', { expiresIn: '1h' });

        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Add logging to debug getProfile
exports.getProfile = async (req, res) => {
    try {
        console.log('Fetching profile for user ID:', req.user.id); // Debug log

        // Validate if the ID is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(req.user.id)) {
            console.log('Invalid user ID:', req.user.id); // Debug log
            return res.status(400).json({ message: 'Invalid user ID' });
        }

        const userId = new mongoose.Types.ObjectId(req.user.id); // Correct instantiation with 'new'
        const user = await User.findById(userId).select('-password');
        if (!user) {
            console.log('User not found for ID:', req.user.id); // Debug log
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        console.error('Error in getProfile:', error); // Debug log
        res.status(500).json({ message: 'Server error', error });
    }
};

// Get dashboard data
exports.getDashboard = async (req, res) => {
    try {
        const dummyUser = {
            name: 'John Doe',
            email: 'john.doe@example.com',
        };

        const dummyRecentActivity = [
            'Completed General Knowledge Quiz',
            'Viewed study material: Introduction to Economics',
            'Joined group: UPSC Aspirants 2023',
        ];

        const dummyUpcomingExams = [
            'Preliminary Exam - 2023',
            'Mains Exam - 2023',
        ];

        res.status(200).json({
            user: dummyUser,
            recentActivity: dummyRecentActivity,
            upcomingExams: dummyUpcomingExams,
        });
    } catch (error) {
        console.error('Error fetching dashboard data:', error);
        res.status(500).json({ message: 'Server error', error });
    }
};

exports.getUserById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const requesterId = req.user.id;
    const requesterRole = req.user.role;

    if (requesterId !== id && requesterRole !== 'super_admin') {
      return res.status(403).json({ message: 'Access denied' });
    }

    const user = await User.findById(id).select('-password_hash');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

exports.updateUserRole = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { role } = req.body;

    if (req.user.role !== 'super_admin') {
      return res.status(403).json({ message: 'Access denied' });
    }

    const validRoles = ['regular', 'premium', 'admin'];
    if (!validRoles.includes(role)) {
      return res.status(400).json({ message: 'Invalid role' });
    }

    const user = await User.findByIdAndUpdate(id, { role }, { new: true });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'Role updated successfully', user });
  } catch (error) {
    next(error);
  }
};

exports.resetPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const resetToken = generateResetToken(); // Function to generate a secure token
    user.resetToken = resetToken;
    user.resetTokenExpiry = Date.now() + 3600000; // 1 hour expiry
    await user.save();

    // Send email with reset link (placeholder)
    await EmailService.sendResetEmail(user.email, resetToken);

    res.status(200).json({ message: 'Password reset email sent' });
  } catch (error) {
    next(error);
  }
};

exports.verifyEmail = async (req, res, next) => {
  try {
    const { token } = req.params;
    const user = await User.findOne({ emailVerificationToken: token });

    if (!user) {
      return res.status(404).json({ message: 'Invalid or expired token' });
    }

    user.isEmailVerified = true;
    user.emailVerificationToken = undefined;
    await user.save();

    res.status(200).json({ message: 'Email verified successfully' });
  } catch (error) {
    next(error);
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (req.user.role !== 'super_admin' && req.user.id !== id) {
      return res.status(403).json({ message: 'Access denied' });
    }

    await User.findByIdAndUpdate(id, { email: null, name: 'Deleted User', isDeleted: true });

    res.status(200).json({ message: 'User data anonymized successfully' });
  } catch (error) {
    next(error);
  }
};