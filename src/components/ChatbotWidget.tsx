import React, { useState, useRef, useEffect, useCallback } from 'react';
import { X, Send, Bot, User, Loader2, MessageCircle, FileText, ShoppingCart, ExternalLink } from 'lucide-react';
import { useTranslation } from '../contexts/TranslationContext';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  type?: 'text' | 'suggestion' | 'action';
  suggestions?: string[];
  actions?: ChatAction[];
}

interface ChatAction {
  id: string;
  label: string;
  action: () => void;
  icon?: React.ComponentType<{ className?: string }>;
  type?: 'primary' | 'secondary';
}

interface ChatbotWidgetProps {
  isOpen: boolean;
  onClose: () => void;
  onQuoteRequest?: () => void;
}

const ChatbotWidget: React.FC<ChatbotWidgetProps> = ({ isOpen, onClose, onQuoteRequest }) => {
  const { t, isRTL, language } = useTranslation();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [conversationContext, setConversationContext] = useState<string[]>([]);
  const [userPreferences, setUserPreferences] = useState<{
    interestedIn?: string;
    budget?: string;
    industry?: string;
    location?: string;
  }>({});
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Initialize welcome message and update when language changes
  useEffect(() => {
    const welcomeMessage: Message = {
      id: 'welcome',
      text: t('chatbot.welcome'),
      sender: 'bot',
      timestamp: new Date()
    };

    setMessages([welcomeMessage]);
  }, [language, t]);

  // Focus input when widget opens and handle keyboard navigation
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Handle escape key to close widget
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen, onClose]);

  // Advanced AI-like response system
  const getBotResponse = useCallback((userMessage: string): Message => {
    const message = userMessage.toLowerCase();
    const context = conversationContext.join(' ').toLowerCase();

    // Update conversation context
    setConversationContext(prev => [...prev.slice(-4), userMessage.toLowerCase()]);

    // Intent detection with multiple keywords and context
    const intents = {
      greeting: ['hello', 'hi', 'hey', 'good morning', 'good afternoon', 'good evening', 'salam', 'مرحبا', 'أهلا'],
      pricing: ['price', 'cost', 'expensive', 'cheap', 'budget', 'affordable', 'سعر', 'تكلفة', 'مكلف'],
      products: ['product', 'machine', 'vending', 'snack', 'beverage', 'food', 'equipment', 'منتج', 'ماكينة', 'بيع'],
      features: ['feature', 'capability', 'function', 'technology', 'smart', 'cashless', 'analytics', 'ميزة', 'تقنية'],
      contact: ['contact', 'phone', 'email', 'address', 'location', 'office', 'تواصل', 'هاتف', 'عنوان'],
      quote: ['quote', 'estimate', 'proposal', 'request', 'inquiry', 'عرض سعر', 'تقدير', 'طلب'],
      support: ['help', 'support', 'issue', 'problem', 'bug', 'error', 'مساعدة', 'دعم', 'مشكلة'],
      company: ['company', 'about', 'history', 'team', 'mission', 'شركة', 'عن', 'فريق'],
      industries: ['industry', 'sector', 'business', 'office', 'hospital', 'school', 'retail', 'قطاع', 'صناعة'],
      installation: ['install', 'setup', 'delivery', 'shipping', 'installation', 'تركيب', 'توصيل'],
      maintenance: ['maintenance', 'service', 'repair', 'support', 'warranty', 'صيانة', 'خدمة', 'إصلاح'],
      payment: ['payment', 'cash', 'card', 'digital', 'online', 'دفع', 'نقدي', 'إلكتروني'],
      analytics: ['analytics', 'data', 'report', 'statistics', 'tracking', 'تحليلات', 'بيانات', 'تقارير']
    };

    // Extract user preferences from message
    const extractPreferences = (msg: string) => {
      const budgetKeywords = ['budget', 'affordable', 'expensive', 'cheap', 'ميزانية', 'رخيص', 'غالي'];
      const industryKeywords = ['office', 'hospital', 'school', 'retail', 'restaurant', 'مكتب', 'مستشفى', 'مدرسة'];

      if (budgetKeywords.some(keyword => msg.includes(keyword))) {
        setUserPreferences(prev => ({ ...prev, budget: msg }));
      }
      if (industryKeywords.some(keyword => msg.includes(keyword))) {
        setUserPreferences(prev => ({ ...prev, industry: msg }));
      }
    };

    extractPreferences(message);

    // Determine primary intent
    let primaryIntent = 'default';
    let confidence = 0;

    for (const [intent, keywords] of Object.entries(intents)) {
      const matches = keywords.filter(keyword =>
        message.includes(keyword) || context.includes(keyword)
      ).length;
      if (matches > confidence) {
        confidence = matches;
        primaryIntent = intent;
      }
    }

    // Generate contextual response based on intent and preferences
    const generateResponse = (intent: string): Message => {
      const timestamp = new Date();

      switch (intent) {
        case 'greeting':
          return {
            id: Date.now().toString(),
            text: t('chatbot.responses.greeting'),
            sender: 'bot',
            timestamp,
            type: 'suggestion',
            suggestions: [
              t('chatbot.quickQuestions.pricing'),
              t('chatbot.quickQuestions.products'),
              t('chatbot.quickQuestions.quote')
            ]
          };

        case 'pricing':
          return {
            id: Date.now().toString(),
            text: userPreferences.budget
              ? t('chatbot.responses.pricingPersonalized')
              : t('chatbot.responses.pricing'),
            sender: 'bot',
            timestamp,
            type: 'action',
            actions: [
              {
                id: 'get-quote',
                label: t('chatbot.actions.getQuote'),
                action: () => {
                  if (onQuoteRequest) {
                    onQuoteRequest();
                    onClose(); // Close chatbot when quote modal opens
                  }
                },
                icon: FileText,
                type: 'primary'
              },
              {
                id: 'view-products',
                label: t('chatbot.actions.viewProducts'),
                action: () => {
                  window.location.href = '/products';
                },
                icon: ShoppingCart,
                type: 'secondary'
              }
            ]
          };

        case 'products':
          return {
            id: Date.now().toString(),
            text: t('chatbot.responses.products'),
            sender: 'bot',
            timestamp,
            type: 'suggestion',
            suggestions: [
              t('chatbot.suggestions.snackMachines'),
              t('chatbot.suggestions.beverageMachines'),
              t('chatbot.suggestions.foodMachines'),
              t('chatbot.suggestions.customSolutions')
            ]
          };

        case 'contact':
          return {
            id: Date.now().toString(),
            text: t('chatbot.responses.contact'),
            sender: 'bot',
            timestamp,
            type: 'action',
            actions: [
              {
                id: 'whatsapp',
                label: t('chatbot.actions.whatsapp'),
                action: () => {
                  window.open('https://wa.me/201116392600', '_blank');
                },
                icon: MessageCircle,
                type: 'primary'
              },
              {
                id: 'email',
                label: t('chatbot.actions.email'),
                action: () => {
                  const email = 'info@inovara.net';
                  const subject = 'Inquiry about Smart Vending Solutions';
                  const body = 'Hello,\n\nI am interested in your smart vending machine solutions. Please provide more information.\n\nBest regards,';
                  
                  // Professional notification system
                  const showNotification = (message: string, type: 'success' | 'info' | 'warning' | 'error' = 'info', duration = 4000) => {
                    // Remove any existing notifications
                    const existingNotifications = document.querySelectorAll('.email-notification');
                    existingNotifications.forEach(notification => {
                      if (notification.parentNode) {
                        notification.parentNode.removeChild(notification);
                      }
                    });
                    
                    const notification = document.createElement('div');
                    notification.className = 'email-notification';
                    
                    const colors = {
                      success: '#10B981',
                      info: '#3B82F6', 
                      warning: '#F59E0B',
                      error: '#EF4444'
                    };
                    
                    const icons = {
                      success: '✓',
                      info: 'ℹ',
                      warning: '⚠',
                      error: '✕'
                    };
                    
                    notification.style.cssText = `
                      position: fixed;
                      top: 20px;
                      right: 20px;
                      background: ${colors[type]};
                      color: white;
                      padding: 16px 24px;
                      border-radius: 12px;
                      z-index: 10000;
                      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                      font-size: 14px;
                      font-weight: 500;
                      box-shadow: 0 10px 25px rgba(0,0,0,0.15);
                      backdrop-filter: blur(10px);
                      border: 1px solid rgba(255,255,255,0.1);
                      max-width: 350px;
                      word-wrap: break-word;
                      line-height: 1.4;
                      transform: translateX(100%);
                      transition: transform 0.3s ease-out, opacity 0.3s ease-out;
                      opacity: 0;
                    `;
                    
                    notification.innerHTML = `
                      <div style="display: flex; align-items: center; gap: 8px;">
                        <div style="width: 20px; height: 20px; border-radius: 50%; background: rgba(255,255,255,0.2); display: flex; align-items: center; justify-content: center; font-size: 12px; flex-shrink: 0;">
                          ${icons[type]}
                        </div>
                        <span>${message}</span>
                      </div>
                    `;
                    
                    document.body.appendChild(notification);
                    
                    // Trigger animation
                    setTimeout(() => {
                      notification.style.transform = 'translateX(0)';
                      notification.style.opacity = '1';
                    }, 10);
                    
                    // Auto-remove
                    setTimeout(() => {
                      if (notification.parentNode) {
                        notification.style.transform = 'translateX(100%)';
                        notification.style.opacity = '0';
                        setTimeout(() => {
                          if (notification.parentNode) {
                            notification.parentNode.removeChild(notification);
                          }
                        }, 300);
                      }
                    }, duration);
                  };
                  
                  // Show immediate feedback
                  showNotification('Opening your email client...', 'info', 2000);
                  
                  // Advanced email opening with multiple methods
                  let emailOpened = false;
                  const mailtoUrl = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
                  
                  // Method 1: Create and click a temporary link (most reliable)
                  try {
                    const link = document.createElement('a');
                    link.href = mailtoUrl;
                    link.style.position = 'absolute';
                    link.style.left = '-9999px';
                    link.style.visibility = 'hidden';
                    link.style.pointerEvents = 'none';
                    link.style.opacity = '0';
                    link.style.zIndex = '-1';
                    
                    document.body.appendChild(link);
                    
                    // Create a more reliable click event
                    const clickEvent = new MouseEvent('click', {
                      view: window,
                      bubbles: true,
                      cancelable: true,
                      buttons: 1,
                      clientX: 0,
                      clientY: 0
                    });
                    
                    link.dispatchEvent(clickEvent);
                    
                    // Clean up immediately
                    setTimeout(() => {
                      if (link.parentNode) {
                        link.parentNode.removeChild(link);
                      }
                    }, 100);
                    
                    emailOpened = true;
                    
                    // Show success notification
                    setTimeout(() => {
                      showNotification('Email client opened successfully!', 'success', 3000);
                    }, 500);
                    
                  } catch {
                    console.log('Method 1 failed, trying fallback...');
                  }
                  
                  // Method 2: Try window.location as fallback (only if method 1 failed)
                  if (!emailOpened) {
                    try {
                      // Use a temporary iframe to avoid page navigation
                      const iframe = document.createElement('iframe');
                      iframe.style.display = 'none';
                      iframe.style.position = 'absolute';
                      iframe.style.left = '-9999px';
                      iframe.style.width = '1px';
                      iframe.style.height = '1px';
                      iframe.src = mailtoUrl;
                      document.body.appendChild(iframe);
                      
                      setTimeout(() => {
                        if (iframe.parentNode) {
                          iframe.parentNode.removeChild(iframe);
                        }
                      }, 1000);
                      
                      emailOpened = true;
                      showNotification('Email client opened successfully!', 'success', 3000);
                      
                    } catch {
                      console.log('Method 2 failed, trying clipboard fallback...');
                    }
                  }
                  
                  // Method 3: Clipboard fallback with enhanced UX
                  if (!emailOpened) {
                    setTimeout(() => {
                      if (navigator.clipboard && navigator.clipboard.writeText) {
                        navigator.clipboard.writeText(email).then(() => {
                          showNotification(`
                            <div>
                              <strong>Email copied to clipboard!</strong><br>
                              <small style="background: rgba(255,255,255,0.2); padding: 2px 6px; border-radius: 4px; font-family: monospace;">${email}</small><br>
                              <small style="opacity: 0.8;">Paste it into your email client</small>
                            </div>
                          `, 'success', 5000);
                        }).catch(() => {
                          showNotification(`
                            <div>
                              <strong>Contact Email:</strong><br>
                              <code style="background: rgba(255,255,255,0.2); padding: 2px 6px; border-radius: 4px; font-family: monospace;">${email}</code><br>
                              <small style="opacity: 0.8;">Please copy this email address</small>
                            </div>
                          `, 'warning', 6000);
                        });
                      } else {
                        showNotification(`
                          <div>
                            <strong>Contact Email:</strong><br>
                            <code style="background: rgba(255,255,255,0.2); padding: 2px 6px; border-radius: 4px; font-family: monospace;">${email}</code><br>
                            <small style="opacity: 0.8;">Please copy this email address</small>
                          </div>
                        `, 'warning', 6000);
                      }
                    }, 1500);
                  }
                },
                icon: ExternalLink,
                type: 'secondary'
              }
            ]
          };

        case 'quote':
          return {
            id: Date.now().toString(),
            text: t('chatbot.responses.quote'),
            sender: 'bot',
            timestamp,
            type: 'action',
            actions: [
              {
                id: 'request-quote',
                label: t('chatbot.actions.requestQuote'),
                action: () => {
                  if (onQuoteRequest) {
                    onQuoteRequest();
                    onClose(); // Close chatbot when quote modal opens
                  }
                },
                icon: FileText,
                type: 'primary'
              }
            ]
          };

        case 'features':
          return {
            id: Date.now().toString(),
            text: t('chatbot.responses.features'),
            sender: 'bot',
            timestamp,
            type: 'suggestion',
            suggestions: [
              t('chatbot.suggestions.cashlessPayments'),
              t('chatbot.suggestions.realTimeAnalytics'),
              t('chatbot.suggestions.remoteManagement'),
              t('chatbot.suggestions.customBranding')
            ]
          };

        case 'industries':
          return {
            id: Date.now().toString(),
            text: t('chatbot.responses.industries'),
            sender: 'bot',
            timestamp,
            type: 'suggestion',
            suggestions: [
              t('chatbot.suggestions.offices'),
              t('chatbot.suggestions.hospitals'),
              t('chatbot.suggestions.schools'),
              t('chatbot.suggestions.retail')
            ]
          };

        default:
          return {
            id: Date.now().toString(),
            text: t('chatbot.responses.default'),
            sender: 'bot',
            timestamp,
            type: 'suggestion',
            suggestions: [
              t('chatbot.quickQuestions.pricing'),
              t('chatbot.quickQuestions.products'),
              t('chatbot.quickQuestions.contact'),
              t('chatbot.quickQuestions.quote')
            ]
          };
      }
    };

    return generateResponse(primaryIntent);
  }, [conversationContext, userPreferences, t, onQuoteRequest, onClose]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue.trim(),
      sender: 'user',
      timestamp: new Date(),
      type: 'text'
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate realistic typing delay based on response complexity
    const delay = 800 + Math.random() * 1200; // 0.8-2 seconds

    setTimeout(() => {
      const botResponse = getBotResponse(userMessage.text);
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, delay);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const quickQuestions = [
    t('chatbot.quickQuestions.pricing'),
    t('chatbot.quickQuestions.products'),
    t('chatbot.quickQuestions.contact'),
    t('chatbot.quickQuestions.quote')
  ];

  const handleQuickQuestion = (question: string) => {
    setInputValue(question);
    setTimeout(() => handleSendMessage(), 100);
  };

  if (!isOpen) return null;

  return (
    <div
      className={`fixed inset-0 z-[60] flex items-center justify-center p-1 xs:p-2 sm:items-end sm:p-4 ${isRTL ? 'sm:justify-start' : 'sm:justify-end'}`}
      role="dialog"
      aria-modal="true"
      aria-labelledby="chatbot-title"
      aria-describedby="chatbot-subtitle"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
        aria-label={t('common.close')}
      />

      {/* Chat Widget */}
      <div className={`
        fixed w-full max-w-[95vw] xs:max-w-sm sm:max-w-md md:max-w-lg lg:max-w-md xl:max-w-lg
        h-[90vh] xs:h-[85vh] sm:h-[600px] max-h-[700px] min-h-[350px] xs:min-h-[400px]
        bg-white/95 backdrop-blur-md rounded-lg xs:rounded-xl sm:rounded-2xl shadow-2xl
        flex flex-col overflow-hidden transform transition-all duration-300 ease-out
        border border-inovara-primary/20
        ${isRTL ? 'rtl' : 'ltr'}
        animate-in slide-in-from-bottom-4 fade-in duration-300
        focus-within:ring-2 focus-within:ring-inovara-primary/20
        overflow-y-auto
      `}>
        {/* Header */}
        <div className={`bg-gradient-to-r from-inovara-primary to-inovara-secondary p-2.5 xs:p-3 sm:p-4 flex items-center ${isRTL ? 'flex-row-reverse' : 'flex-row'} justify-between border-b border-white/10 shrink-0`}>
          <div className={`flex items-center gap-1.5 xs:gap-2 sm:gap-3 min-w-0 flex-1 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
            <div className="w-8 h-8 xs:w-10 xs:h-10 sm:w-12 sm:h-12 bg-white/20 backdrop-blur-sm rounded-lg xs:rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg shrink-0">
              <Bot className="w-4 h-4 xs:w-5 xs:h-5 sm:w-7 sm:h-7 text-white" />
            </div>
            <div className={`min-w-0 flex-1 ${isRTL ? 'text-right' : 'text-left'}`}>
              <h3 id="chatbot-title" className="text-white font-black text-base xs:text-lg sm:text-xl leading-tight truncate">{t('chatbot.title')}</h3>
              <p id="chatbot-subtitle" className="text-white/90 text-xs xs:text-xs sm:text-sm font-medium mt-0.5 xs:mt-0.5 sm:mt-1 truncate">{t('chatbot.subtitle')}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className={`p-1.5 xs:p-2 sm:p-3 text-white/80 hover:text-white hover:bg-white/10 rounded-md xs:rounded-lg sm:rounded-xl transition-all duration-300 group shrink-0 touch-manipulation focus:outline-none focus:ring-2 focus:ring-white/30 min-w-[44px] min-h-[44px] xs:min-w-[48px] xs:min-h-[48px] flex items-center justify-center ${isRTL ? 'mr-0.5 xs:mr-1 sm:mr-2' : 'ml-0.5 xs:ml-1 sm:ml-2'}`}
            aria-label={t('common.close')}
          >
            <X className="w-4 h-4 xs:w-4 xs:h-4 sm:w-5 sm:h-5 group-hover:rotate-90 transition-transform duration-300" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-2 xs:p-3 sm:p-4 space-y-2 xs:space-y-3 sm:space-y-4 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent max-h-[calc(90vh-200px)] xs:max-h-[calc(85vh-200px)] sm:max-h-[calc(600px-200px)]">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? (isRTL ? 'justify-start' : 'justify-end') : (isRTL ? 'justify-end' : 'justify-start')}`}
            >
              <div className={`
                flex items-start gap-1.5 xs:gap-2 sm:gap-3 max-w-[95%] xs:max-w-[90%] sm:max-w-[85%]
                ${message.sender === 'user' ? (isRTL ? 'flex-row-reverse' : 'flex-row') : (isRTL ? 'flex-row-reverse' : 'flex-row')}
              `}>
                {/* Avatar */}
                <div className={`
                  w-6 h-6 xs:w-7 xs:h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center flex-shrink-0
                  ${message.sender === 'user'
                    ? 'bg-inovara-primary text-white'
                    : 'bg-gray-100 text-gray-600'
                  }
                `}>
                  {message.sender === 'user' ? (
                    <User className="w-3 h-3 xs:w-3.5 xs:h-3.5 sm:w-4 sm:h-4" />
                  ) : (
                    <Bot className="w-3 h-3 xs:w-3.5 xs:h-3.5 sm:w-4 sm:h-4" />
                  )}
                </div>

                {/* Message Content */}
                <div className="flex flex-col gap-1 xs:gap-1.5 sm:gap-2 min-w-0 flex-1">
                  {/* Message Bubble */}
                  <div className={`
                    px-2.5 xs:px-3 sm:px-4 py-2 xs:py-2.5 sm:py-3 rounded-lg xs:rounded-xl sm:rounded-2xl text-xs xs:text-sm sm:text-sm shadow-sm border
                    ${message.sender === 'user'
                      ? 'bg-gradient-to-r from-inovara-primary to-inovara-primary/90 text-white border-inovara-primary/20'
                      : 'bg-white text-gray-800 border-gray-200'
                    }
                    break-words
                  `}>
                    <p className={`${isRTL ? 'text-right' : 'text-left'} leading-relaxed`}>{message.text}</p>
                    <p className={`
                      text-[10px] xs:text-xs mt-1 opacity-70
                      ${isRTL ? 'text-right' : 'text-left'}
                    `}>
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>

                  {/* Suggestions */}
                  {message.suggestions && message.suggestions.length > 0 && (
                    <div className={`flex flex-wrap gap-1 xs:gap-1.5 sm:gap-2 ${isRTL ? 'justify-end' : 'justify-start'}`}>
                      {message.suggestions.map((suggestion, index) => (
                        <button
                          key={index}
                          onClick={() => {
                            setInputValue(suggestion);
                            setTimeout(() => handleSendMessage(), 100);
                          }}
                          className={`
                            text-[10px] xs:text-xs px-2 xs:px-2.5 sm:px-3 py-1 xs:py-1.5 sm:py-2 bg-white hover:bg-inovara-primary/5 border border-gray-200 
                            hover:border-inovara-primary/30 rounded-md xs:rounded-lg sm:rounded-xl transition-all duration-200 
                            hover:shadow-sm cursor-pointer touch-manipulation active:scale-95 min-h-[32px] xs:min-h-[36px]
                            ${isRTL ? 'text-right' : 'text-left'}
                            break-words
                          `}
                        >
                          {suggestion}
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Actions */}
                  {message.actions && message.actions.length > 0 && (
                    <div className={`flex flex-wrap gap-1 xs:gap-1.5 sm:gap-2 ${isRTL ? 'justify-end' : 'justify-start'}`}>
                      {message.actions.map((action) => {
                        const IconComponent = action.icon;
                        return (
                          <button
                            key={action.id}
                            onClick={action.action}
                            className={`
                              flex items-center gap-1 xs:gap-1.5 sm:gap-2 px-2 xs:px-3 sm:px-4 py-1.5 xs:py-2 rounded-md xs:rounded-lg sm:rounded-xl text-[10px] xs:text-xs sm:text-sm font-medium
                              transition-all duration-200 hover:scale-105 active:scale-95 touch-manipulation min-h-[32px] xs:min-h-[36px]
                              ${action.type === 'primary'
                                ? 'bg-gradient-to-r from-inovara-primary to-inovara-secondary text-white hover:shadow-lg'
                                : 'bg-white border border-gray-200 text-gray-700 hover:border-inovara-primary/30 hover:bg-inovara-primary/5'
                              }
                              ${isRTL ? 'flex-row-reverse' : 'flex-row'}
                            `}
                          >
                            {IconComponent && <IconComponent className="w-3 h-3 xs:w-3.5 xs:h-3.5 sm:w-4 sm:h-4" />}
                            <span className="truncate">{action.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}

          {/* Typing Indicator */}
          {isTyping && (
            <div className={`flex ${isRTL ? 'justify-end' : 'justify-start'}`}>
              <div className={`flex items-start gap-1.5 xs:gap-2 sm:gap-3 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
                <div className="w-6 h-6 xs:w-7 xs:h-7 sm:w-8 sm:h-8 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center flex-shrink-0">
                  <Bot className="w-3 h-3 xs:w-3.5 xs:h-3.5 sm:w-4 sm:h-4" />
                </div>
                <div className="bg-white text-gray-800 px-2.5 xs:px-3 sm:px-4 py-2 xs:py-2.5 sm:py-3 rounded-lg xs:rounded-xl sm:rounded-2xl shadow-sm border border-gray-200">
                  <div className={`flex items-center gap-1 xs:gap-1.5 sm:gap-2 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
                    <Loader2 className="w-3 h-3 xs:w-3.5 xs:h-3.5 sm:w-4 sm:h-4 animate-spin" />
                    <span className={`text-[10px] xs:text-xs sm:text-sm ${isRTL ? 'text-right' : 'text-left'}`}>{t('chatbot.typing')}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Questions */}
        {messages.length === 1 && messages[0]?.id === 'welcome' && (
          <div className="px-2 xs:px-3 sm:px-4 pb-1.5 xs:pb-2 shrink-0 bg-white/50 backdrop-blur-sm">
            <p className={`text-[10px] xs:text-xs sm:text-sm text-gray-600 mb-1.5 xs:mb-2 sm:mb-3 font-medium ${isRTL ? 'text-right' : 'text-left'}`}>{t('chatbot.quickQuestions.title')}</p>
            <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 gap-1 xs:gap-1.5 sm:gap-2">
              {quickQuestions.map((question, index) => (
                <button
                  key={index}
                  onClick={() => handleQuickQuestion(question)}
                  className={`text-[10px] xs:text-xs p-2 xs:p-2.5 sm:p-3 bg-white hover:bg-inovara-primary/5 border border-gray-200 hover:border-inovara-primary/30 rounded-md xs:rounded-lg sm:rounded-xl transition-all duration-200 hover:shadow-sm touch-manipulation active:scale-95 min-h-[32px] xs:min-h-[36px] ${isRTL ? 'text-right' : 'text-left'} break-words`}
                >
                  {question}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input */}
        <div className="p-2 xs:p-3 sm:p-4 border-t border-gray-200/50 bg-white/95 backdrop-blur-sm shadow-lg shrink-0 sticky bottom-0">
          <div className={`flex items-center gap-1.5 xs:gap-2 sm:gap-3 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
            <div className="flex-1 relative">
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={t('chatbot.inputPlaceholder')}
                className={`
                  w-full px-2.5 xs:px-3 sm:px-4 py-2 xs:py-2.5 sm:py-3 border border-gray-200 rounded-md xs:rounded-lg sm:rounded-xl
                  focus:outline-none focus:ring-2 xs:focus:ring-2 sm:focus:ring-4 focus:ring-inovara-primary/20 focus:border-inovara-primary
                  text-xs xs:text-sm sm:text-sm placeholder-gray-500 bg-white/80 backdrop-blur-sm
                  transition-all duration-200 hover:border-gray-300
                  disabled:opacity-50 disabled:cursor-not-allowed
                  ${isRTL ? 'text-right' : 'text-left'}
                  touch-manipulation min-h-[44px] xs:min-h-[48px]
                `}
                dir={isRTL ? 'rtl' : 'ltr'}
                disabled={isTyping}
                aria-label={t('chatbot.inputPlaceholder')}
                aria-describedby="input-help"
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                spellCheck="false"
              />
              {/* Hidden help text for screen readers */}
              <div id="input-help" className="sr-only">
                {t('chatbot.inputPlaceholder')}. {isTyping ? t('chatbot.typing') : ''}
              </div>
            </div>
            <button
              onClick={handleSendMessage}
              disabled={!inputValue.trim() || isTyping}
              className={`
                relative p-2 xs:p-2.5 sm:p-3 text-white rounded-md xs:rounded-lg sm:rounded-xl transition-all duration-300 
                focus:outline-none focus:ring-2 xs:focus:ring-2 sm:focus:ring-4 focus:ring-inovara-primary/30
                group overflow-hidden min-w-[44px] min-h-[44px] xs:min-w-[48px] xs:min-h-[48px] sm:min-w-[48px] sm:min-h-[48px] flex items-center justify-center
                touch-manipulation
                ${!inputValue.trim() || isTyping
                  ? 'bg-gray-300 cursor-not-allowed'
                  : 'bg-gradient-to-r from-inovara-primary to-inovara-secondary hover:from-inovara-primary/90 hover:to-inovara-secondary/90 hover:shadow-lg hover:scale-105 active:scale-95'
                }
              `}
              aria-label={t('chatbot.sendMessage')}
              aria-disabled={!inputValue.trim() || isTyping}
            >
              {/* Background gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-md xs:rounded-lg sm:rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

              {/* Send Icon */}
              <Send className={`w-3.5 h-3.5 xs:w-4 xs:h-4 sm:w-5 sm:h-5 transition-transform duration-200 ${!inputValue.trim() || isTyping ? '' : 'group-hover:translate-x-0.5'}`} />

              {/* Loading spinner for typing state */}
              {isTyping && (
                <Loader2 className="absolute w-3 h-3 xs:w-3.5 xs:h-3.5 sm:w-4 sm:h-4 animate-spin" />
              )}

              {/* Subtle border glow */}
              <div className="absolute inset-0 rounded-md xs:rounded-lg sm:rounded-xl border border-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatbotWidget;
