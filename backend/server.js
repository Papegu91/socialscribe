require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const User = require('./models/User'); // Make sure this path is correct

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log(' Connected to MongoDB');
})
.catch((err) => {
  console.error(' MongoDB connection error:', err.message);
});

//  Create test user after DB connection is open
mongoose.connection.once('open', async () => {
  const testEmail = 'demo@socialscribe.com';
  const testPassword = '123456';

  try {
    const existingUser = await User.findOne({ email: testEmail });

    if (!existingUser) {
      await User.create({ email: testEmail, password: testPassword });
      console.log(` Test user created:\n   Email: ${testEmail}\n   Password: ${testPassword}`);
    } else {
      console.log('Test user already exists');
    }
  } catch (err) {
    console.error(' Error creating test user:', err);
  }
});

// Routes
app.get('/', (req, res) => {
  res.send(' SocialScribe backend is running!');
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    if (user.password !== password) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    res.status(200).json({ message: 'Login successful' });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

app.post('/signup', async (req, res) => {
  const { email, password } = req.body;

  try {
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(409).json({ message: 'User already exists' });
    }

    await User.create({ email, password });
    res.status(201).json({ message: 'User created' });
  } catch (err) {
    console.error('Signup error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(` Server running on port ${PORT}`);
});
