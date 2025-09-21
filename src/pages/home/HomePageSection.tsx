import React, { Suspense } from 'react';
import { SectionConfig } from './sections';

interface HomePageSectionProps {
  section: SectionConfig;
  onQuoteClick?: () => void;
  onVisibilityChange?: (sectionId: string, isVisible: boolean) => void;
}

export const HomePageSection: React.FC<HomePageSectionProps> = ({ 
  section, 
  onQuoteClick
}) => {
  const { 
    id, 
    component: Component, 
    fallbackHeight, 
    needsQuoteClick, 
    className = '', 
    ariaLabel 
  } = section;

  return (
    <section 
      id={id}
      className={`w-full ${className}`}
      role="region"
      aria-label={ariaLabel || `${id.replace('-', ' ')} section`}
    >
      <Suspense fallback={
        <div className="px-6 py-12 max-w-7xl mx-auto">
          <div className={`w-full ${fallbackHeight || 'h-64'} animate-pulse bg-inovara-neutral/10 rounded-2xl`} />
        </div>
      }>
        {needsQuoteClick && onQuoteClick ? (
          <Component onQuoteClick={onQuoteClick} />
        ) : (
          <Component />
        )}
      </Suspense>
    </section>
  );
};
