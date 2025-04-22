'use client';

import { useDictionary } from '../lib/DictionaryContext';
import { useRouter } from 'next/navigation';

interface LanguageSwitcherProps {
  currentLang: string; // Accept currentLang as a prop
}

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ currentLang }) => {
  const { loadDictionary } = useDictionary(); // Access loadDictionary from context
  const router = useRouter(); // Get the Next.js router instance

  const changeLanguage = async (lang: string): Promise<void> => {
    localStorage.setItem('preferredLanguage', lang); // Save preference in local storage

    // Load the new dictionary for the selected language
    await loadDictionary(lang);

    // Update the route to the new language
    router.push(`/${lang}`); // Navigate to the language-specific route
  };

  return (
    <select
      value={currentLang}
      onChange={(e) => changeLanguage(e.target.value)}
    >
      <option value="en">English</option>
      <option value="pt">Portuguese</option>
      {/* Add more languages as needed */}
    </select>
  );
};

export default LanguageSwitcher;
