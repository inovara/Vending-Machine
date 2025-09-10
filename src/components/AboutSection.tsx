import React, { useRef } from 'react';
import { Building, Target, Award, Zap, Shield, TrendingUp, CheckCircle, ShoppingCart, Wifi, Monitor, CreditCard } from 'lucide-react';
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

  const technologySolutions = [
    { name: t('about.smart.title'), role: t('about.smart.description'), icon: ShoppingCart },
    { name: t('about.payment.title'), role: t('about.payment.description'), icon: CreditCard },
    { name: t('about.management.title'), role: t('about.management.description'), icon: Monitor },
    { name: t('about.iot.title'), role: t('about.iot.description'), icon: Wifi }
  ];

  return (
    <section
      ref={sectionRef}
      className={`py-20 px-6 bg-luxury-charcoal/5 ${isRTL ? 'rtl' : 'ltr'}`}
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className={`inline-flex items-center ${isRTL ? 'space-x-reverse space-x-2' : 'space-x-2'} px-4 py-2 bg-inovara-accent/10 border border-inovara-accent/20 rounded-full mb-8`}>
            <Building className="w-4 h-4 text-inovara-accent" />
            <span className="text-luxury-charcoal text-sm font-medium">{t('about.badge')}</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-black mb-6">
            <span className="text-luxury-charcoal">{t('about.title')}</span>
            <br />
            <span className="text-inovara-accent">{t('about.title.accent')}</span>
          </h2>

          <p className="text-xl text-luxury-charcoal/70 max-w-4xl mx-auto font-light leading-relaxed">
            {t('about.description')}
          </p>
        </div>

        {/* Company Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {companyValues.map((value, index) => (
            <div key={index} className="bg-white border border-luxury-charcoal/10 rounded-2xl p-8 hover:border-inovara-accent/30 transition-all duration-300 transform hover:scale-105">
              <div className="w-16 h-16 bg-gradient-to-br from-inovara-accent to-inovara-primary rounded-2xl flex items-center justify-center mb-6">
                <value.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-luxury-charcoal mb-4">{value.title}</h3>
              <p className="text-luxury-charcoal/70 text-sm mb-4">{value.description}</p>
              <div className="space-y-2">
                {value.metrics.map((metric, metricIndex) => (
                  <div key={metricIndex} className="flex items-center text-sm text-luxury-charcoal/60">
                    <CheckCircle className="w-4 h-4 text-inovara-accent mr-2 flex-shrink-0" />
                    <span>{metric}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Technology Solutions */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-luxury-charcoal text-center mb-12">Our Technology Solutions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {technologySolutions.map((solution, index) => (
              <div key={index} className="bg-white border border-luxury-charcoal/10 rounded-2xl p-6 text-center hover:border-inovara-accent/30 transition-all duration-300 transform hover:scale-105">
                <div className="w-16 h-16 bg-gradient-to-br from-inovara-accent to-inovara-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <solution.icon className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-lg font-semibold text-luxury-charcoal mb-2">{solution.name}</h4>
                <p className="text-luxury-charcoal/70 text-sm">{solution.role}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="text-center p-6 bg-white border border-luxury-charcoal/10 rounded-2xl">
            <div className="w-12 h-12 bg-gradient-to-br from-inovara-accent to-inovara-primary rounded-xl flex items-center justify-center mx-auto mb-4">
              <ShoppingCart className="w-6 h-6 text-white" />
            </div>
            <div className="text-3xl font-black text-luxury-charcoal mb-2">500+</div>
            <div className="text-luxury-charcoal/70 text-sm font-medium">Machines Deployed</div>
          </div>
          <div className="text-center p-6 bg-white border border-luxury-charcoal/10 rounded-2xl">
            <div className="w-12 h-12 bg-gradient-to-br from-inovara-secondary to-inovara-accent rounded-xl flex items-center justify-center mx-auto mb-4">
              <Target className="w-6 h-6 text-white" />
            </div>
            <div className="text-3xl font-black text-luxury-charcoal mb-2">99.9%</div>
            <div className="text-luxury-charcoal/70 text-sm font-medium">Uptime Guarantee</div>
          </div>
          <div className="text-center p-6 bg-white border border-luxury-charcoal/10 rounded-2xl">
            <div className="w-12 h-12 bg-gradient-to-br from-inovara-primary to-inovara-secondary rounded-xl flex items-center justify-center mx-auto mb-4">
              <Award className="w-6 h-6 text-white" />
            </div>
            <div className="text-3xl font-black text-luxury-charcoal mb-2">24/7</div>
            <div className="text-luxury-charcoal/70 text-sm font-medium">Support</div>
          </div>
          <div className="text-center p-6 bg-white border border-luxury-charcoal/10 rounded-2xl">
            <div className="w-12 h-12 bg-gradient-to-br from-inovara-accent to-inovara-primary rounded-xl flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <div className="text-3xl font-black text-luxury-charcoal mb-2">Global</div>
            <div className="text-luxury-charcoal/70 text-sm font-medium">Operations</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;