import React, { useEffect, useState } from 'react';
import { X, Sparkles, ArrowRight, Clock, Shield, Award } from 'lucide-react';
import { useTranslation } from '../contexts/TranslationContext';

interface SlideInCtaProps {
  onGetQuote: () => void;
}

const SlideInCta: React.FC<SlideInCtaProps> = ({ onGetQuote }) => {
  const [visible, setVisible] = useState(false);
  const [isClosed, setIsClosed] = useState(false);
  const { t, isRTL } = useTranslation();

  useEffect(() => {
    // Check if user has closed the CTA before
    const hasClosed = localStorage.getItem('slideInCtaClosed');
    if (hasClosed) {
      setIsClosed(true);
      return;
    }

    const onScroll = () => {
      const scrolled = window.scrollY;
      const threshold = window.innerHeight * 0.7;
      setVisible(scrolled > threshold);
    };
    
    window.addEventListener('scroll', onScroll);
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleClose = () => {
    setIsClosed(true);
    localStorage.setItem('slideInCtaClosed', 'true');
  };

  const handleGetQuote = () => {
    onGetQuote();
    handleClose(); // Close after action
  };

  if (isClosed) return null;

  return (
    <div
      className={`fixed bottom-6 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-4xl transition-all duration-700 z-50 ${
        visible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95 pointer-events-none'
      } ${isRTL ? 'rtl' : 'ltr'}`}
      role="region"
      aria-label="Professional quote request"
    >
      <div className="relative bg-gradient-to-br from-white via-white to-inovara-neutral/20 border border-inovara-primary/15 shadow-2xl shadow-inovara-primary/20 rounded-3xl p-6 sm:p-8 backdrop-blur-xl overflow-hidden hover:shadow-3xl hover:shadow-inovara-primary/25 transition-all duration-500">
        {/* Premium Background Effects */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-inovara-accent/10 to-inovara-secondary/10 rounded-full blur-2xl animate-pulse"></div>
          <div className="absolute -bottom-20 -left-20 w-32 h-32 bg-gradient-to-tr from-inovara-primary/10 to-inovara-accent/10 rounded-full blur-2xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-gradient-to-r from-inovara-secondary/5 to-inovara-accent/5 rounded-full blur-xl"></div>
        </div>

        {/* Close Button */}
        <button
          onClick={handleClose}
          className={`absolute top-4 ${isRTL ? 'left-4' : 'right-4'} z-20 p-2 rounded-full bg-white/80 hover:bg-white text-inovara-primary/70 hover:text-inovara-primary transition-all duration-300 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-inovara-accent/50`}
          aria-label="Close quote request"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="relative z-10">
          {/* Header Section */}
          <div className={`text-center sm:text-left ${isRTL ? 'sm:text-right' : 'sm:text-left'} mb-8`}>
            <div className={`flex items-center justify-center sm:justify-start ${isRTL ? 'sm:justify-end' : 'sm:justify-start'} ${isRTL ? 'space-x-reverse space-x-3' : 'space-x-3'} mb-4`}>
              <div className="w-12 h-12 bg-gradient-to-br from-inovara-primary to-inovara-secondary rounded-2xl flex items-center justify-center shadow-lg">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-black text-inovara-primary mb-1">
                  {t('slideInCta.title')}
                </h3>
                <p className="text-inovara-primary/70 font-medium">
                  {t('slideInCta.subtitle')}
                </p>
              </div>
            </div>
            
            <p className="text-inovara-primary/80 text-lg leading-relaxed max-w-2xl mx-auto sm:mx-0">
              {t('slideInCta.description')}
            </p>
          </div>

          {/* Benefits Section */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            <div className={`flex items-center ${isRTL ? 'space-x-reverse space-x-3 flex-row-reverse' : 'space-x-3'} p-4 rounded-xl bg-white/60 hover:bg-white/80 transition-all duration-300 border border-inovara-primary/10`}>
              <div className="w-10 h-10 bg-gradient-to-br from-inovara-accent to-inovara-accent/80 rounded-xl flex items-center justify-center">
                <Clock className="w-5 h-5 text-white" />
              </div>
              <div className={`${isRTL ? 'text-right' : 'text-left'}`}>
                <p className="font-semibold text-inovara-primary text-sm">{t('slideInCta.benefits.fast')}</p>
                <p className="text-inovara-primary/60 text-xs">{t('slideInCta.benefits.fastDesc')}</p>
              </div>
            </div>
            
            <div className={`flex items-center ${isRTL ? 'space-x-reverse space-x-3 flex-row-reverse' : 'space-x-3'} p-4 rounded-xl bg-white/60 hover:bg-white/80 transition-all duration-300 border border-inovara-primary/10`}>
              <div className="w-10 h-10 bg-gradient-to-br from-inovara-secondary to-inovara-secondary/80 rounded-xl flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <div className={`${isRTL ? 'text-right' : 'text-left'}`}>
                <p className="font-semibold text-inovara-primary text-sm">{t('slideInCta.benefits.secure')}</p>
                <p className="text-inovara-primary/60 text-xs">{t('slideInCta.benefits.secureDesc')}</p>
              </div>
            </div>
            
            <div className={`flex items-center ${isRTL ? 'space-x-reverse space-x-3 flex-row-reverse' : 'space-x-3'} p-4 rounded-xl bg-white/60 hover:bg-white/80 transition-all duration-300 border border-inovara-primary/10`}>
              <div className="w-10 h-10 bg-gradient-to-br from-inovara-primary to-inovara-primary/80 rounded-xl flex items-center justify-center">
                <Award className="w-5 h-5 text-white" />
              </div>
              <div className={`${isRTL ? 'text-right' : 'text-left'}`}>
                <p className="font-semibold text-inovara-primary text-sm">{t('slideInCta.benefits.premium')}</p>
                <p className="text-inovara-primary/60 text-xs">{t('slideInCta.benefits.premiumDesc')}</p>
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <div className={`flex justify-center ${isRTL ? 'sm:justify-end' : 'sm:justify-start'}`}>
            <button
              onClick={handleGetQuote}
              className={`group px-8 py-4 bg-gradient-to-r from-inovara-primary to-inovara-secondary text-white rounded-2xl font-bold text-lg shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-inovara-accent/30 flex items-center ${isRTL ? 'flex-row-reverse' : 'flex-row'} gap-3`}
            >
              <span>{t('slideInCta.cta')}</span>
              <ArrowRight className={`w-6 h-6 group-hover:translate-x-1 transition-transform ${isRTL ? 'rotate-180' : ''}`} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SlideInCta;

