const mongoose = require('mongoose');
const { validationResult } = require('express-validator');
const AuthService = require('../../../shared/authService');
const { AppError } = require('../../../shared/errorUtils');
const User = require('../models/userModel');

// Register a new user
exports.register = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return next(new AppError('User already exists', 400));
    }

    // Hash password
    const hashedPassword = await AuthService.hashPassword(password);

    // Create new user
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword
    });

    res.status(201).json({
      status: 'success',
      data: { userId: newUser._id }
    });
  } catch (error) {
    next(error);
  }
};

// User login
exports.login = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return next(new AppError('Invalid credentials', 401));
    }

    // Compare passwords
    const isMatch = await AuthService.comparePasswords(password, user.password);
    if (!isMatch) {
      return next(new AppError('Invalid credentials', 401));
    }

    // Generate token
    const token = AuthService.generateToken(user._id);

    res.status(200).json({
      status: 'success',
      data: { 
        token, 
        userId: user._id 
      }
    });
  } catch (error) {
    next(error);
  }
};

// Get user profile
exports.getProfile = async (req, res, next) => {
  try {
    const userId = req.user.id;

    // Validate user ID
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return next(new AppError('Invalid user ID', 400));
    }

    // Find user and exclude password
    const user = await User.findById(userId)
      .select('-password')
      .lean();

    if (!user) {
      return next(new AppError('User not found', 404));
    }

    res.status(200).json({
      status: 'success',
      data: user
    });
  } catch (error) {
    next(error);
  }
};

// Get user by ID (for admin or self)
exports.getUserById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const currentUser = req.user;

    // Check authorization
    if (currentUser.role !== 'super_admin' && currentUser.id !== id) {
      return res.status(403).json({ message: 'Access denied' });
    }

    // Find user and exclude password
    const user = await User.findById(id)
      .select('-password');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

// Update user role (for super admin)
exports.updateUserRole = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { role } = req.body;
    const currentUser = req.user;

    // Check authorization
    if (currentUser.role !== 'super_admin') {
      return res.status(403).json({ message: 'Access denied' });
    }

    // Update user role
    const updatedUser = await User.findByIdAndUpdate(
      id, 
      { role }, 
      { new: true }
    );

    res.status(200).json({
      message: 'Role updated successfully',
      user: updatedUser
    });
  } catch (error) {
    next(error);
  }
};

// Delete/anonymize user
exports.deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const currentUser = req.user;

    // Check authorization
    if (currentUser.role !== 'super_admin' && currentUser.id !== id) {
      return res.status(403).json({ message: 'Access denied' });
    }

    // Anonymize user data
    await User.findByIdAndUpdate(id, {
      email: null, 
      name: 'Deleted User', 
      isDeleted: true
    });

    res.status(200).json({ 
      message: 'User data anonymized successfully' 
    });
  } catch (error) {
    next(error);
  }
};

// Reset password
exports.resetPassword = async (req, res, next) => {
  try {
    const { email } = req.body;

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return next(new AppError('User not found', 404));
    }

    // Generate reset token
    const resetToken = global.generateResetToken();
    user.resetToken = resetToken;
    user.resetTokenExpiry = Date.now() + 3600000; // 1 hour from now
    await user.save();

    // Send reset email
    global.EmailService.sendResetEmail(email, resetToken);

    res.status(200).json({ message: 'Password reset email sent' });
  } catch (error) {
    next(error);
  }
};

// Verify email
exports.verifyEmail = async (req, res, next) => {
  try {
    const { token } = req.params;

    // Find user with matching verification token
    const user = await User.findOne({ emailVerificationToken: token });
    if (!user) {
      return next(new AppError('Invalid verification token', 400));
    }

    // Mark email as verified
    user.isEmailVerified = true;
    user.emailVerificationToken = undefined;
    await user.save();

    res.status(200).json({ message: 'Email verified successfully' });
  } catch (error) {
    next(error);
  }
};