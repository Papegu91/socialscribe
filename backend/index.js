// backend/index.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const http = require('http');
const WebSocket = require('ws');

dotenv.config();

const app = express();
const server = http.createServer(app); // Needed for WebSocket
const wss = new WebSocket.Server({ server, path: '/ws' }); // WebSocket server

app.use(cors());
app.use(express.json());

// === Mongoose User model ===
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const User = mongoose.model('User', userSchema);

// === Connect to MongoDB ===
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/socialscribe', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB connected'))
.catch((err) => console.error('❌ MongoDB error:', err));

// === Auth routes ===

// Register new user
app.post('/api/register', async (req, res) => {
  const { email, password } = req.body;

  try {
    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: 'User already exists' });

    const hashed = await bcrypt.hash(password, 10);
    const newUser = new User({ email, password: hashed });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Login
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'defaultsecret', {
      expiresIn: '1d',
    });

    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// ✅ Newsletter routes
app.use('/api/newsletters', require('./routes/newsletters'));

// === WebSocket connection ===
wss.on('connection', (ws) => {
  console.log('🔌 WebSocket connected');
  ws.send('Welcome to WebSocket');

  ws.on('message', (msg) => {
    console.log('📨 Message:', msg);
    ws.send(`Echo: ${msg}`);
  });

  ws.on('close', () => {
    console.log('❌ WebSocket disconnected');
  });
});

// === Start server ===
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
