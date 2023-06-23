// models/Post.js
const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post

// https://stackoverflow.com/questions/36805784/how-to-join-two-collections-in-mongoose