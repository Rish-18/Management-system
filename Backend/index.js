const express = require("express");
const mongoose = require("mongoose");
const productRoutes = require("./routes/productRoutes");
const authRoutes = require("./routes/authRoutes"); 
const connectDB = require("./config/db"); 
const userRoutes = require("./routes/userRoutes"); 
const cors = require('cors');
const path=require('path')
const app = express();

// Serve static files from the React app's build directory
app.use(express.static(path.join(__dirname, 'build')));

// For any other route, serve the React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.use(express.json());

app.use(cors({
  origin: 'http://localhost:3000', 
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], 
  allowedHeaders: ['Content-Type', 'Authorization'], 
  credentials: true 
}));

app.use((err, req, res, next) => {
  console.error(err.message || err);
  res.status(err.status || 500).json({ message: err.message || 'Internal Server Error' });
});

app.get("/", (req, res) => {
  res.send("API is running....");
});


app.use("/", productRoutes);
app.use("/", authRoutes);
app.use("/", userRoutes); 

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send('Something went wrong!');
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});

