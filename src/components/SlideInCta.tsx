import React, { useEffect, useState } from 'react';

interface SlideInCtaProps {
  onPrimary: () => void;
  onSecondary: () => void;
}

const SlideInCta: React.FC<SlideInCtaProps> = ({ onPrimary, onSecondary }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const scrolled = window.scrollY;
      const threshold = window.innerHeight * 0.6;
      setVisible(scrolled > threshold);
    };
    window.addEventListener('scroll', onScroll);
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div
      className={`fixed bottom-6 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-3xl transition-all duration-300 z-40 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
      }`}
      role="region"
      aria-label="Get started call to action"
    >
      <div className="bg-white border border-neutral-200 shadow-xl rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="text-center sm:text-left">
          <p className="text-heading-md text-primary">Ready to grow with Inovara?</p>
          <p className="text-body-sm text-text-muted">Get a custom quote or start selling today.</p>
        </div>
        <div className="flex gap-3">
          <button onClick={onSecondary} className="px-4 py-2 rounded-lg border border-neutral-300 text-text-primary hover:bg-surface-light transition-colors">
            Request Quote
          </button>
          <button onClick={onPrimary} className="px-4 py-2 rounded-lg bg-primary text-white hover:bg-primary/90 transition-colors">
            Start Selling
          </button>
        </div>
      </div>
    </div>
  );
};

export default SlideInCta;

