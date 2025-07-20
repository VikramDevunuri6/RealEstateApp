const jwt = require('jsonwebtoken');
const { User } = require('../models/schemas');

// Protect routes
const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get user from the token
      req.user = await User.findOne({ userId: decoded.userId }).select('-password');

      if (!req.user) {
        return res.status(401).json({
          success: false,
          error: {
            message: 'Not authorized, user not found'
          }
        });
      }

      next();
    } catch (error) {
      console.error('Token verification error:', error);
      return res.status(401).json({
        success: false,
        error: {
          message: 'Not authorized, token failed'
        }
      });
    }
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      error: {
        message: 'Not authorized, no token'
      }
    });
  }
};

// Admin only access
const adminOnly = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({
      success: false,
      error: {
        message: 'Not authorized as admin'
      }
    });
  }
};

module.exports = { protect, adminOnly };
