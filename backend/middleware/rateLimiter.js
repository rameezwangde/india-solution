const rateLimit = require('express-rate-limit');

// Global API limiter (300 requests per 15 minutes)
exports.apiLimiter = rateLimit({
  windowMs: process.env.RATE_LIMIT_WINDOW_MS || 15 * 60 * 1000,
  max: process.env.RATE_LIMIT_MAX || 300,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many requests. Please try again later."
  }
});

// Admin login limiter (5 attempts per 15 minutes)
exports.loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many login attempts. Please try again later."
  }
});

// Public enquiry limiter (5 submissions per hour)
exports.enquiryLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many enquiries submitted. Please try again later."
  }
});

// Excel import limiter (10 requests per hour)
exports.importLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many imports performed. Please try again later."
  }
});
