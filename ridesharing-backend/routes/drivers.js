const express = require('express');
const Driver = require('../models/driver');
const router = express.Router();

// Get all drivers
router.get('/', async (req, res) => {
  try {
    const drivers = await Driver.find(); // Fetch drivers from the MongoDB database
    if (drivers.length === 0) {
      return res.status(404).json({ message: 'No drivers available' });
    }
    res.json(drivers); // Send drivers to the frontend
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch drivers' });
  }
});

module.exports = router;
