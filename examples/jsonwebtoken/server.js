const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// Set up middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Secret key for JWT
const secretKey = 'hello@123';

// Middleware for token verification
const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    // Pass the decoded user information to the next middleware
    req.user = decoded.user;
    next();
  });
};

const users = [
  { id: 1, email: 'test@example.com', mobile: '1234567890', password: '$2b$10$j4OShSvlVsXfTcr9mft3F.9DWW5Kce4BwjXw09m.2t04eb5RTV.A.' } // Hashed password: 'password'
];
// Routes will be added later
app.post('/login', (req, res) => {
  const { emailOrMobile, password } = req.body;

  // Find the user based on email or mobile
  const user = users.find(u => u.email === emailOrMobile || u.mobile === emailOrMobile);

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  // Compare the provided password with the stored hashed password
  bcrypt.compare(password, user.password, (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Server error' });
    }

    if (!result) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    // Create and sign a JWT token
    const token = jwt.sign({ user: user }, secretKey, { expiresIn: '1h' });

    // Return the token as a response
    res.json({ token: token });
  });
});


app.get('/protected', verifyToken, (req, res) => {
  // Accessible only with a valid token
  res.json({ message: 'Protected route accessed successfully' });
});

// Start the server
app.listen(port, () => console.log(`Server is running on port ${port}`));

