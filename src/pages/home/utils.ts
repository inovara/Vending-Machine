// Utility functions for home page functionality

/**
 * Generate unique section IDs for tracking
 */
export const generateSectionId = (baseId: string, index: number): string => {
  return `${baseId}-${index}`;
};

/**
 * Check if a section should be preloaded based on performance config
 */
export const shouldPreloadSection = (sectionId: string): boolean => {
  const preloadSections = ['home', 'about'];
  return preloadSections.includes(sectionId);
};

/**
 * Get section priority for loading order
 */
export const getSectionPriority = (sectionId: string): number => {
  const priorities: Record<string, number> = {
    'home': 1,
    'about': 2,
    'products': 3,
    'why-choose-us': 4,
    'contact': 5
  };
  
  return priorities[sectionId] || 999;
};

/**
 * Format section aria label for accessibility
 */
export const formatAriaLabel = (sectionId: string): string => {
  return sectionId
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

/**
 * Check if section needs quote click handler
 */
export const needsQuoteClick = (sectionId: string): boolean => {
  const quoteSections = ['products'];
  return quoteSections.includes(sectionId);
};

/**
 * Get optimal fallback height for section
 */
export const getFallbackHeight = (sectionId: string): string => {
  const heights: Record<string, string> = {
    'home': 'h-screen',
    'about': 'h-64',
    'products': 'h-80',
    'why-choose-us': 'h-64',
    'contact': 'h-72'
  };
  
  return heights[sectionId] || 'h-64';
};

/**
 * Debounce function for performance optimization
 */
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

/**
 * Throttle function for scroll events
 */
export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean;
  
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};
