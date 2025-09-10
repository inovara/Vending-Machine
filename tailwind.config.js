/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'inovara': {
          'primary': 'rgba(46, 0, 20, 1)',      // Deep Burgundy - Primary brand color
          'secondary': 'rgba(107, 144, 128, 1)', // Muted Green - Secondary brand color
          'accent': 'rgba(252, 208, 161, 1)',    // Warm Peach-Gold - Accent color
          'neutral': 'rgba(225, 233, 230, 1)',   // Soft Ivory - Neutral color
          'sage': 'rgba(196, 211, 204, 1)',      // Sage Green - Additional neutral
          'blush': 'rgba(210, 204, 206, 1)',     // Blush - Additional accent
          // Legacy color names for backward compatibility
          'burgundy': 'rgba(46, 0, 20, 1)',
          'green': 'rgba(107, 144, 128, 1)',
          'peach': 'rgba(252, 208, 161, 1)',
          'ivory': 'rgba(225, 233, 230, 1)',
          // Opacity variants for consistent usage
          'primary-10': 'rgba(46, 0, 20, 0.1)',
          'primary-20': 'rgba(46, 0, 20, 0.2)',
          'primary-30': 'rgba(46, 0, 20, 0.3)',
          'primary-50': 'rgba(46, 0, 20, 0.5)',
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
        'fadeIn': 'fadeIn 1s ease-out forwards',
        'fadeInUp': 'fadeInUp 1s ease-out forwards',
        'slideInLeft': 'slideInLeft 1s ease-out forwards',
        'slideInRight': 'slideInRight 1s ease-out forwards',
        'scaleIn': 'scaleIn 0.8s ease-out forwards',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'widthExpand': 'widthExpand 1.2s ease-out forwards',
        'shimmer': 'shimmer 2s linear infinite',
        'gradientShift': 'gradientShift 3s ease-in-out infinite',
        'revolutionaryShift': 'revolutionaryShift 4s ease-in-out infinite',
        'innovationPulse': 'innovationPulse 2s ease-in-out infinite',
        'futureRotate': 'futureRotate 8s linear infinite',
        'floatAdvanced': 'floatAdvanced 8s ease-in-out infinite',
        'pulseAdvanced': 'pulseAdvanced 3s ease-in-out infinite',
        'enterprise-float': 'enterpriseFloat 8s ease-in-out infinite',
        'enterprise-pulse': 'enterprisePulse 3s ease-in-out infinite',
        'enterprise-shimmer': 'enterpriseShimmer 3s infinite',
        'enterprise-glow': 'enterpriseGlow 4s ease-in-out infinite',
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
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(46, 0, 20, 0.5)' },
          '100%': { boxShadow: '0 0 40px rgba(107, 144, 128, 0.8)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        widthExpand: {
          '0%': { width: '0' },
          '100%': { width: '6rem' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        gradientShift: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        revolutionaryShift: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        innovationPulse: {
          '0%, 100%': { transform: 'scale(1)', opacity: '1' },
          '50%': { transform: 'scale(1.05)', opacity: '0.8' },
        },
        futureRotate: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        floatAdvanced: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '25%': { transform: 'translateY(-10px) rotate(1deg)' },
          '50%': { transform: 'translateY(-20px) rotate(0deg)' },
          '75%': { transform: 'translateY(-10px) rotate(-1deg)' },
        },
        pulseAdvanced: {
          '0%, 100%': { transform: 'scale(1)', opacity: '1' },
          '50%': { transform: 'scale(1.02)', opacity: '0.9' },
        },
        enterpriseFloat: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '25%': { transform: 'translateY(-15px) rotate(0.5deg)' },
          '50%': { transform: 'translateY(-25px) rotate(0deg)' },
          '75%': { transform: 'translateY(-15px) rotate(-0.5deg)' },
        },
        enterprisePulse: {
          '0%, 100%': { transform: 'scale(1)', opacity: '1' },
          '50%': { transform: 'scale(1.08)', opacity: '0.9' },
        },
        enterpriseShimmer: {
          '0%': { backgroundPosition: '-300% 0' },
          '100%': { backgroundPosition: '300% 0' },
        },
        enterpriseGlow: {
          '0%': { boxShadow: '0 0 30px rgba(46, 0, 20, 0.4)' },
          '50%': { boxShadow: '0 0 60px rgba(107, 144, 128, 0.3)' },
          '100%': { boxShadow: '0 0 30px rgba(46, 0, 20, 0.4)' },
        },
      },
      backgroundImage: {
        // Primary brand gradients
        'inovara-primary': 'linear-gradient(135deg, rgba(46, 0, 20, 1) 0%, rgba(46, 0, 20, 0.9) 50%, rgba(46, 0, 20, 0.8) 100%)',
        'inovara-secondary': 'linear-gradient(135deg, rgba(107, 144, 128, 1) 0%, rgba(107, 144, 128, 0.9) 50%, rgba(107, 144, 128, 0.8) 100%)',
        'inovara-accent': 'linear-gradient(135deg, rgba(252, 208, 161, 1) 0%, rgba(252, 208, 161, 0.9) 50%, rgba(252, 208, 161, 0.8) 100%)',
        
        // Unified section backgrounds with enhanced harmony
        'hero-bg': 'linear-gradient(135deg, rgba(46, 0, 20, 1) 0%, rgba(107, 144, 128, 0.9) 25%, rgba(196, 211, 204, 0.8) 50%, rgba(252, 208, 161, 0.7) 75%, rgba(225, 233, 230, 0.9) 100%)',
        'section-dark': 'linear-gradient(135deg, #0a0a0a 0%, rgba(46, 0, 20, 0.1) 30%, #1a1a1a 50%, rgba(107, 144, 128, 0.05) 70%, #2a2a2a 100%)',
        'section-light': 'linear-gradient(135deg, rgba(225, 233, 230, 0.9) 0%, rgba(196, 211, 204, 0.7) 30%, rgba(210, 204, 206, 0.5) 50%, rgba(252, 208, 161, 0.2) 100%)',
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
