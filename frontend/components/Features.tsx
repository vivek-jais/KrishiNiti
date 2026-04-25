"use client";

import { useTranslation } from "@/lib/i18n/I18nProvider";

export default function Features() {
  const { dict } = useTranslation();

  const features = dict.features?.list || [
    "Harvest timing prediction",
    "Mandi price forecasting",
    "Transport cost optimization",
    "Profit ranking",
    "Satellite crop monitoring",
    "Weather intelligence",
  ];

  return (
    <section className="bg-white py-20 text-center">
      <h2 className="text-3xl font-semibold mb-10">
        {dict.features?.title || "Features"}
      </h2>

      <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {features.map((f: string, i: number) => (
          <div key={i} className="p-6 border rounded-xl">
            <p>{f}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
