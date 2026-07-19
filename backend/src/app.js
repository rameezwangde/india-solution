const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const mongoose = require('mongoose');

const { apiLimiter } = require('../middleware/rateLimiter');
const { errorHandler } = require('../middleware/errorMiddleware');

const app = express();

// Security Headers
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "res.cloudinary.com"],
      scriptSrc: ["'self'", "'unsafe-inline'"],
      styleSrc: ["'self'", "'unsafe-inline'"]
    }
  }
}));

// Compress responses
app.use(compression());

// Body parser with size limits
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true, limit: '1mb' }));

// CORS config
const allowedOrigins = [process.env.CLIENT_URL, process.env.ADMIN_URL, process.env.FRONTEND_URL].filter(Boolean);
if (process.env.FRONTEND_URLS) {
  allowedOrigins.push(...process.env.FRONTEND_URLS.split(',').map(u => u.trim()));
}
if (process.env.ADDITIONAL_ALLOWED_ORIGINS) {
  allowedOrigins.push(...process.env.ADDITIONAL_ALLOWED_ORIGINS.split(',').map(u => u.trim()));
}

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin) || process.env.NODE_ENV !== 'production') {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

// Global API Rate Limiting
app.use('/api/', apiLimiter);

// Route files
const productRoutes = require('../routes/productRoutes');
const categoryRoutes = require('../routes/categoryRoutes');
const authRoutes = require('../routes/authRoutes');
const enquiryRoutes = require('../routes/enquiryRoutes');
const dashboardRoutes = require('../routes/dashboardRoutes');
const inventoryImportRoutes = require('../routes/inventoryImportRoutes');
const activityRoutes = require('../routes/activityRoutes');
const stockAlertRoutes = require('../routes/stockAlertRoutes');
const bulkProductRoutes = require('../routes/bulkProductRoutes');
const exportRoutes = require('../routes/exportRoutes');
const backupRoutes = require('../routes/backupRoutes');
const auditRoutes = require('../routes/auditRoutes');

// Mount routers
app.use('/api/products/bulk', bulkProductRoutes);
app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/enquiries', enquiryRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/inventory-import', inventoryImportRoutes);
app.use('/api/inventory/activity', activityRoutes);
app.use('/api/inventory/stock-alerts', stockAlertRoutes);
app.use('/api/export', exportRoutes);
app.use('/api/admin/backups', backupRoutes);
app.use('/api/admin/data-audit', auditRoutes);

// Health endpoint
app.get('/api/health', (req, res) => {
  const isDbConnected = mongoose.connection.readyState === 1;
  res.status(isDbConnected ? 200 : 503).json({
    success: true,
    status: isDbConnected ? 'healthy' : 'degraded',
    environment: process.env.NODE_ENV || 'development',
    timestamp: new Date().toISOString(),
    database: isDbConnected ? 'connected' : 'disconnected'
  });
});

// Root Test endpoint
app.get('/api', (req, res) => {
  res.json({
    success: true,
    message: "Inventory CRM API Running"
  });
});

// Central Error Handler
app.use(errorHandler);

module.exports = app;
