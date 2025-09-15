// Import home page sections directly for better performance
import HeroSection from '../../components/HeroSection';
import AboutSection from '../../components/AboutSection';
import ProductsSection from '../../components/ProductsSection';
import WhyChooseUsSection from '../../components/WhyChooseUsSection';
import ContactSection from '../../components/ContactSection';

// Section configuration with metadata
export interface SectionConfig {
  id: string;
  component: React.ComponentType<{ onQuoteClick?: () => void }>;
  fallbackHeight: string;
  needsQuoteClick: boolean;
  className?: string;
  ariaLabel?: string;
}

export const HOME_SECTIONS: SectionConfig[] = [
  {
    id: 'home',
    component: HeroSection,
    fallbackHeight: 'h-screen',
    needsQuoteClick: false,
    className: 'min-h-screen',
    ariaLabel: 'Hero section with smart vending machine solutions'
  },
  {
    id: 'about',
    component: AboutSection,
    fallbackHeight: 'h-64',
    needsQuoteClick: false,
    ariaLabel: 'About Inovara and our mission'
  },
  {
    id: 'products',
    component: ProductsSection,
    fallbackHeight: 'h-80',
    needsQuoteClick: true,
    ariaLabel: 'Smart vending machine products showcase'
  },
  {
    id: 'why-choose-us',
    component: WhyChooseUsSection,
    fallbackHeight: 'h-64',
    needsQuoteClick: false,
    ariaLabel: 'Why choose Inovara advantages'
  },
  {
    id: 'contact',
    component: ContactSection,
    fallbackHeight: 'h-72',
    needsQuoteClick: false,
    ariaLabel: 'Contact us for enterprise solutions'
  }
] as const;
