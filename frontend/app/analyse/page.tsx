"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
// IMPORTANT: Make sure this path points exactly to where you saved the component!
import LocationAutoFill from "@/components/LocationAutoFill"; 

/* ---------------- TYPES ---------------- */

type Mandi = {
  name: string;
  distance_km: number;
  current_price: number;
  avg_7_day_price: number;
};

type ProfitOption = {
  mandi: string;
  distance_km: number;
  transport_cost: number;
  expected_price: number;
  net_profit: number;
  profit_margin_percent: number;
};

type AIResponse = {
  harvest_intelligence: {
    recommended_harvest_day: number;
    weather_impact: string;
  };
  market_intelligence: {
    mandis: Mandi[];
  };
  profit_optimization: {
    options: ProfitOption[];
  };
  decision_engine: {
    sell_today_profit: number;
    sell_later_profit: number;
    profit_difference: number;
    action: string;
    confidence_score: number;
  };
  recommendation: {
    best_mandi: string;
    expected_profit_gain: number;
    summary: string;
  };
  market_visuals: {
    mandis: {
      name: string;
      image_url: string;
      place_description: string;
    }[];
  };
};

/* ---------------- PAGE ---------------- */

export default function AnalysePage() {
  const [query, setQuery] = useState("");
  const [data, setData] = useState<AIResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // State to hold the farmer's auto-detected location
  const [location, setLocation] = useState<{ city: string; state: string } | null>(null);

  const formatINR = (val: number) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(val);

  // Triggered when the LocationAutoFill component successfully fetches the coordinates
  const handleLocationFound = (locData: { city: string; state: string }) => {
    setLocation({
      city: locData.city || "",
      state: locData.state || ""
    });
  };

  const handleAnalyze = async () => {
    if (!query) return;

    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/ai-response", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // Send the query AND the location data to Gemini
        body: JSON.stringify({ 
          query: query,
          city: location?.city || "",
          state: location?.state || ""
        }),
      });

      if (!res.ok) throw new Error("API request failed");

      const result = await res.json();
      setData(result);
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 space-y-8 max-w-7xl mx-auto">

      {/* HEADER */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h1 className="text-2xl font-bold">
          AI Crop Intelligence Engine 🌾
        </h1>
        <p className="text-zinc-500 mt-1">
          Enter crop details to get real-time market & profit insights
        </p>
      </div>

      {/* LOCATION FINDER */}
      <Card className="p-4 bg-blue-50/50 border-blue-100">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h3 className="font-semibold text-blue-900">Enable Smart Local Insights</h3>
            <p className="text-sm text-blue-700">Allow location access to get mandi prices near you automatically.</p>
          </div>
          <LocationAutoFill onLocationFound={handleLocationFound} />
        </div>
        
        {/* Show the user their detected location so they know it worked */}
        {location && (
          <p className="text-sm text-green-700 font-medium mt-3">
            ✅ Location locked: {location.city}, {location.state}
          </p>
        )}
      </Card>

      {/* INPUT */}
      <Card className="p-4 flex gap-3">
        <Input
          placeholder={location ? "e.g. 50 quintal wheat, harvest in 10 days" : "e.g. 50 quintal wheat, Hoshangabad MP, harvest in 10 days"}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleAnalyze()}
        />
        <Button onClick={handleAnalyze} disabled={loading}>
          {loading ? "Analyzing..." : "Analyze"}
        </Button>
      </Card>

      {/* ERROR */}
      {error && (
        <p className="text-red-500 font-medium">
          ❌ {error}
        </p>
      )}

      {/* RESULTS */}
      {data && (
        <div className="space-y-8">

          {/* KPI CARDS */}
          <div className="grid md:grid-cols-4 gap-4">
            <KPI title="Best Mandi" value={data.recommendation?.best_mandi || "-"} />
            <KPI title="Profit Gain" value={data.recommendation?.expected_profit_gain ? formatINR(data.recommendation.expected_profit_gain) : "-"} />
            <KPI title="Action" value={data.decision_engine?.action || "-"} />
            <KPI title="Confidence" value={data.decision_engine?.confidence_score ? `${(data.decision_engine.confidence_score * 100).toFixed(0)}%` : "-"} />
          </div>

          {/* HARVEST */}
          {data.harvest_intelligence && (
            <Card className="p-6">
              <h2 className="font-semibold mb-3">Harvest Intelligence</h2>
              <p>📅 Recommended Day: {data.harvest_intelligence.recommended_harvest_day}</p>
              <p>🌦 {data.harvest_intelligence.weather_impact}</p>
            </Card>
          )}

          {/* MARKET TABLE */}
          {data.market_intelligence?.mandis && data.market_intelligence.mandis.length > 0 && (
            <Card className="p-6 overflow-x-auto">
              <h2 className="font-semibold mb-3">Market Intelligence</h2>

              <table className="w-full text-sm min-w-[500px]">
                <thead className="text-left border-b">
                  <tr>
                    <th className="py-2">Mandi</th>
                    <th className="py-2">Price</th>
                    <th className="py-2">Distance</th>
                    <th className="py-2">Avg (7D)</th>
                  </tr>
                </thead>

                <tbody>
                  {data.market_intelligence.mandis.map((m, i) => (
                    <tr key={i} className="border-b">
                      <td className="py-2">{m.name}</td>
                      <td className="py-2">{formatINR(m.current_price)}</td>
                      <td className="py-2">{m.distance_km} km</td>
                      <td className="py-2">{formatINR(m.avg_7_day_price)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Card>
          )}

          {/* PROFIT */}
          {data.profit_optimization?.options && data.profit_optimization.options.length > 0 && (
            <Card className="p-6">
              <h2 className="font-semibold mb-3">Profit Optimization</h2>

              {data.profit_optimization.options.map((o, i) => (
                <div
                  key={i}
                  className="flex justify-between border p-3 rounded mb-2 hover:bg-zinc-50 transition-colors"
                >
                  <span>{o.mandi}</span>
                  <span className="text-green-600 font-bold">
                    {formatINR(o.net_profit)}
                  </span>
                </div>
              ))}
            </Card>
          )}

          {/* DECISION */}
          {data.decision_engine && (
            <Card className="p-6 bg-yellow-50/50 border-yellow-200">
              <h2 className="font-semibold mb-3">Decision Engine</h2>

              <p>Sell Today: {formatINR(data.decision_engine.sell_today_profit)}</p>
              <p>Sell Later: {formatINR(data.decision_engine.sell_later_profit)}</p>

              <p className="text-green-600 font-bold mt-2">
                Difference: +{formatINR(data.decision_engine.profit_difference)}
              </p>

              <p className="mt-2 text-lg">
                Action:{" "}
                <span
                  className={
                    data.decision_engine.action === "WAIT"
                      ? "text-yellow-600 font-bold"
                      : "text-green-600 font-bold"
                  }
                >
                  {data.decision_engine.action}
                </span>
              </p>
            </Card>
          )}

          {/* MANDI VISUALS */}
          {data.market_visuals?.mandis && data.market_visuals.mandis.length > 0 && (
            <div className="grid md:grid-cols-3 gap-4">
              {data.market_visuals.mandis.map((m, i) => (
                <Card key={i} className="overflow-hidden">
                  {m.image_url && (
                    <img
                      src={m.image_url}
                      className="h-40 w-full object-cover"
                      alt={m.name}
                      onError={(e) => {
                        // Fallback image if the URL fails to load
                        (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x200?text=Market+Image+Not+Available';
                      }}
                    />
                  )}
                  <div className="p-4">
                    <h3 className="font-semibold">{m.name}</h3>
                    <p className="text-sm text-zinc-600 mt-1">
                      {m.place_description}
                    </p>
                  </div>
                </Card>
              ))}
            </div>
          )}

          {/* FINAL RECOMMENDATION */}
          {data.recommendation && (
            <Card className="p-6 bg-green-600 text-white shadow-lg">
              <h2 className="font-semibold mb-2 text-lg">
                Final Recommendation
              </h2>
              <p className="leading-relaxed">{data.recommendation.summary}</p>
            </Card>
          )}

        </div>
      )}
    </div>
  );
}

/* ---------------- KPI ---------------- */

function KPI({ title, value }: { title: string; value: string }) {
  return (
    <Card className="p-4 shadow-sm border-zinc-100">
      <p className="text-sm text-zinc-500 font-medium">{title}</p>
      <p className="text-2xl font-bold mt-1">{value}</p>
    </Card>
  );
}