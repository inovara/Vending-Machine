import React from 'react';
import { Globe } from 'lucide-react';
import { useTranslation } from '../contexts/TranslationContext';

const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage, isRTL } = useTranslation();

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ar' : 'en');
  };

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center space-x-2 mx-4 px-4 py-2 rounded-lg bg-gradient-to-r from-inovara-accent/10 to-inovara-secondary/10 hover:from-inovara-accent/20 hover:to-inovara-secondary/20 border border-inovara-accent/30 hover:border-inovara-accent/50 transition-all duration-300 group backdrop-blur-sm"
      aria-label="Switch language"
    >
      <Globe className="w-4 h-4 text-inovara-accent group-hover:rotate-180 transition-transform duration-300" />
      <span className="text-inovara-accent font-medium text-sm group-hover:text-white transition-colors duration-300">
        {language === 'en' ? 'العربية' : 'English'}
      </span>
    </button>
  );
};

export default LanguageSwitcher;
