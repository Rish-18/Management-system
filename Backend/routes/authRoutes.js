const express = require('express');
const router = express.Router();
const authControllers = require('../controllers/authController'); // Ensure this path is correct
const authMiddleware = require('../middlewares/authMiddleware'); // Ensure this path is correct

// Register a new user
router.post('/register', authControllers.register);

// Login a user
router.post('/login', authControllers.login);

module.exports = router;
