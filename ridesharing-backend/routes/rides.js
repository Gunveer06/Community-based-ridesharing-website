const express = require('express');
const Ride = require('../models/ride');
const router = express.Router();

// Create a new ride request
router.post('/request', async (req, res) => {
  const { from, to } = req.body;
  
  try {
    const newRide = new Ride({
      from,
      to,
      isBooked: false,
      status: "available"
    });
    await newRide.save();
    res.status(201).json(newRide);
  } catch (error) {
    console.error('Error creating ride request:', error);
    res.status(500).json({ error: 'Failed to request ride' });
  }
});

// Get all rides
router.get('/', async (req, res) => {
  try {
    const rides = await Ride.find();
    res.json(rides);
  } catch (error) {
    console.error('Error fetching rides:', error);
    res.status(500).json({ error: 'Failed to get rides' });
  }
});

// Book a ride
router.post('/book/:id', async (req, res) => {
  try {
    const ride = await Ride.findById(req.params.id);
    if (!ride) {
      return res.status(404).json({ message: 'Ride not found' });
    }
    if (ride.isBooked) {
      return res.status(400).json({ message: 'Ride is already booked' });
    }

    // Mark as booked
    ride.isBooked = true;
    ride.status = 'booked';
    ride.bookingDate = new Date(); // Set the booking date
    await ride.save();

    res.json({ message: 'Ride successfully booked', ride });
  } catch (error) {
    console.error('Error booking ride:', error);
    res.status(500).json({ message: 'Failed to book ride' });
  }
});

// Show ticket for a booked ride
router.get('/ticket/:id', async (req, res) => {
  try {
    const ride = await Ride.findById(req.params.id);
    if (!ride) {
      return res.status(404).json({ message: 'Ride not found' });
    }
    if (!ride.isBooked) {
      return res.status(400).json({ message: 'Ride is not booked. No ticket available.' });
    }
    
    // Send the ride details as the ticket
    res.json({
      from: ride.from,
      to: ride.to,
      status: ride.status,
      bookingDate: ride.bookingDate
    });
  } catch (error) {
    console.error('Error fetching ticket:', error);
    res.status(500).json({ message: 'Failed to fetch ticket' });
  }
});

// Cancel a booked ride
router.post('/cancel/:id', async (req, res) => {
  try {
    const ride = await Ride.findById(req.params.id);
    if (!ride) {
      return res.status(404).json({ message: 'Ride not found' });
    }
    if (ride.status !== 'booked') {
      return res.status(400).json({ message: 'Ride is not booked or has already been cancelled' });
    }

    // Mark the ride as cancelled
    ride.isBooked = false;
    ride.status = 'cancelled';
    await ride.save();

    res.json({ message: 'Ride successfully cancelled', ride });
  } catch (error) {
    console.error('Error cancelling ride:', error);
    res.status(500).json({ message: 'Failed to cancel ride' });
  }
});

module.exports = router;
