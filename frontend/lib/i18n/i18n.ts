export type Lang = "en" | "hi";

export const dictionaries = {
  en: () => import("./dictionaries/en.json").then((m) => m.default),
  hi: () => import("./dictionaries/hi.json").then((m) => m.default),
};

export async function getDictionary(lang: Lang) {
  return dictionaries[lang]();
}
