// config/session.js

const session = require('express-session');
const sessionMiddleware = session({
  secret: process.env.SESS_SECRET,
  resave: false,
  saveUninitialized: false
});

module.exports = sessionMiddleware;

// https://stackoverflow.com/questions/11826792/node-express-session-expiration