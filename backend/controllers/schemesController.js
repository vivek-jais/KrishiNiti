const axios = require("axios");
const {
  SCHEMES_ALL,
  SCHEMES_MEGHALAYA,
  govApiKey,
} = require("../config/apiConfig");

// Get all India schemes
exports.getAllSchemes = async (req, res) => {
  try {
    const response = await axios.get(SCHEMES_ALL, {
      params: {
        "api-key": govApiKey,
        format: "json",
        limit: 1000,
      },
    });

    res.json({
      success: true,
      count: response.data.records.length,
      data: response.data.records,
    });
  } catch (error) {
    console.error("Error fetching all schemes:", error.message);
    res.status(500).json({ success: false, message: "Error fetching schemes" });
  }
};

// Get Meghalaya schemes
exports.getMeghalayaSchemes = async (req, res) => {
  try {
    const response = await axios.get(SCHEMES_MEGHALAYA, {
      params: {
        "api-key": govApiKey,
        format: "json",
        limit: 1000,
      },
    });

    res.json({
      success: true,
      count: response.data.records.length,
      data: response.data.records,
    });
  } catch (error) {
    console.error("Error fetching Meghalaya schemes:", error.message);
    res
      .status(500)
      .json({ success: false, message: "Error fetching Meghalaya schemes" });
  }
};
