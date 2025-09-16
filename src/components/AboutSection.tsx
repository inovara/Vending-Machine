import React, { useRef } from 'react';
import { Building2, Users, Target, Handshake } from 'lucide-react';
import { useTranslation } from '../contexts/TranslationContext';

const AboutSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { t, isRTL } = useTranslation();

  const companyValues = [
    {
      icon: Building2,
      title: t('about.values.enterprise.title'),
      description: t('about.values.enterprise.description'),
      gradient: 'from-inovara-accent to-inovara-accent/80'
    },
    {
      icon: Users,
      title: t('about.values.partnership.title'),
      description: t('about.values.partnership.description'),
      gradient: 'from-inovara-secondary to-inovara-secondary/80'
    },
    {
      icon: Target,
      title: t('about.values.solutions.title'),
      description: t('about.values.solutions.description'),
      gradient: 'from-inovara-primary to-inovara-primary/80'
    },
    {
      icon: Handshake,
      title: t('about.values.trust.title'),
      description: t('about.values.trust.description'),
      gradient: 'from-inovara-accent to-inovara-secondary'
    }
  ];

  return (
    <section
      ref={sectionRef}
      id="about"
      className={`relative py-24 px-6 overflow-hidden ${isRTL ? 'rtl' : 'ltr'}`}
      style={{
        background: 'linear-gradient(135deg, rgba(255,255,255,1) 0%, rgba(245,245,245,0.8) 50%, rgba(255,255,255,1) 100%)'
      }}
    >
      {/* Minimal Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-inovara-accent/3 to-inovara-secondary/3 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-tr from-inovara-primary/2 to-inovara-accent/2 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* B2B Header */}
        <div className={`text-center mb-16 ${isRTL ? 'rtl' : 'ltr'}`}>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-inovara-primary tracking-tight mb-6 leading-[0.9]">
            {t('about.title')}
          </h2>
          
          {/* Professional Divider */}
          <div className="w-20 h-1 bg-gradient-to-r from-inovara-accent to-inovara-secondary mx-auto mb-8 rounded-full"></div>
          
          <div className="max-w-3xl mx-auto">
            <p className="text-lg md:text-xl text-inovara-primary/80 font-medium leading-relaxed">
              {t('about.description')}
            </p>
          </div>
        </div>

        {/* B2B Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {companyValues.map((value, index) => (
            <div 
              key={index} 
              className={`group relative bg-white/90 backdrop-blur-sm border border-inovara-primary/15 rounded-2xl p-8 hover:-translate-y-2 transition-all duration-500 shadow-lg hover:shadow-xl hover:shadow-inovara-primary/10 ${isRTL ? 'rtl' : 'ltr'}`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Icon Container */}
              <div className={`w-16 h-16 bg-gradient-to-br ${value.gradient} rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300 mx-auto`}>
                <value.icon className="w-8 h-8 text-white" />
              </div>
              
              {/* Content */}
              <h3 className={`text-xl font-bold text-inovara-primary mb-4 group-hover:text-inovara-accent transition-colors duration-300 text-center`}>
                {value.title}
              </h3>
              <p className={`text-sm text-inovara-primary/70 font-medium leading-relaxed text-center`}>
                {value.description}
              </p>
              
              {/* Hover Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-inovara-accent/5 to-inovara-secondary/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          ))}
        </div>

        {/* B2B Partnership CTA */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-inovara-primary/5 to-inovara-secondary/5 rounded-2xl p-8 border border-inovara-primary/20">
            <h3 className="text-2xl md:text-3xl font-bold text-inovara-primary mb-4">
              {t('about.cta.title')}
            </h3>
            <p className="text-lg text-inovara-primary/70 font-medium leading-relaxed mb-6 max-w-2xl mx-auto">
              {t('about.cta.description')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <div className="text-sm text-inovara-primary/60 font-medium">
                {t('about.cta.trust')}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;