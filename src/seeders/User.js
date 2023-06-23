// Assuming you have already connected to MongoDB using mongoose

const User = require('../models/User');

const usersData = [
  {
    name: 'John Doe',
    email: 'john@example.com',
    age: 30
  },
  {
    name: 'Jane Smith',
    email: 'jane@example.com',
    age: 28
  },
  // Add more user objects as needed
];

const seedUsers = async () => {
  try {
    // Remove existing users
    await User.deleteMany({});

    // Insert new users
    await User.insertMany(usersData);

    console.log('Users seeded successfully!');
  } catch (error) {
    throw error;
  }
};

module.exports = seedUsers;
