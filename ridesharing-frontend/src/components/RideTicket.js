import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom'; // Import useParams and useNavigate

const RideTicket = () => {
  const { rideId } = useParams(); // Get the rideId from the URL
  const navigate = useNavigate(); // Hook to navigate to other pages
  const [ticket, setTicket] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTicket = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/rides/ticket/${rideId}`);
        setTicket(response.data);
      } catch (error) {
        setError('Failed to load ticket. Please try again.');
      }
    };

    fetchTicket();
  }, [rideId]);

  const cancelTicket = async () => {
    if (window.confirm('Are you sure you want to cancel this ticket?')) {
      try {
        await axios.post(`http://localhost:5000/api/rides/cancel/${rideId}`);
        alert('Ticket successfully cancelled');
      } catch (error) {
        setError('Failed to cancel ticket. Please try again.');
        console.error('Error cancelling ticket:', error);
      }
    }
  };

  const closeTicket = () => {
    // Navigate back to the RideList page when the "Close Ticket" button is clicked
    navigate('/rides');
  };

  if (error) {
    return (
      <div className="ticket">
        <p>{error}</p>
        <button onClick={closeTicket}>Close Ticket</button>
      </div>
    );
  }

  if (!ticket) {
    return <p>Loading ticket...</p>;
  }

  return (
    <div className="ticket">
      <h2>Ride Ticket</h2>
      <p><strong>From:</strong> {ticket.from}</p>
      <p><strong>To:</strong> {ticket.to}</p>
      <p><strong>Status:</strong> {ticket.status.charAt(0).toUpperCase() + ticket.status.slice(1)}</p>

      <button onClick={cancelTicket} style={{ backgroundColor: '#f44336', marginTop: '10px' }}>
        Cancel Ticket
      </button>

      <button onClick={closeTicket} style={{ backgroundColor: '#6f7300', marginTop: '20px' }}>
        Close Ticket
      </button>
    </div>
  );
};

export default RideTicket;
