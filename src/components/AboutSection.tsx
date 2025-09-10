import React, { useEffect, useRef, useState } from 'react';
import { Building, Users, Target, Award, Globe, Zap, Shield, TrendingUp, CheckCircle, ArrowRight } from 'lucide-react';

const AboutSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

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

  const companyValues = [
    {
      icon: Award,
      title: 'Excellence',
      description: 'Delivering exceptional results through meticulous attention to detail, rigorous quality standards, and unwavering commitment to client success.',
      metrics: ['99.9% Quality Score', 'Zero Defect Policy', 'ISO 9001 Certified']
    },
    {
      icon: Zap,
      title: 'Innovation',
      description: 'Pioneering cutting-edge AI technologies and methodologies that drive digital transformation, competitive advantage, and market leadership.',
      metrics: ['$50M+ R&D Investment', '25+ Patents', 'Technology Leadership']
    },
    {
      icon: Shield,
      title: 'Integrity',
      description: 'Maintaining the highest ethical standards, transparent communication, and trust-based relationships with all stakeholders.',
      metrics: ['Ethical Standards', 'Transparent Reporting', 'Stakeholder Trust']
    },
    {
      icon: TrendingUp,
      title: 'Scalability',
      description: 'Building cloud-native solutions that grow seamlessly with your business, ensuring long-term value and sustainable competitive advantage.',
      metrics: ['Cloud-Native Design', 'Auto-Scaling', 'Future-Proof Architecture']
    }
  ];

  const leadershipTeam = [
    { name: 'Executive Leadership', role: 'Strategic Vision & Direction', icon: Building },
    { name: 'Technology Experts', role: 'Innovation & Development', icon: Zap },
    { name: 'Business Analysts', role: 'Client Success & Growth', icon: Target },
    { name: 'Global Operations', role: 'Worldwide Support & Delivery', icon: Globe }
  ];

  const tabs = [
    { id: 0, label: 'Our Mission', icon: Target },
    { id: 1, label: 'Our Vision', icon: Globe },
    { id: 2, label: 'Our Values', icon: Award },
    { id: 3, label: 'Our Impact', icon: TrendingUp }
  ];

  return (
    <section 
      ref={sectionRef}
      className="py-24 px-6 bg-section-dark"
    >
      <div className="enterprise-container">
        {/* Enhanced Section Header */}
        <div className="text-center mb-20">
          <div className={`inline-flex items-center space-x-2 px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full mb-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <Building className="w-4 h-4 text-enterprise-gold" />
            <span className="text-white/90 text-sm font-medium">Who We Are</span>
          </div>
          
          <h2 className={`text-4xl md:text-5xl lg:text-6xl font-black mb-6 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ animationDelay: '0.2s' }}>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-enterprise-gold to-white">ENTERPRISE</span>
            <br />
            <span className="text-white">LEADERSHIP</span>
          </h2>
          
          <p className={`text-lg md:text-xl text-white/80 max-w-5xl mx-auto font-light leading-relaxed transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ animationDelay: '0.4s' }}>
            Inovara is a global technology innovation leader, empowering Fortune 500 companies with cutting-edge AI-powered solutions that drive digital transformation, accelerate growth, and secure sustainable competitive advantage in the digital economy. Our mission is to architect the future of enterprise technology.
          </p>
        </div>

        {/* Company Values Grid */}
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ animationDelay: '0.6s' }}>
          {companyValues.map((value, index) => (
            <div key={index} className="enterprise-card p-6 text-center group">
              <div className="w-12 h-12 bg-gradient-to-br from-inovara-primary to-inovara-secondary rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <value.icon className="w-6 h-6 text-white" />
              </div>
              
              <h3 className="text-lg font-bold text-white mb-3">{value.title}</h3>
              <p className="text-white/70 text-sm leading-relaxed mb-4">{value.description}</p>
              
              <div className="space-y-1">
                {value.metrics.map((metric, metricIndex) => (
                  <div key={metricIndex} className="flex items-center justify-center space-x-2">
                    <CheckCircle className="w-3 h-3 text-inovara-secondary" />
                    <span className="text-white/80 text-xs font-medium">{metric}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Leadership Team */}
        <div className={`mb-20 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ animationDelay: '0.8s' }}>
          <h3 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">Our Leadership Team</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {leadershipTeam.map((member, index) => (
              <div key={index} className="enterprise-card p-6 text-center group">
                <div className="w-16 h-16 bg-gradient-to-br from-inovara-accent to-inovara-primary rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <member.icon className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-lg font-semibold text-white mb-2">{member.name}</h4>
                <p className="text-white/70 text-sm">{member.role}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Interactive Tabs */}
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
            <div className="max-w-4xl mx-auto">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-6">
                {tabs[activeTab].label}
              </h3>
              <p className="text-lg text-white/80 leading-relaxed mb-8">
                {activeTab === 0 && "To empower Fortune 500 enterprises with transformative AI-powered technology solutions that drive innovation, accelerate digital transformation, and secure sustainable competitive advantage in the digital economy. We are committed to delivering exceptional value through cutting-edge technology, strategic expertise, and unwavering dedication to client success."}
                {activeTab === 1 && "To be the world's leading technology innovation partner, recognized for our ability to transform businesses through advanced AI-powered digital solutions. We envision a future where every enterprise can leverage cutting-edge technology to achieve unprecedented growth, efficiency, and market leadership in the digital economy."}
                {activeTab === 2 && "Excellence, Innovation, Integrity, and Scalability form the foundation of our corporate culture. We believe in delivering exceptional results, pioneering new AI technologies, maintaining the highest ethical standards, and building cloud-native solutions that grow seamlessly with our clients' success."}
                {activeTab === 3 && "Our impact is measured through the success of our clients. We have delivered over $2.5 billion in business value, transformed 500+ enterprises, and achieved 99.9% client satisfaction. Our AI-powered solutions have enabled clients to increase efficiency by 40%, reduce costs by 30%, and accelerate time-to-market by 50%."}
              </p>
              <button className="btn-enterprise px-6 py-3 text-base inline-flex items-center">
                Learn More
                <ArrowRight className="ml-2 w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Enhanced Statistics */}
        <div className={`grid grid-cols-2 md:grid-cols-4 gap-6 mt-20 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ animationDelay: '1.2s' }}>
          <div className="text-center p-6 enterprise-glass rounded-2xl group">
            <div className="w-12 h-12 bg-gradient-to-br from-inovara-accent to-inovara-primary rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
              <Users className="w-6 h-6 text-white" />
            </div>
            <div className="text-3xl md:text-4xl font-black text-white mb-2 group-hover:text-inovara-accent transition-colors duration-300">25+</div>
            <div className="text-white/70 text-sm font-medium">Expert Team</div>
          </div>
          <div className="text-center p-6 enterprise-glass rounded-2xl group">
            <div className="w-12 h-12 bg-gradient-to-br from-inovara-secondary to-inovara-accent rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
              <Target className="w-6 h-6 text-white" />
            </div>
            <div className="text-3xl md:text-4xl font-black text-white mb-2 group-hover:text-inovara-secondary transition-colors duration-300">500+</div>
            <div className="text-white/70 text-sm font-medium">Enterprise Clients</div>
          </div>
          <div className="text-center p-6 enterprise-glass rounded-2xl group">
            <div className="w-12 h-12 bg-gradient-to-br from-inovara-primary to-inovara-secondary rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
              <Award className="w-6 h-6 text-white" />
            </div>
            <div className="text-3xl md:text-4xl font-black text-white mb-2 group-hover:text-inovara-primary transition-colors duration-300">99.9%</div>
            <div className="text-white/70 text-sm font-medium">Success Rate</div>
          </div>
          <div className="text-center p-6 enterprise-glass rounded-2xl group">
            <div className="w-12 h-12 bg-gradient-to-br from-inovara-accent to-inovara-primary rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <div className="text-3xl md:text-4xl font-black text-white mb-2 group-hover:text-inovara-accent transition-colors duration-300">5+</div>
            <div className="text-white/70 text-sm font-medium">Years Excellence</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
