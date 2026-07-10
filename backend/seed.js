const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const Category = require('./models/Category');

dotenv.config();

const categoriesToSeed = [
  'Sofas',
  'Chairs',
  'Tables',
  'Console Tables',
  'Lighting',
  'Sound',
  'Decor',
  'Kitchen Equipment',
  'Flowers',
  'Cloth and Fabric',
  'Truss and Frames',
  'Cooling Equipment'
];

const generateSlug = (name) => {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-')         // Replace spaces with hyphens
    .replace(/-+/g, '-');         // Remove repeated hyphens
};

const seedCategories = async () => {
  try {
    await connectDB();
    
    let processedCount = 0;

    for (const name of categoriesToSeed) {
      const slug = generateSlug(name);
      await Category.updateOne(
        { name },
        { $set: { name, slug } },
        { upsert: true }
      );
      processedCount++;
    }

    console.log(`✓ Seed complete. Successfully processed ${processedCount} categories using upsert.`);
  } catch (error) {
    console.error(`Error during seeding: ${error.message}`);
  } finally {
    // Ensure we close the connection so the script exits gracefully
    if (mongoose.connection.readyState !== 0) {
      await mongoose.connection.close();
      console.log('MongoDB connection closed.');
    }
    process.exit(0);
  }
};

seedCategories();
