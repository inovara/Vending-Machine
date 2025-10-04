import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Building2, Users, Target, Handshake, TrendingUp, Award, Globe, Zap, Shield, Heart, Lightbulb, CheckCircle, Star } from 'lucide-react';
import { useTranslation } from '../contexts/TranslationContext';

interface AboutUsPageProps {
  onQuoteClick: (productId?: number) => void;
}

const AboutUsPage: React.FC<AboutUsPageProps> = ({ onQuoteClick: _onQuoteClick }) => {
  const { t, isRTL } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);

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

  const achievements = [
    {
      icon: TrendingUp,
      number: "500+",
      label: "Businesses Served",
      description: "Companies transformed with our solutions"
    },
    {
      icon: Award,
      number: "99.9%",
      label: "Uptime Guarantee",
      description: "Reliable performance you can count on"
    },
    {
      icon: Globe,
      number: "24/7",
      label: "Global Support",
      description: "Round-the-clock assistance worldwide"
    },
    {
      icon: Zap,
      number: "40%",
      label: "ROI Increase",
      description: "Average revenue boost for clients"
    }
  ];

  const features = [
    {
      icon: Shield,
      title: "Enterprise Security",
      description: "Bank-grade security with advanced encryption and monitoring systems to protect your business data and operations."
    },
    {
      icon: Heart,
      title: "Customer-Centric",
      description: "We prioritize customer satisfaction with personalized support, quick response times, and tailored solutions."
    },
    {
      icon: Lightbulb,
      title: "Innovation First",
      description: "Cutting-edge technology and continuous innovation drive our solutions, keeping you ahead of the competition."
    },
    {
      icon: CheckCircle,
      title: "Proven Results",
      description: "Track record of successful implementations with measurable business outcomes and satisfied clients."
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
        {/* Background Effects */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-inovara-accent/8 to-inovara-secondary/8 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-gradient-to-tr from-inovara-primary/6 to-inovara-accent/6 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto">
          {/* Breadcrumb */}
          <nav className={`flex items-center gap-1 sm:gap-2 mb-6 sm:mb-8 text-xs sm:text-sm ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
            <Link to="/" className="text-inovara-primary/70 hover:text-inovara-primary transition-colors px-2 py-1 rounded-lg hover:bg-inovara-primary/5">
              {t('about.breadcrumb.home')}
            </Link>
            <ArrowRight className={`w-3 h-3 sm:w-4 sm:h-4 text-inovara-primary/50 ${isRTL ? 'rotate-180' : ''}`} />
            <span className="text-inovara-primary font-medium">{t('about.breadcrumb.about')}</span>
          </nav>

          {/* Hero Content */}
          <div className="text-center mb-8 sm:mb-10">
            <div className="mb-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-inovara-primary tracking-tight leading-tight">
                {t('about.title')}
              </h1>
            </div>
            
            {/* Professional Divider */}
            <div className={`w-24 h-1 bg-gradient-to-r from-inovara-accent to-inovara-secondary mx-auto mb-8 rounded-full ${isRTL ? 'bg-gradient-to-l' : 'bg-gradient-to-r'}`}></div>
            
            <div className="max-w-3xl mx-auto">
              <p className="text-lg md:text-xl text-inovara-primary/80 font-medium leading-relaxed">
                {t('about.description')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Company Story Section */}
      <section className="relative py-20 px-6 overflow-hidden bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Story Content */}
            <div className={`${isRTL ? 'lg:order-2' : 'lg:order-1'}`}>
              <h2 className="text-3xl md:text-4xl font-black text-inovara-primary mb-6 leading-tight">
                Our Story
              </h2>
              <div className="space-y-4 text-inovara-primary/80 font-medium leading-relaxed">
                <p>
                  Founded with a vision to revolutionize the vending industry, Inovara emerged from a simple yet powerful idea: 
                  what if vending machines could be intelligent, connected, and truly beneficial for businesses?
                </p>
                <p>
                  We started as a small team of passionate engineers and business experts who saw the potential for smart 
                  technology to transform traditional vending into a powerful business tool. Today, we're proud to serve 
                  hundreds of businesses across various industries.
                </p>
                <p>
                  Our journey has been marked by continuous innovation, customer-centric development, and a commitment to 
                  delivering solutions that not only meet but exceed expectations. Every machine we deploy is a step 
                  toward a more connected, efficient, and profitable future for our clients.
                </p>
              </div>
            </div>

            {/* Visual Element */}
            <div className={`${isRTL ? 'lg:order-1' : 'lg:order-2'}`}>
              <div className="relative">
                <div className="bg-gradient-to-br from-inovara-primary/10 to-inovara-secondary/10 rounded-3xl p-8 h-80 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-24 h-24 bg-gradient-to-br from-inovara-accent to-inovara-secondary rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl">
                      <Building2 className="w-12 h-12 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-inovara-primary mb-2">Innovation</h3>
                    <p className="text-inovara-primary/70">Driving the future of vending</p>
                  </div>
                </div>
                {/* Decorative elements */}
                <div className="absolute -top-4 -right-4 w-8 h-8 bg-inovara-accent/20 rounded-full"></div>
                <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-inovara-secondary/20 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section
        ref={sectionRef}
        className="relative py-20 px-6 overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, rgba(255,255,255,1) 0%, rgba(245,245,245,0.8) 50%, rgba(255,255,255,1) 100%)'
        }}
      >
        {/* Background Effects */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/3 w-72 sm:w-96 h-72 sm:h-96 bg-gradient-to-br from-inovara-accent/3 to-inovara-secondary/3 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/3 w-64 sm:w-80 h-64 sm:h-80 bg-gradient-to-tr from-inovara-primary/3 to-inovara-accent/3 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto">
          {/* Section Header */}
          <div className={`text-center mb-16 ${isRTL ? 'rtl' : 'ltr'}`}>
            <h2 className="text-3xl md:text-4xl font-black text-inovara-primary mb-6 leading-tight">
              Our Values
            </h2>
            <p className="text-lg text-inovara-primary/80 font-medium max-w-2xl mx-auto">
              The principles that guide everything we do and shape our commitment to excellence
            </p>
          </div>

          {/* Values Grid */}
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
        </div>
      </section>

      {/* Achievements Section */}
      <section className="relative py-20 px-6 overflow-hidden bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-inovara-primary mb-6 leading-tight">
              Our Achievements
            </h2>
            <p className="text-lg text-inovara-primary/80 font-medium max-w-2xl mx-auto">
              Numbers that reflect our commitment to excellence and client success
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {achievements.map((achievement, index) => (
              <div key={index} className="text-center group">
                <div className="w-20 h-20 bg-gradient-to-br from-inovara-accent to-inovara-secondary rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <achievement.icon className="w-10 h-10 text-white" />
                </div>
                <div className="text-4xl font-black text-inovara-primary mb-2">{achievement.number}</div>
                <div className="text-lg font-bold text-inovara-primary mb-2">{achievement.label}</div>
                <div className="text-sm text-inovara-primary/70 font-medium">{achievement.description}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section
        className="relative py-20 px-6 overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, rgba(255,255,255,1) 0%, rgba(245,245,245,0.8) 50%, rgba(255,255,255,1) 100%)'
        }}
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-inovara-primary mb-6 leading-tight">
              Why Choose Inovara
            </h2>
            <p className="text-lg text-inovara-primary/80 font-medium max-w-2xl mx-auto">
              Discover what sets us apart in the vending industry
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white/90 backdrop-blur-sm border border-inovara-primary/15 rounded-2xl p-8 hover:shadow-xl transition-all duration-300 group">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-inovara-accent to-inovara-secondary rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-inovara-primary mb-3 group-hover:text-inovara-accent transition-colors duration-300">
                      {feature.title}
                    </h3>
                    <p className="text-inovara-primary/70 font-medium leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 px-6 overflow-hidden bg-white">
        <div className="max-w-4xl mx-auto text-center">
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
      </section>
    </div>
  );
};

export default AboutUsPage;
