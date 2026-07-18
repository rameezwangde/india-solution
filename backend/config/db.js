const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`✓ MongoDB Connected Successfully: ${conn.connection.host}`);

    mongoose.connection.on('disconnected', () => {
      console.warn('⚠ MongoDB Disconnected');
    });

    mongoose.connection.on('reconnected', () => {
      console.log('✓ MongoDB Reconnected');
    });

  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
