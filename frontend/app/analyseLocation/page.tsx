"use client";
import { useState } from "react";
import LocationAutoFill from "@/components/LocationAutoFill";

export default function AnalysePage() {
  const [formData, setFormData] = useState({
    state: "",
    district: "",
    season: "Kharif" // default
  });

  // This function is triggered when the Location Button finishes finding the city/state
  const handleLocationFound = (locationData:any) => {
    setFormData({
      ...formData,
      // The || "" ensures it falls back to a blank string if undefined
      state: locationData.state || "", 
      district: locationData.city || ""
    });
  };

  const handlePredict = async () => {
    // Call your Next.js API here using formData
    console.log("Sending to ML API:", formData);
    // await fetch('/api/ml/crop-prediction', ...)
  };

  return (
    <div className="p-8 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Crop Prediction Form</h1>

      {/* The Magic Button */}
      <LocationAutoFill onLocationFound={handleLocationFound} />

      {/* The Form Fields */}
      <div className="flex flex-col gap-4 mt-4">
        <div>
          <label className="block font-bold">State</label>
          <input 
            type="text" 
            value={formData.state} 
            onChange={(e) => setFormData({...formData, state: e.target.value})}
            className="border p-2 w-full"
            placeholder="e.g. Karnataka"
          />
        </div>

        <div>
          <label className="block font-bold">District</label>
          <input 
            type="text" 
            value={formData.district} 
            onChange={(e) => setFormData({...formData, district: e.target.value})}
            className="border p-2 w-full"
            placeholder="e.g. Bangalore"
          />
        </div>

        <button 
          onClick={handlePredict}
          className="bg-green-600 text-white font-bold py-2 mt-4 rounded"
        >
          Predict Best Crop
        </button>
      </div>
    </div>
  );
}