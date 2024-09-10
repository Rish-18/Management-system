const express = require('express');
const router = express.Router();
const authControllers = require('../controllers/authController'); 
const authMiddleware = require('../middlewares/authMiddleware'); 

router.post('/register', authControllers.register);

router.post('/login', authControllers.login);

module.exports = router;
