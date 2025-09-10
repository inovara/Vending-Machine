import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import logo from '../../inovaralo.svg';
import { smoothScrollTo } from '../utils/smoothScroll';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const navigationItems = [
    { name: 'Home', href: '#home' },
    { 
      name: 'About', 
      href: '#about',
      dropdown: [
        { name: 'Our Story', href: '#about' },
        { name: 'Leadership', href: '#leadership' },
        { name: 'Careers', href: '#careers' }
      ]
    },
    { 
      name: 'Services', 
      href: '#services',
      dropdown: [
        { name: 'Software Engineering', href: '#services' },
        { name: 'AI & Data Solutions', href: '#services' },
        { name: 'Smart Vending', href: '#services' },
        { name: 'Digital Transformation', href: '#services' }
      ]
    },
    { name: 'Case Studies', href: '#case-studies' },
    { name: 'Contact', href: '#contact' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setIsMenuOpen(false);
    setActiveDropdown(null);
    smoothScrollTo(href, 80);
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
          ? 'bg-luxury-dark/95 backdrop-blur-md border-b border-white/10 shadow-lg' 
        : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center">
            <img 
              src={logo} 
              alt="Inovara Logo"
              className="h-12 w-auto filter brightness-0 invert"
            />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <div key={item.name} className="relative group">
                <button
                  onClick={() => item.dropdown ? setActiveDropdown(activeDropdown === item.name ? null : item.name) : handleNavClick(item.href)}
                  className="flex items-center space-x-1 text-white/80 hover:text-white transition-colors duration-300 font-medium"
                >
                  <span>{item.name}</span>
                  {item.dropdown && <ChevronDown className="h-4 w-4" />}
                </button>
                
                {/* Dropdown Menu */}
                {item.dropdown && activeDropdown === item.name && (
                  <div className="absolute top-full left-0 mt-2 w-48 bg-luxury-charcoal/95 backdrop-blur-md border border-white/10 rounded-xl shadow-xl py-2">
                    {item.dropdown.map((dropdownItem) => (
                      <button
                        key={dropdownItem.name}
                        onClick={() => handleNavClick(dropdownItem.href)}
                        className="w-full text-left px-4 py-2 text-white/80 hover:text-white hover:bg-white/10 transition-colors duration-300"
                      >
                        {dropdownItem.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden lg:flex items-center space-x-4">
            <button 
              onClick={() => handleNavClick('#contact')}
              className="px-6 py-2 bg-gradient-to-r from-inovara-primary to-inovara-secondary text-white font-semibold rounded-full hover:shadow-lg hover:shadow-inovara-primary/25 transition-all duration-300 transform hover:scale-105"
            >
              Get Started
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 text-white/80 hover:text-white transition-colors duration-300"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-luxury-dark/95 backdrop-blur-md border-b border-white/10">
            <nav className="px-6 py-6 space-y-4">
              {navigationItems.map((item) => (
                <div key={item.name}>
                  <button
                    onClick={() => item.dropdown ? setActiveDropdown(activeDropdown === item.name ? null : item.name) : handleNavClick(item.href)}
                    className="flex items-center justify-between w-full text-left text-white/80 hover:text-white transition-colors duration-300 font-medium py-2"
                  >
                    <span>{item.name}</span>
                    {item.dropdown && <ChevronDown className="h-4 w-4" />}
                  </button>
                  
                  {/* Mobile Dropdown */}
                  {item.dropdown && activeDropdown === item.name && (
                    <div className="ml-4 mt-2 space-y-2">
                      {item.dropdown.map((dropdownItem) => (
                        <button
                          key={dropdownItem.name}
                          onClick={() => handleNavClick(dropdownItem.href)}
                          className="block w-full text-left text-white/60 hover:text-white transition-colors duration-300 py-1"
                        >
                          {dropdownItem.name}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              
              {/* Mobile CTA */}
              <div className="pt-4 border-t border-white/10">
                <button 
                  onClick={() => handleNavClick('#contact')}
                  className="w-full px-6 py-3 bg-gradient-to-r from-inovara-primary to-inovara-secondary text-white font-semibold rounded-full hover:shadow-lg hover:shadow-inovara-primary/25 transition-all duration-300"
                >
                  Get Started
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