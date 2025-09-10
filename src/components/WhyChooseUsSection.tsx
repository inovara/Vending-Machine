import React from 'react';
import { Shield, Award, TrendingUp, HeadphonesIcon, CheckCircle } from 'lucide-react';
import { useTranslation } from '../contexts/TranslationContext';

const WhyChooseUsSection: React.FC = () => {
  const { isRTL } = useTranslation();
  const features = [
    {
      title: 'Innovative Technology',
      icon: Shield,
      description: 'Cutting-edge smart vending solutions with modern hardware and software architecture.',
      stats: '100%',
      statLabel: 'Modern Technology',
      gradient: 'from-inovara-primary to-inovara-secondary',
      features: [
        'Smart hardware design',
        'IoT integration',
        'Real-time monitoring',
        'AI-powered analytics'
      ]
    },
    {
      title: 'Startup Agility',
      icon: Award,
      description: 'Fast, flexible, and responsive - we adapt quickly to your business needs.',
      stats: '24/7',
      statLabel: 'Rapid Response',
      gradient: 'from-inovara-secondary to-inovara-accent',
      features: [
        'Quick deployment',
        'Custom solutions',
        'Direct communication',
        'Agile development'
      ]
    },
    {
      title: 'Scalable Solutions',
      icon: TrendingUp,
      description: 'From single machine to enterprise networks, our solutions grow with your business.',
      stats: 'Unlimited',
      statLabel: 'Scalability',
      gradient: 'from-inovara-accent to-inovara-neutral',
      features: [
        'Modular architecture',
        'Cloud-based management',
        'Multi-location support',
        'Flexible configurations'
      ]
    },
    {
      title: 'Dedicated Support',
      icon: HeadphonesIcon,
      description: 'Personalized support and comprehensive assistance tailored to your business needs.',
      stats: '100%',
      statLabel: 'Dedicated Service',
      gradient: 'from-inovara-neutral to-inovara-primary',
      features: [
        'Direct team access',
        'Remote diagnostics',
        'Custom training',
        'Ongoing partnership'
      ]
    }
  ];


  return (
    <section id="why-choose-us" className={`professional-section bg-section-dark ${isRTL ? 'rtl' : 'ltr'}`}>
      <div className="professional-container">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-professional-heading mb-6">
            Why Choose <span className="text-gradient-primary">Inovara</span>
          </h2>
          <p className="text-professional-subheading text-white/80 max-w-3xl mx-auto">
            We deliver exceptional value through reliable technology, proven expertise, and comprehensive support
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div
                key={index}
                className="card-professional-elevated group text-center"
              >
                <div className={`w-20 h-20 bg-gradient-to-br ${feature.gradient} rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <IconComponent className="w-10 h-10 text-white" />
                </div>
                
                <h3 className="text-xl font-bold text-white mb-4 group-hover:text-inovara-accent transition-colors duration-300">
                  {feature.title}
                </h3>
                
                <p className="text-white/70 text-sm mb-6 leading-relaxed">
                  {feature.description}
                </p>
                
                <div className="mb-6">
                  <div className="text-3xl font-black text-inovara-accent mb-1">
                    {feature.stats}
                  </div>
                  <div className="text-white/60 text-xs font-medium uppercase tracking-wider">
                    {feature.statLabel}
                  </div>
                </div>
                
                <div className="space-y-2">
                  {feature.features.map((item, itemIndex) => (
                    <div key={itemIndex} className="flex items-center text-sm text-white/60">
                      <CheckCircle className="w-4 h-4 text-inovara-accent mr-2 flex-shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>


        {/* Trust Indicators */}
        <div className="bg-gradient-to-r from-inovara-primary-10 to-inovara-secondary-10 rounded-3xl p-8 md:p-12">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-white mb-4">
              Ready to Transform Your Business
            </h3>
            <p className="text-white/70 text-lg">
              Join the future of smart vending with our innovative solutions designed for modern businesses
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center">
            <div className="text-center">
              <div className="text-3xl font-black text-inovara-accent mb-2">100%</div>
              <div className="text-white/70 text-sm">Modern Technology</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-black text-inovara-secondary mb-2">24/7</div>
              <div className="text-white/70 text-sm">Rapid Response</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-black text-inovara-accent mb-2">100%</div>
              <div className="text-white/70 text-sm">Dedicated Service</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-black text-inovara-primary mb-2">∞</div>
              <div className="text-white/70 text-sm">Scalability</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;
