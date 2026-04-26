// controllers/mlController.js

const FASTAPI_BASE_URL = "http://localhost:8000/api/ml";

// Helper function to forward the request to Python
const forwardToPython = async (endpoint, reqBody, res) => {
    try {
        const response = await fetch(`${FASTAPI_BASE_URL}/${endpoint}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(reqBody)
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.detail || "ML Engine Error");
        }

        // Send the Python prediction right back to the frontend!
        return res.status(200).json(result);

    } catch (error) {
        console.error(`❌ ML Integration Error on [${endpoint}]:`, error.message);
        return res.status(500).json({ 
            success: false, 
            message: "Failed to communicate with ML Engine",
            error: error.message 
        });
    }
};

// ==========================================
// THE 5 CONTROLLER FUNCTIONS
// ==========================================

const predictCrop = async (req, res) => {
    return forwardToPython("crop-prediction", req.body, res);
};

const recommendCrop = async (req, res) => {
    return forwardToPython("crop-recommendation", req.body, res);
};

const recommendFertilizer = async (req, res) => {
    return forwardToPython("fertilizer-recommendation", req.body, res);
};

const predictRainfall = async (req, res) => {
    return forwardToPython("rainfall-prediction", req.body, res);
};

const predictYield = async (req, res) => {
    return forwardToPython("yield-prediction", req.body, res);
};

module.exports = {
    predictCrop,
    recommendCrop,
    recommendFertilizer,
    predictRainfall,
    predictYield
};