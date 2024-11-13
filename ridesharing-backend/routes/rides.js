const express = require('express');
const Ride = require('../models/ride'); // Ensure the path to your Ride model is correct
const router = express.Router();

// Route to create a new ride request
router.post('/request', async (req, res) => {
  const { from, to, price } = req.body; // Include price in the body

  try {
    const newRide = new Ride({
      from,
      to,
      price, // Ensure price is saved in the new ride
      isBooked: false,
      status: 'available'
    });
    await newRide.save();
    res.status(201).json(newRide);
  } catch (error) {
    console.error('Error creating ride request:', error);
    res.status(500).json({ error: 'Failed to request ride' });
  }
});

// Route to get all rides
router.get('/', async (req, res) => {
  try {
    const rides = await Ride.find();
    res.json(rides);
  } catch (error) {
    console.error('Error fetching rides:', error);
    res.status(500).json({ error: 'Failed to get rides' });
  }
});

// Route to book a ride
router.post('/book/:id', async (req, res) => {
  try {
    const ride = await Ride.findById(req.params.id);
    if (!ride) {
      return res.status(404).json({ message: 'Ride not found' });
    }
    if (ride.isBooked) {
      return res.status(400).json({ message: 'Ride is already booked' });
    }

    // Mark ride as booked
    ride.isBooked = true;
    ride.status = 'booked';
    ride.bookingDate = new Date(); // Add the booking date
    await ride.save();

    res.json({ message: 'Ride successfully booked', ride });
  } catch (error) {
    console.error('Error booking ride:', error);
    res.status(500).json({ message: 'Failed to book ride' });
  }
});

// Route to show ticket for a booked ride
router.get('/ticket/:id', async (req, res) => {
  try {
    const ride = await Ride.findById(req.params.id);
    if (!ride) {
      return res.status(404).json({ message: 'Ride not found' });
    }
    if (!ride.isBooked) {
      return res.status(400).json({ message: 'Ride is not booked. No ticket available.' });
    }

    // Return ride details as ticket
    res.json({
      from: ride.from,
      to: ride.to,
      price: ride.price, // Include price in the ticket
      status: ride.status,
      bookingDate: ride.bookingDate
    });
  } catch (error) {
    console.error('Error fetching ticket:', error);
    res.status(500).json({ message: 'Failed to fetch ticket' });
  }
});

// Route to cancel a booked ride
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
    ride.bookingDate = null; // Optionally reset the booking date
    await ride.save();

    res.json({ message: 'Ride successfully cancelled', ride });
  } catch (error) {
    console.error('Error cancelling ride:', error);
    res.status(500).json({ message: 'Failed to cancel ride' });
  }
});

// Route to delete a ride (newly added)
router.delete('/:id', async (req, res) => {
  try {
    const ride = await Ride.findByIdAndDelete(req.params.id);
    if (!ride) {
      return res.status(404).json({ message: 'Ride not found' });
    }

    res.json({ message: 'Ride deleted successfully' });
  } catch (error) {
    console.error('Error deleting ride:', error);
    res.status(500).json({ message: 'Failed to delete ride' });
  }
});

module.exports = router;
