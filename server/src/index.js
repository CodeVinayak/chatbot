const express = require('express');
const cors = require('cors');
const chatRouter = require('./chat'); // Import the chat.js file

const app = express();

// Set up CORS middleware
app.use(cors());

// Set up JSON parsing middleware
app.use(express.json());

app.get("/ping", (req, res) => {
  res.json({
    message: "pong",
  });
});

// Use the chatRouter as middleware for the /chat endpoint
app.use('/chat', chatRouter);

module.exports = app;
