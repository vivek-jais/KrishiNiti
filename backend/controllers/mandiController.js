const config = require('../config/apiConfig');

// Helper function to calculate distance
function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; 
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
        Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLon/2) * Math.sin(dLon/2); 
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    return R * c; 
}

// Temporary dictionary (Replace with real JSON later)
const mandiCoordinates = {
    "Kharar APMC": { lat: 30.7397, lng: 76.6508 },
    "Tapa": { lat: 30.3017, lng: 75.3703 },
    "Chandigarh(Grain/Fruit)": { lat: 30.7333, lng: 76.7794 }
};

const fetchMandiPrices = async (req, res) => {
    try {
        const { state, district, crop, limit = 50 } = req.query;
        
        // 1. Build the base URL as a pure string
        let fetchUrl = `${config.baseUrl}/${config.mandiResourceId}?api-key=${config.govApiKey}&format=json&limit=${limit}`;

        // 2. Manually append filters so the brackets [ ] DO NOT get encoded
        if (state) fetchUrl += `&filters[state.keyword]=${encodeURIComponent(state)}`;
        if (district) fetchUrl += `&filters[district]=${encodeURIComponent(district)}`;
        if (crop) fetchUrl += `&filters[commodity]=${encodeURIComponent(crop)}`;

        console.log(`Executing Gov API Call: ${fetchUrl}`);

        const response = await fetch(fetchUrl);
        
        if (!response.ok) {
            throw new Error(`Gov API responded with status: ${response.status}`);
        }

        const data = await response.json();
        let records = data.records || [];

        return res.status(200).json({
            success: true,
            total_records: data.total,
            returned_records: records.length,
            records: records
        });

    } catch (error) {
        console.error("Error in fetchMandiPrices:", error.message);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch Mandi data",
            error: error.message
        });
    }
};

module.exports = { fetchMandiPrices };