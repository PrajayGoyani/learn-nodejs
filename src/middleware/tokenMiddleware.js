const jwt = require('jsonwebtoken');

const validateToken = (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ error: 'Token not provided' });
  }

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decodedToken;
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ error: 'Invalid token' });
  }
};

module.exports = { validateToken };
