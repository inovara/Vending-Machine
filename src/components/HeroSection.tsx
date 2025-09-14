import React from 'react';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { navigateToSection } from '../utils/navigation';
import { useTranslation } from '../contexts/TranslationContext';

const HeroSection: React.FC = () => {
  const { t, isRTL } = useTranslation();

  return (
    <section className={`relative min-h-screen flex items-center justify-center bg-white overflow-hidden ${isRTL ? 'rtl' : 'ltr'}`}>
      {/* Minimal Enterprise Background */}
      <div className="absolute inset-0">
        {/* Ultra-subtle gradient for depth */}
        <div className="absolute inset-0 bg-gradient-to-br from-white via-inovara-neutral/3 to-white"></div>

        {/* Single accent element for visual interest */}
        <div className="absolute top-1/3 right-1/3 w-64 h-64 bg-gradient-to-br from-inovara-accent/2 to-inovara-secondary/2 rounded-full blur-3xl"></div>
      </div>

      {/* Enterprise Content */}
      <div className={`relative z-10 text-center px-6 py-20 max-w-5xl mx-auto ${isRTL ? 'rtl' : 'ltr'}`}>

        {/* Enterprise Headline */}
        <h1 className="mb-10">
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-inovara-primary tracking-tight mb-8 leading-[0.9]">
            {t('hero.title')}
          </h2>
          <div className="text-xl md:text-2xl lg:text-3xl font-light text-inovara-primary/60 tracking-wide">
            {t('hero.subtitle')}
          </div>
        </h1>

        {/* Minimal Description */}
        <div className="max-w-3xl mx-auto mb-12">
          <p className="text-lg md:text-xl text-inovara-primary/70 font-light leading-relaxed">
            {t('hero.description')}
          </p>
        </div>

        {/* Enterprise Features - Minimal */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-16">
          <div className="flex items-center justify-center space-x-2 text-inovara-primary/80">
            <CheckCircle className="w-5 h-5 text-inovara-accent flex-shrink-0" />
            <span className="text-sm font-medium">{t('hero.features.24-7')}</span>
          </div>
          <div className="flex items-center justify-center space-x-2 text-inovara-primary/80">
            <CheckCircle className="w-5 h-5 text-inovara-accent flex-shrink-0" />
            <span className="text-sm font-medium">{t('hero.features.cashless')}</span>
          </div>
          <div className="flex items-center justify-center space-x-2 text-inovara-primary/80">
            <CheckCircle className="w-5 h-5 text-inovara-accent flex-shrink-0" />
            <span className="text-sm font-medium">{t('hero.features.analytics')}</span>
          </div>
          <div className="flex items-center justify-center space-x-2 text-inovara-primary/80">
            <CheckCircle className="w-5 h-5 text-inovara-accent flex-shrink-0" />
            <span className="text-sm font-medium">{t('hero.features.remote')}</span>
          </div>
        </div>

        {/* Dual CTA Buttons */}
        <div className={`flex flex-col sm:flex-row gap-4 justify-center items-center ${isRTL ? 'sm:flex-row-reverse' : 'sm:flex-row'}`}>
          {/* Primary CTA - Quote */}
          <button
            className="group px-10 py-4 bg-gradient-to-r from-inovara-primary to-inovara-secondary text-white font-bold text-lg rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-inovara-accent/30"
            onClick={() => navigateToSection('#contact')}
            aria-label="Get free quote for smart vending machines"
          >
            <span className={`flex items-center justify-center ${isRTL ? 'flex-row-reverse' : 'flex-row'} gap-2`}>
              {t('hero.cta.quote')}
              <ArrowRight className={`w-5 h-5 group-hover:translate-x-1 transition-transform duration-300 ${isRTL ? 'rotate-180' : ''}`} />
            </span>
          </button>

          {/* Secondary CTA - Products */}
          <button
            className="group px-8 py-4 border-2 border-inovara-primary/30 text-inovara-primary font-bold text-lg rounded-xl hover:bg-inovara-primary/5 hover:border-inovara-primary/50 transition-all duration-300 backdrop-blur-sm focus:outline-none focus:ring-4 focus:ring-inovara-primary/20"
            onClick={() => navigateToSection('#products')}
            aria-label="View smart vending machine products"
          >
            <span className={`flex items-center justify-center ${isRTL ? 'flex-row-reverse' : 'flex-row'} gap-2`}>
              {t('hero.cta.products')}
              <ArrowRight className={`w-5 h-5 group-hover:translate-x-1 transition-transform duration-300 ${isRTL ? 'rotate-180' : ''}`} />
            </span>
          </button>
        </div>
      </div>

      {/* Minimal Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="w-6 h-10 border border-inovara-primary/20 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-inovara-primary/40 rounded-full mt-2 animate-bounce"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;