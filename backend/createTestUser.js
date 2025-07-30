require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('MongoDB connection error:', err.message);
});

mongoose.connection.once('open', async () => {
  const testEmail = 'demo@socialscribe.com';
  const testPassword = '123456';

  try {
    const existingUser = await User.findOne({ email: testEmail });

    if (!existingUser) {
      const hashedPassword = await bcrypt.hash(testPassword, 10);
      await User.create({ email: testEmail, password: hashedPassword });
      console.log(` Test user created:
  Email: ${testEmail}
  Password: ${testPassword}`);
    } else {
      console.log(' Test user already exists');
    }
  } catch (err) {
    console.error(' Error creating test user:', err);
  } finally {
    mongoose.disconnect();
  }
});
