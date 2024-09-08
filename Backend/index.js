const express = require("express");
const mongoose = require("mongoose");
const productRoutes = require("./routes/productRoutes"); // Import product routes
const authRoutes = require("./routes/authRoutes"); // Import auth routes
const connectDB = require("./config/db"); // MongoDB connection
const userRoutes = require("./routes/userRoutes"); // Import user routes

const app = express();

// Middleware to parse JSON
app.use(express.json());

app.use((err, req, res, next) => {
  console.error(err.message || err);
  res.status(err.status || 500).json({ message: err.message || 'Internal Server Error' });
});

app.get("/", (req, res) => {
  res.send("API is running....");
});

// Use routes
app.use("/", productRoutes); // All product routes will be prefixed with /products
app.use("/", authRoutes); // All auth routes will be prefixed with /auth
app.use("/", userRoutes); // User management routes

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send('Something went wrong!');
});

// Define the port and start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
