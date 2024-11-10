
import React, { useEffect, useState } from 'react';
import RideList from './RideList';
import RideForm from './RideForm';
import axios from 'axios';

const RideManagement = () => {
  const [rides, setRides] = useState([]);

  const fetchRides = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/rides');
      setRides(response.data);
    } catch (error) {
      console.error('Error fetching rides:', error);
    }
  };

  useEffect(() => {
    fetchRides(); // Fetch rides on initial load
  }, []);

  return (
    <div>
      <RideForm fetchRides={fetchRides} />
      <RideList fetchRides={fetchRides} />
    </div>
  );
};

export default RideManagement;
