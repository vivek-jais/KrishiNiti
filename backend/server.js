const express = require('express');
const config = require('./config/apiConfig');
const { fetchMandiPrices } = require('./controllers/mandiController');

const app = express();
app.use(express.json());
app.get('/api/mandi-prices', fetchMandiPrices);

app.get('/', (req, res) => {
    res.send("KrishiNiti Backend is running!");
});

app.listen(config.port, () => {
    console.log(`KrishiNiti Server running on http://localhost:${config.port}`);
});
