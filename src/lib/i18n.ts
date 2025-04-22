export const languages = ['en', 'pt'] as const;
export type Language = (typeof languages)[number];

export const getDictionary = async (lang: Language) => {
  const dict = await import(`locales/${lang}.json`);
  return dict.default;
};
