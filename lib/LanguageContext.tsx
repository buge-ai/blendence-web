'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import translationsData from './translations.json';
import { Locale, locales, defaultLocale } from './i18n-config';

type Translations = typeof translationsData;

interface LanguageContextType {
  language: Locale;
  setLanguage: (lang: Locale) => void;
  t: Translations['en'];
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: ReactNode;
  initialLocale?: Locale;
}

export function LanguageProvider({ children, initialLocale }: LanguageProviderProps) {
  const [language, setLanguageState] = useState<Locale>(initialLocale || defaultLocale);
  const router = useRouter();
  const pathname = usePathname();

  // Update state when initialLocale changes (from URL)
  useEffect(() => {
    if (initialLocale && initialLocale !== language) {
      setLanguageState(initialLocale);
    }
  }, [initialLocale]);

  const setLanguage = (newLanguage: Locale) => {
    if (newLanguage === language) return;

    // Save to cookie for middleware
    document.cookie = `NEXT_LOCALE=${newLanguage}; path=/; max-age=31536000`;

    // Navigate to the new locale URL
    // Replace the current locale in the pathname with the new one
    const segments = pathname.split('/');
    if (locales.includes(segments[1] as Locale)) {
      segments[1] = newLanguage;
    } else {
      segments.splice(1, 0, newLanguage);
    }
    const newPath = segments.join('/') || '/';

    router.push(newPath);
    setLanguageState(newLanguage);
  };

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

// Export locale types for convenience
export type { Locale };
export { locales, defaultLocale };
