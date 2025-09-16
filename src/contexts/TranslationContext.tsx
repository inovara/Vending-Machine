import React, { createContext, useContext, useState, useEffect } from 'react';
import enTranslations from '../translations/en.json';
import arTranslations from '../translations/ar.json';

export type Language = 'en' | 'ar';

interface TranslationContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, variables?: Record<string, any>) => any;
  isRTL: boolean;
}

const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

// Helper function to get nested translation value
const getNestedValue = (obj: Record<string, any>, path: string): any => {
  return path.split('.').reduce((current: any, key: string) => {
    return current && current[key] !== undefined ? current[key] : null;
  }, obj) || path; // Return the key if translation not found
};

// Helper function to interpolate variables in translation strings
const interpolate = (text: string, variables: Record<string, any> = {}): string => {
  return text.replace(/\{(\w+)\}/g, (match, key) => {
    return variables[key] !== undefined ? variables[key] : match;
  });
};

export const TranslationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  // Load language preference from localStorage
  useEffect(() => {
    const savedLanguage = localStorage.getItem('inovara-language') as Language;
    if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'ar')) {
      setLanguage(savedLanguage);
    }
  }, []);

  // Save language preference to localStorage
  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('inovara-language', lang);
  };

  const getTranslations = () => {
    return language === 'ar' ? arTranslations : enTranslations;
  };

  const t = (key: string, variables?: Record<string, any>): any => {
    const translations = getTranslations();
    const translation = getNestedValue(translations, key);
    
    if (variables && typeof translation === 'string') {
      return interpolate(translation, variables);
    }
    
    return translation;
  };

  const isRTL = language === 'ar';

  return (
    <TranslationContext.Provider
      value={{
        language,
        setLanguage: handleSetLanguage,
        t,
        isRTL,
      }}
    >
      {children}
    </TranslationContext.Provider>
  );
};

export const useTranslation = (): TranslationContextType => {
  const context = useContext(TranslationContext);
  if (context === undefined) {
    throw new Error('useTranslation must be used within a TranslationProvider');
  }
  return context;
};

// Backward compatibility
export const useLanguage = useTranslation;
