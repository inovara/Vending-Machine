import React, { useState, useEffect, useRef } from 'react';
import { Code, Brain, ShoppingCart, Building2, ArrowRight, Sparkles } from 'lucide-react';
import { navigateToSection } from '../utils/navigation';

interface Service {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  features: string[];
  gradient: string;
  delay: number;
}

const ServicesSection: React.FC = () => {
  const [, setHoveredService] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const services: Service[] = [
    {
      id: 'software',
      title: 'Enterprise Software Engineering',
      description: 'Mission-critical web and mobile applications built with cutting-edge technologies, microservices architecture, and enterprise-grade security for Fortune 500 companies.',
      icon: <Code className="h-8 w-8" />,
      features: ['Cloud-Native Development', 'Mobile-First Design', 'API-First Architecture', 'DevOps Integration'],
      gradient: 'from-inovara-primary to-inovara-secondary',
      delay: 0.1
    },
    {
      id: 'ai',
      title: 'AI & Machine Learning Solutions',
      description: 'Advanced artificial intelligence systems and predictive analytics platforms that transform data into strategic business insights and automated decision-making capabilities.',
      icon: <Brain className="h-8 w-8" />,
      features: ['Machine Learning Models', 'Predictive Analytics', 'AI Automation', 'Natural Language Processing'],
      gradient: 'from-inovara-secondary to-inovara-accent',
      delay: 0.2
    },
    {
      id: 'retail',
      title: 'Smart Commerce & IoT Solutions',
      description: 'Revolutionary retail technology and IoT automation systems that enhance customer experience, optimize operations, and drive revenue growth.',
      icon: <ShoppingCart className="h-8 w-8" />,
      features: ['Smart Commerce Platforms', 'IoT Integration', 'Payment Solutions', 'Inventory Intelligence'],
      gradient: 'from-inovara-accent to-inovara-primary',
      delay: 0.3
    },
    {
      id: 'enterprise',
      title: 'Digital Transformation Strategy',
      description: 'Comprehensive digital transformation roadmaps that modernize legacy systems, enhance operational efficiency, and drive sustainable competitive advantage.',
      icon: <Building2 className="h-8 w-8" />,
      features: ['Digital Strategy', 'Legacy Modernization', 'Process Optimization', 'Change Management'],
      gradient: 'from-inovara-primary to-inovara-accent',
      delay: 0.4
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
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
      className="py-24 px-6 bg-section-dark relative overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-64 h-64 bg-gradient-to-br from-inovara-primary-20 to-inovara-secondary-20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-br from-inovara-accent-20 to-inovara-primary-20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        
        {/* Floating particles */}
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-inovara-accent/30 rounded-full animate-float"></div>
        <div className="absolute top-1/3 right-1/3 w-3 h-3 bg-inovara-secondary/40 rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-1/3 left-1/3 w-2 h-2 bg-inovara-primary/30 rounded-full animate-float" style={{ animationDelay: '3s' }}></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Enhanced Section Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center space-x-2 mb-6 animate-fade-in">
            <Sparkles className="h-6 w-6 text-inovara-accent" />
            <span className="text-inovara-accent font-semibold tracking-wider uppercase text-sm">Enterprise Solutions</span>
            <Sparkles className="h-6 w-6 text-inovara-accent" />
          </div>
          <h2 className="text-5xl md:text-6xl font-black mb-6 animate-fade-in-up">
            <span className="text-white">Cutting-Edge Technology</span>
            <br />
            <span className="gradient-text">That Transforms Business</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-inovara-primary to-inovara-accent rounded-full mx-auto mb-8 animate-width-expand"></div>
          <p className="text-xl text-white/80 max-w-4xl mx-auto font-light leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            From AI-powered automation to enterprise digital transformation, we deliver comprehensive technology solutions that accelerate growth, enhance efficiency, and secure competitive advantage for Fortune 500 companies worldwide.
          </p>
        </div>

        {/* Unified Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service) => (
            <div
              key={service.id}
              className={`enterprise-card group relative cursor-pointer animate-fade-in-up`}
              style={{ 
                animationDelay: `${service.delay}s`,
                animationFillMode: isVisible ? 'forwards' : 'none'
              }}
              onMouseEnter={() => setHoveredService(service.id)}
              onMouseLeave={() => setHoveredService(null)}
            >
              {/* Gradient Border Effect */}
              <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} rounded-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-500`}></div>
              
              {/* Glow Effect */}
              <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} rounded-3xl opacity-0 group-hover:opacity-10 blur-xl transition-opacity duration-500`}></div>

              <div className="relative z-10">
                {/* Icon */}
                <div className={`w-16 h-16 bg-gradient-to-br ${service.gradient} rounded-2xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  {service.icon}
                </div>

                {/* Content */}
                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-inovara-accent transition-colors duration-300">
                  {service.title}
                </h3>
                
                <p className="text-white/70 mb-6 leading-relaxed group-hover:text-white/90 transition-colors duration-300">
                  {service.description}
                </p>

                {/* Features */}
                <div className="space-y-2 mb-6">
                  {service.features.map((feature, featureIndex) => (
                    <div
                      key={featureIndex}
                      className="flex items-center space-x-2 text-sm text-white/60 group-hover:text-white/80 transition-colors duration-300"
                      style={{ transitionDelay: `${featureIndex * 0.1}s` }}
                    >
                      <div className={`w-1.5 h-1.5 bg-gradient-to-r ${service.gradient} rounded-full`}></div>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <button 
                  className="flex items-center text-inovara-accent font-semibold group-hover:text-white transition-colors duration-300 hover:scale-105 focus-ring"
                  onClick={() => navigateToSection('#contact')}
                  aria-label={`Learn more about ${service.title}`}
                >
                  <span className="text-sm">Learn More</span>
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                </button>
              </div>

              {/* Hover Overlay */}
              <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} rounded-3xl opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
            </div>
          ))}
        </div>

        {/* Unified Bottom CTA */}
        <div className="text-center mt-16 animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
          <button className="btn-enterprise px-8 py-4 text-lg">
            <span className="flex items-center">
              View All Services
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
