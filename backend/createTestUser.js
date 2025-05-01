require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User'); // Import the User model

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(async () => {
  const user = new User({
    username: 'test@example.com',
    password: '123456',  
  });

  await user.save();
  console.log(' Test user created');
  mongoose.disconnect();
}).catch(err => console.error(err));
