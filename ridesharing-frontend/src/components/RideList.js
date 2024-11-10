import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate hook
import axios from 'axios';

const RideList = () => {
  const [rides, setRides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Hook to navigate to other pages

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
        navigate('/payment', { state: { price } }); // Pass the price to PaymentPage
        fetchRides(); // Refresh the ride list
      } catch (error) {
        console.error('Error booking ride:', error);
        alert(error.response?.data?.message || 'Error booking ride. Please try again.');
      }
    }
  };

  const showReceipt = (rideId, price) => {
    // Navigate to the payment receipt page when 'Show Receipt' is clicked
    navigate('/receipt', { state: { rideId, price } });
  };

  const showTicket = (rideId) => {
    // Navigate to the ticket details page when 'Show Ticket' is clicked
    navigate(`/ticket/${rideId}`);
  };

  if (loading) return <p>Loading rides...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Available Rides</h2>
      <ul>
        {rides.map((ride) => (
          <li key={ride._id}>
            <strong>From:</strong> {ride.from} <strong>To:</strong> {ride.to} <br />
            <strong>Price:</strong> ₹{ride.price} <br />
            <button
              onClick={() => bookRide(ride._id, ride.price)} // Pass the price to the function
              disabled={ride.status === 'booked'}
              className="book"
            >
              {ride.status === 'booked' ? 'Already Booked' : 'Book Ride'}
            </button>
            {ride.status === 'booked' && (
              <div>
                <button 
                  onClick={() => showTicket(ride._id)} 
                  className="ticket"
                >
                  Show Ticket
                </button>
                <button 
                  onClick={() => showReceipt(ride._id, ride.price)} 
                  className="receipt"
                >
                  Show Receipt
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RideList;
