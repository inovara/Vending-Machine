import React, { useEffect, useRef } from 'react';
import { Shield, Zap, Users, Star, Award, Globe, TrendingUp } from 'lucide-react';
import { navigateToSection } from '../utils/navigation';

interface Differentiator {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  gradient: string;
  delay: number;
  features: string[];
}

const WhyInovaraSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  const differentiators: Differentiator[] = [
    {
      id: 'trusted',
      title: 'Fortune 500 Trusted Partner',
      description: 'Trusted by leading global enterprises to deliver mission-critical technology solutions with enterprise-grade security, compliance, and reliability that exceeds industry standards.',
      icon: <Shield className="h-8 w-8" />,
      gradient: 'from-inovara-primary to-inovara-secondary',
      delay: 0.1,
      features: ['SOC 2 Type II Certified', 'ISO 27001 Compliant', '24/7 Enterprise Support', '99.9% SLA Guarantee']
    },
    {
      id: 'proven',
      title: 'Proven Innovation Excellence',
      description: 'Demonstrated expertise in delivering cutting-edge AI-powered solutions with measurable business impact, driving digital transformation for 500+ enterprise clients worldwide.',
      icon: <Award className="h-8 w-8" />,
      gradient: 'from-inovara-secondary to-inovara-accent',
      delay: 0.2,
      features: ['$2.5B+ Value Delivered', '500+ Enterprise Clients', '99.9% Success Rate', 'Industry Recognition']
    },
    {
      id: 'scalable',
      title: 'Future-Proof Scalable Architecture',
      description: 'Built on cloud-native, microservices architecture designed for infinite scalability, ensuring your technology investment grows seamlessly with your business expansion.',
      icon: <Zap className="h-8 w-8" />,
      gradient: 'from-inovara-accent to-inovara-primary',
      delay: 0.3,
      features: ['Cloud-Native Design', 'Microservices Architecture', 'API-First Strategy', 'Auto-Scaling Infrastructure']
    },
    {
      id: 'seamless',
      title: 'Seamless Digital Transformation',
      description: 'End-to-end digital transformation expertise that minimizes business disruption while maximizing ROI, with comprehensive change management and continuous optimization.',
      icon: <Users className="h-8 w-8" />,
      gradient: 'from-inovara-primary to-inovara-accent',
      delay: 0.4,
      features: ['Zero-Downtime Migration', '40% Efficiency Gains', 'Change Management', 'Ongoing Optimization']
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Add animation classes when section comes into view
          const cards = entry.target.querySelectorAll('.differentiator-card');
          cards.forEach((card, index) => {
            setTimeout(() => {
              card.classList.add('animate-fade-in-up');
            }, index * 200);
          });
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="py-24 px-6 bg-section-light relative overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-20 w-64 h-64 bg-gradient-to-br from-inovara-primary-10 to-inovara-secondary-10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-gradient-to-br from-inovara-accent-10 to-inovara-primary-10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="w-full h-full" style={{
            backgroundImage: `linear-gradient(rgba(46, 0, 20, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(46, 0, 20, 0.1) 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}></div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Enhanced Section Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center space-x-2 mb-6">
            <Star className="h-6 w-6 text-inovara-primary" />
            <span className="text-inovara-primary font-semibold tracking-wider uppercase text-sm">Why Choose Inovara</span>
            <Star className="h-6 w-6 text-inovara-primary" />
          </div>
          <h2 className="text-5xl md:text-6xl font-black mb-6">
            <span className="gradient-text">Your Competitive</span>
            <br />
            <span className="text-inovara-primary">Technology Edge</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-inovara-primary to-inovara-secondary rounded-full mx-auto mb-8 animate-width-expand"></div>
          <p className="text-xl text-inovara-primary/80 max-w-4xl mx-auto font-light leading-relaxed">
            Join 500+ Fortune 500 companies who trust Inovara to deliver enterprise-grade technology solutions that accelerate digital transformation, drive innovation, and secure sustainable competitive advantage in the digital economy.
          </p>
        </div>

        {/* Differentiators Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-20">
            {differentiators.map((item) => (
            <div
              key={item.id}
              className={`differentiator-card group relative bg-white/80 backdrop-blur-sm border border-inovara-secondary/20 rounded-3xl p-8 hover:border-inovara-primary/30 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 shadow-lg hover:shadow-2xl hover:shadow-inovara-primary/10 opacity-0`}
              style={{ animationDelay: `${item.delay}s` }}
            >
              {/* Gradient Border Effect */}
              <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} rounded-3xl opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
              
              {/* Glow Effect */}
              <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} rounded-3xl opacity-0 group-hover:opacity-5 blur-xl transition-opacity duration-500`}></div>

              <div className="relative z-10">
                {/* Icon */}
                <div className={`w-16 h-16 bg-gradient-to-br ${item.gradient} rounded-2xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  {item.icon}
                </div>

                {/* Content */}
                <h3 className="text-2xl font-bold text-inovara-primary mb-4 group-hover:text-inovara-secondary transition-colors duration-300">
                  {item.title}
                </h3>
                
                <p className="text-inovara-primary/70 mb-6 leading-relaxed group-hover:text-inovara-primary/90 transition-colors duration-300">
                  {item.description}
                </p>

                {/* Features */}
                <div className="space-y-2">
                  {item.features.map((feature, featureIndex) => (
                    <div
                      key={featureIndex}
                      className="flex items-center space-x-2 text-sm text-inovara-primary/60 group-hover:text-inovara-primary/80 transition-colors duration-300"
                      style={{ transitionDelay: `${featureIndex * 0.1}s` }}
                    >
                      <div className={`w-1.5 h-1.5 bg-gradient-to-r ${item.gradient} rounded-full`}></div>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Hover Overlay */}
              <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} rounded-3xl opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
            </div>
          ))}
        </div>

        {/* Trust Indicators */}
        <div className="bg-gradient-to-r from-inovara-primary/5 to-inovara-secondary/5 rounded-3xl p-12 border border-inovara-primary/10">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-inovara-primary mb-4">Trusted by Industry Leaders</h3>
            <p className="text-inovara-primary/70 max-w-2xl mx-auto">
              Our solutions power businesses across various industries, from fintech to retail, healthcare to manufacturing.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: <Award className="h-8 w-8" />, label: 'ISO Certified', value: 'Quality Assured' },
              { icon: <Globe className="h-8 w-8" />, label: 'Global Standards', value: 'Best Practices' },
              { icon: <TrendingUp className="h-8 w-8" />, label: 'Proven Results', value: 'ROI Focused' },
              { icon: <Shield className="h-8 w-8" />, label: 'Secure & Compliant', value: 'Enterprise Ready' }
            ].map((item, index) => (
              <div key={index} className="text-center group">
                <div className="w-16 h-16 bg-gradient-to-br from-inovara-primary/10 to-inovara-secondary/10 rounded-2xl flex items-center justify-center text-inovara-primary mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  {item.icon}
                </div>
                <div className="text-lg font-semibold text-inovara-primary mb-1">{item.label}</div>
                <div className="text-sm text-inovara-primary/70">{item.value}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <button 
            className="group relative px-8 py-4 bg-gradient-to-r from-inovara-primary to-inovara-secondary text-white font-semibold rounded-full shadow-2xl hover:shadow-inovara-primary/25 transition-all duration-300 transform hover:scale-105 btn-luxury focus-ring"
            onClick={() => navigateToSection('#contact')}
            aria-label="Start your digital transformation journey"
          >
            <span className="flex items-center">
              Start Your Transformation
              <TrendingUp className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default WhyInovaraSection;
