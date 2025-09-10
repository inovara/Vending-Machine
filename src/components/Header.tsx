import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, Calculator } from 'lucide-react';
import logo from '../../inovaralo.svg';
import { smoothScrollTo } from '../utils/smoothScroll';
import { useTranslation } from '../contexts/TranslationContext';
import LanguageSwitcher from './LanguageSwitcher';

interface HeaderProps {
  onQuoteClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onQuoteClick }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isMobileDropdownOpen, setIsMobileDropdownOpen] = useState<string | null>(null);
  const { t, isRTL } = useTranslation();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  const navigationItems = [
    { name: t('nav.home'), href: '#home' },
    { name: t('nav.about'), href: '#about' },
    { 
      name: t('nav.products'), 
      href: '#products',
      dropdown: [
        { name: t('products.smart.title'), href: '#products', description: t('products.smart.subtitle') },
        { name: t('products.premium.title'), href: '#products', description: t('products.premium.subtitle') },
        { name: t('products.enterprise.title'), href: '#products', description: t('products.enterprise.subtitle') },
        { name: t('products.custom.title'), href: '#products', description: t('products.custom.subtitle') }
      ]
    },
    { name: t('nav.industries'), href: '#industries' },
    { name: t('nav.contact'), href: '#contact' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
        setIsMobileDropdownOpen(null);
      }
    };

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleNavClick = (href: string) => {
    setIsMenuOpen(false);
    setActiveDropdown(null);
    setIsMobileDropdownOpen(null);
    smoothScrollTo(href, 80);
  };

  const toggleMobileDropdown = (itemName: string) => {
    setIsMobileDropdownOpen(isMobileDropdownOpen === itemName ? null : itemName);
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-gradient-to-r from-luxury-charcoal/98 via-luxury-charcoal/95 to-luxury-charcoal/98 backdrop-blur-xl border-b border-inovara-accent/30 shadow-2xl shadow-inovara-accent/10' 
          : 'bg-transparent'
      } ${isRTL ? 'rtl' : 'ltr'}`}
    >
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`flex items-center justify-between h-16 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
          {/* Logo */}
          <div className="flex items-center flex-shrink-0">
            <button 
              onClick={() => handleNavClick('#home')}
              className="relative group flex items-center"
            >
              <div className="relative">
                <img 
                  src={logo} 
                  alt="Inovara Logo"
                  className={`h-10 w-auto transition-all duration-500 group-hover:scale-110 ${
                    isScrolled 
                      ? 'filter brightness-0 invert drop-shadow-lg' 
                      : 'filter brightness-0 invert drop-shadow-md'
                  }`}
                />
                <div className={`absolute -top-1 ${isRTL ? '-left-1' : '-right-1'} w-2 h-2 rounded-full transition-all duration-500 ${
                  isScrolled 
                    ? 'bg-inovara-accent animate-pulse shadow-lg shadow-inovara-accent/50' 
                    : 'bg-inovara-accent animate-pulse'
                }`}></div>
                <div className={`absolute inset-0 rounded-lg transition-all duration-500 ${
                  isScrolled 
                    ? 'bg-gradient-to-r from-inovara-accent/20 to-inovara-secondary/20 opacity-0 group-hover:opacity-100' 
                    : 'bg-gradient-to-r from-inovara-accent/10 to-inovara-secondary/10 opacity-0 group-hover:opacity-100'
                }`}></div>
              </div>
            </button>
          </div>

          {/* Desktop Navigation */}
          <nav className={`hidden lg:flex items-center ${isRTL ? 'space-x-reverse space-x-8' : 'space-x-8'}`} ref={dropdownRef}>
            {(isRTL ? [...navigationItems].reverse() : navigationItems).map((item) => (
              <div key={item.name} className="relative group">
                <button
                  onClick={() => item.dropdown ? setActiveDropdown(activeDropdown === item.name ? null : item.name) : handleNavClick(item.href)}
                  className={`relative px-4 py-2 transition-all duration-300 font-medium text-base group ${
                    isScrolled 
                      ? 'text-white/90 hover:text-inovara-accent' 
                      : 'text-white/90 hover:text-inovara-accent'
                  }`}
                >
                  <span className={`relative z-10 flex items-center ${isRTL ? 'space-x-reverse space-x-2 flex-row-reverse' : 'space-x-2'}`}>
                    <span>{item.name}</span>
                    {item.dropdown && <ChevronDown className="h-4 w-4 transition-transform duration-300 group-hover:rotate-180" />}
                  </span>
                  
                  {/* Active Indicator */}
                  <div className={`absolute bottom-0 w-0 h-0.5 transition-all duration-300 ${
                    isScrolled ? 'bg-inovara-accent' : 'bg-white'
                  } group-hover:w-full ${isRTL ? 'right-0' : 'left-0'}`}></div>
                </button>
                
                {/* Simplified Dropdown Menu */}
                {item.dropdown && activeDropdown === item.name && (
                  <div className={`absolute top-full mt-2 w-72 bg-gradient-to-br from-luxury-charcoal/95 to-luxury-charcoal/98 backdrop-blur-xl border border-inovara-accent/30 rounded-xl shadow-2xl shadow-inovara-accent/10 overflow-hidden z-50 ${isRTL ? 'right-0' : 'left-0'}`}>
                    <div className="p-2">
                      {item.dropdown.map((dropdownItem, index) => (
                        <button
                          key={index}
                          onClick={() => handleNavClick(dropdownItem.href)}
                          className={`w-full px-4 py-3 text-white/90 hover:text-inovara-accent hover:bg-inovara-accent/10 rounded-lg transition-all duration-300 group ${isRTL ? 'text-right' : 'text-left'}`}
                        >
                          <div className="font-semibold text-sm mb-1">{dropdownItem.name}</div>
                          <div className="text-xs text-white/60 leading-relaxed">
                            {dropdownItem.description}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Desktop CTA Buttons */}
          <div className={`hidden lg:flex items-center ${isRTL ? 'space-x-reverse space-x-6' : 'space-x-6'}`}>
            <LanguageSwitcher />
            
            <button 
              onClick={onQuoteClick}
              className="group relative px-4 py-2 bg-gradient-to-r from-inovara-accent via-inovara-accent to-inovara-secondary text-white font-bold rounded-lg hover:shadow-xl hover:shadow-inovara-accent/40 transition-all duration-500 transform hover:scale-105 hover:-translate-y-0.5 overflow-hidden border border-inovara-accent/20"
            >
              {/* Animated Background */}
              <div className="absolute inset-0 bg-gradient-to-r from-inovara-accent/30 to-inovara-secondary/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              {/* Shimmer Effect */}
              <div className="absolute inset-0 -top-1 -left-1 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"></div>
              
              {/* Pulsing Ring */}
              <div className="absolute inset-0 rounded-lg border-2 border-inovara-accent/50 opacity-0 group-hover:opacity-100 group-hover:animate-ping"></div>
              
              {/* Content */}
              <span className={`relative flex items-center z-10 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
                <Calculator className={`w-4 h-4 ${isRTL ? 'ml-2' : 'mr-2'} group-hover:rotate-12 transition-transform duration-300`} />
                <span className="text-sm font-bold tracking-wide">
                  {t('nav.get-quote')}
                </span>
                <div className={`w-1.5 h-1.5 rounded-full bg-white/80 ${isRTL ? 'mr-1.5' : 'ml-1.5'} group-hover:animate-pulse`}></div>
              </span>
              
              {/* Ripple Effect */}
              <div className="absolute inset-0 rounded-lg overflow-hidden">
                <div className="absolute inset-0 bg-white/20 scale-0 group-active:scale-100 transition-transform duration-300 ease-out"></div>
              </div>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`lg:hidden p-2 transition-colors duration-300 relative ${
              isScrolled ? 'text-white hover:text-inovara-accent' : 'text-white hover:text-inovara-accent'
            }`}
          >
            <div className="w-6 h-6 flex flex-col justify-center items-center">
              <span className={`block w-6 h-0.5 bg-current transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-1' : ''}`}></span>
              <span className={`block w-6 h-0.5 bg-current mt-1 transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></span>
              <span className={`block w-6 h-0.5 bg-current mt-1 transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-1' : ''}`}></span>
            </div>
          </button>
        </div>

        {/* Simplified Mobile Menu */}
        {isMenuOpen && (
          <div 
            ref={mobileMenuRef}
            className={`lg:hidden absolute top-full left-0 right-0 bg-gradient-to-br from-luxury-charcoal/98 to-luxury-charcoal/95 backdrop-blur-xl border-t border-inovara-accent/30 shadow-2xl shadow-inovara-accent/10 z-40 ${isRTL ? 'text-right' : 'text-left'}`}
          >
            <nav className="px-6 py-6 space-y-1">
              {(isRTL ? [...navigationItems].reverse() : navigationItems).map((item) => (
                <div key={item.name}>
                  <button
                    onClick={() => item.dropdown ? toggleMobileDropdown(item.name) : handleNavClick(item.href)}
                    className={`w-full flex items-center text-white/90 hover:text-inovara-accent transition-colors duration-300 font-medium py-3 px-3 rounded-lg hover:bg-inovara-accent/10 ${isRTL ? 'flex-row-reverse justify-between' : 'justify-between'}`}
                  >
                    <span>{item.name}</span>
                    {item.dropdown && (
                      <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${isMobileDropdownOpen === item.name ? 'rotate-180' : ''}`} />
                    )}
                  </button>
                  
                  {/* Mobile Dropdown */}
                  {item.dropdown && isMobileDropdownOpen === item.name && (
                    <div className={`${isRTL ? 'mr-4 border-r-2 pr-4' : 'ml-4 border-l-2 pl-4'} space-y-1 mt-2 border-inovara-accent/20`}>
                      {item.dropdown.map((dropdownItem, index) => (
                        <button
                          key={index}
                          onClick={() => handleNavClick(dropdownItem.href)}
                          className={`block w-full ${isRTL ? 'text-right' : 'text-left'} text-white/70 hover:text-inovara-accent transition-colors duration-300 py-2 px-3 rounded-lg hover:bg-inovara-accent/10`}
                        >
                          <div className="font-medium text-sm">{dropdownItem.name}</div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              
              {/* Mobile CTA */}
              <div className="pt-6 border-t border-gray-200/50 space-y-6">
                <div className={`flex items-center ${isRTL ? 'justify-end' : 'justify-center'}`}>
                  <LanguageSwitcher />
                </div>
                
                <button 
                  onClick={onQuoteClick}
                  className="group relative w-full px-4 py-2 bg-gradient-to-r from-inovara-accent via-inovara-accent to-inovara-secondary text-white font-bold rounded-lg hover:shadow-xl hover:shadow-inovara-accent/40 transition-all duration-500 transform hover:scale-105 overflow-hidden border border-inovara-accent/20"
                >
                  {/* Animated Background */}
                  <div className="absolute inset-0 bg-gradient-to-r from-inovara-accent/30 to-inovara-secondary/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  {/* Shimmer Effect */}
                  <div className="absolute inset-0 -top-1 -left-1 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"></div>
                  
                  {/* Pulsing Ring */}
                  <div className="absolute inset-0 rounded-lg border-2 border-inovara-accent/50 opacity-0 group-hover:opacity-100 group-hover:animate-ping"></div>
                  
                  {/* Content */}
                  <span className={`relative flex items-center justify-center z-10 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
                    <Calculator className={`w-4 h-4 ${isRTL ? 'ml-2' : 'mr-2'} group-hover:rotate-12 transition-transform duration-300`} />
                    <span className="text-sm font-bold tracking-wide">
                      {t('nav.get-quote')}
                    </span>
                    <div className={`w-1.5 h-1.5 rounded-full bg-white/80 ${isRTL ? 'mr-1.5' : 'ml-1.5'} group-hover:animate-pulse`}></div>
                  </span>
                  
                  {/* Ripple Effect */}
                  <div className="absolute inset-0 rounded-lg overflow-hidden">
                    <div className="absolute inset-0 bg-white/20 scale-0 group-active:scale-100 transition-transform duration-300 ease-out"></div>
                  </div>
                </button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;