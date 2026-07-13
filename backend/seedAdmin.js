const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const Admin = require('./models/Admin');

dotenv.config();

const seedAdmin = async () => {
  try {
    await connectDB();

    const email = process.env.ADMIN_EMAIL ? process.env.ADMIN_EMAIL.toLowerCase() : null;
    if (!email || !process.env.ADMIN_PASSWORD || !process.env.ADMIN_NAME) {
      console.error('Please provide ADMIN_NAME, ADMIN_EMAIL, and ADMIN_PASSWORD in .env');
      process.exit(1);
    }

    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      console.log('Admin already exists. No new admin created.');
    } else {
      const admin = new Admin({
        name: process.env.ADMIN_NAME,
        email,
        password: process.env.ADMIN_PASSWORD,
        role: 'super_admin'
      });
      await admin.save();
      console.log('Admin user seeded successfully.');
    }
  } catch (error) {
    console.error(`Error seeding admin: ${error.message}`);
  } finally {
    if (mongoose.connection.readyState !== 0) {
      await mongoose.connection.close();
      console.log('MongoDB connection closed.');
    }
    process.exit(0);
  }
};

seedAdmin();
