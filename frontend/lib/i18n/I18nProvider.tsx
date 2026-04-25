"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { getDictionary, Lang } from "./i18n";

const I18nContext = createContext<any>(null);

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>("en");
  const [dict, setDict] = useState<any>(null);

  useEffect(() => {
    const savedLang = (localStorage.getItem("lang") as Lang) || "en";
    setLang(savedLang);

    getDictionary(savedLang).then(setDict);
  }, []);

  const switchLang = async (newLang: Lang) => {
    localStorage.setItem("lang", newLang);
    setLang(newLang);
    const d = await getDictionary(newLang);
    setDict(d);
  };

  if (!dict) return null;

  return (
    <I18nContext.Provider value={{ dict, lang, switchLang }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useTranslation() {
  return useContext(I18nContext);
}
