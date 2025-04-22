'use client';

import { DictionaryProvider } from '../lib/DictionaryContext';

const DictionaryProviderWrapper: React.FC<{
  initialDictionaries: Record<string, any>;
  children: React.ReactNode;
}> = ({ initialDictionaries, children }) => {
  return (
    <DictionaryProvider initialDictionaries={initialDictionaries}>
      {children}
    </DictionaryProvider>
  );
};

export default DictionaryProviderWrapper;
