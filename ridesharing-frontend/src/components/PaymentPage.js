import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const PaymentPage = () => {
  const [paymentMethod, setPaymentMethod] = useState('');
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [paymentSuccessful, setPaymentSuccessful] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const price = location.state?.price;

  // Calculate the updated price by multiplying by 1.23
  const updatedPrice = price ? price * 1.23 : 0;

  const handlePayment = (e) => {
    e.preventDefault();

    // Simulate a payment process
    setPaymentStatus('Payment Successful, Enjoy your ride!');
    setPaymentSuccessful(true); // Set the success state to true to trigger the redirect

    // Optionally, delay the payment process for 2 seconds
    setTimeout(() => {
      // After successful payment, navigate to the ThankYouPage
      navigate('/thankyou');
    }, 2000); // Redirect after 2 seconds
  };

  // Redirect when payment is successful
  useEffect(() => {
    if (paymentSuccessful) {
      navigate('/thankyou');
    }
  }, [paymentSuccessful, navigate]); // This effect runs when paymentSuccessful changes

  return (
    <div className="payment-page">
      <h2>Complete Payment</h2>

      {price && <p><strong>Price:</strong> ₹{updatedPrice.toFixed(2)}</p>} {/* Display updated price if available */}
      
      <form onSubmit={handlePayment}>
        <label>
          Payment Method:
          <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)} required>
            <option value="">Select a payment method</option>
            <option value="creditCard">Credit Card</option>
            <option value="paypal">PayPal</option>
            <option value="bankTransfer">Bank Transfer</option>
          </select>
        </label>
        <button type="submit">Pay Now</button>
      </form>

      {paymentStatus && <p>{paymentStatus}</p>} {/* Show payment status message */}
    </div>
  );
};

export default PaymentPage;
