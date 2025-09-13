import React, { useState } from 'react';
import { TranslationProvider } from './contexts/TranslationContext';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import ProductsSection from './components/ProductsSection';
import EnterpriseIndustriesSection from './components/EnterpriseIndustriesSection';
import WhyChooseUsSection from './components/WhyChooseUsSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import QuickQuoteModal from './components/QuickQuoteModal';
import ChatbotWidget from './components/ChatbotWidget';
import ProductsPage from './pages/ProductsPage';
import ProductDetailPage from './pages/ProductDetailPage.tsx';
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

  const openQuoteForm = () => {
    setIsQuoteModalOpen(true);
  };

  const openStartSellingForm = () => {
    setIsQuoteModalOpen(true);
  };
  
  return (
    <TranslationProvider>
      <div className="min-h-screen font-display overflow-x-hidden">
        <Header onQuoteClick={() => setIsQuoteModalOpen(true)} />

        <Routes>
          <Route path="/" element={<Home onQuoteClick={() => setIsQuoteModalOpen(true)} />} />
          <Route path="/products" element={<ProductsPage onQuoteClick={() => setIsQuoteModalOpen(true)} />} />
          <Route path="/products/:slug" element={<ProductDetailPage onQuoteClick={() => setIsQuoteModalOpen(true)} />} />
        </Routes>

        <Footer />

        {/* Quick Quote Modal */}
        <QuickQuoteModal
          isOpen={isQuoteModalOpen}
          onClose={() => setIsQuoteModalOpen(false)}
        />

        {/* Floating Widgets */}
        <SlideInCta onPrimary={openStartSellingForm} onSecondary={openQuoteForm} />
        <ChatbotWidget />
      </div>
    </TranslationProvider>
  );
};

export default App;