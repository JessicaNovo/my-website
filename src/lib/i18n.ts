import { Language } from 'lib/languageConfig';

// Asynchronous function to retrieve the localization dictionary for a specific language
export const getDictionary = async (lang: Language) => {
  try {
    // Dynamically import the JSON file for the specified language
    const dict = await import(`locales/${lang}.json`);

    // Return the default export from the JSON file, which contains the localization dictionary
    return dict.default;
  } catch (error) {
    console.error(`Error loading dictionary for language ${lang}`, error);
    // Provide a default fallback
    const fallbackDict = await import('locales/en.json'); // Ensure 'en.json' exists
    return fallbackDict.default;
  }
};
