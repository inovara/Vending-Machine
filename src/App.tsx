import React, { useState } from 'react';
import { TranslationProvider } from './contexts/TranslationContext';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import ProductsSection from './components/ProductsSection';
import IndustriesSection from './components/IndustriesSection';
import WhyChooseUsSection from './components/WhyChooseUsSection';
import B2BFeaturesSection from './components/B2BFeaturesSection';
import ContactSection from './components/ContactSection';
import EnterpriseShowcase from './components/EnterpriseShowcase';
import Footer from './components/Footer';
import QuickQuoteModal from './components/QuickQuoteModal';
import FloatingQuoteButton from './components/FloatingQuoteButton';
import ROICalculator from './components/ROICalculator';
import './styles/enterprise.css';

const App: React.FC = () => {
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);

  return (
    <TranslationProvider>
      <div className="min-h-screen font-display overflow-x-hidden">
        <Header onQuoteClick={() => setIsQuoteModalOpen(true)} />
        
        <main>
          <section id="home">
            <HeroSection />
          </section>
          
          <EnterpriseShowcase />
          
          <section id="about">
            <AboutSection />
          </section>
          
          <section id="products">
            <ProductsSection onQuoteClick={() => setIsQuoteModalOpen(true)} />
          </section>
          
          <section id="roi-calculator">
            <div className="py-20 px-6">
              <div className="max-w-7xl mx-auto">
                <ROICalculator />
              </div>
            </div>
          </section>
          
          
          <section id="industries">
            <IndustriesSection onQuoteClick={() => setIsQuoteModalOpen(true)} />
          </section>
          
          <section id="why-choose-us">
            <WhyChooseUsSection />
          </section>
          
          <section id="b2b-features">
            <B2BFeaturesSection />
          </section>
          
          
          <section id="contact">
            <ContactSection />
          </section>
        </main>
        
        <Footer />
        
        {/* Quick Quote Modal */}
        <QuickQuoteModal 
          isOpen={isQuoteModalOpen} 
          onClose={() => setIsQuoteModalOpen(false)} 
        />
        
        {/* Floating Quote Button */}
        <FloatingQuoteButton onQuoteClick={() => setIsQuoteModalOpen(true)} />
      </div>
    </TranslationProvider>
  );
};

export default App;