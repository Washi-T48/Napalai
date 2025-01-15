const express = require('express');
const AuthController = require('../controllers/AuthController');
const router = express.Router();

// Register
router.post('/register', AuthController.register);

// Login
router.post('/login', AuthController.login);

// Logout
router.post('/logout', AuthController.logout);

// Protected Route (Dashboard)
router.get('/dashboard', AuthController.dashboard);

module.exports = router;
