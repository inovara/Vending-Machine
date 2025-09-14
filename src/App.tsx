import React, { useState, useEffect, lazy, Suspense } from 'react';
import { TranslationProvider } from './contexts/TranslationContext';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import Footer from './components/Footer';
import FloatingActionMenu from './components/FloatingActionMenu';
import ScrollToTop from './components/ScrollToTop';
import SlideInCta from './components/SlideInCta.tsx';

// Defer non-critical sections for faster first paint
const AboutSection = lazy(() => import('./components/AboutSection'));
const ProductsSection = lazy(() => import('./components/ProductsSection'));
const WhyChooseUsSection = lazy(() => import('./components/WhyChooseUsSection'));
const ContactSection = lazy(() => import('./components/ContactSection'));
const QuickQuoteModal = lazy(() => import('./components/QuickQuoteModal'));

// Route-level code-splitting
const ProductsPage = lazy(() => import('./pages/ProductsPage'));
const ProductDetailPage = lazy(() => import('./pages/ProductDetailPage.tsx'));
const IndustriesPage = lazy(() => import('./pages/IndustriesPage'));
const PrivacyPolicyPage = lazy(() => import('./pages/PrivacyPolicyPage'));
const TermsOfServicePage = lazy(() => import('./pages/TermsOfServicePage'));
const CookiePolicyPage = lazy(() => import('./pages/CookiePolicyPage'));
const DisclaimerPage = lazy(() => import('./pages/DisclaimerPage'));
import './styles/enterprise.css';

const SectionSkeleton: React.FC<{ height?: string }> = ({ height = 'h-64' }) => (
  <div className={`w-full ${height} animate-pulse bg-inovara-neutral/10 rounded-2xl`} />
);

const Home: React.FC<{ onQuoteClick: () => void }> = ({ onQuoteClick }) => (
  <main>
    <section id="home">
      <HeroSection />
    </section>

    <section id="about">
      <Suspense fallback={<div className="px-6 py-12 max-w-7xl mx-auto"><SectionSkeleton /></div>}>
        <AboutSection />
      </Suspense>
    </section>

    <section id="products">
      <Suspense fallback={<div className="px-6 py-12 max-w-7xl mx-auto"><SectionSkeleton height="h-80" /></div>}>
        <ProductsSection onQuoteClick={onQuoteClick} />
      </Suspense>
    </section>

    <section id="why-choose-us">
      <Suspense fallback={<div className="px-6 py-12 max-w-7xl mx-auto"><SectionSkeleton /></div>}>
        <WhyChooseUsSection />
      </Suspense>
    </section>

    <section id="contact">
      <Suspense fallback={<div className="px-6 py-12 max-w-7xl mx-auto"><SectionSkeleton height="h-72" /></div>}>
        <ContactSection />
      </Suspense>
    </section>
  </main>
);

const App: React.FC = () => {
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);

  // Modern loading state management
  useEffect(() => {
    // Update root element classes for modern loading
    const root = document.getElementById('root');
    if (root) {
      root.classList.add('app-loaded');
      root.classList.remove('app-loading');
    }
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
          <Suspense fallback={<div className="px-6 py-12 max-w-7xl mx-auto"><SectionSkeleton /></div>}>
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
          </Suspense>

        <Footer />

        {/* Quick Quote Modal */}
        <Suspense fallback={null}>
          <QuickQuoteModal
            isOpen={isQuoteModalOpen}
            onClose={() => setIsQuoteModalOpen(false)}
          />
        </Suspense>

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