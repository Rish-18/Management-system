const express = require('express');
const router = express.Router();
const userControllers = require('../controllers/userController'); 
const authMiddleware = require('../middlewares/authMiddleware'); 
const authorizeRole = require('../middlewares/authorizeRole'); 


router.post('/users/add', authMiddleware, authorizeRole('Admin'), userControllers.addUser); 
router.delete('/users/delete/:id', authMiddleware, authorizeRole('Admin'), userControllers.deleteUser);

router.get('/users', authMiddleware, authorizeRole('Admin'), userControllers.getUsers);

module.exports = router;
