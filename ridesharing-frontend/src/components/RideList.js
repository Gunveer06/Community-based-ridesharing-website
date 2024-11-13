import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// Import components
import RideForm from './RideForm'; // Import RideForm component
import TicketIcon from '../assets/icons/showticket.svg';
import ReceiptIcon from '../assets/icons/showreceipt.svg';


const RideList = () => {
  const [rides, setRides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchRides = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:5000/api/rides');
      setRides(response.data);
      setError(null);
    } catch (error) {
      setError('Error fetching rides. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRides();
  }, []);

  const bookRide = async (id, price) => {
    if (window.confirm('Are you sure you want to book this ride?')) {
      try {
        await axios.post(`http://localhost:5000/api/rides/book/${id}`);
        navigate('/payment', { state: { price } });
        fetchRides();
      } catch (error) {
        console.error('Error booking ride:', error);
        alert(error.response?.data?.message || 'Error booking ride. Please try again.');
      }
    }
  };

  const showReceipt = (rideId, price) => {
    navigate('/receipt', { state: { rideId, price } });
  };

  const showTicket = (rideId) => {
    navigate(`/ticket/${rideId}`);
  };

  const deleteRide = async (id) => {
    if (window.confirm('Are you sure you want to delete this ride?')) {
      try {
        await axios.delete(`http://localhost:5000/api/rides/${id}`);
        fetchRides();  // Re-fetch the ride list after deleting the ride
      } catch (error) {
        console.error('Error deleting ride:', error);
        alert('Failed to delete ride. Please try again.');
      }
    }
  };

  if (loading) return <p>Loading rides...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Available Rides</h2>
      <RideForm fetchRides={fetchRides} /> {/* Pass fetchRides as a prop to RideForm */}
      <ul>
        {rides.map((ride) => (
          <li key={ride._id}>
            <strong>From:</strong> {ride.from} <strong>To:</strong> {ride.to} <br />
            <strong>Price:</strong> ₹{ride.price} <br />
            <div className="button-container">
              <button
                onClick={() => bookRide(ride._id, ride.price)}
                disabled={ride.status === 'booked'}
                className="book"
              >
                {ride.status === 'booked' ? 'Already Booked' : 'Book Ride'}
              </button>
              {ride.status === 'booked' && (
                <>
                  <button 
                    onClick={() => showTicket(ride._id)} 
                    className="ticket"
                  >
                    <img src={TicketIcon} alt="Ticket Icon" style={{ width: '40px', marginRight: '8px' }} />
                  </button>
                  <button 
                    onClick={() => showReceipt(ride._id, ride.price)} 
                    className="receipt"
                  >
                    <img src={ReceiptIcon} alt="Receipt Icon" style={{ width: '50px', marginRight: '8px' }} />
                  </button>
                  <button 
                    onClick={() => deleteRide(ride._id)} 
                    className="delete"
                  >
                    Delete Ride
                  </button>
                </>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RideList;
