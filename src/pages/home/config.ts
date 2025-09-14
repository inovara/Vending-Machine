// Home page configuration and constants
export const HOME_PAGE_CONFIG = {
  // Performance settings
  LAZY_LOAD_DELAY: 100, // ms delay for lazy loading
  SUSPENSE_TIMEOUT: 5000, // ms timeout for suspense fallbacks
  
  // Section settings
  SECTION_SPACING: 'py-12', // Default section padding
  CONTAINER_MAX_WIDTH: 'max-w-7xl', // Container max width
  CONTAINER_PADDING: 'px-6', // Container horizontal padding
  
  // Animation settings
  FADE_IN_DURATION: 300, // ms for fade in animations
  STAGGER_DELAY: 100, // ms delay between staggered animations
  
  // SEO settings
  META_TITLE: 'Inovara - Smart Vending Machine Solutions',
  META_DESCRIPTION: 'Revolutionary smart vending machines with AI, IoT, and cashless payment solutions for modern businesses.',
  META_KEYWORDS: 'smart vending machines, AI vending, IoT solutions, cashless payments, enterprise vending'
} as const;

// Section order and visibility configuration
export const SECTION_ORDER = [
  'home',
  'about', 
  'products',
  'why-choose-us',
  'contact'
] as const;

// Performance optimization settings
export const PERFORMANCE_CONFIG = {
  // Preload critical sections
  PRELOAD_SECTIONS: ['home', 'about'] as const,
  
  // Defer non-critical sections
  DEFER_SECTIONS: ['products', 'why-choose-us', 'contact'] as const,
  
  // Intersection observer settings
  INTERSECTION_THRESHOLD: 0.1,
  INTERSECTION_ROOT_MARGIN: '50px'
} as const;
