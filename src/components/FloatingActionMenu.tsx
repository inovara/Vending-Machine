import React, { useState, useEffect, useRef, useCallback } from 'react';
import { MessageCircle, Bot, FileText, X, Plus, Sparkles } from 'lucide-react';
import { useTranslation } from '../contexts/TranslationContext';

interface FloatingActionMenuProps {
  onChatbotOpen?: () => void;
  onQuoteRequest?: () => void;
  whatsappNumber?: string;
  whatsappMessage?: string;
}

const FloatingActionMenu: React.FC<FloatingActionMenuProps> = ({
  onChatbotOpen,
  onQuoteRequest,
  whatsappNumber = "+201116392600",
  whatsappMessage = "Hello! I'm interested in your smart vending machine solutions. Can you provide more information?"
}) => {
  const { t, isRTL } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const fabRef = useRef<HTMLButtonElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        setIsOpen(false);
        fabRef.current?.focus();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen]);

  const toggleMenu = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen]);

  const handleWhatsApp = useCallback(() => {
    const encodedMessage = encodeURIComponent(whatsappMessage);
    const whatsappUrl = `https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    setIsOpen(false);
  }, [whatsappNumber, whatsappMessage]);

  const handleChatbot = useCallback(() => {
    if (onChatbotOpen) {
      onChatbotOpen();
    }
    setIsOpen(false);
  }, [onChatbotOpen]);

  const handleQuote = useCallback(() => {
    if (onQuoteRequest) {
      onQuoteRequest();
    }
    setIsOpen(false);
  }, [onQuoteRequest]);

  const menuItems = [
    {
      id: 'whatsapp',
      icon: MessageCircle,
      label: t('fab.whatsapp'),
      subtitle: t('fab.whatsappSubtitle'),
      action: handleWhatsApp,
      gradient: 'from-green-500 to-green-600',
      delay: 'delay-0',
      accent: 'shadow-green-500/25'
    },
    {
      id: 'chatbot',
      icon: Bot,
      label: t('fab.chatbot'),
      subtitle: t('fab.chatbotSubtitle'),
      action: handleChatbot,
      gradient: 'from-inovara-primary to-inovara-primary/90',
      delay: 'delay-75',
      accent: 'shadow-inovara-primary/25',
      badge: 'AI'
    },
    {
      id: 'quote',
      icon: FileText,
      label: t('fab.quote'),
      subtitle: t('fab.quoteSubtitle'),
      action: handleQuote,
      gradient: 'from-inovara-secondary to-inovara-secondary/90',
      delay: 'delay-150',
      accent: 'shadow-inovara-secondary/25'
    }
  ];

  return (
    <div 
      ref={menuRef}
      className={`fixed z-40 ${isRTL ? 'left-4 md:left-6' : 'right-4 md:right-6'} bottom-4 md:bottom-6`}
    >
      {/* Menu Items */}
      <div className={`absolute bottom-20 ${isRTL ? 'left-0' : 'right-0'} flex flex-col-reverse gap-4 mb-4`}>
        {menuItems.map((item, index) => {
          const IconComponent = item.icon;
          return (
            <div
              key={item.id}
              className={`transform transition-all duration-500 ease-out ${
                isOpen 
                  ? `translate-y-0 opacity-100 scale-100 ${item.delay}` 
                  : 'translate-y-6 opacity-0 scale-95 pointer-events-none'
              }`}
              style={{ transitionDelay: isOpen ? `${index * 100}ms` : '0ms' }}
            >
              <button
                onClick={item.action}
                className={`
                  group relative flex items-center gap-4 p-5 rounded-3xl shadow-lg hover:shadow-2xl
                  transition-all duration-300 ease-out focus:outline-none focus:ring-4 focus:ring-inovara-accent/30
                  bg-gradient-to-r ${item.gradient} text-white font-semibold min-w-[240px] max-w-[280px]
                  hover:scale-105 transform hover:shadow-xl active:scale-95
                  border border-white/20 backdrop-blur-sm
                  ${isRTL ? 'flex-row-reverse' : 'flex-row'}
                `}
                aria-label={`${item.label} - ${item.subtitle}`}
              >
                {/* Icon Container */}
                <div className="relative">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <IconComponent className="w-6 h-6" />
                  </div>
                  
                  {/* AI Badge */}
                  {item.badge && (
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-inovara-accent rounded-full flex items-center justify-center">
                      <Sparkles className="w-3 h-3 text-white" />
                    </div>
                  )}
                </div>
                
                {/* Content */}
                <div className={`flex-1 ${isRTL ? 'text-right' : 'text-left'}`}>
                  <div className="text-base font-bold leading-tight">{item.label}</div>
                  <div className="text-xs opacity-90 font-medium mt-1">{item.subtitle}</div>
                </div>
                
                {/* Hover glow effect */}
                <div className="absolute inset-0 bg-white/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Subtle border glow */}
                <div className="absolute inset-0 rounded-3xl border border-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
            </div>
          );
        })}
      </div>

      {/* Main FAB Button */}
      <button
        ref={fabRef}
        onClick={toggleMenu}
        className={`
          group relative w-16 h-16 rounded-2xl shadow-xl hover:shadow-2xl
          transition-all duration-400 ease-out focus:outline-none focus:ring-4 focus:ring-inovara-accent/30
          ${isOpen 
            ? 'bg-gradient-to-br from-inovara-primary to-inovara-primary/90 scale-110 shadow-inovara-primary/25' 
            : 'bg-gradient-to-br from-inovara-primary to-inovara-secondary hover:from-inovara-primary/90 hover:to-inovara-secondary/90 hover:scale-105'
          }
          flex items-center justify-center text-white overflow-hidden
          border border-white/20 backdrop-blur-sm
        `}
        aria-label={isOpen ? t('fab.close') : t('fab.open')}
        aria-expanded={isOpen}
      >
        {/* Background gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-2xl"></div>
        
        {/* Icon with rotation animation */}
        <div className={`relative z-10 transform transition-all duration-400 ${isOpen ? 'rotate-180 scale-110' : 'rotate-0 scale-100'}`}>
          {isOpen ? (
            <X className="w-7 h-7" />
          ) : (
            <Plus className={`w-7 h-7 ${isRTL ? 'rotate-90' : '-rotate-90'}`} />
          )}
        </div>

        {/* Ripple effect */}
        <div className={`
          absolute inset-0 rounded-2xl bg-white/20 scale-0 group-active:scale-100
          transition-transform duration-200 ease-out
        `}></div>

        {/* Subtle glow when closed */}
        {!isOpen && (
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-inovara-accent/20 to-transparent opacity-60"></div>
        )}

        {/* Border glow */}
        <div className="absolute inset-0 rounded-2xl border border-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </button>

      {/* Backdrop blur when open */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/10 backdrop-blur-sm -z-10 transition-all duration-300"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

export default FloatingActionMenu;
