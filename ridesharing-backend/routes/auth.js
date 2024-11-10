const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

// Secret key for JWT (use environment variables in production)
const SECRET_KEY = "your_jwt_secret_key";

// Mock users data
const users = [
  { username: "testuser", password: "password123" },
  { username: "user1", password: "pass1" },
  { username: "user2", password: "pass2" },
  { username: "user3", password: "pass3" },
  { username: "user4", password: "pass4" },
  { username: "user5", password: "pass5" }
];

// Login route
router.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Check if the user exists
  const user = users.find(u => u.username === username && u.password === password);
  
  if (user) {
    // Generate JWT token
    const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' });
    res.json({ message: "Login successful", token });
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
});

module.exports = router;
