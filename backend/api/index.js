module.exports = async (req, res) => {
  console.log("[request]", req.method, req.url);

  // Health route isolation: /api/ping doesn't need DB or full app import
  if (req.method === 'GET' && req.url === '/api/ping') {
    return res.status(200).json({
      success: true,
      message: "Function is running",
      timestamp: new Date().toISOString()
    });
  }

  try {
    console.log("[startup] importing app and db");
    const app = require('../src/app');
    const connectDB = require('../config/db');
    
    console.log("[database] connection requested");
    await connectDB();
    console.log("[database] connected");
    
    return app(req, res);
  } catch (error) {
    console.error("Function initialization failed:", {
      name: error.name,
      message: error.message,
      stack: error.stack
    });

    // Ensure we send JSON if the headers aren't already sent
    if (!res.headersSent) {
      return res.status(500).json({
        success: false,
        message: "Server initialization failed: " + error.message
      });
    }
  }
};

