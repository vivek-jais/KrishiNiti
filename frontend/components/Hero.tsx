"use client";

import { useTranslation } from "@/lib/i18n/I18nProvider";

export default function Hero() {
  const { dict } = useTranslation();

  return (
    <section className="text-center py-20 px-6">
      <h1 className="text-5xl font-bold max-w-3xl mx-auto">
        {dict.hero?.heading || "From Field to Profit — Powered by AI"}
      </h1>
      <p className="mt-6 text-zinc-600 max-w-xl mx-auto">
        {dict.hero?.sub ||
          "Know when to harvest and where to sell for maximum profit."}
      </p>
    </section>
  );
}
