const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');

exports.protect = async (req, res, next) => {
  try {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({ success: false, message: 'Not authorized to access this route' });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      const admin = await Admin.findById(decoded.id);
      
      if (!admin) {
        return res.status(401).json({ success: false, message: 'The admin belonging to this token no longer exists' });
      }

      if (!admin.isActive) {
        return res.status(403).json({ success: false, message: 'Admin account is inactive' });
      }

      req.admin = admin;
      next();
    } catch (error) {
      return res.status(401).json({ success: false, message: 'Token is invalid or expired' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

exports.optionalAuth = async (req, res, next) => {
  try {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return next();
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const admin = await Admin.findById(decoded.id);
      
      if (admin && admin.isActive) {
        req.admin = admin;
      }
      next();
    } catch (error) {
      // Ignore token errors for optional auth
      next();
    }
  } catch (error) {
    next();
  }
};
