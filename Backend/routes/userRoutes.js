const express = require('express');
const router = express.Router();
const userControllers = require('../controllers/userController'); // Ensure this path is correct
const authMiddleware = require('../middlewares/authMiddleware'); // Ensure this path is correct
const authorizeRole = require('../middlewares/authorizeRole'); // Combined role checking middleware

// Add a new user (Admin only)
router.post('users/add', authMiddleware, authorizeRole('Admin'), userControllers.addUser);

// Delete a user (Admin only)
router.delete('users/delete/:id', authMiddleware, authorizeRole('Admin'), userControllers.deleteUser);

module.exports = router;
