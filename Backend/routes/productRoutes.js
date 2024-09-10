const express = require('express');
const router = express.Router();
const productControllers = require('../controllers/productController');
const authorizeRole = require('../middlewares/authorizeRole');


router.get("/products", authorizeRole('Admin', 'Stock Manager', 'User'), productControllers.allProducts);
router.get("/products/:id", authorizeRole('Admin', 'Stock Manager', 'User'), productControllers.searchProduct);
router.post("/products/add", authorizeRole('Stock Manager'), productControllers.addProduct);
router.put("/products/update/:id", authorizeRole('Stock Manager'), productControllers.updateProduct);
router.delete("/products/delete/:id", authorizeRole('Stock Manager'), productControllers.deleteProduct);

module.exports = router;
