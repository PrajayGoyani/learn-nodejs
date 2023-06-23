const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// Set up middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: false
  })
);

// Routes will be added later
// Login route
app.post('/login', (req, res) => {
  const { emailOrMobile, password } = req.body;

  // Here you can check the email/mobile and password against your user database
  // If they match, create a session and store the user's information
  // For simplicity, let's assume we have a dummy user with email 'test@example.com' and password 'password'
  if (emailOrMobile === 'test@example.com' && password === 'password') {
    req.session.user = {
      emailOrMobile: emailOrMobile
      // Additional user data can be stored here
    };
    res.send('Login successful');
  } else {
    res.send('Invalid email/mobile or password');
  }
});

// Logout route
app.get('/logout', (req, res) => {
  // Destroy the session and redirect the user to the login page
  req.session.destroy();
  res.redirect('/login');
});

// Serve the login page
app.get('/login', (req, res) => {
  res.sendFile(__dirname + '/src/pages/login.html');
});

// Serve the logout page
app.get('/logout', (req, res) => {
  res.sendFile(__dirname + '/src/pages/logout.html');
});

// Start the server
app.listen(port, () => console.log(`Server is running on port ${port}`));