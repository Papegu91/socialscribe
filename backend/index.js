const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.post('/api/login', (req, res) => {
  
  res.json({ message: 'Login successful' });
});


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
