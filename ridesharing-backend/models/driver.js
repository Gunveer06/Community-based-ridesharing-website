const mongoose = require('mongoose');

const driverSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  // Add any additional fields you need
});

const Driver = mongoose.model('Driver', driverSchema);
module.exports = Driver;
