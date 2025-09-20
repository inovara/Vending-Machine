import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import './index.css';
import { performanceUtils } from './utils/performance';

// Declare gtag for Google Analytics
declare global {
  function gtag(command: string, targetId: string, config?: Record<string, unknown>): void;
}

// Production optimizations

// Error boundary for better error handling
interface ErrorBoundaryState {
  hasError: boolean;
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(_error: Error, errorInfo: React.ErrorInfo) {
    // Silent error handling for production
  }

  render() {
    if (this.state.hasError) {
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

    return this.props.children;
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
      .catch(() => {
        // Silent fail for service worker registration
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
  
  performanceUtils.preloadResource('/inovara.svg', 'image', 'image/svg+xml');

  // Initialize lazy loading
  performanceUtils.lazyLoadImages();

  // Defer non-critical scripts with error handling
  performanceUtils.requestIdleCallback(() => {
    // Initialize analytics after critical rendering with error handling
    try {
      if (typeof gtag !== 'undefined' && typeof window !== 'undefined') {
        gtag('event', 'page_view', {
          page_title: 'Inovara - Smart Vending Machine Solutions',
          page_location: window.location.href,
          business_type: 'vending_solutions',
          industry: 'retail_technology'
        });
      }
    } catch (error) {
      // Silent fail for analytics initialization
    }
  });
};

// Run performance optimizations
initializePerformanceOptimizations();
