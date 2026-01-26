const express = require('express');
const router = express.Router();

// Simple login route for testing
router.post('/login', (req, res) => {
  const { email, password } = req.body;
  console.log('Login attempt:', email, password);

  // Dummy credentials for testing
  if (email === 'demo@test.com' && password === 'demo123') {
    return res.json({ token: 'test-token' });
  }

  res.status(401).json({ message: 'Invalid credentials' });
});

module.exports = router;
