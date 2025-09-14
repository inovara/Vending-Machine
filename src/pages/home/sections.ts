import { lazy } from 'react';

// Lazy load home page sections for better performance
export const HeroSection = lazy(() => import('../../components/HeroSection'));
export const AboutSection = lazy(() => import('../../components/AboutSection'));
export const ProductsSection = lazy(() => import('../../components/ProductsSection'));
export const WhyChooseUsSection = lazy(() => import('../../components/WhyChooseUsSection'));
export const ContactSection = lazy(() => import('../../components/ContactSection'));

// Section configuration with metadata
export interface SectionConfig {
  id: string;
  component: React.LazyExoticComponent<React.ComponentType<{ onQuoteClick?: () => void }>>;
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
