const validateEnv = () => {
  const required = [
    'PORT',
    'MONGODB_URI',
    'JWT_SECRET',
    'CLIENT_URL',
    'ADMIN_URL'
  ];
  
  const missing = [];
  
  for (const key of required) {
    if (!process.env[key]) {
      missing.push(key);
    }
  }

  if (process.env.JWT_SECRET && process.env.JWT_SECRET.length < 16) {
    console.error('FATAL ERROR: JWT_SECRET must be at least 16 characters long for security.');
    process.exit(1);
  }

  if (missing.length > 0) {
    console.error(`FATAL ERROR: Missing required environment variables: ${missing.join(', ')}`);
    process.exit(1);
  }
};

module.exports = validateEnv;
