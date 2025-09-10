import React from 'react';
import { Twitter, Instagram, Facebook, Linkedin, Github, Mail, Phone } from 'lucide-react';
import { SocialLink } from '../types';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  const socialLinks: SocialLink[] = [
    { name: 'LinkedIn', icon: 'Linkedin', url: 'https://linkedin.com/company/inovara' },
    { name: 'Twitter', icon: 'Twitter', url: 'https://twitter.com/inovara' },
    { name: 'Instagram', icon: 'Instagram', url: 'https://instagram.com/inovara' },
    { name: 'Facebook', icon: 'Facebook', url: 'https://facebook.com/inovara' },
    { name: 'GitHub', icon: 'Github', url: 'https://github.com/inovara' },
  ];

  const quickLinks = [
    { name: 'About Us', url: '#about' },
    { name: 'Services', url: '#services' },
    { name: 'Case Studies', url: '#case-studies' },
    { name: 'Contact', url: '#contact' },
  ];

  const offices = [
    { city: 'Global HQ', country: 'International', flag: '🌍', email: 'info@inovara.com' },
    { city: 'Innovation Center', country: 'Technology Hub', flag: '🚀', email: 'innovation@inovara.com' },
  ];
  
  const renderSocialIcon = (iconName: string) => {
    const iconProps = { className: "h-5 w-5" };
    
    switch (iconName) {
      case 'Twitter':
        return <Twitter {...iconProps} />;
      case 'Instagram':
        return <Instagram {...iconProps} />;
      case 'Facebook':
        return <Facebook {...iconProps} />;
      case 'Linkedin':
        return <Linkedin {...iconProps} />;
      case 'Github':
        return <Github {...iconProps} />;
      default:
        return null;
    }
  };
  
  return (
    <footer className="w-full bg-section-dark border-t border-white/10">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <img 
                src="/inovaralo.svg" 
                alt="Inovara Logo" 
                className="h-12 mb-4 filter brightness-0 invert"
              />
              <p className="text-white/80 leading-relaxed max-w-md">
                Inovara is a cutting-edge technology company delivering innovative solutions across global markets. 
                We build the future of business through smart software, AI solutions, and digital transformation.
              </p>
            </div>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-inovara-accent flex-shrink-0" />
                <span className="text-white/80 text-sm">info@inovara.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-inovara-accent flex-shrink-0" />
                <span className="text-white/80 text-sm">+1 555 123 4567</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.url}
                    className="text-white/70 hover:text-inovara-accent transition-colors duration-300 text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Offices */}
          <div>
            <h3 className="text-white font-semibold mb-6">Our Offices</h3>
            <div className="space-y-4">
              {offices.map((office) => (
                <div key={office.city} className="flex items-center space-x-3">
                  <span className="text-2xl">{office.flag}</span>
                  <div>
                    <div className="text-white font-medium text-sm">{office.city}</div>
                    <div className="text-white/60 text-xs">{office.country}</div>
                    <div className="text-white/60 text-xs">{office.email}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10 relative">
        {/* Luxury gradient line divider */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-inovara-accent to-transparent"></div>
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            {/* Copyright */}
            <div className="text-white/60 text-sm">
              <p>&copy; {currentYear} Inovara. All rights reserved.</p>
            </div>

            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  aria-label={`Follow us on ${link.name}`}
                  className="p-2 rounded-full text-white/60 hover:text-inovara-accent hover:bg-white/10 transition-all duration-300 transform hover:scale-110"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {renderSocialIcon(link.icon)}
                </a>
              ))}
            </div>

            {/* Global Presence */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <span className="text-2xl">🌍</span>
                <span className="text-white/60 text-sm">Global</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-2xl">🚀</span>
                <span className="text-white/60 text-sm">Innovation</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;