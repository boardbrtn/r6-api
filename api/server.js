const express = require('express');
const cors = require('cors');
const R6API = require('r6s-stats-api');

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS
app.use(cors());

// Simple test endpoint
app.get('/api/test', (req, res) => {
  res.json({ message: 'API is working!' });
});

// General stats endpoint
app.get('/api/general', async (req, res) => {
  const { platform, username } = req.query;
  
  if (!platform || !username) {
    return res.status(400).json({ 
      error: 'Both platform and username are required query parameters' 
    });
  }
  
  try {
    const stats = await R6API.general(platform, username);
    res.json(stats);
  } catch (error) {
    console.error(`Error fetching general stats: ${error.message}`);
    res.status(500).json({ 
      error: 'Failed to fetch R6 stats', 
      message: error.message 
    });
  }
});

// Operator stats endpoint
app.get('/api/operator', async (req, res) => {
  const { platform, username, operator } = req.query;
  
  if (!platform || !username || !operator) {
    return res.status(400).json({ 
      error: 'Platform, username, and operator are required query parameters' 
    });
  }
  
  try {
    const stats = await R6API.operator(platform, username, operator);
    res.json(stats);
  } catch (error) {
    console.error(`Error fetching operator stats: ${error.message}`);
    res.status(500).json({ 
      error: 'Failed to fetch R6 operator stats', 
      message: error.message 
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
