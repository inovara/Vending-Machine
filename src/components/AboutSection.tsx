import React, { useRef } from 'react';
import { Sparkles, Shield, Award, TrendingUp } from 'lucide-react';
import { useTranslation } from '../contexts/TranslationContext';

const AboutSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { t, isRTL } = useTranslation();

  const companyValues = [
    {
      icon: Sparkles,
      title: t('about.values.innovation.title'),
      description: t('about.values.innovation.description'),
      gradient: 'from-inovara-accent to-inovara-accent/80'
    },
    {
      icon: Shield,
      title: t('about.values.reliability.title'),
      description: t('about.values.reliability.description'),
      gradient: 'from-inovara-secondary to-inovara-secondary/80'
    },
    {
      icon: Award,
      title: t('about.values.excellence.title'),
      description: t('about.values.excellence.description'),
      gradient: 'from-inovara-primary to-inovara-primary/80'
    },
    {
      icon: TrendingUp,
      title: t('about.values.growth.title'),
      description: t('about.values.growth.description'),
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

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Enterprise Header */}
        <div className={`text-center mb-20 ${isRTL ? 'rtl' : 'ltr'}`}>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-inovara-primary tracking-tight mb-8 leading-[0.9]">
            {t('about.title')}
          </h2>
          
          {/* Professional Divider */}
          <div className="w-24 h-1 bg-gradient-to-r from-inovara-accent to-inovara-secondary mx-auto mb-8 rounded-full"></div>
          
          <div className="max-w-4xl mx-auto">
            <p className="text-xl md:text-2xl text-inovara-primary/70 font-light leading-relaxed">
              {t('about.description')}
            </p>
          </div>
        </div>

         {/* Enterprise Values Grid */}
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {companyValues.map((value, index) => (
            <div 
              key={index} 
              className={`group relative bg-white/80 backdrop-blur-sm border border-inovara-primary/10 rounded-3xl p-10 hover:-translate-y-3 transition-all duration-700 shadow-enterprise hover:shadow-enterprise-xl hover:shadow-inovara-primary/5 animate-fadeInUp ${isRTL ? 'rtl' : 'ltr'}`}
              style={{ animationDelay: `${index * 150}ms` }}
            >
              {/* Icon Container */}
              <div className={`w-20 h-20 bg-gradient-to-br ${value.gradient} rounded-3xl flex items-center justify-center mb-8 shadow-enterprise-lg group-hover:scale-110 transition-transform duration-500 mx-auto`}>
                <value.icon className="w-10 h-10 text-white" />
              </div>
              
              {/* Content */}
              <h3 className={`text-2xl font-black text-inovara-primary mb-6 group-hover:text-inovara-accent transition-colors duration-300 text-center`}>
                {value.title}
              </h3>
              <p className={`text-inovara-primary/70 font-light leading-relaxed text-center`}>
                {value.description}
              </p>
              
              {/* Hover Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-inovara-accent/5 to-inovara-secondary/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
          ))}
        </div>


      </div>
    </section>
  );
};

export default AboutSection;