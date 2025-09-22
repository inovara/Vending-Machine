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
  window.addEventListener('load', async () => {
    try {
      // Unregister any existing service workers first
      const registrations = await navigator.serviceWorker.getRegistrations();
      for (const registration of registrations) {
        await registration.unregister();
        console.log('Unregistered old service worker');
      }
      
      // Register new service worker
      const registration = await navigator.serviceWorker.register('/sw.js?v=2.0.0');
      console.log('Service Worker registered successfully:', registration);
      
      // Force update
      if (registration.waiting) {
        registration.waiting.postMessage({ type: 'SKIP_WAITING' });
      }
      
      // Listen for updates
      registration.addEventListener('updatefound', () => {
        const newWorker = registration.installing;
        if (newWorker) {
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              // New service worker is available
              window.location.reload();
            }
          });
        }
      });
      
    } catch (error) {
      console.error('Service Worker registration failed:', error);
    }
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
