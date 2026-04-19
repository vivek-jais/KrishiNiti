const config = require('../config/apiConfig');

const area_productions = async (req, res) => {
  try {
    let base_url = `https://api.data.gov.in/resource/f3f317cd-d24f-4ce6-a8f7-5bd98f2a4754?api-key=${process.env.api_key}&format=json`;

    const {
      crop,
      area_in_hect,
      production_tonnes_,
      productivity_in_kg_hec_
    } = req.query;

    if (crop) {
      base_url += `&filters[crop]=${encodeURIComponent(crop)}`;
    }

    if (area_in_hect) {
      base_url += `&filters[area_in_hect]=${encodeURIComponent(area_in_hect)}`;
    }

    if (production_tonnes_) {
      base_url += `&filters[production_tonnes_]=${encodeURIComponent(production_tonnes_)}`;
    }

    if (productivity_in_kg_hec_) {
      base_url += `&filters[productivity_in_kg_hec_]=${encodeURIComponent(productivity_in_kg_hec_)}`;
    }

    const response = await fetch(base_url);
    console.log("de dena dan")
    if (!response.ok) {
      throw new Error(`API responded with status: ${response.status}`);
    }

    const data = await response.json();
    console.log(data)
    return res.status(200).json({
      success: true,
      count: data.records?.length || 0,
      data: data.records
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = area_productions;
