import React from 'react';
import HeroSection from '../components/HeroSection';
import AboutSection from '../components/AboutSection';
import ProductsSection from '../components/ProductsSection';
import WhyChooseUsSection from '../components/WhyChooseUsSection';
import ContactSection from '../components/ContactSection';
import { useTranslation } from '../contexts/TranslationContext';

interface HomePageProps {
  onQuoteClick: (productId?: number) => void;
}

const HomePage: React.FC<HomePageProps> = ({ onQuoteClick }) => {
  const { isRTL } = useTranslation();

  return (
    <main 
      className={`min-h-screen ${isRTL ? 'rtl' : 'ltr'}`}
      role="main"
      aria-label="Inovara smart vending machine solutions homepage"
    >
      <HeroSection onQuoteClick={onQuoteClick}/>
      <ProductsSection onQuoteClick={onQuoteClick} />
      <AboutSection />
      <WhyChooseUsSection />
      <ContactSection />
    </main>
  );
};

export default HomePage;
