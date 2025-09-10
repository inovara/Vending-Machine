import React from 'react';
import { ChevronRight, Play, Clock, CreditCard, TrendingUp, Wifi, MapPin, Star } from 'lucide-react';
import { navigateToSection } from '../utils/navigation';
import { useTranslation } from '../contexts/TranslationContext';

const HeroSection: React.FC = () => {
  const { t, isRTL } = useTranslation();

  return (
    <section className={`relative min-h-screen flex items-center justify-center bg-hero-bg overflow-hidden ${isRTL ? 'rtl' : 'ltr'}`}>
      {/* Enhanced Background */}
        <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-luxury-charcoal via-inovara-primary/90 to-luxury-charcoal"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-inovara-accent/20 via-transparent to-inovara-secondary/20"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-inovara-accent/25 via-transparent to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-luxury-charcoal/50 via-transparent to-transparent"></div>
      </div>

      {/* Subtle Pattern Overlay */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>

      {/* Main Content */}
      <div className={`relative z-10 text-center px-6 mt-16 max-w-6xl mx-auto ${isRTL ? 'rtl' : 'ltr'}`}>

        {/* Main Headline */}
        <h1 className="mb-8 leading-tight">
          <div className="text-4xl md:text-5xl lg:text-7xl font-black text-white tracking-tight mb-4">
            <span className="inline-block bg-gradient-to-r from-white via-inovara-neutral to-white bg-clip-text text-transparent">{t('hero.title').split(' ')[0]}</span>
            <span className="inline-block mx-3 bg-gradient-to-r from-inovara-accent via-inovara-accent to-inovara-secondary bg-clip-text text-transparent">{t('hero.title').split(' ')[1]}</span>
            <span className="inline-block bg-gradient-to-r from-white via-inovara-neutral to-white bg-clip-text text-transparent">{t('hero.title').split(' ')[2]}</span>
          </div>
          <div className="text-xl md:text-2xl lg:text-3xl font-light text-white/90 tracking-wide">
            <span className="inline-block">{t('hero.subtitle')}</span>
          </div>
      </h1>

        {/* Subtext */}
        <div className="max-w-4xl mx-auto mb-12">
          <p className="text-lg md:text-xl lg:text-2xl text-white/80 font-light leading-relaxed mb-6">
            {t('hero.description')}
          </p>
          
          {/* Features */}
          <div className="flex flex-wrap justify-center gap-6 text-sm text-white/70">
            <span className="flex items-center space-x-2 bg-inovara-primary/10 backdrop-blur-sm border border-inovara-accent/20 rounded-full px-4 py-2">
              <Clock className="w-4 h-4 text-inovara-accent" />
              <span>{t('hero.feature.24-7')}</span>
            </span>
            <span className="flex items-center space-x-2 bg-inovara-primary/10 backdrop-blur-sm border border-inovara-accent/20 rounded-full px-4 py-2">
              <CreditCard className="w-4 h-4 text-inovara-accent" />
              <span>{t('hero.feature.cashless')}</span>
            </span>
            <span className="flex items-center space-x-2 bg-inovara-primary/10 backdrop-blur-sm border border-inovara-accent/20 rounded-full px-4 py-2">
              <TrendingUp className="w-4 h-4 text-inovara-accent" />
              <span>{t('hero.feature.analytics')}</span>
            </span>
            <span className="flex items-center space-x-2 bg-inovara-primary/10 backdrop-blur-sm border border-inovara-accent/20 rounded-full px-4 py-2">
              <Wifi className="w-4 h-4 text-inovara-accent" />
              <span>{t('hero.feature.remote')}</span>
            </span>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className={`flex flex-col sm:flex-row gap-6 justify-center items-center mb-16 ${isRTL ? 'sm:flex-row-reverse' : 'sm:flex-row'}`}>
          <button 
            className="group px-12 py-4 bg-gradient-to-r from-inovara-accent via-inovara-accent to-inovara-secondary text-white font-bold rounded-xl hover:shadow-2xl hover:shadow-inovara-accent/30 transition-all duration-300 transform hover:scale-105 relative overflow-hidden"
            onClick={() => navigateToSection('#contact')}
            aria-label="Get free quote for vending machines"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-inovara-accent/20 to-inovara-secondary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <span className={`relative flex items-center ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
              {t('hero.cta.quote')}
              <ChevronRight className={`${isRTL ? 'mr-2' : 'ml-2'} h-5 w-5 group-hover:translate-x-1 transition-transform duration-300`} />
            </span>
          </button>
          
          <button 
            className="group px-8 py-4 border border-inovara-accent/50 text-white font-semibold rounded-xl hover:bg-inovara-accent/20 hover:border-inovara-accent/70 transition-all duration-300 backdrop-blur-sm"
            onClick={() => navigateToSection('#products')}
            aria-label="View vending machine products"
          >
            <span className={`flex items-center ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
              <Play className={`${isRTL ? 'ml-2' : 'mr-2'} h-4 w-4 group-hover:scale-110 transition-transform duration-300`} />
              {t('hero.cta.products')}
            </span>
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          <div className="text-center p-4 bg-gradient-to-br from-inovara-accent/10 to-inovara-secondary/10 backdrop-blur-sm border border-inovara-accent/30 rounded-xl shadow-lg shadow-inovara-accent/10">
            <div className="text-3xl md:text-4xl font-black text-white mb-1">100%</div>
            <div className="text-inovara-accent text-sm font-medium">{t('hero.stats.machines')}</div>
          </div>
          <div className="text-center p-4 bg-gradient-to-br from-inovara-secondary/10 to-inovara-accent/10 backdrop-blur-sm border border-inovara-secondary/30 rounded-xl shadow-lg shadow-inovara-secondary/10">
            <div className="text-3xl md:text-4xl font-black text-white mb-1">100%</div>
            <div className="text-inovara-secondary text-sm font-medium">{t('hero.stats.uptime')}</div>
          </div>
          <div className="text-center p-4 bg-gradient-to-br from-inovara-accent/10 to-inovara-secondary/10 backdrop-blur-sm border border-inovara-accent/30 rounded-xl shadow-lg shadow-inovara-accent/10">
            <div className="text-3xl md:text-4xl font-black text-white mb-1">100%</div>
            <div className="text-inovara-accent text-sm font-medium">{t('hero.stats.support')}</div>
          </div>
          <div className="text-center p-4 bg-gradient-to-br from-inovara-secondary/10 to-inovara-accent/10 backdrop-blur-sm border border-inovara-secondary/30 rounded-xl shadow-lg shadow-inovara-secondary/10">
            <div className="text-3xl md:text-4xl font-black text-white mb-1">∞</div>
            <div className="text-inovara-secondary text-sm font-medium">{t('hero.stats.global')}</div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-bounce"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;