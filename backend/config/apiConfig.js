require("dotenv").config({ path: __dirname + "/../.env" });

module.exports = {
  // Use api_key from .env file
  govApiKey: process.env.api_key || process.env.GOV_API_KEY, 
  mandiResourceId: process.env.MANDI_RESOURCE_ID || process.env.mandi_resource_id || "9ef84268-d588-465a-a308-a864a43d0070", 
  
  port: process.env.PORT || 3000,
  baseUrl: "https://api.data.gov.in/resource",

  SCHEMES_ALL: "https://api.data.gov.in/resource/9afdf346-16d7-4f17-a2e3-684540c59a77",
  SCHEMES_MEGHALAYA: "https://api.data.gov.in/resource/6cccc3b5-992a-4f00-846a-530209ea56f1",
};