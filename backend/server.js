const dotenv = require('dotenv');
const mongoose = require('mongoose');

// Load env vars
dotenv.config();

const validateEnv = require('./config/validateEnv');
// Validate Environment
validateEnv();

const connectDB = require('./config/db');
const app = require('./src/app');

const PORT = process.env.PORT || 5000;

// Connect to database, then start server
let server;
connectDB().then(() => {
  server = app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
  });
}).catch(err => {
  console.error("Failed to connect to DB, server not started", err);
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
