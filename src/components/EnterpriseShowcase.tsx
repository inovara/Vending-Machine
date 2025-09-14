import React, { useState, useEffect, useRef } from 'react';
import { Building, Globe, Award, Shield, Zap, TrendingUp, CheckCircle, ArrowRight } from 'lucide-react';
import { navigateToSection } from '../utils/navigation';
import { useTranslation } from '../contexts/TranslationContext';

const EnterpriseShowcase: React.FC = () => {
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const enterpriseFeatures = [
    {
      icon: Building,
      title: t('enterprise.features.scalability.title'),
      description: t('enterprise.features.scalability.description'),
      metrics: ['99.9% Uptime', '24/7 Support', 'Global Scale']
    },
    {
      icon: Shield,
      title: t('enterprise.features.management.title'),
      description: t('enterprise.features.management.description'),
      metrics: ['SOC 2 Type II', 'ISO 27001', 'GDPR Compliant']
    },
    {
      icon: Zap,
      title: t('enterprise.features.analytics.title'),
      description: t('enterprise.features.analytics.description'),
      metrics: ['ML/AI Powered', 'Process Automation', 'Predictive Analytics']
    },
    {
      icon: Globe,
      title: t('enterprise.features.integration.title'),
      description: t('enterprise.features.integration.description'),
      metrics: ['50+ Countries', 'Multi-Cloud', 'Edge Computing']
    }
  ];

  const enterpriseStats = [
    { value: '$2.5B+', label: 'Enterprise Value Created', icon: TrendingUp },
    { value: '500+', label: 'Fortune 500 Clients', icon: Building },
    { value: '99.9%', label: 'Uptime Guarantee', icon: Shield },
    { value: '24/7', label: 'Global Support', icon: Globe }
  ];

  const tabs = [
    { id: 0, label: 'Enterprise Solutions', icon: Building },
    { id: 1, label: 'Security & Compliance', icon: Shield },
    { id: 2, label: 'Global Infrastructure', icon: Globe },
    { id: 3, label: 'AI & Innovation', icon: Zap }
  ];

  return (
    <section 
      ref={sectionRef}
      className="py-24 px-6 bg-section-dark"
    >
      <div className="enterprise-container">
        {/* Enhanced Section Header */}
        <div className="text-center mb-16">
          <div className={`inline-flex items-center space-x-2 px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full mb-6 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <Award className="w-4 h-4 text-enterprise-gold" />
            <span className="text-white/90 text-sm font-medium">Enterprise Excellence</span>
          </div>
          
          <h2 className={`text-4xl md:text-5xl lg:text-6xl font-black mb-4 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ animationDelay: '0.2s' }}>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-enterprise-gold to-white">{t('enterprise.title')}</span>
            <br />
            <span className="text-white">{t('enterprise.titleAccent')}</span>
          </h2>
          
          <p className={`text-lg md:text-xl text-white/80 max-w-3xl mx-auto font-light leading-relaxed transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ animationDelay: '0.4s' }}>
            {t('enterprise.description')}
          </p>
        </div>

        {/* Enhanced Features Grid */}
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ animationDelay: '0.6s' }}>
          {enterpriseFeatures.map((feature, index) => (
            <div key={index} className="enterprise-card p-6 text-center group">
              <div className="w-12 h-12 bg-gradient-to-br from-inovara-primary to-inovara-secondary rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              
              <h3 className="text-lg font-bold text-white mb-3">{feature.title}</h3>
              <p className="text-white/70 text-sm leading-relaxed mb-4">{feature.description}</p>
              
              <div className="space-y-1">
                {feature.metrics.map((metric, metricIndex) => (
                  <div key={metricIndex} className="flex items-center justify-center space-x-2">
                    <CheckCircle className="w-3 h-3 text-inovara-secondary" />
                    <span className="text-white/80 text-xs font-medium">{metric}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Enhanced Stats */}
        <div className={`grid grid-cols-2 md:grid-cols-4 gap-4 mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ animationDelay: '0.8s' }}>
          {enterpriseStats.map((stat, index) => (
            <div key={index} className="text-center p-4 enterprise-glass rounded-xl group">
              <div className="w-10 h-10 bg-gradient-to-br from-inovara-accent to-inovara-primary rounded-lg flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300">
                <stat.icon className="w-5 h-5 text-white" />
              </div>
              <div className="text-2xl md:text-3xl font-black text-white mb-1 group-hover:text-inovara-accent transition-colors duration-300">
                {stat.value}
              </div>
              <div className="text-white/70 text-xs font-medium">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Enhanced Tabs */}
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ animationDelay: '1s' }}>
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-inovara-primary to-inovara-secondary text-white shadow-enterprise'
                    : 'bg-white/10 text-white/70 hover:bg-white/20 hover:text-white'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span className="text-sm">{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="enterprise-card p-8 text-center">
            <div className="max-w-3xl mx-auto">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                {tabs[activeTab].label}
              </h3>
              <p className="text-base text-white/80 leading-relaxed mb-6">
                {activeTab === 0 && "Comprehensive enterprise solutions designed for scale, security, and performance. Our platform supports mission-critical applications with enterprise-grade reliability and global deployment capabilities."}
                {activeTab === 1 && "Bank-level security with comprehensive compliance frameworks. We maintain the highest standards of data protection, privacy, and regulatory compliance across all industries and regions."}
                {activeTab === 2 && "Global infrastructure spanning multiple continents with edge computing capabilities. Our distributed architecture ensures low latency and high availability for enterprise applications worldwide."}
                {activeTab === 3 && "Cutting-edge AI and machine learning solutions that drive innovation and automation. Our advanced algorithms help enterprises optimize processes, predict trends, and make data-driven decisions."}
              </p>
              <button 
                className="btn-enterprise px-6 py-3 text-base inline-flex items-center focus-ring"
                onClick={() => navigateToSection('#services')}
                aria-label="Learn more about our enterprise solutions"
              >
                Learn More
                <ArrowRight className="ml-2 w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EnterpriseShowcase;
