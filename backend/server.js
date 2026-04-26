const express = require("express");
const config = require("./config/apiConfig");
const { fetchMandiPrices } = require("./controllers/mandiController");
const {
  getAllSchemes,
  getMeghalayaSchemes,
} = require("./controllers/schemesController");
const area_productions=require('./controllers/area_production')
const { 
    predictCrop, 
    recommendCrop, 
    recommendFertilizer, 
    predictRainfall, 
    predictYield 
} = require('./controllers/ml_controller');

const app = express();
app.use(express.json());
app.get("/api/mandi-prices", fetchMandiPrices);
app.get("/api/schemes/all", getAllSchemes);
app.get("", getMeghalayaSchemes);
app.get('/api/area_productions',area_productions)
app.post("/api/ml/crop-prediction", predictCrop);
app.post("/ap/api/schemes/meghalayai/ml/crop-recommendation", recommendCrop);
app.post("/api/ml/fertilizer-recommendation", recommendFertilizer);
app.post("/api/ml/rainfall-prediction", predictRainfall);
app.post("/api/ml/yield-prediction", predictYield);
app.get("/", (req, res) => {
  res.send("KrishiNiti Backend is running!");
});

app.listen(config.port, () => {
  console.log(`KrishiNiti Server running on http://localhost:${config.port}`);
});