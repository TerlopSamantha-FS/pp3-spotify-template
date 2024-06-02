const express = require('express');
const passport = require('passport');
const SpotifyStrategy = require('passport-spotify').Strategy;
const inMemoryStorage = require('../inMemoryStorage'); // Adjust path as needed
const authController = require('../controllers/authController'); // Adjust path as needed
require('dotenv').config();

const router = express.Router();

// Spotify authentication strategy setup
passport.use(new SpotifyStrategy({
  clientID: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
  callbackURL: 'http://localhost:3000/auth/spotify/callback'
},
(accessToken, refreshToken, expires_in, profile, done) => {
  const token = accessToken;
  inMemoryStorage[token] = { refreshToken, expires_in, profile };
  return done(null, profile);
}));

// Routes for Spotify authentication
router.get('/spotify', passport.authenticate('spotify'));

router.get('/spotify/callback',
  passport.authenticate('spotify', { failureRedirect: '/login' }),
  (req, res) => {
    // Successful authentication, redirect home.
    res.redirect('/');
  });

// Route for user registration
router.post('/register', authController.register);

module.exports = router;
