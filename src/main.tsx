import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import './index.css';
import { performanceUtils } from './utils/performance';

// Production optimizations

// Error boundary for better error handling
class ErrorBoundary extends React.Component {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_error: any) {
    return { hasError: true };
  }

  componentDidCatch(_error: any, errorInfo: any) {
    // Log error in production (remove in production if needed)
    console.error('Error caught by boundary:', _error, errorInfo);
  }

  render() {
    if ((this.state as any).hasError) {
      return (
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          height: '100vh',
          flexDirection: 'column',
          fontFamily: 'Inter, sans-serif'
        }}>
          <h1>Something went wrong.</h1>
          <p>Please refresh the page or contact support.</p>
        </div>
      );
    }

    return (this.props as any).children;
  }
}

// Initialize the app
const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('Root element not found');
}

const root = createRoot(rootElement);

// Render with error boundary
root.render(
  <StrictMode>
    <ErrorBoundary>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ErrorBoundary>
  </StrictMode>
);

// Service Worker registration for PWA capabilities
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then((registration) => {
        console.log('SW registered: ', registration);
      })
      .catch((registrationError) => {
        console.log('SW registration failed: ', registrationError);
      });
  });
}

// Initialize performance optimizations
const initializePerformanceOptimizations = () => {
  // Preload critical resources
  performanceUtils.preloadResource(
    'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap',
    'style'
  );
  
  performanceUtils.preloadResource('/inovaralo.svg', 'image', 'image/svg+xml');

  // Initialize lazy loading
  performanceUtils.lazyLoadImages();

  // Defer non-critical scripts
  performanceUtils.requestIdleCallback(() => {
    // Initialize analytics after critical rendering
    if (typeof gtag !== 'undefined') {
      gtag('event', 'page_view', {
        page_title: 'Inovara - Smart Vending Machine Solutions',
        page_location: window.location.href
      });
    }
  });
};

// Run performance optimizations
initializePerformanceOptimizations();
