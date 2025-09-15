import React, { memo } from 'react';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { navigateToSection } from '../utils/navigation';
import { useTranslation } from '../contexts/TranslationContext';

const HeroSection: React.FC = memo(() => {
  const { t, isRTL } = useTranslation();

  return (
    <section
      className={`relative min-h-screen flex items-center justify-center overflow-hidden ${isRTL ? 'rtl' : 'ltr'}`}
      style={{
        background: 'linear-gradient(135deg, rgba(255,255,255,1) 0%, rgba(245,245,245,0.8) 50%, rgba(255,255,255,1) 100%)'
      }}
      role="banner"
      aria-label="Hero section with smart vending machine solutions"
    >
      {/* Professional Enterprise Background */}
      <div className="absolute inset-0" aria-hidden="true">
        {/* Minimal background effects - consistent with other sections */}
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-inovara-accent/3 to-inovara-secondary/3 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-gradient-to-tr from-inovara-primary/2 to-inovara-accent/2 rounded-full blur-3xl"></div>
      </div>

      {/* Enterprise Content Container */}
      <div className={`relative z-10 text-center px-6 py-24 max-w-6xl mx-auto ${isRTL ? 'rtl' : 'ltr'}`}>

        {/* Enterprise Header - Consistent with other sections */}
        <div className="mb-16">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-inovara-primary tracking-tight mb-8 leading-[1.1]">
            {t('hero.title')}
          </h1>
          
          {/* Professional Divider - Consistent with other sections */}
          <div className="w-24 h-1 bg-gradient-to-r from-inovara-accent to-inovara-secondary mx-auto mb-8 rounded-full"></div>
          
          <div className="text-xl md:text-2xl font-light text-inovara-primary/70 tracking-wide mb-8">
            {t('hero.subtitle')}
          </div>

          {/* Professional Description */}
          <div className="max-w-4xl mx-auto">
            <p className="text-lg md:text-xl text-inovara-primary/60 font-light leading-relaxed">
              {t('hero.description')}
            </p>
          </div>
        </div>

        {/* Enterprise Features - Improved responsive grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto mb-16">
          <div className="flex items-center justify-center space-x-3 bg-white/60 backdrop-blur-sm border border-inovara-primary/10 rounded-xl px-4 py-4 hover:bg-white/80 hover:border-inovara-primary/20 transition-all duration-300">
            <CheckCircle className="w-5 h-5 text-inovara-accent flex-shrink-0" />
            <span className="text-sm font-semibold text-inovara-primary/80">{t('hero.features.24-7')}</span>
          </div>
          <div className="flex items-center justify-center space-x-3 bg-white/60 backdrop-blur-sm border border-inovara-primary/10 rounded-xl px-4 py-4 hover:bg-white/80 hover:border-inovara-primary/20 transition-all duration-300">
            <CheckCircle className="w-5 h-5 text-inovara-accent flex-shrink-0" />
            <span className="text-sm font-semibold text-inovara-primary/80">{t('hero.features.cashless')}</span>
          </div>
          <div className="flex items-center justify-center space-x-3 bg-white/60 backdrop-blur-sm border border-inovara-primary/10 rounded-xl px-4 py-4 hover:bg-white/80 hover:border-inovara-primary/20 transition-all duration-300">
            <CheckCircle className="w-5 h-5 text-inovara-accent flex-shrink-0" />
            <span className="text-sm font-semibold text-inovara-primary/80">{t('hero.features.analytics')}</span>
          </div>
          <div className="flex items-center justify-center space-x-3 bg-white/60 backdrop-blur-sm border border-inovara-primary/10 rounded-xl px-4 py-4 hover:bg-white/80 hover:border-inovara-primary/20 transition-all duration-300">
            <CheckCircle className="w-5 h-5 text-inovara-accent flex-shrink-0" />
            <span className="text-sm font-semibold text-inovara-primary/80">{t('hero.features.remote')}</span>
          </div>
        </div>

        {/* Professional CTA Section - Improved responsive layout */}
        <div className={`flex flex-col sm:flex-row gap-6 justify-center items-center max-w-2xl mx-auto ${isRTL ? 'sm:flex-row-reverse' : 'sm:flex-row'}`}>
          {/* Primary CTA - Enterprise Quote */}
          <button
            className="group relative px-10 py-4 bg-gradient-to-r from-inovara-primary to-inovara-secondary text-white font-bold text-lg rounded-2xl shadow-enterprise hover:shadow-enterprise-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-inovara-accent/30 overflow-hidden w-full sm:w-auto"
            onClick={() => navigateToSection('#contact')}
            aria-label="Get enterprise quote for smart vending machines"
          >
            {/* Shimmer effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>

            <span className={`relative flex items-center justify-center ${isRTL ? 'flex-row-reverse' : 'flex-row'} gap-3`}>
              {t('hero.cta.quote')}
              <ArrowRight className={`w-5 h-5 group-hover:translate-x-1 transition-transform duration-300 ${isRTL ? 'rotate-180' : ''}`} />
            </span>
          </button>

          {/* Secondary CTA - Products */}
          <button
            className="group px-8 py-4 border-2 border-inovara-primary/20 text-inovara-primary font-bold text-lg rounded-2xl hover:bg-inovara-primary/5 hover:border-inovara-primary/30 transition-all duration-300 backdrop-blur-sm focus:outline-none focus:ring-4 focus:ring-inovara-primary/20 bg-white/60 w-full sm:w-auto"
            onClick={() => navigateToSection('#products')}
            aria-label="View smart vending machine products"
          >
            <span className={`flex items-center justify-center ${isRTL ? 'flex-row-reverse' : 'flex-row'} gap-3`}>
              {t('hero.cta.products')}
              <ArrowRight className={`w-5 h-5 group-hover:translate-x-1 transition-transform duration-300 ${isRTL ? 'rotate-180' : ''}`} />
            </span>
          </button>
        </div>
      </div>

      {/* Premium Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="w-8 h-12 border-2 border-inovara-primary/20 rounded-full flex justify-center bg-white/60 backdrop-blur-sm">
          <div className="w-1.5 h-4 bg-inovara-primary/60 rounded-full mt-2 animate-bounce"></div>
        </div>
      </div>
    </section>
  );
});

HeroSection.displayName = 'HeroSection';

export default HeroSection;