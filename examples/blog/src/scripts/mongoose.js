const mongoose = require('mongoose');

// Connection URL
const url = 'mongodb://localhost:27017/blog';

// Connect to the MongoDB server
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected successfully to the database');
  })
  .catch((err) => {
    console.error('Failed to connect to the database:', err);
  });


// User model
const User = mongoose.model('User', {
  name: String,
  email: String,
  // other user properties
});

// Post model
const Post = mongoose.model('Post', {
  title: String,
  content: String,
  // other post properties
});


// Create a new user
const newUser = new User({
  name: 'John Doe',
  email: 'john@example.com',
});
newUser.save()
  .then(() => {
    console.log('User created successfully');
  })
  .catch((err) => {
    console.error('Failed to create user:', err);
  });

// Find all users
User.find()
  .then((users) => {
    console.log('Users:', users);
  })
  .catch((err) => {
    console.error('Failed to fetch users:', err);
  });

// Create a new post
const newPost = new Post({
  title: 'My First Post',
  content: 'Hello, world!',
});
newPost.save()
  .then(() => {
    console.log('Post created successfully');
  })
  .catch((err) => {
    console.error('Failed to create post:', err);
  });

// Find all posts
Post.find()
  .then((posts) => {
    console.log('Posts:', posts);
  })
  .catch((err) => {
    console.error('Failed to fetch posts:', err);
  });


  mongoose.connection.close()
  .then(() => {
    console.log('Connection closed');
  })
  .catch((err) => {
    console.error('Failed to close connection:', err);
  });