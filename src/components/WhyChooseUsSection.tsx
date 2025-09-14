import React from 'react';
import { Sparkles, Shield, Award, TrendingUp, ArrowRight } from 'lucide-react';
import { useTranslation } from '../contexts/TranslationContext';
import { navigateToSection } from '../utils/navigation';

const WhyChooseUsSection: React.FC = () => {
  const { t, isRTL } = useTranslation();

  const advantages = [
    {
      title: t('why.advantages.innovation.title'),
      description: t('why.advantages.innovation.description'),
      icon: Sparkles,
      gradient: 'from-inovara-accent to-inovara-accent/80',
      features: [
        t('why.advantages.innovation.features.ai'),
        t('why.advantages.innovation.features.iot'),
        t('why.advantages.innovation.features.automation')
      ]
    },
    {
      title: t('why.advantages.reliability.title'),
      description: t('why.advantages.reliability.description'),
      icon: Shield,
      gradient: 'from-inovara-secondary to-inovara-secondary/80',
      features: [
        t('why.advantages.reliability.features.uptime'),
        t('why.advantages.reliability.features.quality'),
        t('why.advantages.reliability.features.support')
      ]
    },
    {
      title: t('why.advantages.excellence.title'),
      description: t('why.advantages.excellence.description'),
      icon: Award,
      gradient: 'from-inovara-primary to-inovara-primary/80',
      features: [
        t('why.advantages.excellence.features.premium'),
        t('why.advantages.excellence.features.custom'),
        t('why.advantages.excellence.features.service')
      ]
    },
    {
      title: t('why.advantages.growth.title'),
      description: t('why.advantages.growth.description'),
      icon: TrendingUp,
      gradient: 'from-inovara-accent to-inovara-secondary',
      features: [
        t('why.advantages.growth.features.scalable'),
        t('why.advantages.growth.features.flexible'),
        t('why.advantages.growth.features.future')
      ]
    }
  ];

  return (
    <section 
      id="why-choose-us" 
      className={`relative py-24 px-6 overflow-hidden ${isRTL ? 'rtl' : 'ltr'}`}
      style={{
        background: 'linear-gradient(135deg, rgba(255,255,255,1) 0%, rgba(245,245,245,0.8) 50%, rgba(255,255,255,1) 100%)'
      }}
    >
      {/* Minimal Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-inovara-accent/3 to-inovara-secondary/3 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-gradient-to-tr from-inovara-primary/2 to-inovara-accent/2 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Enterprise Header */}
        <div className={`text-center mb-20 ${isRTL ? 'rtl' : 'ltr'}`}>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-inovara-primary tracking-tight mb-8 leading-[0.9]">
            {t('why.title')}
          </h2>
          
          {/* Professional Divider */}
          <div className="w-24 h-1 bg-gradient-to-r from-inovara-accent to-inovara-secondary mx-auto mb-8 rounded-full"></div>
          
          <div className="max-w-4xl mx-auto">
            <p className="text-xl md:text-2xl text-inovara-primary/70 font-light leading-relaxed">
              {t('why.subtitle')}
            </p>
          </div>
        </div>

        {/* Advantages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {advantages.map((advantage, index) => (
            <div 
              key={index} 
              className={`group relative bg-white/90 backdrop-blur-sm border border-inovara-primary/10 rounded-3xl p-8 hover:-translate-y-3 transition-all duration-500 shadow-lg hover:shadow-2xl hover:shadow-inovara-primary/10 ${isRTL ? 'rtl' : 'ltr'}`}
            >
              {/* Icon Container */}
              <div className={`w-16 h-16 bg-gradient-to-br ${advantage.gradient} rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300 ${isRTL ? 'ml-auto' : 'mr-auto'} ${isRTL ? 'lg:ml-auto' : 'lg:mr-auto'}`}>
                <advantage.icon className="w-8 h-8 text-white" />
              </div>
              
              {/* Content */}
              <h3 className={`text-2xl font-black text-inovara-primary mb-4 group-hover:text-inovara-accent transition-colors duration-300 ${isRTL ? 'text-right' : 'text-left'}`}>
                {advantage.title}
              </h3>
              <p className={`text-inovara-primary/70 font-light leading-relaxed mb-6 ${isRTL ? 'text-right' : 'text-left'}`}>
                {advantage.description}
              </p>
              
              {/* Features List */}
              <div className="space-y-3">
                {advantage.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className={`flex items-center text-sm text-inovara-primary/80 ${isRTL ? 'flex-row-reverse text-right' : 'flex-row text-left'}`}>
                    <div className={`w-2 h-2 bg-gradient-to-r ${advantage.gradient} rounded-full ${isRTL ? 'ml-3' : 'mr-3'} flex-shrink-0`}></div>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
              
              {/* Hover Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-inovara-accent/5 to-inovara-secondary/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          ))}
        </div>

        {/* Trust Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          <div className="text-center p-6 bg-white/60 backdrop-blur-sm border border-inovara-primary/10 rounded-2xl hover:bg-white/80 transition-all duration-300">
            <div className="text-4xl md:text-5xl font-black text-inovara-primary mb-2">500+</div>
            <div className="text-inovara-primary/60 text-sm font-medium">{t('why.stats.machines')}</div>
          </div>
          <div className="text-center p-6 bg-white/60 backdrop-blur-sm border border-inovara-primary/10 rounded-2xl hover:bg-white/80 transition-all duration-300">
            <div className="text-4xl md:text-5xl font-black text-inovara-primary mb-2">99.9%</div>
            <div className="text-inovara-primary/60 text-sm font-medium">{t('why.stats.uptime')}</div>
          </div>
          <div className="text-center p-6 bg-white/60 backdrop-blur-sm border border-inovara-primary/10 rounded-2xl hover:bg-white/80 transition-all duration-300">
            <div className="text-4xl md:text-5xl font-black text-inovara-primary mb-2">24/7</div>
            <div className="text-inovara-primary/60 text-sm font-medium">{t('why.stats.support')}</div>
          </div>
          <div className="text-center p-6 bg-white/60 backdrop-blur-sm border border-inovara-primary/10 rounded-2xl hover:bg-white/80 transition-all duration-300">
            <div className="text-4xl md:text-5xl font-black text-inovara-primary mb-2">∞</div>
            <div className="text-inovara-primary/60 text-sm font-medium">{t('why.stats.scalability')}</div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-inovara-primary/10 to-inovara-secondary/10 rounded-3xl p-12 border border-inovara-primary/20">
            <h3 className="text-3xl md:text-4xl font-black text-inovara-primary mb-6">
              {t('why.cta.title')}
            </h3>
            <p className="text-xl text-inovara-primary/70 font-light leading-relaxed mb-8 max-w-3xl mx-auto">
              {t('why.cta.description')}
            </p>
            <button 
              onClick={() => navigateToSection('#contact')}
              className="group px-12 py-5 bg-gradient-to-r from-inovara-primary to-inovara-secondary text-white font-bold text-lg rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-inovara-accent/30"
            >
              <span className={`flex items-center justify-center ${isRTL ? 'flex-row-reverse' : 'flex-row'} gap-3`}>
                {t('why.cta.button')}
                <ArrowRight className={`w-6 h-6 group-hover:translate-x-1 transition-transform duration-300 ${isRTL ? 'rotate-180' : ''}`} />
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;
