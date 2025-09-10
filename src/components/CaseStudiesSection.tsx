import React, { useState, useEffect, useRef } from 'react';
import { Cpu, TrendingUp, Play, ExternalLink } from 'lucide-react';

interface CaseStudy {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  technologies: string[];
  results: string[];
  gradient: string;
}

const CaseStudiesSection: React.FC = () => {
  const [activeCase, setActiveCase] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const caseStudies: CaseStudy[] = [
    {
      id: 'dashboard',
      title: 'Enterprise Analytics Dashboard',
      category: 'Data Visualization',
      description: 'A comprehensive business intelligence platform that transforms complex data into actionable insights for enterprise clients.',
      image: 'dashboard',
      technologies: ['React', 'D3.js', 'Python', 'PostgreSQL'],
      results: ['40% faster decision making', '60% reduction in reporting time', '95% user satisfaction'],
      gradient: 'from-inovara-primary to-inovara-secondary'
    },
    {
      id: 'vending',
      title: 'Smart Vending Solution',
      category: 'IoT & Retail Tech',
      description: 'Revolutionary vending machine system with AI-powered inventory management and contactless payment integration.',
      image: 'vending',
      technologies: ['IoT', 'Machine Learning', 'React Native', 'AWS'],
      results: ['30% increase in sales', '50% reduction in maintenance', '99.9% uptime'],
      gradient: 'from-inovara-secondary to-inovara-accent'
    },
    {
      id: 'mobile',
      title: 'Mobile Banking App',
      category: 'Fintech Solutions',
      description: 'Secure and intuitive mobile banking application with advanced security features and seamless user experience.',
      image: 'mobile',
      technologies: ['React Native', 'Node.js', 'Blockchain', 'Biometric Auth'],
      results: ['200% increase in mobile users', 'Zero security breaches', '4.8/5 app store rating'],
      gradient: 'from-inovara-accent to-inovara-primary'
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

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveCase((prev) => (prev + 1) % caseStudies.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [caseStudies.length]);

  const renderMockup = (type: string) => {
    switch (type) {
      case 'dashboard':
        return (
          <div className="w-full h-64 bg-gradient-to-br from-luxury-steel to-luxury-charcoal rounded-2xl p-6 relative overflow-hidden">
            <div className="flex items-center justify-between mb-4">
              <div className="flex space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
              <div className="text-white/60 text-sm">Analytics Dashboard</div>
            </div>
            <div className="grid grid-cols-3 gap-4 h-32">
              <div className="bg-gradient-to-br from-inovara-primary/30 to-inovara-secondary/30 rounded-lg p-3">
                <div className="text-white/80 text-xs mb-1">Revenue</div>
                <div className="text-white text-lg font-bold">$2.4M</div>
                <div className="text-green-400 text-xs">+12%</div>
              </div>
              <div className="bg-gradient-to-br from-inovara-secondary/30 to-inovara-accent/30 rounded-lg p-3">
                <div className="text-white/80 text-xs mb-1">Users</div>
                <div className="text-white text-lg font-bold">15.2K</div>
                <div className="text-green-400 text-xs">+8%</div>
              </div>
              <div className="bg-gradient-to-br from-inovara-accent/30 to-inovara-primary/30 rounded-lg p-3">
                <div className="text-white/80 text-xs mb-1">Growth</div>
                <div className="text-white text-lg font-bold">24%</div>
                <div className="text-green-400 text-xs">+5%</div>
              </div>
            </div>
            <div className="absolute bottom-2 right-2">
              <TrendingUp className="h-6 w-6 text-inovara-accent animate-pulse" />
            </div>
          </div>
        );
      case 'vending':
        return (
          <div className="w-full h-64 bg-gradient-to-br from-luxury-steel to-luxury-charcoal rounded-2xl p-6 relative overflow-hidden">
            <div className="text-center">
              <div className="w-32 h-40 bg-gradient-to-b from-inovara-secondary/20 to-inovara-primary/20 rounded-lg mx-auto mb-4 relative">
                <div className="absolute inset-2 bg-gradient-to-b from-inovara-neutral/10 to-inovara-accent/10 rounded border border-inovara-secondary/30">
                  <div className="p-2 space-y-1">
                    <div className="h-4 bg-inovara-secondary/30 rounded"></div>
                    <div className="h-4 bg-inovara-accent/30 rounded"></div>
                    <div className="h-4 bg-inovara-primary/30 rounded"></div>
                  </div>
                </div>
                <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2">
                  <div className="w-8 h-8 bg-gradient-to-r from-inovara-primary to-inovara-secondary rounded-full flex items-center justify-center">
                    <Cpu className="h-4 w-4 text-white" />
                  </div>
                </div>
              </div>
              <div className="text-white/80 text-sm">Smart Vending Machine</div>
              <div className="text-inovara-accent text-xs mt-1">IoT Connected</div>
            </div>
          </div>
        );
      case 'mobile':
        return (
          <div className="w-full h-64 bg-gradient-to-br from-luxury-steel to-luxury-charcoal rounded-2xl p-6 relative overflow-hidden">
            <div className="w-32 h-56 bg-gradient-to-b from-inovara-primary/20 to-inovara-accent/20 rounded-3xl mx-auto relative">
              <div className="absolute inset-1 bg-gradient-to-b from-luxury-charcoal to-luxury-steel rounded-2xl p-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-white text-sm font-semibold">Banking</div>
                  <div className="w-6 h-4 bg-inovara-secondary/30 rounded"></div>
                </div>
                <div className="space-y-3">
                  <div className="h-8 bg-gradient-to-r from-inovara-primary/30 to-inovara-secondary/30 rounded"></div>
                  <div className="h-6 bg-inovara-accent/20 rounded"></div>
                  <div className="h-6 bg-inovara-secondary/20 rounded"></div>
                  <div className="h-6 bg-inovara-primary/20 rounded"></div>
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="h-8 bg-gradient-to-r from-inovara-primary to-inovara-secondary rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <section 
      ref={sectionRef}
      className={`py-24 px-6 bg-section-dark relative overflow-hidden transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
    >
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-inovara-primary-10 to-inovara-secondary-10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-br from-inovara-accent-10 to-inovara-primary-10 rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }}></div>
        
        {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-5">
          <div className="w-full h-full" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)`,
            backgroundSize: '50px 50px'
          }}></div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-black mb-6 animate-fade-in-up">
            <span className="text-white">Innovation</span>
            <br />
            <span className="gradient-text">Showcase</span>
            </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-inovara-primary to-inovara-accent rounded-full mx-auto mb-8 animate-width-expand"></div>
          <p className="text-xl text-white/80 max-w-3xl mx-auto font-light leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            Discover how we've transformed businesses through cutting-edge technology solutions and innovative approaches.
          </p>
        </div>

        {/* Case Studies Carousel */}
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Mockup Display */}
        <div className="relative">
            <div className="relative bg-gradient-to-br from-luxury-steel/30 to-luxury-charcoal/30 backdrop-blur-sm border border-white/10 rounded-3xl p-8">
              <div className="animate-scale-in" style={{ animationDelay: `${activeCase * 0.2}s` }}>
                {renderMockup(caseStudies[activeCase].image)}
              </div>

              {/* Play Button Overlay */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                <div className="w-16 h-16 bg-gradient-to-r from-inovara-primary to-inovara-secondary rounded-full flex items-center justify-center cursor-pointer transform hover:scale-110 transition-transform">
                  <Play className="h-6 w-6 text-white ml-1" />
              </div>
            </div>
          </div>

            {/* Case Study Indicators */}
            <div className="flex justify-center space-x-4 mt-8">
              {caseStudies.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveCase(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === activeCase 
                      ? 'bg-gradient-to-r from-inovara-primary to-inovara-secondary scale-125' 
                      : 'bg-white/30 hover:bg-white/50'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Case Study Content */}
          <div className="space-y-8">
            <div className="animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              <div className="flex items-center space-x-3 mb-4">
                <span className="text-inovara-accent font-semibold text-sm tracking-wider uppercase">
                  {caseStudies[activeCase].category}
                </span>
                <div className="w-8 h-px bg-gradient-to-r from-inovara-primary to-inovara-accent"></div>
              </div>
              
              <h3 className="text-4xl font-bold text-white mb-6">
                {caseStudies[activeCase].title}
              </h3>
              
              <p className="text-xl text-white/80 leading-relaxed mb-8">
                {caseStudies[activeCase].description}
              </p>
            </div>

            {/* Technologies */}
            <div className="animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
              <h4 className="text-lg font-semibold text-white mb-4">Technologies Used</h4>
              <div className="flex flex-wrap gap-3">
                {caseStudies[activeCase].technologies.map((tech, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-gradient-to-r from-inovara-primary/20 to-inovara-secondary/20 border border-inovara-primary/30 text-inovara-accent rounded-full text-sm font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Results */}
            <div className="animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
              <h4 className="text-lg font-semibold text-white mb-4">Key Results</h4>
              <div className="space-y-3">
                {caseStudies[activeCase].results.map((result, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-gradient-to-r from-inovara-primary to-inovara-secondary rounded-full"></div>
                    <span className="text-white/80">{result}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="animate-fade-in-up" style={{ animationDelay: '1s' }}>
              <button className="group flex items-center space-x-2 text-inovara-accent font-semibold hover:text-white transition-colors duration-300">
                <span>View Full Case Study</span>
                <ExternalLink className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </button>
            </div>
          </div>
        </div>

        {/* Bottom Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20">
          {[
            { number: '50+', label: 'Projects Completed' },
            { number: '100%', label: 'Client Satisfaction' },
            { number: '24/7', label: 'Support Available' },
            { number: '2', label: 'Countries Served' }
          ].map((stat, index) => (
            <div key={index} className="text-center animate-fade-in-up" style={{ animationDelay: `${1.2 + index * 0.1}s` }}>
              <div className="text-4xl font-bold text-white mb-2">{stat.number}</div>
              <div className="text-white/70 text-sm">{stat.label}</div>
          </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CaseStudiesSection;
