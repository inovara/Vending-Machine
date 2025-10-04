import React, { useState, useEffect, lazy, Suspense } from 'react';
import { TranslationProvider } from './contexts/TranslationContext';
import QueryProvider from './services/react-query';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import FloatingActionMenu from './components/FloatingActionMenu';
import ScrollToTop from './components/ScrollToTop';
import SlideInCta from './components/SlideInCta.tsx';
// PerformanceMonitor removed for production

// Lazy load pages and components for better performance
const HomePage = lazy(() => import('./pages/HomePage'));
const QuickQuoteModal = lazy(() => import('./components/QuickQuoteModal'));
const ChatbotWidget = lazy(() => import('./components/ChatbotWidget'));

// Route-level code-splitting
const ProductsPage = lazy(() => import('./pages/ProductsPage'));
const ProductDetailPage = lazy(() => import('./pages/ProductDetailPage.tsx'));
const IndustriesPage = lazy(() => import('./pages/IndustriesPage'));
const AboutUsPage = lazy(() => import('./pages/AboutUsPage'));
const ContactUsPage = lazy(() => import('./pages/ContactUsPage'));
const PrivacyPolicyPage = lazy(() => import('./pages/PrivacyPolicyPage'));
const TermsOfServicePage = lazy(() => import('./pages/TermsOfServicePage'));
const CookiePolicyPage = lazy(() => import('./pages/CookiePolicyPage'));
const DisclaimerPage = lazy(() => import('./pages/DisclaimerPage'));

const App: React.FC = () => {
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<number | undefined>(undefined);

  // Optimized loading state management
  useEffect(() => {
    // Update root element classes for optimized loading
    const root = document.getElementById('root');
    if (root) {
      root.classList.add('app-loaded');
      root.classList.remove('app-loading');
    }
  }, []);

  const openQuoteForm = (productId?: number) => {
    setSelectedProductId(productId);
    setIsQuoteModalOpen(true);
  };

  const openChatbot = () => {
    setIsChatbotOpen(true);
  };

  
  return (
    <QueryProvider>
      <TranslationProvider>
        <div className="min-h-screen font-display overflow-x-hidden">
        <Header onQuoteClick={() => openQuoteForm()} />

          <ScrollToTop />
          <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center">
              <div className="w-8 h-8 border-4 border-inovara-primary/20 border-t-inovara-primary rounded-full animate-spin"></div>
            </div>
          }>
            <Routes>
              <Route path="/" element={<HomePage onQuoteClick={openQuoteForm} />} />
              <Route path="/products" element={<ProductsPage onQuoteClick={openQuoteForm} />} />
              <Route path="/products/:slug" element={<ProductDetailPage onQuoteClick={openQuoteForm} />} />
              <Route path="/industries" element={<IndustriesPage onQuoteClick={openQuoteForm} />} />
              <Route path="/about" element={<AboutUsPage onQuoteClick={openQuoteForm} />} />
              <Route path="/contact" element={<ContactUsPage onQuoteClick={openQuoteForm} />} />
              
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
            onClose={() => {
              setIsQuoteModalOpen(false);
              setSelectedProductId(undefined);
            }}
            productId={selectedProductId}
          />
        </Suspense>

        {/* Chatbot Widget */}
        <Suspense fallback={null}>
          <ChatbotWidget
            isOpen={isChatbotOpen}
            onClose={() => setIsChatbotOpen(false)}
            onQuoteRequest={openQuoteForm}
          />
        </Suspense>

        {/* Floating Widgets */}
        <SlideInCta onGetQuote={openQuoteForm} />
        <FloatingActionMenu 
          onChatbotOpen={openChatbot}
          onQuoteRequest={openQuoteForm}
          whatsappNumber="+201116392600"
          whatsappMessage="Hello! I'm interested in your smart vending machine solutions. Can you provide more information?"
        />

        </div>
      </TranslationProvider>
    </QueryProvider>
  );
};

export default App;