const express = require('express');
const { User } = require('../models/user');
const { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET } = process.env;

const basicAuth = 'Basic ' + (Buffer.from(SPOTIFY_CLIENT_ID + ':' + SPOTIFY_CLIENT_SECRET).toString('base64'));
const redirect_uri = 'http://localhost:3000/spotify/auth';
const now = new Date().getTime();

// Function to request Spotify token
const requestToken = (code, grant_type, token) => {
  let data = (grant_type === "refresh_token")
    ? qs.stringify({ refresh_token: code, grant_type })
    : qs.stringify({ code, grant_type, redirect_uri });

  return axios({
    method: 'POST',
    url: 'https://accounts.spotify.com/api/token',
    data,
    headers: {
      'Authorization': basicAuth,
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  }).then(({ data }) => {
    data.expires_in = new Date().getTime() + data.expires_in;
    token.update(data);
    return token.save();
  }).catch((error) => {
    console.error('Error requesting token:', error);
    return false;
  });
};

// Middleware to handle JWT validation/refresh
const jwtMiddleware = async (req, res, next) => {
  req.token = await SpotifyToken.findOne({ where: {} });

  if (!req.token && !req.query.code) {
    return next();
  }

  if (!req.token && req.query.code) {
    req.token = await requestToken(req.query.code, 'authorization_code', SpotifyToken.build({}));
  } else if (now > req.token.expires_in) {
    req.token = await requestToken(req.token.refresh_token, 'refresh_token', req.token);
  }

  if (!req.token) {
    return res.status(401).json({ error: 'JWT could not be requested' });
  }

  return next();
};

// Endpoint to check authentication status
const auth = async (req, res) => {
  if (req.token) {
    res.redirect('/');
  } else {
    res.redirect('/login.html');
  }
};

// Endpoint to check JWT status
const status = async (req, res) => {
  const valid = (req.token && req.token.expires_in > now) ? true : false;
  res.json({ valid });
};

// Endpoint to initiate Spotify login
const login = async (username, password) => {
  try {
    const authenticated = true;

    return authenticated;
  } catch (error) {
    console.error('Error during login:', error);
    throw error;
  }
};

// Endpoint to register a new user
const register = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    // Create user in the database
    const newUser = await User.create({ email, password });
    console.log('User created:', newUser.email); 
    res.status(201).json(newUser);
  } catch (error) {
    console.error('Error creating user:', error);

    // Handle Sequelize validation errors
    if (error.name === 'SequelizeValidationError') {
      return res.status(400).json({ error: error.message });
    }

    res.status(500).json({ error: 'Registration failed' });
  }
};

module.exports = {
  login,
  auth,
  status,
  jwtMiddleware,
  register
};
