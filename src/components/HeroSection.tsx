import React, { memo } from 'react';
import { ArrowRight, TrendingUp, Shield, Zap, Users } from 'lucide-react';
import { navigateToSection } from '../utils/navigation';
import { useTranslation } from '../contexts/TranslationContext';

const HeroSection: React.FC = memo(() => {
  const { t, isRTL } = useTranslation();

  return (
    <section
      className={`relative min-h-screen flex items-center justify-center overflow-hidden pt-10 sm:pt-2 ${isRTL ? 'rtl' : 'ltr'}`}
      style={{
        background: 'linear-gradient(135deg, rgba(255,255,255,1) 0%, rgba(245,245,245,0.8) 50%, rgba(255,255,255,1) 100%)'
      }}
      role="banner"
      aria-label="Hero section with smart vending machine solutions"
    >
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0" aria-hidden="true">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-inovara-accent/6 to-inovara-secondary/6 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-gradient-to-tr from-inovara-primary/5 to-inovara-accent/5 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-inovara-secondary/3 to-inovara-accent/3 rounded-full blur-2xl animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>

      {/* Enhanced Main Content Container with Proper Header Spacing */}
      <div className={`relative z-10 text-center px-4 sm:px-6 py-8 sm:py-12 max-w-7xl mx-auto ${isRTL ? 'rtl' : 'ltr'}`}>

        {/* Enhanced Main Headline with Mobile-Optimized Typography */}
        <div className="mb-6 sm:mb-8 mt-4 sm:mt-6">
          <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-inovara-primary tracking-tight mb-2 sm:mb-3 md:mb-4 leading-[0.95] sm:leading-[1.05] md:leading-[1.1]">
            {t('hero.title')}
          </h1>
          
          <div className="text-base xs:text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-inovara-secondary mb-3 sm:mb-4 md:mb-6 leading-tight">
            {t('hero.subtitle')}
          </div>

          <div className="max-w-xs xs:max-w-sm sm:max-w-xl md:max-w-2xl mx-auto">
            <p className="text-xs xs:text-sm sm:text-base md:text-lg text-inovara-primary/80 font-medium leading-relaxed">
              {t('hero.description')}
            </p>
          </div>
        </div>

        {/* Enhanced Value Propositions with Mobile-Optimized Layout */}
        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2 xs:gap-3 sm:gap-4 max-w-6xl mx-auto mb-6 sm:mb-8">
          <div className={`flex items-center p-3 sm:p-4 bg-white/80 backdrop-blur-sm border border-inovara-primary/15 rounded-xl hover:bg-white/95 hover:border-inovara-primary/25 transition-all duration-300 hover:-translate-y-1 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-inovara-accent to-inovara-secondary rounded-lg flex items-center justify-center flex-shrink-0" style={{marginRight: isRTL ? '0' : '0.75rem', marginLeft: isRTL ? '0.75rem' : '0'}}>
              <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </div>
            <div className={`${isRTL ? 'text-right' : 'text-left'} min-w-0 flex-1`}>
              <h3 className="text-xs sm:text-sm font-bold text-inovara-primary mb-1">{t('hero.benefits.revenue')}</h3>
              <p className="text-xs text-inovara-primary/70 leading-tight">{t('hero.benefits.revenueDesc')}</p>
            </div>
          </div>
          
          <div className={`flex items-center p-3 sm:p-4 bg-white/80 backdrop-blur-sm border border-inovara-primary/15 rounded-xl hover:bg-white/95 hover:border-inovara-primary/25 transition-all duration-300 hover:-translate-y-1 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-inovara-primary to-inovara-secondary rounded-lg flex items-center justify-center flex-shrink-0" style={{marginRight: isRTL ? '0' : '0.75rem', marginLeft: isRTL ? '0.75rem' : '0'}}>
              <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </div>
            <div className={`${isRTL ? 'text-right' : 'text-left'} min-w-0 flex-1`}>
              <h3 className="text-xs sm:text-sm font-bold text-inovara-primary mb-1">{t('hero.benefits.reliability')}</h3>
              <p className="text-xs text-inovara-primary/70 leading-tight">{t('hero.benefits.reliabilityDesc')}</p>
            </div>
          </div>
          
          <div className={`flex items-center p-3 sm:p-4 bg-white/80 backdrop-blur-sm border border-inovara-primary/15 rounded-xl hover:bg-white/95 hover:border-inovara-primary/25 transition-all duration-300 hover:-translate-y-1 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-inovara-accent to-inovara-secondary rounded-lg flex items-center justify-center flex-shrink-0" style={{marginRight: isRTL ? '0' : '0.75rem', marginLeft: isRTL ? '0.75rem' : '0'}}>
              <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </div>
            <div className={`${isRTL ? 'text-right' : 'text-left'} min-w-0 flex-1`}>
              <h3 className="text-xs sm:text-sm font-bold text-inovara-primary mb-1">{t('hero.benefits.innovation')}</h3>
              <p className="text-xs text-inovara-primary/70 leading-tight">{t('hero.benefits.innovationDesc')}</p>
            </div>
          </div>
          
          <div className={`flex items-center p-3 sm:p-4 bg-white/80 backdrop-blur-sm border border-inovara-primary/15 rounded-xl hover:bg-white/95 hover:border-inovara-primary/25 transition-all duration-300 hover:-translate-y-1 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-inovara-primary to-inovara-secondary rounded-lg flex items-center justify-center flex-shrink-0" style={{marginRight: isRTL ? '0' : '0.75rem', marginLeft: isRTL ? '0.75rem' : '0'}}>
              <Users className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </div>
            <div className={`${isRTL ? 'text-right' : 'text-left'} min-w-0 flex-1`}>
              <h3 className="text-xs sm:text-sm font-bold text-inovara-primary mb-1">{t('hero.benefits.support')}</h3>
              <p className="text-xs text-inovara-primary/70 leading-tight">{t('hero.benefits.supportDesc')}</p>
            </div>
          </div>
        </div>

        {/* Enhanced CTA Section with Mobile-Optimized Spacing */}
        <div className={`flex flex-col sm:flex-row gap-2 xs:gap-3 sm:gap-4 justify-center items-center max-w-3xl mx-auto mb-6 sm:mb-8 ${isRTL ? 'sm:flex-row-reverse' : 'sm:flex-row'}`}>
          {/* Primary CTA */}
          <button
            className="group relative px-6 sm:px-8 lg:px-10 py-3 sm:py-4 bg-gradient-to-r from-inovara-primary to-inovara-secondary text-white font-bold text-base sm:text-lg rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-inovara-accent/30 overflow-hidden w-full sm:w-auto"
            onClick={() => navigateToSection('#contact')}
            aria-label="Get free B2B quote for smart vending machines"
          >
            <div className={`absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000 group-hover:translate-x-full ${isRTL ? 'translate-x-full group-hover:-translate-x-full' : '-translate-x-full'}`}></div>
            <span className={`relative flex items-center justify-center ${isRTL ? 'flex-row-reverse' : 'flex-row'} gap-2 sm:gap-3`}>
              {t('hero.cta.quote')}
              <ArrowRight className={`w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 group-hover:translate-x-1 ${isRTL ? 'rotate-180 group-hover:-translate-x-1' : ''}`} />
            </span>
          </button>

          {/* Secondary CTA */}
          <button
            className="group px-6 sm:px-8 py-3 sm:py-4 border-2 border-inovara-primary text-inovara-primary font-bold text-base sm:text-lg rounded-2xl hover:bg-inovara-primary hover:text-white transition-all duration-300 backdrop-blur-sm focus:outline-none focus:ring-4 focus:ring-inovara-primary/20 bg-white/90 w-full sm:w-auto"
            onClick={() => navigateToSection('#products')}
            aria-label="View smart vending machine products"
          >
            <span className={`flex items-center justify-center ${isRTL ? 'flex-row-reverse' : 'flex-row'} gap-2 sm:gap-3`}>
              {t('hero.cta.products')}
              <ArrowRight className={`w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 group-hover:translate-x-1 ${isRTL ? 'rotate-180 group-hover:-translate-x-1' : ''}`} />
            </span>
          </button>
        </div>

        {/* Enhanced Trust Indicators with Mobile-Optimized Layout */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 xs:gap-3 sm:gap-4 md:gap-6 max-w-4xl mx-auto">
          <div className={`text-center p-3 sm:p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-inovara-primary/10 hover:bg-white/80 hover:border-inovara-primary/20 transition-all duration-300 ${isRTL ? 'text-right' : 'text-left'}`}>
            <div className="text-xl sm:text-2xl font-black text-inovara-primary mb-1">500+</div>
            <div className="text-xs text-inovara-primary/70 leading-tight">{t('hero.stats.machines')}</div>
          </div>
          <div className={`text-center p-3 sm:p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-inovara-primary/10 hover:bg-white/80 hover:border-inovara-primary/20 transition-all duration-300 ${isRTL ? 'text-right' : 'text-left'}`}>
            <div className="text-xl sm:text-2xl font-black text-inovara-primary mb-1">99.9%</div>
            <div className="text-xs text-inovara-primary/70 leading-tight">{t('hero.stats.uptime')}</div>
          </div>
          <div className={`text-center p-3 sm:p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-inovara-primary/10 hover:bg-white/80 hover:border-inovara-primary/20 transition-all duration-300 ${isRTL ? 'text-right' : 'text-left'}`}>
            <div className="text-xl sm:text-2xl font-black text-inovara-primary mb-1">24/7</div>
            <div className="text-xs text-inovara-primary/70 leading-tight">{t('hero.stats.support')}</div>
          </div>
          <div className={`text-center p-3 sm:p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-inovara-primary/10 hover:bg-white/80 hover:border-inovara-primary/20 transition-all duration-300 ${isRTL ? 'text-right' : 'text-left'}`}>
            <div className="text-xl sm:text-2xl font-black text-inovara-primary mb-1">180%</div>
            <div className="text-xs text-inovara-primary/70 leading-tight">{t('hero.stats.roi')}</div>
          </div>
        </div>
      </div>

      {/* Enhanced Responsive Scroll Indicator */}
      <div className="absolute bottom-4 sm:bottom-6 left-1/2 transform -translate-x-1/2">
        <div className="w-6 h-8 sm:w-8 sm:h-12 border-2 border-inovara-primary/40 rounded-full flex justify-center bg-white/90 backdrop-blur-sm shadow-lg">
          <div className="w-1 h-3 sm:w-1.5 sm:h-4 bg-inovara-primary/80 rounded-full mt-1 sm:mt-2 animate-bounce"></div>
        </div>
      </div>
    </section>
  );
});

HeroSection.displayName = 'HeroSection';

export default HeroSection;