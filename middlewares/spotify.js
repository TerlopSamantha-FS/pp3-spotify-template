const express = require('express');
const router = express.Router();
const inMemoryStorage = require('../inMemoryStorage');

router.use((req, res, next) => {
  const token = req.headers['authorization'];

  if (token && inMemoryStorage[token]) {
    res.locals.isLoggedIn = true;
    next();
  } else {
    res.locals.isLoggedIn = false;
    next();
  }
});

router.get('/status', (req, res) => {
  res.json({ isLoggedIn: res.locals.isLoggedIn });
});

module.exports = router;
