import React, { memo } from 'react';
import { ArrowRight, TrendingUp, Shield, Zap, Users } from 'lucide-react';
import { navigateToSection } from '../utils/navigation';
import { useTranslation } from '../contexts/TranslationContext';

interface HeroSectionProps {
  onQuoteClick?: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = memo(({ onQuoteClick }) => {
  const { t, isRTL } = useTranslation();

  return (
    <section
      className={`enterprise-hero ${isRTL ? 'rtl' : 'ltr'}`}
      style={{
        background: 'linear-gradient(135deg, rgba(255,255,255,1) 0%, rgba(245,245,245,0.8) 50%, rgba(255,255,255,1) 100%)'
      }}
      role="banner"
      aria-label="Hero section with smart vending machine solutions"
    >
      {/* Enterprise Background Effects */}
      <div className="enterprise-bg-effects" aria-hidden="true">
        <div className="enterprise-bg-blob-1"></div>
        <div className="enterprise-bg-blob-2"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-inovara-secondary/3 to-inovara-accent/3 rounded-full blur-2xl animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>

      {/* Enterprise Content Container */}
      <div className={`enterprise-container enterprise-stack ${isRTL ? 'rtl' : 'ltr'}`}>
        {/* Enterprise Badge */}
        <div className="enterprise-flex-center">
          <div className="enterprise-card-hover inline-flex items-center gap-3 px-6 py-3">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="enterprise-overline">{t('hero.badge.egypt')}</span>
          </div>
        </div>

        {/* Enterprise Main Content */}
        <div className="enterprise-content-lg enterprise-stack-sm">
          <h1 className="enterprise-display enterprise-gradient-text animate-fade-in-up">
            {t('hero.title')}
          </h1>
          
          <div className="enterprise-subtitle animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            {t('hero.subtitle')}
          </div>

          <div className="enterprise-body-lg animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            {t('hero.description')}
          </div>
        </div>

        {/* Enterprise Benefits Grid */}
        <div className="enterprise-grid-4 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
          <div className="enterprise-card-feature" data-aos="fade-up" data-aos-delay="100">
            <div className="enterprise-flex-center mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-inovara-accent to-inovara-secondary rounded-xl flex items-center justify-center shadow-lg">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
            </div>
            <h3 className="enterprise-title mb-2">{t('hero.benefits.revenue')}</h3>
            <p className="enterprise-body-sm">{t('hero.benefits.revenueDesc')}</p>
          </div>
          
          <div className="enterprise-card-feature" data-aos="fade-up" data-aos-delay="200">
            <div className="enterprise-flex-center mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-inovara-primary to-inovara-secondary rounded-xl flex items-center justify-center shadow-lg">
                <Shield className="w-6 h-6 text-white" />
              </div>
            </div>
            <h3 className="enterprise-title mb-2">{t('hero.benefits.reliability')}</h3>
            <p className="enterprise-body-sm">{t('hero.benefits.reliabilityDesc')}</p>
          </div>
          
          <div className="enterprise-card-feature" data-aos="fade-up" data-aos-delay="300">
            <div className="enterprise-flex-center mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-inovara-accent to-inovara-secondary rounded-xl flex items-center justify-center shadow-lg">
                <Zap className="w-6 h-6 text-white" />
              </div>
            </div>
            <h3 className="enterprise-title mb-2">{t('hero.benefits.innovation')}</h3>
            <p className="enterprise-body-sm">{t('hero.benefits.innovationDesc')}</p>
          </div>
          
          <div className="enterprise-card-feature" data-aos="fade-up" data-aos-delay="400">
            <div className="enterprise-flex-center mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-inovara-primary to-inovara-secondary rounded-xl flex items-center justify-center shadow-lg">
                <Users className="w-6 h-6 text-white" />
              </div>
            </div>
            <h3 className="enterprise-title mb-2">{t('hero.benefits.support')}</h3>
            <p className="enterprise-body-sm">{t('hero.benefits.supportDesc')}</p>
          </div>
        </div>

        {/* Enterprise CTA Section */}
        <div className="enterprise-flex-center enterprise-stack-sm animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
          {/* Primary CTA */}
          <div className={`enterprise-inline ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
            <button
              className="group relative px-8 py-4 bg-gradient-to-r from-inovara-primary to-inovara-secondary text-white font-bold text-lg rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-inovara-accent/30 overflow-hidden"
              onClick={() => onQuoteClick?.()}
              aria-label="Get free B2B quote for smart vending machines"
            >
              <div className={`absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000 group-hover:translate-x-full ${isRTL ? 'translate-x-full group-hover:-translate-x-full' : '-translate-x-full'}`}></div>
              <span className={`relative flex items-center justify-center ${isRTL ? 'flex-row-reverse' : 'flex-row'} gap-3`}>
                {t('hero.cta.quote')}
                <ArrowRight className={`w-5 h-5 transition-transform duration-300 group-hover:translate-x-1 ${isRTL ? 'rotate-180 group-hover:-translate-x-1' : ''}`} />
              </span>
            </button>

            {/* Secondary CTA */}
            <button
              className="group px-8 py-4 border-2 border-inovara-primary text-inovara-primary font-bold text-lg rounded-2xl hover:bg-inovara-primary hover:text-white transition-all duration-300 backdrop-blur-sm focus:outline-none focus:ring-4 focus:ring-inovara-primary/20 bg-white/90"
              onClick={() => navigateToSection('#products')}
              aria-label="View smart vending machine products"
            >
              <span className={`flex items-center justify-center ${isRTL ? 'flex-row-reverse' : 'flex-row'} gap-3`}>
                {t('hero.cta.products')}
                <ArrowRight className={`w-5 h-5 transition-transform duration-300 group-hover:translate-x-1 ${isRTL ? 'rotate-180 group-hover:-translate-x-1' : ''}`} />
              </span>
            </button>
          </div>
        </div>

        {/* Enterprise Stats Section */}
        <div className="enterprise-grid-4 animate-fade-in-up" style={{ animationDelay: '1s' }}>
          <div className="enterprise-card-hover" data-aos="fade-up" data-aos-delay="100">
            <div className="enterprise-heading-2 mb-2">500+</div>
            <div className="enterprise-caption">{t('hero.stats.machines')}</div>
          </div>
          
          <div className="enterprise-card-hover" data-aos="fade-up" data-aos-delay="200">
            <div className="enterprise-heading-2 mb-2">99.9%</div>
            <div className="enterprise-caption">{t('hero.stats.uptime')}</div>
          </div>
          
          <div className="enterprise-card-hover" data-aos="fade-up" data-aos-delay="300">
            <div className="enterprise-heading-2 mb-2">24/7</div>
            <div className="enterprise-caption">{t('hero.stats.support')}</div>
          </div>
          
          <div className="enterprise-card-hover" data-aos="fade-up" data-aos-delay="400">
            <div className="enterprise-heading-2 mb-2">180%</div>
            <div className="enterprise-caption">{t('hero.stats.roi')}</div>
          </div>
        </div>
      </div>

      {/* Enterprise Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-10 h-16 border-2 border-inovara-primary/30 rounded-full flex justify-center bg-white/80 backdrop-blur-sm shadow-lg">
          <div className="w-2 h-4 bg-inovara-primary/60 rounded-full mt-2"></div>
        </div>
      </div>
    </section>
  );
});

HeroSection.displayName = 'HeroSection';

export default HeroSection;