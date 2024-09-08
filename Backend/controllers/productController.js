const productModel = require("../models/product");
const mongoose = require("mongoose");

// Get all products
const allProducts = (req, res) => {
  productModel
    .find()
    .then((mongoData) => res.json(mongoData))
    .catch((err) => {
      console.error(err);
      res.status(500).json({ success: false, message: "Internal Server Error" });
    });
};

// Get product by ID
const searchProduct = (req, res) => {
  productModel
    .findById(req.params.id)
    .then((mongoData) => res.json(mongoData))
    .catch((err) => {
      console.error(err);
      res.status(500).json({ success: false, message: "Internal Server Error" });
    });
};

// Add a new product
const addProduct = (req, res) => {
  const { productName, description, price, stockQuantity, category } = req.body;
  if (!productName || !description || !price || !stockQuantity || !category) {
      return res.status(400).json({ message: 'Missing required fields' });
  }

  const newProduct = new productModel({ productName, description, price, stockQuantity, category });
  newProduct.save()
      .then(() => res.json({ success: true, message: 'Product added' }))
      .catch(err => res.status(500).json({ success: false, message: 'Error adding product', error: err.message }));
};

// Update a product
const updateProduct = (req, res) => {
  const { productName, description, price, stockQuantity, category } = req.body;
  if (!productName && !description && !price && !stockQuantity && !category) {
      return res.status(400).json({ message: 'No fields to update' });
  }

  productModel.updateOne({ _id: req.params.id }, { $set: { productName, description, price, stockQuantity, category } })
      .then(() => res.json({ success: true, message: 'Product updated' }))
      .catch(err => res.status(500).json({ success: false, message: 'Error updating product', error: err.message }));
};

// Delete a product
const deleteProduct = (req, res) => {
  productModel.deleteOne({ _id: req.params.id })
      .then(() => res.json({ success: true, message: 'Product deleted' }))
      .catch(err => res.status(500).json({ success: false, message: 'Error deleting product', error: err.message }));
};

module.exports = {
  allProducts,
  searchProduct,
  addProduct,
  updateProduct,
  deleteProduct,
};
