import React from 'react';
import { Shield, Award, TrendingUp, HeadphonesIcon, CheckCircle } from 'lucide-react';
import { useTranslation } from '../contexts/TranslationContext';

const WhyChooseUsSection: React.FC = () => {
  const { t, isRTL } = useTranslation();

  const features = [
    {
      title: t('why.features.innovative.title'),
      icon: Shield,
      description: t('why.features.innovative.description'),
      stats: t('why.features.innovative.stats'),
      statLabel: t('why.features.innovative.statLabel'),
      gradient: 'from-inovara-primary to-inovara-secondary',
      list: t('why.features.innovative.list') as unknown as string[],
    },
    {
      title: t('why.features.agility.title'),
      icon: Award,
      description: t('why.features.agility.description'),
      stats: t('why.features.agility.stats'),
      statLabel: t('why.features.agility.statLabel'),
      gradient: 'from-inovara-secondary to-inovara-accent',
      list: t('why.features.agility.list') as unknown as string[],
    },
    {
      title: t('why.features.scalable.title'),
      icon: TrendingUp,
      description: t('why.features.scalable.description'),
      stats: t('why.features.scalable.stats'),
      statLabel: t('why.features.scalable.statLabel'),
      gradient: 'from-inovara-accent to-inovara-neutral',
      list: t('why.features.scalable.list') as unknown as string[],
    },
    {
      title: t('why.features.support.title'),
      icon: HeadphonesIcon,
      description: t('why.features.support.description'),
      stats: t('why.features.support.stats'),
      statLabel: t('why.features.support.statLabel'),
      gradient: 'from-inovara-neutral to-inovara-primary',
      list: t('why.features.support.list') as unknown as string[],
    }
  ];

  return (
    <section id="why-choose-us" className={`professional-section bg-section-light ${isRTL ? 'rtl' : 'ltr'}`}>
      <div className="professional-container">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-professional-heading text-inovara-primary mb-6">
            {t('why.title')} <span className="text-gradient-primary">{t('why.titleAccent')}</span>
          </h2>
          <p className="text-professional-subheading text-inovara-secondary max-w-3xl mx-auto">
            {t('why.subtitle')}
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div
                key={index}
                className="enterprise-card group text-center p-8"
              >
                <div className={`w-20 h-20 bg-gradient-to-br ${feature.gradient} rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <IconComponent className="w-10 h-10 text-white" />
                </div>
                
                <h3 className="text-xl font-bold text-inovara-primary mb-4 group-hover:text-inovara-accent transition-colors duration-300">
                  {feature.title}
                </h3>
                
                <p className="text-inovara-primary/70 text-sm mb-6 leading-relaxed">
                  {feature.description}
                </p>
                
                <div className="mb-6">
                  <div className="text-3xl font-black text-inovara-accent mb-1">
                    {feature.stats}
                  </div>
                  <div className="text-inovara-secondary text-xs font-medium uppercase tracking-wider">
                    {feature.statLabel}
                  </div>
                </div>
                
                <div className="space-y-2">
                  {feature.list.map((item: string, itemIndex: number) => (
                    <div key={itemIndex} className="flex items-center justify-center text-sm text-inovara-primary/70">
                      <CheckCircle className={`w-4 h-4 text-inovara-accent ${isRTL ? 'ml-2' : 'mr-2'} flex-shrink-0`} />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Trust Indicators */}
        <div className="bg-gradient-to-r from-inovara-primary-10 to-inovara-secondary-10 rounded-3xl p-8 md:p-12">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-inovara-primary mb-4">
              {t('why.ctaBlock.title')}
            </h3>
            <p className="text-inovara-primary/80 text-lg">
              {t('why.ctaBlock.description')}
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center">
            <div className="text-center">
              <div className="text-3xl font-black text-inovara-accent mb-2">{t('why.features.innovative.stats')}</div>
              <div className="text-inovara-secondary text-sm">{t('why.ctaBlock.stats.modernTech')}</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-black text-inovara-secondary mb-2">{t('why.features.agility.stats')}</div>
              <div className="text-inovara-secondary text-sm">{t('why.ctaBlock.stats.rapidResponse')}</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-black text-inovara-accent mb-2">{t('why.features.support.stats')}</div>
              <div className="text-inovara-secondary text-sm">{t('why.ctaBlock.stats.dedicatedService')}</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-black text-inovara-primary mb-2">{t('why.features.scalable.statsSymbol')}</div>
              <div className="text-inovara-secondary text-sm">{t('why.ctaBlock.stats.scalability')}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;
