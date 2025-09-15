import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Building2, Heart, GraduationCap, ShoppingBag, Factory, Train, Sparkles } from 'lucide-react';
import { useTranslation } from '../contexts/TranslationContext';

interface IndustriesPageProps {
  onQuoteClick: () => void;
}

const IndustriesPage: React.FC<IndustriesPageProps> = ({ onQuoteClick }) => {
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
      gradient: 'from-inovara-accent to-inovara-secondary'
    },
    {
      title: t('industries.education.title'),
      icon: GraduationCap,
      description: t('industries.education.description'),
      features: t('industries.education.features'),
      gradient: 'from-inovara-secondary to-inovara-accent'
    },
    {
      title: t('industries.retail.title'),
      icon: ShoppingBag,
      description: t('industries.retail.description'),
      features: t('industries.retail.features'),
      gradient: 'from-inovara-primary to-inovara-accent'
    },
    {
      title: t('industries.manufacturing.title'),
      icon: Factory,
      description: t('industries.manufacturing.description'),
      features: t('industries.manufacturing.features'),
      gradient: 'from-inovara-accent to-inovara-primary'
    },
    {
      title: t('industries.transportation.title'),
      icon: Train,
      description: t('industries.transportation.description'),
      features: t('industries.transportation.features'),
      gradient: 'from-inovara-secondary to-inovara-primary'
    }
  ];

  return (
    <div className={`min-h-screen ${isRTL ? 'rtl' : 'ltr'}`}>
      {/* Hero Section */}
      <section 
        className="relative py-24 px-6 overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, rgba(255,255,255,1) 0%, rgba(248,250,252,0.8) 50%, rgba(255,255,255,1) 100%)'
        }}
      >
        {/* Subtle Background Effects */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-inovara-accent/3 to-inovara-secondary/3 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-gradient-to-tr from-inovara-primary/2 to-inovara-accent/2 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto">
          {/* Breadcrumb */}
          <nav className={`flex items-center gap-2 mb-8 text-sm ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
            <Link to="/" className="text-inovara-primary/70 hover:text-inovara-primary transition-colors">
              {t('industries.breadcrumb.home')}
            </Link>
            <ArrowRight className={`w-4 h-4 text-inovara-primary/50 ${isRTL ? 'rotate-180' : ''}`} />
            <span className="text-inovara-primary font-medium">{t('industries.breadcrumb.industries')}</span>
          </nav>


          {/* Hero Content */}
          <div className="text-center mb-10">
            <div className={`flex items-center justify-center gap-3 mb-6 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
              <Sparkles className="w-8 h-8 text-inovara-accent" />
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-inovara-primary tracking-tight leading-[0.9]">
              {t('industries.hero.title')}
              </h1>
              <Sparkles className="w-8 h-8 text-inovara-accent" />
            </div>
            
            {/* Professional Divider */}
            <div className={`w-32 h-1 bg-gradient-to-r from-inovara-accent to-inovara-secondary mx-auto mb-8 rounded-full ${isRTL ? 'bg-gradient-to-l' : 'bg-gradient-to-r'}`}></div>
            
            <div className="max-w-4xl mx-auto">
              <p className="text-xl md:text-2xl text-inovara-primary/70 font-light leading-relaxed">
              {t('industries.hero.subtitle')}
              </p>
            </div>
          </div>    
        </div>
      </section>

      {/* Main Content */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Industries Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {industries.map((industry, index) => {
              const IconComponent = industry.icon;
              return (
                <div
                  key={index}
                  className={`group relative bg-white/80 backdrop-blur-sm border border-inovara-primary/10 rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-105 ${isRTL ? 'rtl' : 'ltr'}`}
                >
                  {/* Icon */}
                  <div className={`w-16 h-16 bg-gradient-to-br ${industry.gradient} rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:shadow-xl transition-all duration-300 ${isRTL ? 'ml-auto' : 'mr-auto'}`}>
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>

                  {/* Content */}
                  <div className={`${isRTL ? 'text-right' : 'text-left'}`}>
                    <h3 className="text-2xl font-black text-inovara-primary mb-4 group-hover:text-inovara-accent transition-colors duration-300">
                      {industry.title}
                    </h3>
                    <p className="text-inovara-primary/70 leading-relaxed mb-6">
                      {industry.description}
                    </p>
                    <div className="space-y-2">
                      {(() => {
                        // Safely handle different types of features data
                        let featuresArray = [];
                        
                        if (Array.isArray(industry.features)) {
                          featuresArray = industry.features;
                        } else if (typeof industry.features === 'string') {
                          featuresArray = industry.features.split(',').map(f => f.trim()).filter(f => f);
                        } else {
                          // Fallback: return empty array if features is not a string or array
                          featuresArray = [];
                        }
                        
                        return featuresArray.map((feature, featureIndex) => (
                          <div key={featureIndex} className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
                            <div className="w-2 h-2 bg-gradient-to-r from-inovara-accent to-inovara-secondary rounded-full flex-shrink-0"></div>
                            <span className="text-sm text-inovara-primary/80">{typeof feature === 'string' ? feature.trim() : String(feature)}</span>
                          </div>
                        ));
                      })()}
                    </div>
                  </div>

                  {/* Hover Effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-inovara-primary/5 to-inovara-secondary/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                </div>
              );
            })}
          </div>

          {/* CTA Section */}
          <div className="mt-20 text-center">
            <div className="bg-white/90 backdrop-blur-sm border border-inovara-primary/10 rounded-3xl p-6 shadow-lg">
              <h2 className="text-3xl md:text-4xl font-black text-inovara-primary mb-6 text-center">
                {t('industries.cta.title')}
              </h2>
              <p className="text-xl text-inovara-primary/70 leading-relaxed mb-8 max-w-3xl mx-auto">
                {t('industries.cta.description')}
              </p>
              <div className={`flex flex-col sm:flex-row gap-4 justify-center items-center ${isRTL ? 'sm:flex-row-reverse' : ''}`}>
                <button
                  onClick={onQuoteClick}
                  className="group px-12 py-5 bg-gradient-to-r from-inovara-primary to-inovara-secondary text-white font-bold text-lg rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-inovara-accent/30"
                >
                  <span className={`flex items-center justify-center gap-3 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
                    {t('industries.cta.button')}
                    <ArrowRight className={`w-5 h-5 group-hover:translate-x-1 transition-transform duration-300 ${isRTL ? 'rotate-180 group-hover:-translate-x-1' : ''}`} />
                  </span>
                </button>
                <Link
                  to="/contact"
                  className="group px-12 py-5 bg-white/90 text-inovara-primary font-bold text-lg rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-inovara-primary/30 border border-inovara-primary/20"
                >
                  <span className={`flex items-center justify-center gap-3 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
                    {t('industries.cta.contact')}
                    <ArrowRight className={`w-5 h-5 group-hover:translate-x-1 transition-transform duration-300 ${isRTL ? 'rotate-180 group-hover:-translate-x-1' : ''}`} />
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default IndustriesPage;
