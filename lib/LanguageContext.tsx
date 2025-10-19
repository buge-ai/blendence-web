'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import translationsData from './translations.json';

export type Language = 'en' | 'tr';

type Translations = typeof translationsData;

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations['en'];
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  const value = {
    language,
    setLanguage,
    t: translationsData[language],
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
