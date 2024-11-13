const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const rideRoutes = require('./routes/rides'); // Import the ride routes
const authRoutes = require('./routes/auth'); // Import the auth routes
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // For parsing application/json

// Check if MONGO_URI is defined
if (!process.env.MONGO_URI) {
  console.error("MONGO_URI is not defined. Please check your .env file.");
  process.exit(1);
}

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected successfully"))
  .catch(err => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });

// Routes
app.use('/api/rides', rideRoutes);  // All ride-related routes (GET, POST, DELETE)
app.use('/api/auth', authRoutes);   // Authentication routes

// Root endpoint
app.get('/', (req, res) => {
  res.send('Ridesharing API is running');
});

// Handle 404 for unknown routes
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
