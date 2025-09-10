import React, { useEffect, useRef, useState } from 'react';
import { ChevronRight, Play, Sparkles, Zap, Target } from 'lucide-react';
import { smoothScrollTo } from '../utils/smoothScroll';
import { navigateToSection } from '../utils/navigation';

const HeroSection: React.FC = () => {
  const heroRef = useRef<HTMLElement>(null);
  const flagRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (heroRef.current && flagRef.current) {
        const scrolled = window.pageYOffset;
        const parallax = scrolled * 0.5;
        flagRef.current.style.transform = `translateY(${parallax}px)`;
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100
      });
    };

    // Trigger load animation
    setTimeout(() => setIsLoaded(true), 100);

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <section 
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        background: `
          radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(46, 0, 20, 0.3) 0%, transparent 50%),
          linear-gradient(135deg, rgba(46, 0, 20, 1) 0%, rgba(107, 144, 128, 0.9) 30%, rgba(252, 208, 161, 0.8) 70%, rgba(225, 233, 230, 0.9) 100%)
        `
      }}
    >
      {/* Advanced Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Dynamic gradient orbs */}
        <div 
          className="absolute w-96 h-96 bg-gradient-to-br from-inovara-accent-20 to-inovara-secondary-20 rounded-full blur-3xl animate-float"
          style={{
            top: '10%',
            left: '5%',
            transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`
          }}
        ></div>
        <div 
          className="absolute w-80 h-80 bg-gradient-to-br from-inovara-primary-30 to-inovara-accent-20 rounded-full blur-2xl animate-float"
          style={{
            top: '20%',
            right: '10%',
            animationDelay: '1s',
            transform: `translate(${mousePosition.x * -0.03}px, ${mousePosition.y * 0.03}px)`
          }}
        ></div>
        <div 
          className="absolute w-72 h-72 bg-gradient-to-br from-inovara-secondary-20 to-inovara-neutral-30 rounded-full blur-3xl animate-float"
          style={{
            bottom: '20%',
            left: '15%',
            animationDelay: '2s',
            transform: `translate(${mousePosition.x * 0.025}px, ${mousePosition.y * -0.025}px)`
          }}
        ></div>
        
        {/* Advanced geometric patterns */}
        <div className="absolute top-1/4 right-1/3 w-96 h-96 opacity-5">
          <svg viewBox="0 0 400 400" className="w-full h-full">
            <defs>
              <linearGradient id="advancedGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="rgba(46, 0, 20, 0.8)" />
                <stop offset="50%" stopColor="rgba(107, 144, 128, 0.6)" />
                <stop offset="100%" stopColor="rgba(252, 208, 161, 0.4)" />
              </linearGradient>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1"/>
              </pattern>
            </defs>
            <polygon points="200,50 350,150 300,300 100,300 50,150" fill="url(#advancedGradient1)" className="animate-pulse-slow" />
            <rect width="400" height="400" fill="url(#grid)" />
          </svg>
        </div>

        {/* Floating particles */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white/30 rounded-full animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${3 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>
      </div>

      {/* Abstract Elements */}
      <div ref={flagRef} className="absolute top-10 right-10 flex space-x-4 opacity-60">
        <div className="w-8 h-8 bg-gradient-to-r from-inovara-primary to-inovara-secondary rounded-full animate-float"></div>
        <div className="w-6 h-6 bg-gradient-to-r from-inovara-accent to-inovara-primary rounded-full animate-float" style={{ animationDelay: '0.5s' }}></div>
      </div>

      {/* Advanced Main Content */}
      <div className="relative z-10 text-center px-6 max-w-7xl mx-auto">
        {/* Enhanced Main Headline */}
        <h1 className={`mb-8 leading-tight transition-all mt-10 duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ animationDelay: '0.2s' }}>
          <div className="text-3xl md:text-4xl lg:text-5xl font-light text-white/90 tracking-wider mb-2">
            <span className="inline-block mr-3">ENTERPRISE</span>
            <span className="inline-block text-inovara-accent font-semibold">TECHNOLOGY</span>
            <span className="inline-block ml-3">SOLUTIONS</span>
          </div>
          <div className="text-lg md:text-xl lg:text-2xl font-light text-white/70 tracking-wide">
            <span className="inline-block">BY</span>
            <span className="inline-block mx-2 text-inovara-accent font-semibold">INOVARA</span>
          </div>
      </h1>

        {/* Enhanced Subtext */}
        <div className={`max-w-4xl mx-auto mb-12 transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ animationDelay: '0.4s' }}>
          <p className="text-lg md:text-xl lg:text-2xl text-white/90 font-light leading-relaxed mb-6">
            Empowering Fortune 500 companies with cutting-edge technology solutions that drive digital transformation, accelerate growth, and secure competitive advantage in the digital economy.
          </p>
          
          {/* Enhanced Features */}
          <div className="flex flex-wrap justify-center gap-6 text-sm text-white/60">
            <span className="flex items-center space-x-2">
              <Zap className="w-4 h-4 text-inovara-accent" />
              <span>AI-Powered Solutions</span>
            </span>
            <span className="flex items-center space-x-2">
              <Target className="w-4 h-4 text-inovara-secondary" />
              <span>Enterprise Security</span>
            </span>
            <span className="flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-inovara-primary" />
              <span>Global Innovation</span>
            </span>
            <span className="flex items-center space-x-2">
              <Target className="w-4 h-4 text-inovara-accent" />
              <span>Scalable Architecture</span>
            </span>
          </div>
        </div>

        {/* Enhanced CTA Buttons */}
        <div className={`flex flex-col sm:flex-row gap-4 justify-center items-center mb-16 transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ animationDelay: '0.6s' }}>
          <button 
            className="btn-enterprise px-8 py-3 text-base focus-ring"
            onClick={() => navigateToSection('#contact')}
            aria-label="Start your digital transformation journey"
          >
            <span className="flex items-center">
              Start Your Digital Transformation
              <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
            </span>
          </button>
          
          <button 
            className="btn-secondary px-8 py-3 text-base focus-ring"
            onClick={() => navigateToSection('#services')}
            aria-label="Explore our technology solutions"
          >
            <span className="flex items-center">
              <Play className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform duration-300" />
              Explore Our Solutions
            </span>
          </button>
        </div>

        {/* Enhanced Stats */}
        <div className={`grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ animationDelay: '0.8s' }}>
          <div className="enterprise-card text-center p-4 enterprise-hover">
            <div className="text-3xl md:text-4xl font-black text-white mb-1 group-hover:text-inovara-accent transition-colors duration-300">$2.5B+</div>
            <div className="text-white/70 text-xs font-medium">Business Value Delivered</div>
          </div>
          <div className="enterprise-card text-center p-4 enterprise-hover">
            <div className="text-3xl md:text-4xl font-black text-white mb-1 group-hover:text-inovara-secondary transition-colors duration-300">500+</div>
            <div className="text-white/70 text-xs font-medium">Enterprise Clients</div>
          </div>
          <div className="enterprise-card text-center p-4 enterprise-hover">
            <div className="text-3xl md:text-4xl font-black text-white mb-1 group-hover:text-inovara-primary transition-colors duration-300">99.9%</div>
            <div className="text-white/70 text-xs font-medium">System Uptime</div>
          </div>
          <div className="enterprise-card text-center p-4 enterprise-hover">
            <div className="text-3xl md:text-4xl font-black text-white mb-1 group-hover:text-inovara-accent transition-colors duration-300">50+</div>
            <div className="text-white/70 text-xs font-medium">Global Markets</div>
          </div>
        </div>
      </div>

      {/* Enhanced Scroll Indicator */}
      <div className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ animationDelay: '1s' }}>
        <div className="flex flex-col items-center space-y-2">
          <div className="text-white/60 text-xs font-medium tracking-wider">SCROLL TO EXPLORE</div>
          <div 
            className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center group cursor-pointer hover:border-white/60 transition-colors duration-300"
            onClick={() => smoothScrollTo('#about', 80)}
          >
            <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse group-hover:bg-white/80 transition-colors duration-300"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;