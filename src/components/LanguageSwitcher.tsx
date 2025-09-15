import React from 'react';
import { Globe } from 'lucide-react';
import { useTranslation } from '../contexts/TranslationContext';

interface LanguageSwitcherProps {
  onLanguageChange?: () => void;
}

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ onLanguageChange }) => {
  const { language, setLanguage, isRTL } = useTranslation();

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ar' : 'en');
    // Call the callback if provided (to close mobile menu)
    if (onLanguageChange) {
      onLanguageChange();
    }
  };

  return (
    <button
      onClick={toggleLanguage}
      className={`flex items-center space-x-2 mx-4 px-4 py-2 rounded-lg bg-white/90 hover:bg-white border border-inovara-primary/20 hover:border-inovara-primary/40 transition-all duration-300 group backdrop-blur-sm shadow-sm hover:shadow-md ${isRTL ? 'flex-row-reverse space-x-reverse' : ''}`}
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
