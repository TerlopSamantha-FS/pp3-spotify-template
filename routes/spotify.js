const express = require('express');
const router = express.Router();
const { auth, login, status } = require('../controllers/spotifyController');

router.get('/auth', auth);
router.get('/login', login);
router.get('/status', status);

module.exports = router;
