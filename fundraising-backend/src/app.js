const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const campaignRoutes = require('./routes/campaignRoutes');
const donationRoutes = require('./routes/donationRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();

// CORS - Allow Vercel frontend
const corsOptions = {
  origin: [
    'http://localhost:5173',
    'http://localhost:3000',
    'https://fundrise-umber.vercel.app',
    /\.vercel\.app$/
  ],
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json());

// Health check
app.get('/', (req, res) => {
  res.json({
    message: 'FundRaise API is running!',
    status: 'healthy',
    timestamp: new Date().toISOString()
  });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/campaigns', campaignRoutes);
app.use('/api/donations', donationRoutes);
app.use('/api/users', userRoutes);

module.exports = app;
