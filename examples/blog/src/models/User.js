const mongoose = require("mongoose");

// User Schema
const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    maxlength: 255,
  },
  lastName: {
    type: String,
    required: true,
    maxlength: 255,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    maxlength: 255,
  },
  password: {
    type: String,
    required: true,
    maxlength: 255,
  },
});

userSchema.virtual('fullName').
  get(function() { return `${this.firstName} ${this.lastName}`; }).
  set(function(v) {
    const firstName = v.substring(0, v.indexOf(' '));
    const lastName = v.substring(v.indexOf(' ') + 1);
    this.set({ firstName, lastName });
  });