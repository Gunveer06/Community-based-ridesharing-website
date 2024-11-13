// models/ride.js
const mongoose = require('mongoose');

const rideSchema = new mongoose.Schema({
  from: { type: String, required: true },
  to: { type: String, required: true },
  price: { type: Number, required: true }, // Add price field
  isBooked: { type: Boolean, default: false },
  status: { type: String, enum: ['available', 'booked', 'cancelled'], default: 'available' },
  bookingDate: { type: Date, default: null }
});

const Ride = mongoose.model('Ride', rideSchema);
module.exports = Ride;
