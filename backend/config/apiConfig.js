require("dotenv").config();

module.exports = {
  govApiKey: process.env.GOV_API_KEY,
  mandiResourceId: process.env.MANDI_RESOURCE_ID,
  port: process.env.PORT || 3000,
  baseUrl: "https://api.data.gov.in/resource",

  // New endpoints for schemes
  SCHEMES_ALL:
    "https://api.data.gov.in/resource/9afdf346-16d7-4f17-a2e3-684540c59a77",
  SCHEMES_MEGHALAYA:
    "https://api.data.gov.in/resource/6cccc3b5-992a-4f00-846a-530209ea56f1",
};