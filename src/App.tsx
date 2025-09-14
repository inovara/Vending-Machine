import React, { useState, useEffect } from 'react';
import { TranslationProvider } from './contexts/TranslationContext';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import ProductsSection from './components/ProductsSection';
import WhyChooseUsSection from './components/WhyChooseUsSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import QuickQuoteModal from './components/QuickQuoteModal';
import FloatingActionMenu from './components/FloatingActionMenu';
import ScrollToTop from './components/ScrollToTop';
import ProductsPage from './pages/ProductsPage';
import ProductDetailPage from './pages/ProductDetailPage.tsx';
import IndustriesPage from './pages/IndustriesPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import TermsOfServicePage from './pages/TermsOfServicePage';
import CookiePolicyPage from './pages/CookiePolicyPage';
import DisclaimerPage from './pages/DisclaimerPage';
import './styles/enterprise.css';
import SlideInCta from './components/SlideInCta.tsx';

const Home: React.FC<{ onQuoteClick: () => void }> = ({ onQuoteClick }) => (
  <main>
    <section id="home">
      <HeroSection />
    </section>

    <section id="about">
      <AboutSection />
    </section>

    <section id="products">
      <ProductsSection onQuoteClick={onQuoteClick} />
    </section>

    <section id="why-choose-us">
      <WhyChooseUsSection />
    </section>

    <section id="contact">
      <ContactSection />
    </section>
  </main>
);

const App: React.FC = () => {
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);

  // Modern loading state management
  useEffect(() => {
    // Mark app as loaded immediately for smooth UX
    
    // Update root element classes for modern loading
    const root = document.getElementById('root');
    if (root) {
      root.classList.add('app-loaded');
      root.classList.remove('app-loading');
    }
    
    // Preload critical resources
    const preloadCriticalResources = () => {
      // Preload hero section images
      const heroImages = [
        'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=800&fit=crop',
        'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1200&h=800&fit=crop'
      ];
      
      heroImages.forEach(src => {
        const img = new Image();
        img.src = src;
      });
    };
    
    // Run preloading after initial render
    setTimeout(preloadCriticalResources, 100);
  }, []);

  const openQuoteForm = () => {
    setIsQuoteModalOpen(true);
  };

  const openChatbot = () => {
    // Trigger chatbot widget opening
    const chatbotButton = document.querySelector('[aria-label*="chatbot"], [aria-label*="Chat"]') as HTMLButtonElement;
    if (chatbotButton) {
      chatbotButton.click();
    } else {
      // Fallback: scroll to chatbot widget if it exists
      const chatbotWidget = document.querySelector('[class*="chatbot"]');
      if (chatbotWidget) {
        chatbotWidget.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  };

  
  return (
    <TranslationProvider>
      <div className="min-h-screen font-display overflow-x-hidden">
        <Header onQuoteClick={() => setIsQuoteModalOpen(true)} />

          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Home onQuoteClick={() => setIsQuoteModalOpen(true)} />} />
            <Route path="/products" element={<ProductsPage onQuoteClick={() => setIsQuoteModalOpen(true)} />} />
            <Route path="/products/:slug" element={<ProductDetailPage onQuoteClick={() => setIsQuoteModalOpen(true)} />} />
            <Route path="/industries" element={<IndustriesPage onQuoteClick={() => setIsQuoteModalOpen(true)} />} />
            
            {/* Legal Pages */}
            <Route path="/privacy" element={<PrivacyPolicyPage />} />
            <Route path="/terms" element={<TermsOfServicePage />} />
            <Route path="/cookies" element={<CookiePolicyPage />} />
            <Route path="/disclaimer" element={<DisclaimerPage />} />
          </Routes>

        <Footer />

        {/* Quick Quote Modal */}
        <QuickQuoteModal
          isOpen={isQuoteModalOpen}
          onClose={() => setIsQuoteModalOpen(false)}
        />

        {/* Floating Widgets */}
        <SlideInCta onGetQuote={openQuoteForm} />
        <FloatingActionMenu 
          onChatbotOpen={openChatbot}
          onQuoteRequest={openQuoteForm}
          whatsappNumber="+201234567890"
          whatsappMessage="Hello! I'm interested in your smart vending machine solutions. Can you provide more information?"
        />
      </div>
    </TranslationProvider>
  );
};

export default App;