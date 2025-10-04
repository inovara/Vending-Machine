import React, { useState, useEffect, useRef, memo, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import logo from '../../logo.svg';
import { smoothScrollTo } from '../utils/smoothScroll';
import { useTranslation } from '../contexts/TranslationContext';
import LanguageSwitcher from './LanguageSwitcher';

interface HeaderProps {
  onQuoteClick: (productId?: number) => void;
}

const Header: React.FC<HeaderProps> = memo(({ onQuoteClick }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { t, isRTL } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  const navigationItems = [
    { name: t('nav.home'), href: '#home', type: 'scroll' },
    { name: t('nav.products'), href: '/products', type: 'page' },
    { name: t('nav.about'), href: '/about', type: 'page' },
    { name: t('nav.industries'), href: '/industries', type: 'page' },
    { name: t('nav.contact'), href: '/contact', type: 'page' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleNavClick = useCallback((href: string, type: string) => {
    setIsMenuOpen(false);

    if (type === 'page') {
      // Navigate to different page
      navigate(href);
    } else if (type === 'scroll') {
      // If we're on homepage, scroll to section
      if (location.pathname === '/') {
        smoothScrollTo(href, 80);
      } else {
        // If we're on different page, navigate to homepage and scroll
        navigate('/');
        setTimeout(() => {
          smoothScrollTo(href, 80);
        }, 100);
      }
    }
  }, [navigate, location.pathname]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md border-b border-inovara-primary/20 shadow-lg'
          : 'bg-transparent'
      } ${isRTL ? 'rtl' : 'ltr'}`}
    >
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`flex items-center justify-between h-20 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
          {/* Logo */}
          <div className="flex items-center flex-shrink-0">
            <button
              onClick={() => navigate('/')}
              className="relative group flex items-center focus:outline-none focus:ring-2 focus:ring-inovara-accent/30 rounded-lg p-2"
              aria-label="Navigate to homepage"
            >
              <div className="relative">
                <img
                  src={logo}
                  alt="Inovara Logo"
                  className="h-16 w-auto transition-all duration-300 group-hover:scale-105"
                />
              </div>
            </button>
          </div>

          {/* Desktop Navigation */}
          <nav className={`hidden lg:flex items-center ${isRTL ? 'space-x-reverse space-x-6' : 'space-x-6'}`}>
            {(isRTL ? [...navigationItems].reverse() : navigationItems).map((item) => (
              <button
                key={item.name}
                onClick={() => handleNavClick(item.href, item.type)}
                className={`relative px-4 py-2 text-sm font-semibold transition-all duration-300 rounded-lg group focus:outline-none focus:ring-2 focus:ring-inovara-accent/30 ${
                  isScrolled
                    ? 'text-inovara-primary hover:text-inovara-accent hover:bg-inovara-accent/10'
                    : 'text-inovara-primary/90 hover:text-inovara-accent hover:bg-white/20'
                }`}
              >
                <span className="relative z-10">{item.name}</span>
                
                {/* Hover indicator */}
                <div className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-inovara-accent transition-all duration-300 group-hover:w-3/4 rounded-full`}></div>
              </button>
            ))}
          </nav>

          {/* Desktop CTA Buttons */}
          <div className={`hidden lg:flex items-center ${isRTL ? 'space-x-reverse space-x-4' : 'space-x-4'}`}>
            <LanguageSwitcher />

            <button
              onClick={() => onQuoteClick()}
              className="group relative px-6 py-3 bg-gradient-to-r from-inovara-primary to-inovara-secondary text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-inovara-accent/30 overflow-hidden"
            >
              {/* Shimmer Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out"></div>

              {/* Content */}
              <span className={`relative flex items-center z-10 ${isRTL ? 'flex-row-reverse' : 'flex-row'} gap-2`}>
                <span className="text-sm font-semibold">
                  {t('nav.get-quote')}
                </span>
              </span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`lg:hidden p-2 rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-inovara-accent/30 ${
              isScrolled 
                ? 'text-inovara-primary hover:text-inovara-accent hover:bg-inovara-accent/10' 
                : 'text-inovara-primary/90 hover:text-inovara-accent hover:bg-white/20'
            }`}
            aria-label="Toggle mobile menu"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div
            ref={mobileMenuRef}
            className={`lg:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-md border-t border-inovara-primary/20 shadow-lg z-40 ${isRTL ? 'text-right' : 'text-left'}`}
          >
            <nav className="px-6 py-6 space-y-2">
              {(isRTL ? [...navigationItems] : navigationItems).map((item) => (
                <button
                  key={item.name}
                  onClick={() => handleNavClick(item.href, item.type)}
                  className={`w-full text-inovara-primary hover:text-inovara-accent transition-colors duration-300 font-medium py-3 px-4 rounded-lg hover:bg-inovara-accent/10 focus:outline-none focus:ring-2 focus:ring-inovara-accent/30 ${isRTL ? 'text-right' : 'text-left'}`}
                >
                  {item.name}
                </button>
              ))}

              {/* Mobile CTA Section */}
              <div className="pt-6 border-t border-inovara-primary/20 space-y-4">
                <div className={`flex items-center justify-center`}>
                  <LanguageSwitcher onLanguageChange={() => setIsMenuOpen(false)} />
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsMenuOpen(false);
                    // Small delay to allow menu to close before opening modal
                    setTimeout(() => {
                      onQuoteClick();
                    }, 100);
                  }}
                  className="group relative w-full px-6 py-3 bg-gradient-to-r from-inovara-primary to-inovara-secondary text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-inovara-accent/30 overflow-hidden"
                >
                  {/* Shimmer Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out"></div>

                  {/* Content */}
                  <span className={`relative flex items-center justify-center z-10 ${isRTL ? 'flex-row-reverse' : 'flex-row'} gap-2`}>
                    <span className="text-sm font-semibold">
                      {t('nav.get-quote')}
                    </span>
                  </span>
                </button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
});

Header.displayName = 'Header';

export default Header;