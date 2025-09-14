import React from 'react';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { navigateToSection } from '../utils/navigation';
import { useTranslation } from '../contexts/TranslationContext';

const HeroSection: React.FC = () => {
  const { t, isRTL } = useTranslation();

  return (
    <section
      className={`relative min-h-screen flex items-center justify-center bg-white overflow-hidden ${isRTL ? 'rtl' : 'ltr'}`}
      role="banner"
      aria-label="Hero section with smart vending machine solutions"
    >
      {/* Professional Enterprise Background */}
      <div className="absolute inset-0" aria-hidden="true">
        {/* Sophisticated gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-white via-inovara-neutral/2 to-white"></div>

        {/* Geometric accent elements for premium feel */}
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-inovara-accent/3 to-inovara-secondary/3 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-gradient-to-tr from-inovara-primary/2 to-inovara-accent/2 rounded-full blur-3xl"></div>

        {/* Subtle grid pattern for enterprise feel */}
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(46, 0, 20, 0.15) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      {/* Enterprise Content Container */}
      <div className={`relative z-10 text-center px-6 py-24 max-w-6xl mx-auto ${isRTL ? 'rtl' : 'ltr'}`}>

        {/* Enterprise Headline */}
        <div className="mb-12">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-inovara-primary tracking-tight mb-8 leading-[0.9]">
            {t('hero.title')}
          </h1>
          <div className="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-light text-inovara-primary/70 tracking-wide mb-8">
            {t('hero.subtitle')}
          </div>

          {/* Professional Description */}
          <div className="max-w-4xl mx-auto">
            <p className="text-lg md:text-xl lg:text-2xl text-inovara-primary/60 font-light leading-relaxed">
              {t('hero.description')}
            </p>
          </div>
        </div>

        {/* Enterprise Features */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-16">
          <div className="flex items-center justify-center space-x-3 bg-white/40 backdrop-blur-sm border border-inovara-primary/5 rounded-xl px-4 py-3 hover:bg-white/60 hover:border-inovara-primary/10 transition-all duration-300">
            <CheckCircle className="w-5 h-5 text-inovara-accent flex-shrink-0" />
            <span className="text-sm font-semibold text-inovara-primary/80">{t('hero.features.24-7')}</span>
          </div>
          <div className="flex items-center justify-center space-x-3 bg-white/40 backdrop-blur-sm border border-inovara-primary/5 rounded-xl px-4 py-3 hover:bg-white/60 hover:border-inovara-primary/10 transition-all duration-300">
            <CheckCircle className="w-5 h-5 text-inovara-accent flex-shrink-0" />
            <span className="text-sm font-semibold text-inovara-primary/80">{t('hero.features.cashless')}</span>
          </div>
          <div className="flex items-center justify-center space-x-3 bg-white/40 backdrop-blur-sm border border-inovara-primary/5 rounded-xl px-4 py-3 hover:bg-white/60 hover:border-inovara-primary/10 transition-all duration-300">
            <CheckCircle className="w-5 h-5 text-inovara-accent flex-shrink-0" />
            <span className="text-sm font-semibold text-inovara-primary/80">{t('hero.features.analytics')}</span>
          </div>
          <div className="flex items-center justify-center space-x-3 bg-white/40 backdrop-blur-sm border border-inovara-primary/5 rounded-xl px-4 py-3 hover:bg-white/60 hover:border-inovara-primary/10 transition-all duration-300">
            <CheckCircle className="w-5 h-5 text-inovara-accent flex-shrink-0" />
            <span className="text-sm font-semibold text-inovara-primary/80">{t('hero.features.remote')}</span>
          </div>
        </div>

        {/* Professional CTA Section */}
        <div className={`flex flex-col sm:flex-row gap-6 justify-center items-center ${isRTL ? 'sm:flex-row-reverse' : 'sm:flex-row'}`}>
          {/* Primary CTA - Enterprise Quote */}
          <button
            className="group relative px-12 py-5 bg-gradient-to-r from-inovara-primary to-inovara-secondary text-white font-bold text-lg rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-inovara-accent/30 overflow-hidden"
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
            className="group px-10 py-5 border-2 border-inovara-primary/20 text-inovara-primary font-bold text-lg rounded-2xl hover:bg-inovara-primary/5 hover:border-inovara-primary/30 transition-all duration-300 backdrop-blur-sm focus:outline-none focus:ring-4 focus:ring-inovara-primary/20 bg-white/60"
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
};

export default HeroSection;