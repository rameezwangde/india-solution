const mongoose = require('mongoose');

let cachedConnection = null;
let connectionPromise = null;

const connectDB = async () => {
  if (cachedConnection) {
    return cachedConnection;
  }

  if (connectionPromise) {
    await connectionPromise;
    return cachedConnection;
  }

  if (!process.env.MONGODB_URI) {
    throw new Error('Please define the MONGODB_URI environment variable inside .env');
  }

  try {
    connectionPromise = mongoose.connect(process.env.MONGODB_URI);
    
    cachedConnection = await connectionPromise;
    console.log(`✓ MongoDB Connected Successfully: ${cachedConnection.connection.host}`);

    mongoose.connection.on('disconnected', () => {
      console.warn('⚠ MongoDB Disconnected');
    });

    mongoose.connection.on('reconnected', () => {
      console.log('✓ MongoDB Reconnected');
    });

    return cachedConnection;
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    connectionPromise = null;
    throw error;
  }
};

module.exports = connectDB;
