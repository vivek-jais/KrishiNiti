"use client";

import { useTranslation } from "@/lib/i18n/I18nProvider";

export default function CTA() {
  const { dict } = useTranslation();

  return (
    <section className="py-20 text-center bg-green-600 text-white">
      <h2 className="text-3xl font-semibold mb-4">
        {dict.cta?.heading || "Increase Farmer Income Today"}
      </h2>
      <button className="px-6 py-3 bg-white text-green-700 rounded-full">
        {dict.cta?.button || "Start Demo"}
      </button>
    </section>
  );
}
