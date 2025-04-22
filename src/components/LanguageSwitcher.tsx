'use client';

import { useEffect, useState } from 'react';
import { useDictionary } from 'lib/DictionaryContext'; // Import the context
import { useRouter } from 'next/navigation'; // Import Next.js routing

const LanguageSwitcher: React.FC = () => {
  const { loadDictionary } = useDictionary(); // Access loadDictionary from context
  const router = useRouter(); // Get the Next.js router instance
  const [preferredLanguage, setPreferredLanguage] = useState<string>('en'); // Default language state

  // Effect to load preferred language from localStorage on component mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem('preferredLanguage');
    if (savedLanguage) {
      setPreferredLanguage(savedLanguage);
      loadDictionary(savedLanguage); // Load the corresponding dictionary on mount
    }
  }, [loadDictionary]);

  const changeLanguage = async (lang: string): Promise<void> => {
    localStorage.setItem('preferredLanguage', lang); // Save preference in local storage
    setPreferredLanguage(lang); // Update the state for rendering

    // Load the new dictionary for the selected language
    await loadDictionary(lang);

    // Update the route to the new language
    router.push(`/${lang}`); // Navigate to the language-specific route
  };

  return (
    <select
      value={preferredLanguage}
      onChange={(e) => changeLanguage(e.target.value)}
    >
      <option value="en">English</option>
      <option value="pt">Portuguese</option>
      {/* Add more languages as needed */}
    </select>
  );
};

export default LanguageSwitcher;
