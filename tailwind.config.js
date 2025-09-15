/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'inovara': {
          // Core Brand Colors - Authoritative Palette
          'primary': 'rgba(46, 0, 20, 1)',      // Deep Burgundy - Headings/CTAs/Key Icons
          'secondary': 'rgba(107, 144, 128, 1)', // Muted Green - Secondary Emphasis/Chips
          'accent': 'rgba(252, 208, 161, 1)',    // Warm Peach-Gold - Highlights/Stats/Focus
          'neutral': 'rgba(225, 233, 230, 1)',   // Soft Ivory - Backgrounds/Cards
          'sage': 'rgba(196, 211, 204, 1)',      // Sage Green - Subtle Panels/Dividers
          'blush': 'rgba(210, 204, 206, 1)',     // Blush - Very Light Separators
          
          // Opacity variants for consistent usage
          'primary-10': 'rgba(46, 0, 20, 0.1)',
          'primary-20': 'rgba(46, 0, 20, 0.2)',
          'primary-30': 'rgba(46, 0, 20, 0.3)',
          'primary-50': 'rgba(46, 0, 20, 0.5)',
          'primary-70': 'rgba(46, 0, 20, 0.7)',   // Body text on light backgrounds
          'primary-80': 'rgba(46, 0, 20, 0.8)',
          'secondary-10': 'rgba(107, 144, 128, 0.1)',
          'secondary-20': 'rgba(107, 144, 128, 0.2)',
          'secondary-30': 'rgba(107, 144, 128, 0.3)',
          'secondary-50': 'rgba(107, 144, 128, 0.5)',
          'secondary-80': 'rgba(107, 144, 128, 0.8)',
          'accent-10': 'rgba(252, 208, 161, 0.1)',
          'accent-20': 'rgba(252, 208, 161, 0.2)',
          'accent-30': 'rgba(252, 208, 161, 0.3)',
          'accent-50': 'rgba(252, 208, 161, 0.5)',
          'accent-80': 'rgba(252, 208, 161, 0.8)',
          'neutral-10': 'rgba(225, 233, 230, 0.1)',
          'neutral-20': 'rgba(225, 233, 230, 0.2)',
          'neutral-30': 'rgba(225, 233, 230, 0.3)',
          'neutral-50': 'rgba(225, 233, 230, 0.5)',
          'neutral-80': 'rgba(225, 233, 230, 0.8)',
          'sage-10': 'rgba(196, 211, 204, 0.1)',
          'sage-20': 'rgba(196, 211, 204, 0.2)',
          'sage-30': 'rgba(196, 211, 204, 0.3)',
          'sage-50': 'rgba(196, 211, 204, 0.5)',
          'sage-80': 'rgba(196, 211, 204, 0.8)',
          'blush-10': 'rgba(210, 204, 206, 0.1)',
          'blush-20': 'rgba(210, 204, 206, 0.2)',
          'blush-30': 'rgba(210, 204, 206, 0.3)',
          'blush-50': 'rgba(210, 204, 206, 0.5)',
          'blush-80': 'rgba(210, 204, 206, 0.8)',
          
          // State Management Colors
          'hover-primary': 'rgba(35, 0, 15, 1)',     // Darken Primary by ~8%
          'hover-secondary': 'rgba(85, 115, 102, 1)', // Darken Secondary by ~8%
          'hover-accent': 'rgba(240, 195, 140, 1)',   // Darken Accent by ~8%
          'disabled': 'rgba(46, 0, 20, 0.55)',        // 55% opacity for disabled
          'disabled-bg': 'rgba(225, 233, 230, 0.3)',  // Disabled background
          
          // Legacy color names for backward compatibility
          'burgundy': 'rgba(46, 0, 20, 1)',
          'green': 'rgba(107, 144, 128, 1)',
          'peach': 'rgba(252, 208, 161, 1)',
          'ivory': 'rgba(225, 233, 230, 1)',
        },
        'luxury': {
          'dark': '#0a0a0a',
          'charcoal': '#1a1a1a',
          'steel': '#2a2a2a',
          'silver': '#e5e5e5',
        },
        'enterprise': {
          'navy': '#0f1419',
          'slate': '#1e293b',
          'steel': '#334155',
          'platinum': '#f8fafc',
          'gold': '#f59e0b',
        }
      },
      fontFamily: {
        'display': ['Inter', 'system-ui', 'sans-serif'],
        'body': ['Inter', 'system-ui', 'sans-serif'],
        'enterprise': ['Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'enterprise-xs': '0.75rem',
        'enterprise-sm': '0.875rem',
        'enterprise-base': '1rem',
        'enterprise-lg': '1.125rem',
        'enterprise-xl': '1.25rem',
        'enterprise-2xl': '1.5rem',
        'enterprise-3xl': '1.875rem',
        'enterprise-4xl': '2.25rem',
        'enterprise-5xl': '3rem',
        'enterprise-6xl': '3.75rem',
        'enterprise-7xl': '4.5rem',
        'enterprise-8xl': '6rem',
        'enterprise-9xl': '8rem',
      },
      animation: {
        'fadeIn': 'fadeIn 0.6s ease-out forwards',
        'fadeInUp': 'fadeInUp 0.8s ease-out forwards',
        'slideInLeft': 'slideInLeft 0.8s ease-out forwards',
        'slideInRight': 'slideInRight 0.8s ease-out forwards',
        'scaleIn': 'scaleIn 0.6s ease-out forwards',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'float': 'float 6s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(46, 0, 20, 0.3)' },
          '100%': { boxShadow: '0 0 40px rgba(107, 144, 128, 0.5)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      backgroundImage: {
        // Primary brand gradients
        'inovara-primary': 'linear-gradient(135deg, rgba(46, 0, 20, 1) 0%, rgba(46, 0, 20, 0.9) 50%, rgba(46, 0, 20, 0.8) 100%)',
        'inovara-secondary': 'linear-gradient(135deg, rgba(107, 144, 128, 1) 0%, rgba(107, 144, 128, 0.9) 50%, rgba(107, 144, 128, 0.8) 100%)',
        'inovara-accent': 'linear-gradient(135deg, rgba(252, 208, 161, 1) 0%, rgba(252, 208, 161, 0.9) 50%, rgba(252, 208, 161, 0.8) 100%)',
        
        // Unified Background System - Two Wash Styles
        'wash-a': 'linear-gradient(to bottom, transparent, rgb(225 233 230 / 0.2))',
        'wash-b-hero': 'linear-gradient(to bottom, rgba(252,208,161,0.12), transparent, rgba(107,144,128,0.12))',
        'wash-b-footer': 'linear-gradient(to top, rgba(107,144,128,0.10), transparent, rgba(252,208,161,0.10))',
        
        // Legacy section backgrounds (keeping for compatibility)
        'hero-bg': 'linear-gradient(135deg, rgba(46, 0, 20, 1) 0%, rgba(107, 144, 128, 0.9) 25%, rgba(196, 211, 204, 0.8) 50%, rgba(252, 208, 161, 0.7) 75%, rgba(225, 233, 230, 0.9) 100%)',
        'section-wash': 'radial-gradient(1200px 600px at 50% -10%, rgba(252, 208, 161, 0.1), transparent), radial-gradient(1000px 500px at 80% 10%, rgba(107, 144, 128, 0.1), transparent), linear-gradient(135deg, rgba(225, 233, 230, 1) 0%, rgba(196, 211, 204, 0.2) 100%)',
        'section-light': 'radial-gradient(1200px 600px at 50% -10%, rgba(252, 208, 161, 0.1), transparent), radial-gradient(1000px 500px at 80% 10%, rgba(107, 144, 128, 0.1), transparent), linear-gradient(135deg, rgba(225, 233, 230, 0.95) 0%, rgba(196, 211, 204, 0.5) 30%, rgba(210, 204, 206, 0.3) 50%, rgba(252, 208, 161, 0.1) 100%)',
        'section-dark': 'radial-gradient(1200px 600px at 50% -10%, rgba(252, 208, 161, 0.08), transparent), radial-gradient(1000px 500px at 80% 10%, rgba(107, 144, 128, 0.08), transparent), linear-gradient(135deg, #0a0a0a 0%, rgba(46, 0, 20, 0.05) 30%, #1a1a1a 50%, rgba(107, 144, 128, 0.02) 70%, #2a2a2a 100%)',
        'card-bg': 'linear-gradient(135deg, rgba(26, 26, 26, 0.8) 0%, rgba(46, 0, 20, 0.1) 30%, rgba(42, 42, 42, 0.6) 100%)',
        
        // Accent gradients
        'gradient-primary': 'linear-gradient(135deg, rgba(46, 0, 20, 1) 0%, rgba(107, 144, 128, 1) 100%)',
        'gradient-secondary': 'linear-gradient(135deg, rgba(107, 144, 128, 1) 0%, rgba(252, 208, 161, 1) 100%)',
        'gradient-accent': 'linear-gradient(135deg, rgba(252, 208, 161, 1) 0%, rgba(46, 0, 20, 1) 100%)',
        'gradient-sage': 'linear-gradient(135deg, rgba(196, 211, 204, 1) 0%, rgba(107, 144, 128, 1) 100%)',
        'gradient-blush': 'linear-gradient(135deg, rgba(210, 204, 206, 1) 0%, rgba(252, 208, 161, 1) 100%)',
        
        // Text gradients
        'text-gradient': 'linear-gradient(135deg, rgba(252, 208, 161, 1) 0%, rgba(196, 211, 204, 1) 30%, rgba(107, 144, 128, 1) 60%, rgba(46, 0, 20, 1) 100%)',
        'text-gold': 'linear-gradient(135deg, #f59e0b 0%, rgba(252, 208, 161, 1) 100%)',
      },
      boxShadow: {
        'enterprise': '0 10px 25px rgba(0, 0, 0, 0.1), 0 4px 6px rgba(0, 0, 0, 0.05)',
        'enterprise-lg': '0 20px 40px rgba(0, 0, 0, 0.15), 0 8px 12px rgba(0, 0, 0, 0.1)',
        'enterprise-xl': '0 25px 50px rgba(0, 0, 0, 0.2), 0 12px 24px rgba(0, 0, 0, 0.15)',
      },
    },
  },
  plugins: [],
};
