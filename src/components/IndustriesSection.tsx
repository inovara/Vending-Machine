import React from 'react';
import { Building2, Heart, GraduationCap, ShoppingBag, Factory, Train, ArrowRight, Calculator } from 'lucide-react';
import { useTranslation } from '../contexts/TranslationContext';

interface IndustriesSectionProps {
  onQuoteClick: () => void;
}

const IndustriesSection: React.FC<IndustriesSectionProps> = ({ onQuoteClick }) => {
  const { t, isRTL } = useTranslation();
  const industries = [
    {
      title: t('industries.corporate.title'),
      icon: Building2,
      description: t('industries.corporate.description'),
      features: t('industries.corporate.features'),
      gradient: 'from-inovara-primary to-inovara-secondary'
    },
    {
      title: t('industries.healthcare.title'),
      icon: Heart,
      description: t('industries.healthcare.description'),
      features: t('industries.healthcare.features'),
      gradient: 'from-inovara-secondary to-inovara-accent'
    },
    {
      title: t('industries.education.title'),
      icon: GraduationCap,
      description: t('industries.education.description'),
      features: t('industries.education.features'),
      gradient: 'from-inovara-accent to-inovara-neutral'
    },
    {
      title: t('industries.retail.title'),
      icon: ShoppingBag,
      description: t('industries.retail.description'),
      features: t('industries.retail.features'),
      gradient: 'from-inovara-neutral to-inovara-primary'
    },
    {
      title: t('industries.manufacturing.title'),
      icon: Factory,
      description: t('industries.manufacturing.description'),
      features: t('industries.manufacturing.features'),
      gradient: 'from-inovara-primary to-inovara-accent'
    },
    {
      title: t('industries.transportation.title'),
      icon: Train,
      description: t('industries.transportation.description'),
      features: t('industries.transportation.features'),
      gradient: 'from-inovara-secondary to-inovara-neutral'
    }
  ];

  return (
    <section id="industries" className={`professional-section bg-section-light ${isRTL ? 'rtl' : 'ltr'}`}>
      <div className="professional-container">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-professional-heading text-inovara-primary mb-6">
            {t('industries.title')} <span className="text-gradient-primary">{t('industries.titleAccent')}</span>
          </h2>
          <p className="text-professional-subheading text-inovara-primary/80 max-w-3xl mx-auto">
            {t('industries.description')}
          </p>
        </div>

        {/* Industries Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {industries.map((industry, index) => {
            const IconComponent = industry.icon;
            return (
              <div
                key={index}
                className="card-professional-interactive group bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 hover:bg-white/10 hover:border-white/20 transition-all duration-500"
              >
                <div className={`w-16 h-16 bg-gradient-to-br ${industry.gradient} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <IconComponent className="w-8 h-8 text-white" />
                </div>
                
                <h3 className="text-xl font-bold text-inovara-primary mb-4 group-hover:text-inovara-accent transition-colors duration-300">
                  {industry.title}
                </h3>
                
                <p className="text-inovara-primary/70 text-sm mb-6 leading-relaxed">
                  {industry.description}
                </p>
                
                <div className="space-y-3 mb-6">
                  {industry.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center text-sm text-inovara-primary/60">
                      <div className="w-2 h-2 bg-inovara-accent rounded-full mr-3 flex-shrink-0"></div>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
                
                <div className="mt-4 space-y-3">
                  <button 
                    onClick={onQuoteClick}
                    className="w-full px-4 py-2 bg-gradient-to-r from-inovara-accent to-inovara-primary text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                  >
                    <span className={`flex items-center justify-center ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
                      <Calculator className={`w-4 h-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                      {t('industries.cta.button')}
                    </span>
                  </button>
                  <div className="flex items-center text-inovara-accent group-hover:text-inovara-primary transition-colors duration-300 cursor-pointer">
                    <span className="text-sm font-medium">Learn More</span>
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-inovara-primary-10 to-inovara-secondary-10 rounded-3xl p-8 md:p-12 max-w-4xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-bold text-inovara-primary mb-4">
              {t('industries.cta.title')}
            </h3>
            <p className="text-inovara-primary/70 text-lg mb-8 max-w-2xl mx-auto">
              {t('industries.cta.description')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={onQuoteClick}
                className="btn-enterprise px-8 py-3 text-base focus-ring"
              >
                <span className="flex items-center justify-center">
                  <Calculator className="mr-2 h-4 w-4" />
                  Get Free Quote
                  <ArrowRight className="ml-2 h-4 w-4" />
                </span>
              </button>
              <button className="btn-secondary px-8 py-3 text-base focus-ring">
                <span className="flex items-center justify-center">
                  View Case Studies
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IndustriesSection;
