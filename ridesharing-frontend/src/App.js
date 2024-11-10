import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RideList from './components/RideList';
import RideForm from './components/RideForm';
import Login from './components/Login';
import PaymentPage from './components/PaymentPage';
import RideTicket from './components/RideTicket'; // Import RideTicket for the new route
import PaymentReceipt from './components/PaymentReciept'; // Import PaymentReceipt
import ThankYouPage from './components/ThankYouPage'; // Import ThankYouPage
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <div className="App">
        <header>
          <h1>Community Ridesharing</h1>
          {isAuthenticated && (
            <button onClick={handleLogout} style={{ backgroundColor: 'red', color: 'white' }}>
              Logout
            </button>
          )}
        </header>
        <main>
          <Routes>
            <Route path="/" element={!isAuthenticated ? <Login onLogin={handleLogin} /> : <RideManagement />} />
            <Route path="/rides" element={isAuthenticated ? <RideManagement /> : <Login onLogin={handleLogin} />} />
            <Route path="/payment" element={isAuthenticated ? <PaymentPage /> : <Login onLogin={handleLogin} />} />
            <Route path="/thankyou" element={isAuthenticated ? <ThankYouPage /> : <Login onLogin={handleLogin} />} />
            <Route path="/receipt" element={isAuthenticated ? <PaymentReceipt /> : <Login onLogin={handleLogin} />} />
            <Route path="/ticket/:rideId" element={isAuthenticated ? <RideTicketPage /> : <Login onLogin={handleLogin} />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

const RideManagement = () => {
  return (
    <div>
      <RideForm />
      <RideList />
    </div>
  );
};

// New page component for ticket details
const RideTicketPage = () => {
  return <RideTicket />; // Rendering the RideTicket component here
};

export default App;
