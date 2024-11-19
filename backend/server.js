// Import Express
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');


// Initialize the app
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
// Define the port
const PORT = process.env.PORT || 3555;


// Routes
const authRoutes = require('./routes/auth.route.js');
const taskRoutes = require('./routes/task.route.js');

// Connect to MongoDB
mongoose.connect("mongodb+srv://mishak:hGZqGJpQP8so4WEh@cluster0.wkefw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
    .then(() => console.log("Connected to MongoDB"))
    .catch((error) => console.error("MongoDB connection error:", error));

// Use auth routes
app.use("/api/auth", authRoutes);
// Use task routes
app.use("/task", taskRoutes);


// Create a simple GET route
app.get('/', (req, res) => {
  res.json({ message: 'Hello, world!' });
});


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
