"use client";

import { useTranslation } from "@/lib/i18n/I18nProvider";

export default function Stats() {
  const { dict } = useTranslation();

  const stats = dict.stats?.list || [
    { value: "6000+", label: "Mandis" },
    { value: "₹330", label: "Avg Price Gap" },
    { value: "10–25%", label: "Income Increase" },
    { value: "14 Cr+", label: "Farmers" },
  ];

  return (
    <section className="py-16 grid grid-cols-2 md:grid-cols-4 text-center gap-6">
      {stats.map((s: { value: string; label: string }, i: number) => (
        <div key={i}>
          <h3 className="text-2xl font-bold">{s.value}</h3>
          <p>{s.label}</p>
        </div>
      ))}
    </section>
  );
}
