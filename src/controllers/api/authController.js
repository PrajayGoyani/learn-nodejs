const User = require('../../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const authController = {
  login: async (req, res) => {
    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email });

      if (!user) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }

      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }

      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

      res.json({ token });
    } catch (error) {
      console.error(error);
      res.status(500).json(error.message);
    }
  },

  register: async (req, res) => {
    const { firstName, lastName, email, password } = req.body;

    try {
      const existingUser = await User.findOne({ email });

      if (existingUser) {
        return res.status(409).json({ error: 'Email already registered' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = new User({
        firstName,
        lastName,
        email,
        password: hashedPassword
      });

      await newUser.save();

      const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, { expiresIn: '30d' });

      res.json({ token });
    } catch (error) {
      console.error(error);
      res.status(500).json(error.message);
    }
  },
  
}


module.exports = authController;
