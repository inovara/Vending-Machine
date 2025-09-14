// Home page exports
export { default as HomePage } from '../HomePage';
export { HOME_SECTIONS } from './sections';
export { HomePageSection } from './HomePageSection';
export { SectionSkeleton, PageSkeleton, HomePageSkeleton } from './loading';
export { useHomePage } from './useHomePage';
export { HOME_PAGE_CONFIG, SECTION_ORDER, PERFORMANCE_CONFIG } from './config';

// Utility functions
export * from './utils';

// Re-export types
export type { SectionConfig } from './sections';
