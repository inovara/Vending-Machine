// Performance monitoring utilities
export const performanceUtils = {
  // Measure Core Web Vitals
  measureWebVitals: () => {
    if (typeof window === 'undefined') return;

    // Largest Contentful Paint (LCP)
    new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1];
      console.log('LCP:', lastEntry.startTime);
    }).observe({ entryTypes: ['largest-contentful-paint'] });

    // First Input Delay (FID)
    new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry) => {
        console.log('FID:', entry.processingStart - entry.startTime);
      });
    }).observe({ entryTypes: ['first-input'] });

    // Cumulative Layout Shift (CLS)
    let clsValue = 0;
    new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry) => {
        if (!(entry as any).hadRecentInput) {
          clsValue += (entry as any).value;
        }
      });
      console.log('CLS:', clsValue);
    }).observe({ entryTypes: ['layout-shift'] });
  },

  // Preload critical resources
  preloadResource: (href: string, as: string, type?: string) => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = href;
    link.as = as;
    if (type) link.type = type;
    document.head.appendChild(link);
  },

  // Lazy load images with intersection observer
  lazyLoadImages: () => {
    const images = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target as HTMLImageElement;
            img.src = img.dataset.src || '';
            img.classList.remove('lazy');
            observer.unobserve(img);
          }
        });
      }, {
        rootMargin: '50px 0px',
        threshold: 0.01
      });

      images.forEach(img => imageObserver.observe(img));
    } else {
      // Fallback for older browsers
      images.forEach((img: Element) => {
        const imgElement = img as HTMLImageElement;
        imgElement.src = imgElement.dataset.src || '';
      });
    }
  },

  // Optimize image loading
  optimizeImage: (src: string, alt: string, className?: string): string => {
    // Return optimized image HTML with lazy loading
    return `
      <img 
        src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1 1'%3E%3C/svg%3E"
        data-src="${src}"
        alt="${alt}"
        class="lazy ${className || ''}"
        loading="lazy"
        decoding="async"
      />
    `;
  },

  // Request idle callback polyfill
  requestIdleCallback: (callback: () => void, timeout?: number) => {
    if ('requestIdleCallback' in window) {
      return window.requestIdleCallback(callback, { timeout });
    } else {
      // Fallback for browsers that don't support requestIdleCallback
      return setTimeout(callback, 1);
    }
  },

  // Defer non-critical scripts
  deferScript: (src: string, callback?: () => void) => {
    const script = document.createElement('script');
    script.src = src;
    script.async = true;
    script.defer = true;
    if (callback) {
      script.onload = callback;
    }
    document.head.appendChild(script);
  }
};

// Initialize performance monitoring for production
if (typeof window !== 'undefined') {
  performanceUtils.measureWebVitals();
}
