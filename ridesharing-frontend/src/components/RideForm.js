import React, { useState } from 'react';
import axios from 'axios';

const RideForm = () => {
  const [rideData, setRideData] = useState({ from: '', to: '', price: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRideData({
      ...rideData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Ensure price is included when requesting the ride
      await axios.post('http://localhost:5000/api/rides/request', rideData);
      alert('Ride requested successfully!');
      setRideData({ from: '', to: '', price: '' }); // Reset the form
    } catch (error) {
      console.error('Error requesting ride:', error);
      alert('Failed to request ride. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Request a New Ride</h2>
      <label>
        From: 
        <input 
          type="text" 
          name="from" 
          value={rideData.from} 
          onChange={handleChange} 
          required 
        />
      </label>
      <label>
        To: 
        <input 
          type="text" 
          name="to" 
          value={rideData.to} 
          onChange={handleChange} 
          required 
        />
      </label>
      <label>
        Price: 
        <input 
          type="number" 
          name="price" 
          value={rideData.price} 
          onChange={handleChange} 
          required 
        />
      </label>
      <button type="submit">Request Ride</button>
    </form>
  );
};

export default RideForm;
