"use client";

import { useTranslation } from "@/lib/i18n/I18nProvider";

export default function Navbar() {
  const { dict, switchLang } = useTranslation();

  return (
    <nav className="w-full flex justify-between items-center px-6 py-4 bg-white shadow-sm">
      <h1 className="text-xl font-bold">{dict.navbar.title}</h1>

      <div className="flex items-center gap-4">
        <a href="/demo" className="text-sm">
          {dict.navbar.demo}
        </a>

        <button className="px-4 py-2 bg-green-600 text-white rounded-full">
          {dict.navbar.tryNow || "Try Now"}
        </button>

        {/* Language Switch */}
        <div className="flex gap-2 ml-4">
          <button
            onClick={() => switchLang("en")}
            className="text-xs border px-2 py-1 rounded"
          >
            EN
          </button>
          <button
            onClick={() => switchLang("hi")}
            className="text-xs border px-2 py-1 rounded"
          >
            HI
          </button>
        </div>
      </div>
    </nav>
  );
}
