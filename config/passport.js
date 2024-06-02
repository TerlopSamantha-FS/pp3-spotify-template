const passport = require('passport');
const SpotifyStrategy = require('passport-spotify').Strategy;
const inMemoryStorage = require('../inMemoryStorage');
require('dotenv').config();

passport.use(new SpotifyStrategy({
  clientID: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
  callbackURL: 'http://localhost:3000/auth/spotify/callback'
}, (accessToken, refreshToken, expires_in, profile, done) => {
  inMemoryStorage[accessToken] = { refreshToken, expires_in, profile };
  return done(null, profile);
}));

module.exports = passport;
