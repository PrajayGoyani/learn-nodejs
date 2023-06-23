// models/User.js

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true, maxlength: 255 },
  lastName: { type: String, required: true, maxlength: 255 },
  email: { type: String, required: true, unique: true, maxlength: 255 },
  password: { type: String, required: true, maxlength: 255 },
});

const User = mongoose.model('User', userSchema);

module.exports = User;