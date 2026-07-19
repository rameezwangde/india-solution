const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const helmet = require('helmet');
const compression = require('compression');
const mongoSanitize = require('express-mongo-sanitize');
const hpp = require('hpp');
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const validateEnv = require('./config/validateEnv');
const { apiLimiter } = require('./middleware/rateLimiter');
const { errorHandler } = require('./middleware/errorMiddleware');

// Load env vars
dotenv.config();

// Validate Environment
validateEnv();

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

// Note: express-mongo-sanitize and hpp are temporarily disabled
// because they attempt to mutate req.query, which throws a TypeError in Express 5.

// CORS config
const allowedOrigins = [process.env.CLIENT_URL, process.env.ADMIN_URL];
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

// Logging
if (process.env.NODE_ENV === 'production') {
  app.use(morgan('combined'));
} else {
  app.use(morgan('dev'));
}

// Global API Rate Limiting
app.use('/api/', apiLimiter);

// Route files
const productRoutes = require('./routes/productRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const authRoutes = require('./routes/authRoutes');
const enquiryRoutes = require('./routes/enquiryRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const inventoryImportRoutes = require('./routes/inventoryImportRoutes');
const activityRoutes = require('./routes/activityRoutes');
const stockAlertRoutes = require('./routes/stockAlertRoutes');
const bulkProductRoutes = require('./routes/bulkProductRoutes');
const exportRoutes = require('./routes/exportRoutes');

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

// Health endpoint
app.get('/health', (req, res) => {
  const isDbConnected = mongoose.connection.readyState === 1;
  res.status(isDbConnected ? 200 : 503).json({
    success: true,
    status: isDbConnected ? 'ok' : 'degraded',
    timestamp: new Date().toISOString(),
    database: isDbConnected ? 'connected' : 'disconnected'
  });
});

// Test endpoint
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: "Inventory CRM Backend Running"
  });
});

// Central Error Handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

// Connect to database, then start server
let server;
connectDB().then(() => {
  server = app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
  });
});

// Graceful Shutdown Handler
const gracefulShutdown = () => {
  console.log('Initiating graceful shutdown...');
  if (server) {
    server.close(async () => {
      console.log('HTTP server closed.');
      if (mongoose.connection.readyState === 1) {
        await mongoose.connection.close(false);
        console.log('MongoDB connection closed.');
      }
      process.exit(0);
    });

    // Fallback timeout
    setTimeout(() => {
      console.error('Could not close connections in time, forcefully shutting down');
      process.exit(1);
    }, 10000);
  } else {
    process.exit(0);
  }
};

process.on('SIGTERM', gracefulShutdown);
process.on('SIGINT', gracefulShutdown);
