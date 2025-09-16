import React from 'react';
import { CheckCircle, Clock, Headphones, ArrowRight } from 'lucide-react';
import { useTranslation } from '../contexts/TranslationContext';
import { navigateToSection } from '../utils/navigation';

const WhyChooseUsSection: React.FC = () => {
  const { t, isRTL } = useTranslation();

  const advantages = [
    {
      title: t('why.advantages.proven.title'),
      description: t('why.advantages.proven.description'),
      icon: CheckCircle,
      gradient: 'from-inovara-accent to-inovara-accent/80',
      features: [
        t('why.advantages.proven.features.track'),
        t('why.advantages.proven.features.quality'),
        t('why.advantages.proven.features.results')
      ]
    },
    {
      title: t('why.advantages.responsive.title'),
      description: t('why.advantages.responsive.description'),
      icon: Clock,
      gradient: 'from-inovara-secondary to-inovara-secondary/80',
      features: [
        t('why.advantages.responsive.features.quick'),
        t('why.advantages.responsive.features.agile'),
        t('why.advantages.responsive.features.adapt')
      ]
    },
    {
      title: t('why.advantages.support.title'),
      description: t('why.advantages.support.description'),
      icon: Headphones,
      gradient: 'from-inovara-primary to-inovara-primary/80',
      features: [
        t('why.advantages.support.features.dedicated'),
        t('why.advantages.support.features.training'),
        t('why.advantages.support.features.partnership')
      ]
    },
    {
      title: t('why.advantages.future.title'),
      description: t('why.advantages.future.description'),
      icon: ArrowRight,
      gradient: 'from-inovara-accent to-inovara-secondary',
      features: [
        t('why.advantages.future.features.scalable'),
        t('why.advantages.future.features.innovative'),
        t('why.advantages.future.features.growth')
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
        {/* B2B Header */}
        <div className={`text-center mb-16 ${isRTL ? 'rtl' : 'ltr'}`}>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-inovara-primary tracking-tight mb-6 leading-[0.9]">
            {t('why.title')}
          </h2>
          
          {/* Professional Divider */}
          <div className="w-20 h-1 bg-gradient-to-r from-inovara-accent to-inovara-secondary mx-auto mb-8 rounded-full"></div>
          
          <div className="max-w-3xl mx-auto">
            <p className="text-lg md:text-xl text-inovara-primary/80 font-medium leading-relaxed">
              {t('why.subtitle')}
            </p>
          </div>
        </div>

        {/* B2B Advantages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {advantages.map((advantage, index) => (
            <div 
              key={index} 
              className={`group relative bg-white/90 backdrop-blur-sm border border-inovara-primary/15 rounded-2xl p-8 hover:-translate-y-2 transition-all duration-500 shadow-lg hover:shadow-xl hover:shadow-inovara-primary/10 ${isRTL ? 'rtl' : 'ltr'}`}
            >
              {/* Icon Container */}
              <div className={`w-16 h-16 bg-gradient-to-br ${advantage.gradient} rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300 mx-auto`}>
                <advantage.icon className="w-8 h-8 text-white" />
              </div>
              
              {/* Content */}
              <h3 className={`text-xl font-bold text-inovara-primary mb-4 group-hover:text-inovara-accent transition-colors duration-300 text-center`}>
                {advantage.title}
              </h3>
              <p className={`text-sm text-inovara-primary/70 font-medium leading-relaxed text-center mb-6`}>
                {advantage.description}
              </p>
              
              {/* Features List */}
              <div className="space-y-2">
                {advantage.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className={`flex items-center text-xs text-inovara-primary/60 font-medium ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
                    <div className="w-1.5 h-1.5 bg-inovara-accent rounded-full flex-shrink-0" style={{marginRight: isRTL ? '0' : '0.5rem', marginLeft: isRTL ? '0.5rem' : '0'}}></div>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
              
              {/* Hover Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-inovara-accent/5 to-inovara-secondary/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          ))}
        </div>

        {/* B2B CTA Section */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-inovara-primary/5 to-inovara-secondary/5 rounded-2xl p-8 border border-inovara-primary/20">
            <h3 className="text-2xl md:text-3xl font-bold text-inovara-primary mb-4">
              {t('why.cta.title')}
            </h3>
            <p className="text-lg text-inovara-primary/70 font-medium leading-relaxed mb-6 max-w-2xl mx-auto">
              {t('why.cta.description')}
            </p>
            <button 
              onClick={() => navigateToSection('#contact')}
              className="group px-8 py-4 bg-gradient-to-r from-inovara-primary to-inovara-secondary text-white font-bold text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-inovara-accent/30"
            >
              <span className={`flex items-center justify-center ${isRTL ? 'flex-row-reverse' : 'flex-row'} gap-3`}>
                {t('why.cta.button')}
                <ArrowRight className={`w-5 h-5 group-hover:translate-x-1 transition-transform duration-300 ${isRTL ? 'rotate-180' : ''}`} />
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;
