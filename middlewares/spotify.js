const express = require('express');
const spotify = express.Router();
const spotifyCtrl = require('../controllers/spotifyController');

spotify.get('/login', spotifyCtrl.login);
spotify.get('/auth', spotifyCtrl.jwtMiddleware, spotifyCtrl.auth);
spotify.get('/token', spotifyCtrl.jwtMiddleware, spotifyCtrl.status);
spotify.get('/status', spotifyCtrl.jwtMiddleware, spotifyCtrl.status);spotify.get('/search', spotifyCtrl.jwtMiddleware, spotifyCtrl.search);

module.exports = spotify;
