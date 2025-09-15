import { useState, useEffect, useCallback } from 'react';
import { useTranslation } from '../../contexts/TranslationContext';

// Declare gtag for TypeScript
declare global {
  interface Window {
    gtag?: (command: string, action: string, parameters?: Record<string, any>) => void;
  }
}

interface UseHomePageProps {
  onQuoteClick: () => void;
}

export const useHomePage = ({ onQuoteClick }: UseHomePageProps) => {
  const { t, isRTL } = useTranslation();
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set(['home']));

  // Handle section visibility for performance optimization
  const handleSectionVisibility = useCallback((sectionId: string, isVisible: boolean) => {
    setVisibleSections(prev => {
      const newSet = new Set(prev);
      if (isVisible) {
        newSet.add(sectionId);
      } else {
        newSet.delete(sectionId);
      }
      return newSet;
    });
  }, []);

  // Enhanced quote click handler with analytics
  const handleQuoteClick = useCallback(() => {
    // Track quote click event
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'quote_request', {
        event_category: 'engagement',
        event_label: 'home_page'
      });
    }
    
    onQuoteClick();
  }, [onQuoteClick]);

  // Navigation helpers
  const scrollToSection = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
      });
    }
  }, []);

  // Get section visibility status
  const isSectionVisible = useCallback((sectionId: string) => {
    return visibleSections.has(sectionId);
  }, [visibleSections]);

  return {
    // State
    visibleSections,
    isRTL,
    
    // Actions
    handleQuoteClick,
    handleSectionVisibility,
    scrollToSection,
    isSectionVisible,
    
    // Translation
    t
  };
};
