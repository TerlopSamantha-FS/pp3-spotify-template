const axios = require('axios');
const { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, SPOTIFY_ACCESS_TOKEN } = process.env;


const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const { login, auth, status, jwtMiddleware, register } = require('./controllers/spotifyController');
const User = require('./models/user');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.get('/register', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'register.html'));
});

app.get('/auth', jwtMiddleware, auth);
app.get('/status', jwtMiddleware, status);

// Login route handling
app.post('/auth/login', async (req, res, next) => {
  try {
    const authenticated = await login(req.body.username, req.body.password);
    
    if (authenticated) {
      // Redirect to search page or any desired route
      res.redirect('/search');
    } else {
      // Redirect to error page when login fails
      res.redirect('/login.html');
    }
  } catch (error) {
    console.error('Error during login:', error);
    // Redirect to error page on error
    res.redirect('/error');
  }
});

// Route for user registration
app.post('/auth/register', register);

// Route for search page
app.get('/search', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'search.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
