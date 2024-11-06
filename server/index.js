const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const getdata = require('./routes/internRoute');

const app = express();
const PORT = 8000;

// Middleware
app.use(cors());
app.use(express.json()); // Add this to parse JSON request bodies

// Connect to MongoDB Atlas
const MONGODB_URI = 'mongodb+srv://b2035233:PVsTnfpVHYJUP2w0@cluster0.7vjxt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(MONGODB_URI, { useNewUrlParser: true })
  .then(() => {
    console.log('MongoDB connected to Atlas');
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
  });

// Define routes
app.use('/v1', getdata);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
