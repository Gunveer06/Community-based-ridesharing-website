import React, { useState } from 'react';
import axios from 'axios';

const CreateRideForm = () => {
  const [rideDetails, setRideDetails] = useState({
    from: '',
    to: '',
    price: '',
    driverName: '',
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setRideDetails({
      ...rideDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/rides/create', rideDetails);
      setMessage(response.data.message);
      setRideDetails({ from: '', to: '', price: '', driverName: '' });
    } catch (error) {
      setMessage('Failed to create ride. Please try again.');
    }
  };

  return (
    <div>
      <h2>Create a New Ride</h2>
      <form onSubmit={handleSubmit}>
        <label>
          From:
          <input type="text" name="from" value={rideDetails.from} onChange={handleChange} required />
        </label>
        <label>
          To:
          <input type="text" name="to" value={rideDetails.to} onChange={handleChange} required />
        </label>
        <label>
          Price:
          <input type="number" name="price" value={rideDetails.price} onChange={handleChange} required />
        </label>
        <label>
          Driver Name:
          <input type="text" name="driverName" value={rideDetails.driverName} onChange={handleChange} required />
        </label>
        <button type="submit">Create Ride</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default CreateRideForm;
