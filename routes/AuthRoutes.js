const express = require('express');
const AuthController = require('../controllers/AuthController');
const router = express.Router();


router.post('/register', AuthController.register);// Register
router.post('/login', AuthController.login);// Login
router.post('/logout', AuthController.logout);// Logout

// Protected Route (Dashboard)
router.get('/dashboard', AuthController.dashboard);

module.exports = router;
