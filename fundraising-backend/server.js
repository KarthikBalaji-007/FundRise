// Only load dotenv if MONGO_URI is not already in environment
// (Railway injects variables directly, no .env file needed)
if (!process.env.MONGO_URI) {
  require('dotenv').config();
}

const app = require('./src/app');
const connectDB = require('./src/config/database');

const PORT = process.env.PORT || 5000;

// Connect to database and start server
const startServer = async () => {
  try {
    console.log('Environment check:');
    console.log('- NODE_ENV:', process.env.NODE_ENV || 'not set');
    console.log('- MONGO_URI:', process.env.MONGO_URI ? 'SET ✓' : 'MISSING ✗');
    console.log('- JWT_SECRET:', process.env.JWT_SECRET ? 'SET ✓' : 'MISSING ✗');

    // Wait for database connection before starting server
    await connectDB();

    app.listen(PORT, () => {
      console.log(`\n✓ Server running on port ${PORT}`);
      console.log(`✓ Environment: ${process.env.NODE_ENV}`);
      console.log('\n✨ Application is ready!\n');
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
