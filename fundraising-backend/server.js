// Only load dotenv in development (when .env file exists locally)
if (process.env.NODE_ENV !== 'production') {
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
    console.log('- PORT:', PORT);

    // Wait for database connection before starting server
    await connectDB();

    app.listen(PORT, '0.0.0.0', () => {
      console.log(`\n✅ Server running on port ${PORT}`);
      console.log(`✅ Environment: ${process.env.NODE_ENV}`);
      console.log('\n✨ Application is ready!\n');
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
