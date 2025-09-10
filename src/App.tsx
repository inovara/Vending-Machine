import React from 'react';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import ServicesSection from './components/ServicesSection';
import CaseStudiesSection from './components/CaseStudiesSection';
import WhyInovaraSection from './components/WhyInovaraSection';
import ContactSection from './components/ContactSection';
import EnterpriseShowcase from './components/EnterpriseShowcase';
import Footer from './components/Footer';
import BackgroundEffect from './components/BackgroundEffect';

const App: React.FC = () => {
  return (
    <div className="min-h-screen font-display overflow-x-hidden">
      <Header />
      
      <main>
        <section id="home">
          <HeroSection />
          <BackgroundEffect />
        </section>
        
        <EnterpriseShowcase />
        
        <section id="about">
          <AboutSection />
        </section>
        
        <section id="services">
          <ServicesSection />
        </section>
        
        <section id="case-studies">
          <CaseStudiesSection />
        </section>
        
        <WhyInovaraSection />
        
        <section id="contact">
          <ContactSection />
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default App;