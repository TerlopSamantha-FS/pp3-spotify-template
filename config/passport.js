const passport = require('passport');
const SpotifyStrategy = require('passport-spotify').Strategy;
require('dotenv').config();

passport.use(new SpotifyStrategy({
  clientID: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
  callbackURL: 'http://localhost:3000/auth/spotify/callback'
}, (accessToken, refreshToken, expires_in, profile, done) => {
 
}));

module.exports = passport;
