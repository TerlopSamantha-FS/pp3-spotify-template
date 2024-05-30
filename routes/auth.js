const express = require('express');
const passport = require('passport');
const router = express.Router();

router.get('/spotify', passport.authenticate('spotify', {
  scope: ['user-read-email', 'user-read-private']
}));

router.get('/spotify/callback', passport.authenticate('spotify', { failureRedirect: '/login' }), (req, res) => {
  res.redirect('/');
});

module.exports = router;
