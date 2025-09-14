import React from 'react';
import { HOME_SECTIONS } from './home/sections';
import { HomePageSection } from './home/HomePageSection';
import { useHomePage } from './home/useHomePage';

interface HomePageProps {
  onQuoteClick: () => void;
}

const HomePage: React.FC<HomePageProps> = ({ onQuoteClick }) => {
  const { 
    isLoading, 
    handleQuoteClick, 
    handleSectionVisibility,
    isRTL 
  } = useHomePage({ onQuoteClick });

  // Show loading state if needed
  if (isLoading) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="w-full max-w-7xl mx-auto px-6">
          <div className="w-full h-64 animate-pulse bg-inovara-neutral/10 rounded-2xl" />
        </div>
      </main>
    );
  }

  return (
    <main 
      className={`min-h-screen ${isRTL ? 'rtl' : 'ltr'}`}
      role="main"
      aria-label="Inovara smart vending machine solutions homepage"
    >
      {HOME_SECTIONS.map((section) => (
        <HomePageSection
          key={section.id}
          section={section}
          onQuoteClick={handleQuoteClick}
          onVisibilityChange={handleSectionVisibility}
        />
      ))}
    </main>
  );
};

export default HomePage;
