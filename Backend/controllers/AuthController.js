const bcrypt = require('bcrypt');
const passport = require('passport');
const User = require('../models/User'); // ตรวจสอบให้แน่ใจว่า Model User ถูกต้อง

const AuthController = {
  register: async (req, res) => {
    const { username, password } = req.body;

    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await User.create({ username, password: hashedPassword });
      res.status(201).json({ message: 'User registered successfully', user: newUser });
    } catch (error) {
      res.status(500).json({ message: 'Failed to register user', error: error.message });
    }
  },

  login: (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
      if (err) return next(err);
      if (!user) return res.status(401).json({ message: info.message });
      req.login(user, (err) => {
        if (err) return next(err);
        res.status(200).json({ message: 'Login successful', user });
      });
    })(req, res, next);
  },

  logout: (req, res) => {
    req.logout((err) => {
      if (err) {
        return res.status(500).json({ message: 'Failed to logout', error: err });
      }
      res.status(200).json({ message: 'Logged out successfully' });
    });
  },

  dashboard: (req, res) => {
    if (req.isAuthenticated()) {
      res.status(200).json({ message: 'Welcome to Dashboard', user: req.user });
    } else {
      res.status(401).json({ message: 'Unauthorized' });
    }
  },
};

module.exports = AuthController;
