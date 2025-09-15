import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Small delay to ensure the new page has rendered
    const timer = setTimeout(() => {
      // Check if the browser supports smooth scrolling
      if ('scrollBehavior' in document.documentElement.style) {
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: 'smooth'
        });
      } else {
        // Fallback for browsers that don't support smooth scrolling
        window.scrollTo(0, 0);
      }
    }, 100);

    // Cleanup timer on unmount or pathname change
    return () => clearTimeout(timer);
  }, [pathname]);

  return null;
};

export default ScrollToTop;
