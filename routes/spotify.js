const express = require('express');
const axios = require('axios');
require('dotenv').config();
const { auth, login, status, jwtMiddleware } = require('../controllers/spotifyController');

const router = express.Router();

// Route for Spotify authentication
router.get('/auth', jwtMiddleware, auth);

// Route for user login
router.get('/login', login);

// Route for checking user status
router.get('/status', jwtMiddleware, status);

// Example route to fetch music data from Spotify
router.get('/search', async (req, res) => {
  const { query } = req.query; 
  const accessToken = 'SPOTIFY_ACCESS_TOKEN';
  const headers = {
    'Authorization': `Bearer ${accessToken}`,
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'User-Agent': 'axios/1.7.2',
    'Accept-Encoding': 'gzip, compress, deflate, br'
  };

  try {
    const response = await axios.get(`https://api.spotify.com/v1/search?q=${query}&type=track`, { headers });
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching music:', error);
    res.status(500).json({ error: 'Failed to fetch music from Spotify' });
  }
});

module.exports = router;
