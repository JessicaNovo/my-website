import { createContext, useContext, useState } from 'react';

interface DictionaryContextType {
  dictionaries: Record<string, any>;
  loadDictionary: (lang: string) => Promise<void>;
}

// Create the dictionary context
const DictionaryContext = createContext<DictionaryContextType | undefined>(
  undefined
);

export const DictionaryProvider: React.FC<{
  initialDictionaries: Record<string, any>;
  children: React.ReactNode;
}> = ({ initialDictionaries, children }) => {
  const [dictionaries, setDictionaries] =
    useState<Record<string, any>>(initialDictionaries);

  const loadDictionary = async (lang: string): Promise<void> => {
    if (!dictionaries[lang]) {
      const dict = await import(`../locales/${lang}.json`);
      setDictionaries((prev) => ({ ...prev, [lang]: dict.default }));
    }
  };

  return (
    <DictionaryContext.Provider value={{ dictionaries, loadDictionary }}>
      {children}
    </DictionaryContext.Provider>
  );
};

// Hook for consuming the dictionary context
export const useDictionary = () => {
  const context = useContext(DictionaryContext);
  if (!context) {
    throw new Error('useDictionary must be used within a DictionaryProvider');
  }
  return context;
};
