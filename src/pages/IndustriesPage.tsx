import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Building2, Heart, GraduationCap, ShoppingBag, Factory, Train, CheckCircle, TrendingUp, Users, Shield } from 'lucide-react';
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
      gradient: 'from-inovara-primary to-inovara-secondary',
      stats: t('industries.corporate.stats')
    },
    {
      title: t('industries.healthcare.title'),
      icon: Heart,
      description: t('industries.healthcare.description'),
      features: t('industries.healthcare.features'),
      gradient: 'from-inovara-accent to-inovara-secondary',
      stats: t('industries.healthcare.stats')
    },
    {
      title: t('industries.education.title'),
      icon: GraduationCap,
      description: t('industries.education.description'),
      features: t('industries.education.features'),
      gradient: 'from-inovara-secondary to-inovara-accent',
      stats: t('industries.education.stats')
    },
    {
      title: t('industries.retail.title'),
      icon: ShoppingBag,
      description: t('industries.retail.description'),
      features: t('industries.retail.features'),
      gradient: 'from-inovara-primary to-inovara-accent',
      stats: t('industries.retail.stats')
    },
    {
      title: t('industries.manufacturing.title'),
      icon: Factory,
      description: t('industries.manufacturing.description'),
      features: t('industries.manufacturing.features'),
      gradient: 'from-inovara-accent to-inovara-primary',
      stats: t('industries.manufacturing.stats')
    },
    {
      title: t('industries.transportation.title'),
      icon: Train,
      description: t('industries.transportation.description'),
      features: t('industries.transportation.features'),
      gradient: 'from-inovara-secondary to-inovara-primary',
      stats: t('industries.transportation.stats')
    }
  ];

  const benefits = [
    {
      icon: TrendingUp,
      title: t('industries.benefits.roi.title'),
      description: t('industries.benefits.roi.description')
    },
    {
      icon: Shield,
      title: t('industries.benefits.security.title'),
      description: t('industries.benefits.security.description')
    },
    {
      icon: Users,
      title: t('industries.benefits.support.title'),
      description: t('industries.benefits.support.description')
    }
  ];

  return (
    <div className={`min-h-screen ${isRTL ? 'rtl' : 'ltr'}`}>
      {/* Hero Section */}
      <section 
        className="relative pt-16 sm:pt-20 lg:pt-24 px-4 sm:px-6 overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, rgba(255,255,255,1) 0%, rgba(248,250,252,0.9) 50%, rgba(255,255,255,1) 100%)'
        }}
      >
        {/* Subtle Background Effects */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-inovara-accent/5 to-inovara-secondary/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-gradient-to-tr from-inovara-primary/3 to-inovara-accent/3 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto">
          {/* Breadcrumb */}
          <nav className={`flex items-center gap-1 sm:gap-2 mb-6 sm:mb-8 text-xs sm:text-sm ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
            <Link to="/" className="text-inovara-primary/70 hover:text-inovara-primary transition-colors px-2 py-1 rounded-lg hover:bg-inovara-primary/5">
              {t('industries.breadcrumb.home')}
            </Link>
            <ArrowRight className={`w-3 h-3 sm:w-4 sm:h-4 text-inovara-primary/50 ${isRTL ? 'rotate-180' : ''}`} />
            <span className="text-inovara-primary font-medium">{t('industries.breadcrumb.industries')}</span>
          </nav>

          {/* Hero Content */}
          <div className="text-center mb-8 sm:mb-10">
            <div className="mb-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-inovara-primary tracking-tight leading-tight">
                {t('industries.hero.title')}
              </h1>
            </div>
            
            {/* Professional Divider */}
            <div className={`w-24 h-1 bg-gradient-to-r from-inovara-accent to-inovara-secondary mx-auto mb-8 rounded-full ${isRTL ? 'bg-gradient-to-l' : 'bg-gradient-to-r'}`}></div>
            
            <div className="max-w-3xl mx-auto">
              <p className="text-lg md:text-xl text-inovara-primary/80 font-medium leading-relaxed mb-8">
                {t('industries.hero.subtitle')}
              </p>
              
              {/* Key Benefits */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
                {benefits.map((benefit, index) => {
                  const IconComponent = benefit.icon;
                  return (
                    <div key={index} className="bg-white/60 backdrop-blur-sm border border-inovara-primary/10 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                      <div className={`w-12 h-12 bg-gradient-to-br from-inovara-primary to-inovara-secondary rounded-xl flex items-center justify-center mb-4 mx-auto`}>
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-lg font-bold text-inovara-primary mb-2">{benefit.title}</h3>
                      <p className="text-sm text-inovara-primary/70 leading-relaxed">{benefit.description}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>    
        </div>
      </section>

      {/* Main Content */}
      <section className="pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-inovara-primary mb-4">
              {t('industries.sectionTitle')}
            </h2>
            <p className="text-lg text-inovara-primary/70 max-w-2xl mx-auto">
              {t('industries.sectionSubtitle')}
            </p>
          </div>

          {/* Industries Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {industries.map((industry, index) => {
              const IconComponent = industry.icon;
              return (
                <div
                  key={index}
                  className={`group relative bg-white/90 backdrop-blur-sm border border-inovara-primary/10 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 ${isRTL ? 'rtl' : 'ltr'}`}
                >
                  {/* Header with Icon and Stats */}
                  <div className={`flex items-start justify-between mb-6 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
                    <div className={`w-14 h-14 bg-gradient-to-br ${industry.gradient} rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300`}>
                      <IconComponent className="w-7 h-7 text-white" />
                    </div>
                    <div className={`bg-gradient-to-r from-inovara-accent/10 to-inovara-secondary/10 px-3 py-1 rounded-full ${isRTL ? 'mr-auto' : 'ml-auto'}`}>
                      <span className="text-xs font-bold text-inovara-primary">{industry.stats}</span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className={`${isRTL ? 'text-right' : 'text-left'}`}>
                    <h3 className="text-xl font-black text-inovara-primary mb-3 group-hover:text-inovara-accent transition-colors duration-300">
                      {industry.title}
                    </h3>
                    <p className="text-inovara-primary/70 leading-relaxed mb-5 text-sm">
                      {industry.description}
                    </p>
                    
                    {/* Features */}
                    <div className="space-y-2">
                      {(() => {
                        let featuresArray = [];
                        
                        if (Array.isArray(industry.features)) {
                          featuresArray = industry.features;
                        } else if (typeof industry.features === 'string') {
                          featuresArray = industry.features.split(',').map(f => f.trim()).filter(f => f);
                        } else {
                          featuresArray = [];
                        }
                        
                        return featuresArray.slice(0, 3).map((feature, featureIndex) => (
                          <div key={featureIndex} className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
                            <CheckCircle className="w-4 h-4 text-inovara-accent flex-shrink-0" />
                            <span className="text-sm text-inovara-primary/80">{typeof feature === 'string' ? feature.trim() : String(feature)}</span>
                          </div>
                        ));
                      })()}
                    </div>
                  </div>

                  {/* Hover Effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-inovara-primary/3 to-inovara-secondary/3 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                </div>
              );
            })}
          </div>

          {/* CTA Section */}
          <div className="mt-16">
            <div className="relative bg-gradient-to-br from-inovara-primary/5 to-inovara-secondary/5 backdrop-blur-sm border border-inovara-primary/10 rounded-3xl p-8 md:p-12 shadow-2xl overflow-hidden">
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-5">
                <div className="absolute top-0 left-0 w-64 h-64 bg-inovara-primary rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 right-0 w-64 h-64 bg-inovara-accent rounded-full blur-3xl"></div>
              </div>
              
              <div className="relative z-10 text-center">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-inovara-primary mb-6">
                  {t('industries.cta.title')}
                </h2>
                <p className="text-lg md:text-xl text-inovara-primary/80 leading-relaxed mb-10 max-w-3xl mx-auto">
                  {t('industries.cta.description')}
                </p>
                
                {/* Stats Row */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                  <div className="text-center">
                    <div className="text-3xl font-black text-inovara-accent mb-2">500+</div>
                    <div className="text-sm text-inovara-primary/70">{t('industries.stats.clients')}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-black text-inovara-accent mb-2">40%</div>
                    <div className="text-sm text-inovara-primary/70">{t('industries.stats.roi')}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-black text-inovara-accent mb-2">24hrs</div>
                    <div className="text-sm text-inovara-primary/70">{t('industries.stats.response')}</div>
                  </div>
                </div>
                
                <div className={`flex flex-col sm:flex-row gap-4 justify-center items-center ${isRTL ? 'sm:flex-row-reverse' : ''}`}>
                  <button
                    onClick={onQuoteClick}
                    className="group px-8 py-4 bg-gradient-to-r from-inovara-primary to-inovara-secondary text-white font-bold text-lg rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-inovara-accent/30 min-w-[200px]"
                  >
                    <span className={`flex items-center justify-center gap-3 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
                      {t('industries.cta.button')}
                      <ArrowRight className={`w-5 h-5 group-hover:translate-x-1 transition-transform duration-300 ${isRTL ? 'rotate-180 group-hover:-translate-x-1' : ''}`} />
                    </span>
                  </button>
                  <Link
                    to="/#contact"
                    className="group px-8 py-4 bg-white/90 text-inovara-primary font-bold text-lg rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-inovara-primary/30 border border-inovara-primary/20 min-w-[200px]"
                  >
                    <span className={`flex items-center justify-center gap-3 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
                      {t('industries.cta.contact')}
                      <ArrowRight className={`w-5 h-5 group-hover:translate-x-1 transition-transform duration-300 ${isRTL ? 'rotate-180 group-hover:-translate-x-1' : ''}`} />
                    </span>
                  </Link>
                </div>
                
                <p className="text-sm text-inovara-primary/60 mt-6">
                  {t('industries.trust')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default IndustriesPage;
