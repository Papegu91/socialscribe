require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');

const User = require('./models/User');
const authRoutes = require('./routes/auth');
const newsletterRoutes = require('./routes/newsletters'); //  import newsletters

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err.message));

// Create test user once DB connection is open
mongoose.connection.once('open', async () => {
  const testEmail = 'demo@socialscribe.com';
  const testPassword = '123456';

  try {
    const existingUser = await User.findOne({ email: testEmail });

    if (!existingUser) {
      const hashedPassword = await bcrypt.hash(testPassword, 10);
      await User.create({ email: testEmail, password: hashedPassword });
      console.log(`Test user created:
   Email: ${testEmail}
   Password: ${testPassword}`);
    } else {
      console.log('Test user already exists');
    }
  } catch (err) {
    console.error('Error creating test user:', err);
  }
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/newsletters', newsletterRoutes); //  mount newsletters

// Root route
app.get('/', (req, res) => {
  res.send('SocialScribe backend is running!');
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
