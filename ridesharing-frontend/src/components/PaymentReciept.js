import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const PaymentReceipt = () => {
  const location = useLocation(); // Get the passed state from navigation
  const navigate = useNavigate(); // Hook for navigation
  const { rideId, price } = location.state || {}; // Get rideId and price passed from RideList

  if (!price) {
    return <p>No payment details available.</p>;
  }

  // Define additional charges
  const taxRate = 0.18; // 18% tax
  const convenienceFeeRate = 0.05; // 5% convenience fee

  const taxAmount = price * taxRate;
  const convenienceFee = price * convenienceFeeRate;
  const totalAmount = price + taxAmount + convenienceFee;

  return (
    <div className="payment-receipt">
      <h2>Payment Receipt</h2>
      <p><strong>Ride ID:</strong> {rideId}</p>
      <p><strong>Base Price:</strong> ₹{price}</p>
      <p><strong>Tax (18%):</strong> ₹{taxAmount.toFixed(2)}</p>
      <p><strong>Convenience Fee (5%):</strong> ₹{convenienceFee.toFixed(2)}</p>
      <p><strong>Total Amount:</strong> ₹{totalAmount.toFixed(2)}</p>
      
      <button 
        onClick={() => navigate('/rides')} 
        style={{ backgroundColor: '#6f7300', padding: '10px 20px', marginTop: '20px' }}
      >
        Back to Ride List
      </button>
    </div>
  );
};

export default PaymentReceipt;
