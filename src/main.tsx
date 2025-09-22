import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import './index.css';

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

// Initialize analytics
const initializeAnalytics = () => {
  // Defer analytics initialization
  if (typeof window !== 'undefined') {
    setTimeout(() => {
      try {
        if (typeof gtag !== 'undefined') {
          gtag('event', 'page_view', {
            page_title: 'Inovara - Smart Vending Machine Solutions',
            page_location: window.location.href,
            business_type: 'vending_solutions',
            industry: 'retail_technology'
          });
        }
      } catch {
        // Silent fail for analytics initialization
      }
    }, 1000);
  }
};

// Run analytics initialization
initializeAnalytics();
