import React from 'react';
import { 
  Building, Globe, Award, Shield, Zap, TrendingUp, CheckCircle, ArrowRight,
  Building2, Heart, GraduationCap, ShoppingBag, Factory, Train, HeadphonesIcon, Users
} from 'lucide-react';
import { useTranslation } from '../contexts/TranslationContext';

export interface EnterpriseIndustriesSectionProps {
  onQuoteClick: () => void;
}

const normalizeList = (value: string | string[]): string[] => {
  if (Array.isArray(value)) return value;
  return value
    .split(',')
    .map(item => item.trim())
    .filter(Boolean);
};

const EnterpriseIndustriesSection: React.FC<EnterpriseIndustriesSectionProps> = ({ onQuoteClick }) => {
  const { t, isRTL } = useTranslation();

  const featureBullets = [
    t('enterprise.benefits.costSavings'),
    t('enterprise.benefits.efficiency'),
    t('enterprise.benefits.revenue'),
  ];

  const features = [
    {
      icon: Building,
      title: t('enterprise.features.scalability.title'),
      description: t('enterprise.features.scalability.description'),
      list: featureBullets.slice(0, 3),
    },
    {
      icon: Shield,
      title: t('enterprise.features.management.title'),
      description: t('enterprise.features.management.description'),
      list: featureBullets.slice(0, 3),
    },
    {
      icon: Zap,
      title: t('enterprise.features.analytics.title'),
      description: t('enterprise.features.analytics.description'),
      list: featureBullets.slice(0, 3),
    },
    {
      icon: Globe,
      title: t('enterprise.features.integration.title'),
      description: t('enterprise.features.integration.description'),
      list: featureBullets.slice(0, 3),
    },
  ];

  const stats = [
    { icon: Users, value: '450+', label: t('testimonials.stats.clients') },
    { icon: Award, value: '98%', label: t('testimonials.stats.satisfaction') },
    { icon: HeadphonesIcon, value: '24/7', label: t('testimonials.stats.support') },
    { icon: TrendingUp, value: '10+', label: t('testimonials.stats.experience') },
  ];

  const industries = [
    { icon: Building2, title: t('industries.corporate.title'), description: t('industries.corporate.description') },
    { icon: Heart, title: t('industries.healthcare.title'), description: t('industries.healthcare.description') },
    { icon: GraduationCap, title: t('industries.education.title'), description: t('industries.education.description') },
    { icon: ShoppingBag, title: t('industries.retail.title'), description: t('industries.retail.description') },
    { icon: Factory, title: t('industries.manufacturing.title'), description: t('industries.manufacturing.description') },
    { icon: Train, title: t('industries.transportation.title'), description: t('industries.transportation.description') },
  ];

  return (
    <section id="enterprise" className={`professional-section bg-section-light ${isRTL ? 'rtl' : 'ltr'}`}>
      <div className="professional-container">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-professional-heading text-inovara-primary mb-6">
            {t('enterprise.title')} <span className="text-gradient-primary">{t('enterprise.titleAccent')}</span>
          </h2>
          <p className="text-professional-subheading text-inovara-secondary max-w-3xl mx-auto">
            {t('enterprise.description')}
          </p>
        </div>

        {/* Row A — Enterprise highlights */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            const listItems = normalizeList(feature.list);
            return (
              <div key={index} className="enterprise-card p-8 group">
                <div className="w-16 h-16 bg-gradient-to-br from-inovara-primary to-inovara-secondary rounded-2xl flex items-center justify-center mb-6">
                  <Icon className="w-8 h-8 text-white" aria-hidden="true" />
                </div>
                <h3 className="text-xl font-bold text-inovara-primary mb-3 group-hover:text-inovara-accent transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-inovara-primary/70 text-sm leading-relaxed mb-4">
                  {feature.description}
                </p>
                <div className="space-y-2">
                  {listItems.slice(0, 3).map((item, i) => (
                    <div key={i} className="flex items-center text-sm text-inovara-primary/70">
                      <CheckCircle className={`w-4 h-4 text-inovara-accent ${isRTL ? 'ml-2' : 'mr-2'}`} aria-hidden="true" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Row B — Stats strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="enterprise-glass rounded-2xl p-6 text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-inovara-accent to-inovara-primary rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-6 h-6 text-white" aria-hidden="true" />
                </div>
                <div className="text-2xl font-black text-inovara-primary mb-1">{stat.value}</div>
                <div className="text-inovara-secondary text-xs font-medium">{stat.label}</div>
              </div>
            );
          })}
        </div>

        {/* Row C — Target industries */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {industries.map((industry, idx) => {
            const Icon = industry.icon;
            return (
              <div key={idx} className="enterprise-card p-6 hover:shadow-enterprise-lg transition-all duration-300">
                <div className="flex items-start">
                  <div className={`w-12 h-12 bg-gradient-to-br from-inovara-secondary to-inovara-accent rounded-xl flex items-center justify-center ${isRTL ? 'ml-4' : 'mr-4'}`}>
                    <Icon className="w-6 h-6 text-white" aria-hidden="true" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-inovara-primary mb-1">{industry.title}</h4>
                    <p className="text-inovara-primary/70 text-sm leading-relaxed">{industry.description}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA Block */}
        <div className="bg-gradient-to-r from-inovara-primary-10 to-inovara-secondary-10 rounded-3xl p-8 md:p-12 text-center">
          <h3 className="text-2xl md:text-3xl font-bold text-inovara-primary mb-4">
            {t('industries.cta.title')}
          </h3>
          <p className="text-inovara-primary/80 text-lg mb-8 max-w-2xl mx-auto">
            {t('industries.cta.description')}
          </p>
          <div className={`flex flex-col sm:flex-row gap-4 justify-center ${isRTL ? 'sm:flex-row-reverse' : ''}`}>
            <button 
              onClick={onQuoteClick}
              className="btn-enterprise px-8 py-3 text-base focus-ring"
              aria-label={t('contact.form.getQuote')}
            >
              <span className={`flex items-center justify-center ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
                {t('contact.form.getQuote')}
                <ArrowRight className={`${isRTL ? 'mr-2' : 'ml-2'} h-4 w-4`} aria-hidden="true" />
              </span>
            </button>
            <button 
              className="btn-secondary px-8 py-3 text-base focus-ring"
              aria-label={t('caseStudies.ctaButton')}
            >
              <span className="flex items-center justify-center">
                {t('caseStudies.ctaButton')}
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EnterpriseIndustriesSection;
