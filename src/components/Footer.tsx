import React, { memo, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Twitter, Instagram, Facebook, Linkedin } from 'lucide-react';
import { useTranslation } from '../contexts/TranslationContext';
import logo from '../../inovara.svg';

interface SocialLink {
  name: string;
  icon: string;
  url: string;
}

// Footer Section Component for better code organization
interface FooterSectionProps {
  title: string;
  links: Array<{ name: string; url: string }>;
  isRTL: boolean;
}

const FooterSection: React.FC<FooterSectionProps> = memo(({ title, links, isRTL }) => {
  return (
    <div className={`${isRTL ? 'text-right' : 'text-left'}`}>
      <h3 className={`text-white font-semibold mb-6 ${isRTL ? 'text-right' : 'text-left'}`}>
        {title}
      </h3>
      <ul className={`space-y-3 ${isRTL ? 'text-right' : 'text-left'}`}>
        {links.map((link) => (
          <li key={link.name}>
            {link.url.startsWith('/') ? (
              <Link
                to={link.url}
                className={`text-white/70 hover:text-inovara-accent transition-colors duration-300 text-sm block ${isRTL ? 'text-right' : 'text-left'}`}
              >
                {link.name}
              </Link>
            ) : (
              <a
                href={link.url}
                className={`text-white/70 hover:text-inovara-accent transition-colors duration-300 text-sm block ${isRTL ? 'text-right' : 'text-left'}`}
              >
                {link.name}
              </a>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
});

FooterSection.displayName = 'FooterSection';

const Footer: React.FC = memo(() => {
  const { t, isRTL } = useTranslation();

  const socialLinks: SocialLink[] = useMemo(() => [
    { name: t('footer.social.linkedin'), icon: 'Linkedin', url: 'https://linkedin.com/company/inovara-global' },
    { name: t('footer.social.twitter'), icon: 'Twitter', url: 'https://twitter.com/inovara_global' },
    { name: t('footer.social.instagram'), icon: 'Instagram', url: 'https://instagram.com/inovara.global' },
    { name: t('footer.social.facebook'), icon: 'Facebook', url: 'https://facebook.com/inovara.global' },
  ], [t]);

  const quickLinks = useMemo(() => [
    { name: t('footer.links.about'), url: '#about' },
    { name: t('footer.links.services'), url: '#services' },
    { name: t('footer.links.products'), url: '#products' },
    { name: t('footer.links.contact'), url: '#contact' },
  ], [t]);

  const legalLinks = useMemo(() => [
    { name: t('footer.legal.privacy'), url: '/privacy' },
    { name: t('footer.legal.terms'), url: '/terms' },
    { name: t('footer.legal.cookies'), url: '/cookies' },
    { name: t('footer.legal.disclaimer'), url: '/disclaimer' },
  ], [t]);

  const renderSocialIcon = useMemo(() => (iconName: string) => {
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
      default:
        return null;
    }
  }, []);


  return (
    <footer className={`w-full bg-gradient-to-br from-inovara-primary via-inovara-primary/95 to-inovara-primary border-t border-inovara-accent/20 ${isRTL ? 'rtl' : 'ltr'}`}>
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className={`grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 ${isRTL ? 'lg:grid-flow-col-dense' : ''}`}>
          {/* Company Info - Spans 2 columns, positioned based on RTL */}
          <div className={`lg:col-span-2 ${isRTL ? 'lg:col-start-3 lg:col-end-5' : 'lg:col-start-1 lg:col-end-3'}`}>
            <div className={`mb-8 ${isRTL ? 'text-right' : 'text-left'}`}>
              {/* Company Branding */}
              <div className="mb-8">
                <img
                  src={logo}
                  alt="Inovara Logo"
                  className={`h-12 mb-4 filter brightness-0 invert ${isRTL ? 'ml-auto' : 'mr-auto'}`}
                />
                <p className={`text-white/80 leading-relaxed max-w-lg ${isRTL ? 'text-right ml-auto' : 'text-left mr-auto'}`}>
                  {t('footer.company.description')}
                </p>
              </div>
            </div>
          </div>

          {/* Quick Links - Positioned based on RTL */}
          <div className={`${isRTL ? 'lg:col-start-1 lg:col-end-2' : 'lg:col-start-3 lg:col-end-4'}`}>
            <FooterSection
              title={t('footer.links.title')}
              links={quickLinks}
              isRTL={isRTL}
            />
          </div>

          {/* Legal Links - Positioned based on RTL */}
          <div className={`${isRTL ? 'lg:col-start-2 lg:col-end-3' : 'lg:col-start-4 lg:col-end-5'}`}>
            <FooterSection
              title={t('footer.legal.title')}
              links={legalLinks}
              isRTL={isRTL}
            />
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-inovara-accent/20 relative">
        {/* Premium gradient line divider */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-inovara-accent to-transparent"></div>
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className={`flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0 ${isRTL ? 'md:flex-row-reverse' : 'md:flex-row'}`}>
            {/* Copyright */}
            <div className={`text-white/70 text-sm ${isRTL ? 'text-right' : 'text-left'}`}>
              <p className={`${isRTL ? 'text-right' : 'text-left'}`}>
                {t('footer.copyright')}
              </p>
            </div>

            {/* Social Links */}
            <div className={`flex items-center ${isRTL ? 'flex-row-reverse space-x-reverse space-x-2' : 'flex-row space-x-2'}`}>
              <span className={`text-white/70 text-sm ${isRTL ? 'ml-4 text-right' : 'mr-4 text-left'}`}>
                {t('footer.social.title')}
              </span>
              <div className={`flex ${isRTL ? 'space-x-reverse space-x-1' : 'space-x-1'}`}>
                {socialLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.url}
                    aria-label={`Follow us on ${link.name}`}
                    className="p-3 rounded-xl text-white/60 hover:text-inovara-accent hover:bg-inovara-accent/10 transition-all duration-300 transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-inovara-accent/50"
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
      </div>
    </footer>
  );
});

Footer.displayName = 'Footer';

export default Footer;