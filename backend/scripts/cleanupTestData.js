const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

// Load env vars
dotenv.config({ path: path.join(__dirname, '..', '.env') });

const Product = require('../models/Product');
const Enquiry = require('../models/Enquiry');
const ImportHistory = require('../models/ImportHistory');
const Admin = require('../models/Admin');
const Category = require('../models/Category');

const runCleanup = async () => {
  const args = process.argv.slice(2);
  
  if (!args.includes('--confirm')) {
    console.log('\nCleanup cancelled. Run with --confirm to permanently delete test operational data.\n');
    process.exit(0);
  }

  try {
    console.log('\nConnecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB.\n');

    // Count before
    const countBefore = {
      products: await Product.countDocuments(),
      enquiries: await Enquiry.countDocuments(),
      importHistory: await ImportHistory.countDocuments(),
      admins: await Admin.countDocuments(),
      categories: await Category.countDocuments()
    };

    console.log('--- Starting Deletion ---');
    
    // Delete Products
    const prodRes = await Product.deleteMany({});
    console.log(`Deleted ${prodRes.deletedCount} products`);

    // Delete Enquiries
    const enqRes = await Enquiry.deleteMany({});
    console.log(`Deleted ${enqRes.deletedCount} enquiries`);

    // Delete Import History
    const ihRes = await ImportHistory.deleteMany({});
    console.log(`Deleted ${ihRes.deletedCount} import history records`);

    console.log('--- Deletion Complete ---\n');

    // Count after
    const countAfter = {
      products: await Product.countDocuments(),
      enquiries: await Enquiry.countDocuments(),
      importHistory: await ImportHistory.countDocuments(),
      admins: await Admin.countDocuments(),
      categories: await Category.countDocuments()
    };

    console.log('==================================================');
    console.log('India Solutions CRM Test Data Cleanup Summary');
    console.log('==================================================');
    console.log(`Products deleted: ${countBefore.products - countAfter.products} (Remaining: ${countAfter.products})`);
    console.log(`Enquiries deleted: ${countBefore.enquiries - countAfter.enquiries} (Remaining: ${countAfter.enquiries})`);
    console.log(`Import history deleted: ${countBefore.importHistory - countAfter.importHistory} (Remaining: ${countAfter.importHistory})`);
    
    // Check for optional models if they existed
    let stockRecords = 0, notifications = 0;
    try {
      const StockMovement = mongoose.model('StockMovement');
      const smRes = await StockMovement.deleteMany({});
      stockRecords = smRes.deletedCount;
    } catch(e) {}
    try {
      const Notification = mongoose.model('Notification');
      const notRes = await Notification.deleteMany({});
      notifications = notRes.deletedCount;
    } catch(e) {}

    console.log(`Stock records deleted: ${stockRecords}`);
    console.log(`Notifications deleted: ${notifications}`);
    
    console.log('\nPreserved:');
    console.log(`Admin users: ${countAfter.admins}`);
    console.log(`Categories: ${countAfter.categories}`);
    console.log('Settings: preserved');
    console.log('==================================================\n');

    process.exit(0);
  } catch (error) {
    console.error('Error during cleanup:', error);
    process.exit(1);
  }
};

runCleanup();
