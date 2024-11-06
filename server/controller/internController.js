// controllers/tickerController.js
const axios = require('axios');
const Ticker = require('../models/internModel');

// Fetch tickers from WazirX API and store them in MongoDB
const getdata = async () => {
  try {
    const response = await axios.get('https://api.wazirx.com/api/v2/tickers');
    const tickers = Object.values(response.data).slice(0, 10).map(ticker => ({
      name: ticker.name,
      last: parseFloat(ticker.last),
      buy: parseFloat(ticker.buy),
      sell: parseFloat(ticker.sell),
      volume: parseFloat(ticker.volume),
      base_unit: ticker.base_unit,
    }));

    // Store in MongoDB
    await Ticker.deleteMany({}); // Optional: Clear previous data
    await Ticker.insertMany(tickers);
    console.log('Top 10 tickers stored in database');
  } catch (error) {
    console.error('Error fetching data from WazirX API:', error);
  }
};

// Controller function to get stored tickers
const getTickers = async (req, res) => {
  try {
    const tickers = await Ticker.find({});
    res.json(tickers);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving data', error });
  }
};

// Export the controller functions
module.exports = { getdata, getTickers };
