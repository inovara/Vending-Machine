import React from 'react';
import { Twitter, Instagram, Facebook, Linkedin, Github, Mail, Phone } from 'lucide-react';
import { SocialLink } from '../types';
import { useTranslation } from '../contexts/TranslationContext';

const Footer: React.FC = () => {
  const { t, isRTL } = useTranslation();
  const currentYear = new Date().getFullYear();
  
  const socialLinks: SocialLink[] = [
    { name: t('footer.social.linkedin'), icon: 'Linkedin', url: 'https://linkedin.com/company/inovara' },
    { name: t('footer.social.twitter'), icon: 'Twitter', url: 'https://twitter.com/inovara' },
    { name: t('footer.social.instagram'), icon: 'Instagram', url: 'https://instagram.com/inovara' },
    { name: t('footer.social.facebook'), icon: 'Facebook', url: 'https://facebook.com/inovara' },
    { name: t('footer.social.github'), icon: 'Github', url: 'https://github.com/inovara' },
  ];

  const quickLinks = [
    { name: t('footer.links.about'), url: '#about' },
    { name: t('footer.links.services'), url: '#services' },
    { name: t('footer.links.products'), url: '#products' },
    { name: t('footer.links.contact'), url: '#contact' },
  ];

  const legalLinks = [
    { name: t('footer.legal.privacy'), url: '/privacy-policy' },
    { name: t('footer.legal.terms'), url: '/terms-conditions' },
    { name: t('footer.legal.return'), url: '/return-policy' },
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
    <footer className={`w-full bg-gradient-to-br from-luxury-charcoal via-inovara-primary/90 to-luxury-charcoal border-t border-white/10 ${isRTL ? 'rtl' : 'ltr'}`}>
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className={`grid md:grid-cols-2 lg:grid-cols-3 gap-12 ${isRTL ? 'lg:grid-flow-col-dense' : ''}`}>
          {/* Company Info */}
          <div className={`lg:col-span-1 ${isRTL ? 'lg:col-start-1 lg:col-end-2' : ''}`}>
            <div className={`mb-6 ${isRTL ? 'text-right' : 'text-left'}`}>
              <img 
                src="/inovaralo.svg" 
                alt="Inovara Logo" 
                className={`h-12 mb-4 filter brightness-0 invert ${isRTL ? 'ml-auto' : 'mr-auto'}`}
              />
              <p className={`text-white/80 leading-relaxed max-w-md ${isRTL ? 'ml-auto' : 'mr-auto'}`}>
                {t('footer.company.description')}
              </p>
            </div>
            
            {/* Contact Info */}
            <div className={`space-y-3 ${isRTL ? 'text-right' : 'text-left'}`}>
              <div className={`flex items-center ${isRTL ? 'space-x-reverse space-x-3 flex-row-reverse' : 'space-x-3'}`}>
                <Mail className="h-5 w-5 text-inovara-accent flex-shrink-0" />
                <span className="text-white/80 text-sm">{t('footer.contact.email')}</span>
              </div>
              <div className={`flex items-center ${isRTL ? 'space-x-reverse space-x-3 flex-row-reverse' : 'space-x-3'}`}>
                <Phone className="h-5 w-5 text-inovara-accent flex-shrink-0" />
                <span className="text-white/80 text-sm">{t('footer.contact.phone')}</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className={`${isRTL ? 'lg:col-start-2 lg:col-end-3' : ''}`}>
            <h3 className={`text-white font-semibold mb-6 ${isRTL ? 'text-right' : 'text-left'}`}>{t('footer.quickLinks')}</h3>
            <ul className={`space-y-3 ${isRTL ? 'text-right' : 'text-left'}`}>
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.url}
                    className="text-white/70 hover:text-inovara-accent transition-colors duration-300 text-sm block"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div className={`${isRTL ? 'lg:col-start-3 lg:col-end-4' : ''}`}>
            <h3 className={`text-white font-semibold mb-6 ${isRTL ? 'text-right' : 'text-left'}`}>{t('footer.legal.title')}</h3>
            <ul className={`space-y-3 ${isRTL ? 'text-right' : 'text-left'}`}>
              {legalLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.url}
                    className="text-white/70 hover:text-inovara-accent transition-colors duration-300 text-sm block"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10 relative">
        {/* Luxury gradient line divider */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-inovara-accent to-transparent"></div>
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className={`flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 ${isRTL ? 'md:flex-row-reverse' : 'md:flex-row'}`}>
            {/* Copyright */}
            <div className={`text-white/60 text-sm ${isRTL ? 'text-right' : 'text-left'}`}>
              <p>{t('footer.copyright')}</p>
            </div>

            {/* Social Links */}
            <div className={`flex ${isRTL ? 'space-x-reverse space-x-4' : 'space-x-4'}`}>
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

          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;