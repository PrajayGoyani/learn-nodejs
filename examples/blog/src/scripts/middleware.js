const express = require('express');
const app = express();

// Validation middleware
const validateRequest = (req, res, next) => {
  // Perform validation logic
  const { name, email, age } = req.body;

  // Check if required fields are present
  if (!name || !email || !age) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  // Check if age is a valid number
  if (isNaN(age)) {
    return res.status(400).json({ error: 'Age must be a valid number' });
  }

  // Validation passed, proceed to next middleware
  next();
};

// Route that requires validation
app.post('/users', validateRequest, (req, res) => {
  // Create a new user based on validated request data
  const { name, email, age } = req.body;
  // ... create user logic here

  // Send response
  res.status(201).json({ message: 'User created successfully' });
});

// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});