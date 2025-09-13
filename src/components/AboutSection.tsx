import React, { useRef } from 'react';
import { Building, Target, Award, Zap, Shield, TrendingUp, CheckCircle } from 'lucide-react';
import { useTranslation } from '../contexts/TranslationContext';

const AboutSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { t, isRTL } = useTranslation();

  const companyValues = [
    {
      icon: Award,
      title: t('about.reliability.title'),
      description: t('about.reliability.description'),
      metrics: ['High Performance', 'Reliable Systems', 'Quality Focused']
    },
    {
      icon: Zap,
      title: t('about.innovation.title'),
      description: t('about.innovation.description'),
      metrics: ['Smart Technology', 'IoT Integration', 'AI Analytics']
    },
    {
      icon: Shield,
      title: t('about.quality.title'),
      description: t('about.quality.description'),
      metrics: ['Secure Payments', 'Data Protection', 'Modern Standards']
    },
    {
      icon: TrendingUp,
      title: t('about.support.title'),
      description: t('about.support.description'),
      metrics: ['Agile Development', 'Scalable Solutions', 'Future-Ready Technology']
    }
  ];

  return (
    <section
      ref={sectionRef}
      className={`professional-section bg-section-light ${isRTL ? 'rtl' : 'ltr'}`}
    >
      <div className="professional-container">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className={`inline-flex items-center ${isRTL ? 'space-x-reverse space-x-2' : 'space-x-2'} px-4 py-2 bg-inovara-accent/10 border border-inovara-accent/20 rounded-full mb-8`}>
            <Building className="w-4 h-4 text-inovara-accent" />
            <span className="text-inovara-primary text-sm font-medium">{t('about.badge')}</span>
          </div>

          <h2 className="text-professional-heading text-inovara-primary mb-6">
            {t('about.title')} <span className="text-gradient-primary">{t('about.titleAccent')}</span>
          </h2>

          <p className="text-professional-subheading text-inovara-secondary max-w-4xl mx-auto">
            {t('about.description')}
          </p>
        </div>

        {/* Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {companyValues.map((value, index) => (
            <div key={index} className="enterprise-card p-8 hover:shadow-enterprise-lg transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-inovara-accent to-inovara-primary rounded-2xl flex items-center justify-center mb-6">
                <value.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-inovara-primary mb-4">{value.title}</h3>
              <p className="text-inovara-primary/70 text-sm mb-4 leading-relaxed">{value.description}</p>
              <div className="space-y-2">
                {value.metrics.map((metric, metricIndex) => (
                  <div key={metricIndex} className="flex items-center text-sm text-inovara-primary/70">
                    <CheckCircle className={`w-4 h-4 text-inovara-accent ${isRTL ? 'ml-2' : 'mr-2'} flex-shrink-0`} />
                    <span>{metric}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Stats Row - clean and minimal */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="text-center p-6 bg-white/40 backdrop-blur-md border border-inovara-neutral-20 rounded-2xl">
            <div className="text-3xl font-black text-inovara-primary mb-1">500+</div>
            <div className="text-inovara-secondary text-sm font-medium">Machines Deployed</div>
          </div>
          <div className="text-center p-6 bg-white/40 backdrop-blur-md border border-inovara-neutral-20 rounded-2xl">
            <div className="text-3xl font-black text-inovara-primary mb-1">99.9%</div>
            <div className="text-inovara-secondary text-sm font-medium">Uptime Guarantee</div>
          </div>
          <div className="text-center p-6 bg-white/40 backdrop-blur-md border border-inovara-neutral-20 rounded-2xl">
            <div className="text-3xl font-black text-inovara-primary mb-1">24/7</div>
            <div className="text-inovara-secondary text-sm font-medium">Support</div>
          </div>
          <div className="text-center p-6 bg-white/40 backdrop-blur-md border border-inovara-neutral-20 rounded-2xl">
            <div className="text-3xl font-black text-inovara-primary mb-1">Global</div>
            <div className="text-inovara-secondary text-sm font-medium">Operations</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;