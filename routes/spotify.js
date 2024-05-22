const express = require('express');
const router = express.Router();
const { search, auth, login, status, jwtMiddleware } = require('../controllers/spotifyController');

router.get('/search', jwtMiddleware, search);
router.get('/auth', jwtMiddleware, auth);
router.get('/login', login);
router.get('/status', jwtMiddleware, status);

module.exports = router;
