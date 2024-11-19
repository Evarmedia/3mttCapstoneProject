// Import Express
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');


// Initialize the app
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(cors());
// Define the port
const PORT = process.env.PORT || 3555;


// Allow requests from specific origins
const corsOptions = {
  origin: ['http://localhost:5173', 'https://mishak-capstone-project.vercel.app/'], // Replace with your frontend URL(s)
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true, // Allows cookies and other credentials if needed
};

// Use cors with options
app.use(cors(corsOptions));


// Routes
const authRoutes = require('./routes/auth.route.js');
const taskRoutes = require('./routes/task.route.js');

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URL)
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
