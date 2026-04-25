"use client";

import { useTranslation } from "@/lib/i18n/I18nProvider";

export default function DemoBox() {
  const { dict } = useTranslation();

  return (
    <section className="py-20 text-center">
      <h2 className="text-3xl font-semibold mb-6">
        {dict.demo?.title || "Example Output"}
      </h2>

      <div className="bg-black text-white max-w-xl mx-auto p-6 rounded-xl text-left">
        <p className="text-green-400">
          {dict.demo?.farmer || "Farmer: 50 quintal wheat, Hoshangabad"}
        </p>

        <p className="mt-4">
          {dict.demo?.recommendation ||
            "Wait 4 days. Sell at Itarsi mandi (42km). Expected gain: ₹7,900"}
        </p>
      </div>
    </section>
  );
}
