import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RideList from './components/RideList';
import RideForm from './components/RideForm';
import Login from './components/Login';
import PaymentPage from './components/PaymentPage';
import RideTicket from './components/RideTicket';
import PaymentReceipt from './components/PaymentReciept';
import ThankYouPage from './components/ThankYouPage';
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if there's a valid token in localStorage
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
            {/* Render Login or RideManagement based on authentication status */}
            <Route path="/" element={!isAuthenticated ? <Login onLogin={handleLogin} /> : <RideManagement />} />
            <Route path="/rides" element={isAuthenticated ? <RideManagement /> : <Login onLogin={handleLogin} />} />
            <Route path="/payment" element={isAuthenticated ? <PaymentPage /> : <Login onLogin={handleLogin} />} />
            <Route path="/thankyou" element={isAuthenticated ? <ThankYouPage /> : <Login onLogin={handleLogin} />} />
            <Route path="/receipt" element={isAuthenticated ? <PaymentReceipt /> : <Login onLogin={handleLogin} />} />
            <Route path="/ticket/:rideId" element={isAuthenticated ? <RideTicket /> : <Login onLogin={handleLogin} />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

// Component for managing rides (includes both the RideForm and RideList components)
const RideManagement = () => (
  <div>
    <RideForm />
    <RideList />
  </div>
);

export default App;
