"use client";

import { useTranslation } from "@/lib/i18n/I18nProvider";

export default function Footer() {
  const { dict } = useTranslation();

  return (
    <footer className="py-6 text-center text-sm text-zinc-500">
      {dict.footer?.text || "© 2026 KrishiNiti — Policy to Profit 🇮🇳"}
    </footer>
  );
}
