import React from 'react';

interface SectionSkeletonProps {
  height?: string;
  className?: string;
}

export const SectionSkeleton: React.FC<SectionSkeletonProps> = ({ 
  height = 'h-64', 
  className = '' 
}) => (
  <div className={`w-full ${height} animate-pulse bg-inovara-neutral/10 rounded-2xl ${className}`} />
);

export const PageSkeleton: React.FC = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="w-full max-w-7xl mx-auto px-6">
      <div className="w-full h-64 animate-pulse bg-inovara-neutral/10 rounded-2xl" />
    </div>
  </div>
);

export const HomePageSkeleton: React.FC = () => (
  <main className="min-h-screen">
    <div className="px-6 py-12 max-w-7xl mx-auto">
      <SectionSkeleton height="h-screen" className="min-h-screen" />
    </div>
  </main>
);
