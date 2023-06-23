const mongoose = require('mongoose');
const { Schema } = mongoose;

// const options = { versionKey: false,timestamps: true, }

const BlogSchema = new Schema({
  title: {
    type: String,
    required: true,
    maxlength: 255,
  },
  author: {
    type: String,
    required: true,
    maxlength: 255,
  },
  body: {
    type: String,
    required: true,
  },
  comments: [
    { body: String, date: Date },
  ],
  date: {
    type: Date,
    default: Date.now
  },
  hidden: Boolean,
  meta: {
    votes: Number,
    favs: Number
  }
}, /*options*/);


BlogSchema.virtual('fullTitle').get(_ => `${this.title} (${this.author})`);

const Blog = mongoose.model("Blog", BlogSchema);
module.exports = Blog;