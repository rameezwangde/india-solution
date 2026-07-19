const app = require('../src/app');
const connectDB = require('../config/db');

module.exports = async (req, res) => {
  // Ensure the database is connected before processing the request.
  // The cached connection inside db.js prevents exhausting the pool.
  await connectDB();
  
  // Forward the request to the central Express application
  return app(req, res);
};
