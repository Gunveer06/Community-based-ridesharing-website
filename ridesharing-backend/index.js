// index.js (Backend Configuration)
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const rideRoutes = require('./routes/rides');
const authRoutes = require('./routes/auth'); // Import the auth routes
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

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
app.use('/api/rides', rideRoutes);
app.use('/api/auth', authRoutes); // Register the auth route

// Root endpoint
app.get('/', (req, res) => {
  res.send('Ridesharing API is running');
});

// Handle 404 for unknown routes
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
