const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { AppError } = require('./errorUtils');

const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS) || 12;
const JWT_SECRET = process.env.JWT_SECRET || 'default-secret-for-testing';
const JWT_EXPIRES = process.env.JWT_EXPIRES || '1h';

class AuthService {
  static async hashPassword(password) {
    try {
      return await bcrypt.hash(password, SALT_ROUNDS);
    } catch (err) {
      throw new AppError('Password hashing failed', 500);
    }
  }

  static async comparePasswords(inputPassword, hashedPassword) {
    try {
      return await bcrypt.compare(inputPassword, hashedPassword);
    } catch (err) {
      throw new AppError('Password comparison failed', 500);
    }
  }

  static generateToken(userId) {
    try {
      return jwt.sign({ id: userId }, JWT_SECRET, { expiresIn: JWT_EXPIRES });
    } catch (err) {
      throw new AppError('Token generation failed', 500);
    }
  }

  static verifyToken(token) {
    try {
      return jwt.verify(token, JWT_SECRET);
    } catch (err) {
      throw new AppError('Invalid token', 401);
    }
  }
}

module.exports = AuthService;