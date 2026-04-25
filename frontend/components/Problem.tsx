"use client";

import { useTranslation } from "@/lib/i18n/I18nProvider";

export default function Problem() {
  const { dict } = useTranslation();

  return (
    <section className="bg-white py-16 text-center px-6">
      <h2 className="text-3xl font-semibold mb-4">
        {dict.problem?.title || "The Problem"}
      </h2>
      <p className="max-w-2xl mx-auto text-zinc-600">
        {dict.problem?.description ||
          "Farmers lack real-time market intelligence, leading to ₹330/quintal price variation and major profit loss."}
      </p>
    </section>
  );
}
