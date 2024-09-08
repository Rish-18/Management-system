const express = require('express');
const router = express.Router();
const productControllers = require('../controllers/productController');
const authorizeRole = require('../middlewares/authorizeRole');

// Admin can add/remove users
const userControllers = require('../controllers/userController'); // Make sure this is correctly imported

// Admin-specific routes
router.post("/users/add", authorizeRole('Admin'), userControllers.addUser);
router.delete("/users/delete/:id", authorizeRole('Admin'), userControllers.deleteUser);

// Access routes for Admin, Stock Manager, and User
router.get("/products", authorizeRole('Admin', 'Stock Manager', 'User'), productControllers.allProducts);
router.get("/products/:id", authorizeRole('Admin', 'Stock Manager', 'User'), productControllers.searchProduct);
router.post("/products/add", authorizeRole('Stock Manager'), productControllers.addProduct);
router.put("/products/update/:id", authorizeRole('Stock Manager'), productControllers.updateProduct);
router.delete("/products/delete/:id", authorizeRole('Stock Manager'), productControllers.deleteProduct);

module.exports = router;
