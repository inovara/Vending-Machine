import React from 'react';
import { Globe } from 'lucide-react';
import { useTranslation } from '../contexts/TranslationContext';

const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage } = useTranslation();

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ar' : 'en');
  };

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center space-x-2 mx-4 px-4 py-2 rounded-lg bg-white/90 hover:bg-white border border-inovara-primary/20 hover:border-inovara-primary/40 transition-all duration-300 group backdrop-blur-sm shadow-sm hover:shadow-md"
      aria-label="Switch language"
    >
      <Globe className="w-4 h-4 text-inovara-primary group-hover:text-inovara-accent group-hover:rotate-180 transition-all duration-300" />
      <span className="text-inovara-primary font-medium text-sm group-hover:text-inovara-accent transition-colors duration-300">
        {language === 'en' ? 'العربية' : 'English'}
      </span>
    </button>
  );
};

export default LanguageSwitcher;
