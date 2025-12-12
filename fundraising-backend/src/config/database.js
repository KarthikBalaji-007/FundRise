const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    console.log('Attempting to connect to MongoDB...');
    console.log('Connection String:', process.env.MONGODB_URI.replace(/:\/\/([^:]+):([^@]+)@/, '://***:***@')); // Hide credentials

    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
    });

    console.log('✓ MongoDB connected successfully');
    console.log('✓ Database Host:', conn.connection.host);
    console.log('✓ Database Name:', conn.connection.name);
  } catch (error) {
    console.error('\n❌ MongoDB Connection Failed!');
    console.error('Error Type:', error.name);
    console.error('Error Message:', error.message);

    // Additional helpful information based on error type
    if (error.name === 'MongooseServerSelectionError') {
      console.error('\nPossible causes:');
      console.error('1. IP address not whitelisted in MongoDB Atlas');
      console.error('2. Incorrect connection string');
      console.error('3. Network/Firewall blocking connection');
      console.error('4. MongoDB Atlas cluster is paused or deleted');
    } else if (error.message.includes('authentication')) {
      console.error('\nPossible causes:');
      console.error('1. Incorrect username or password');
      console.error('2. Special characters in password need URL encoding');
      console.error('3. Database user doesn\'t exist or lacks permissions');
    }

    console.error('\nFull Error Details:', error);
    process.exit(1);
  }
};

// Handle connection events
mongoose.connection.on('disconnected', () => {
  console.log('⚠ MongoDB disconnected');
});

mongoose.connection.on('error', (err) => {
  console.error('⚠ MongoDB connection error:', err);
});

module.exports = connectDB;
