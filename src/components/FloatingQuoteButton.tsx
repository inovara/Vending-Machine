import React from 'react';
import { Calculator, X } from 'lucide-react';
import { useTranslation } from '../contexts/TranslationContext';

interface FloatingQuoteButtonProps {
  onQuoteClick: () => void;
}

const FloatingQuoteButton: React.FC<FloatingQuoteButtonProps> = ({ onQuoteClick }) => {
  const { t, isRTL } = useTranslation();
  return (
    <div className={`fixed bottom-6 z-40 ${isRTL ? 'left-6' : 'right-6'}`}>
      <button
        onClick={onQuoteClick}
        className="group relative bg-gradient-to-r from-inovara-accent to-inovara-primary text-white font-bold rounded-full p-4 shadow-2xl hover:shadow-inovara-accent/25 transition-all duration-300 transform hover:scale-110 animate-pulse"
        aria-label={t('nav.get-quote')}
      >
        <Calculator className="w-6 h-6" />
        
        {/* Tooltip */}
        <div className={`absolute bottom-full mb-2 px-3 py-2 bg-luxury-charcoal text-white text-sm font-medium rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap ${isRTL ? 'left-0' : 'right-0'}`}>
          {t('nav.get-quote')}
          <div className={`absolute top-full w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-luxury-charcoal ${isRTL ? 'left-4' : 'right-4'}`}></div>
        </div>
      </button>
    </div>
  );
};

export default FloatingQuoteButton;
