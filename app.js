const express = require('express');
const passport = require('passport');
const authRoutes = require('./routes/auth'); // Import the auth routes
const spotifyRoutes = require('./middlewares/spotify'); // Import the spotify middleware
require('dotenv').config();

const app = express();

// Initialize passport for authentication
app.use(passport.initialize());

// Mount authentication routes
app.use('/auth', authRoutes);

// Mount spotify routes
app.use('/spotify', spotifyRoutes);

// Welcome route
app.get('/', (req, res) => {
  res.send('Welcome to the Spotify API integration!');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
