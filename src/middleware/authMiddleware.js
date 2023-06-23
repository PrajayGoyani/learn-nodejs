// middleware/authMiddleware.js

const authMiddleware = (req, res, next) => {
  if (!req.session.isLoggedIn) {
    return res.redirect('/login'); // Redirect to login if not logged in
  }
  next();
};

module.exports = authMiddleware;
