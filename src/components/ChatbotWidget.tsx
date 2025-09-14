import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Bot, User, Loader2 } from 'lucide-react';
import { useTranslation } from '../contexts/TranslationContext';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

interface ChatbotWidgetProps {
  isOpen: boolean;
  onClose: () => void;
}

const ChatbotWidget: React.FC<ChatbotWidgetProps> = ({ isOpen, onClose }) => {
  const { t, isRTL } = useTranslation();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: t('chatbot.welcome'),
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Focus input when widget opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Sample responses for demo
  const getBotResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    
    if (message.includes('price') || message.includes('cost')) {
      return t('chatbot.responses.pricing');
    } else if (message.includes('product') || message.includes('machine')) {
      return t('chatbot.responses.products');
    } else if (message.includes('contact') || message.includes('phone') || message.includes('email')) {
      return t('chatbot.responses.contact');
    } else if (message.includes('quote') || message.includes('request')) {
      return t('chatbot.responses.quote');
    } else if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
      return t('chatbot.responses.greeting');
    } else {
      return t('chatbot.responses.default');
    }
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue.trim(),
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate bot response delay
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getBotResponse(userMessage.text),
        sender: 'bot',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000); // Random delay between 1-2 seconds
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
    <div className="fixed inset-0 z-50 flex items-end justify-end p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Chat Widget */}
      <div className={`
        relative w-full max-w-md h-[600px] bg-white rounded-2xl shadow-2xl
        flex flex-col overflow-hidden transform transition-all duration-300
        ${isRTL ? 'rtl' : 'ltr'}
      `}>
        {/* Header */}
        <div className="bg-gradient-to-r from-inovara-primary to-inovara-secondary p-4 flex items-center justify-between">
          <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
              <Bot className="w-6 h-6 text-white" />
            </div>
            <div className={isRTL ? 'text-right' : 'text-left'}>
              <h3 className="text-white font-bold text-lg">{t('chatbot.title')}</h3>
              <p className="text-white/80 text-sm">{t('chatbot.subtitle')}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors duration-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`
                flex items-start gap-3 max-w-[80%]
                ${message.sender === 'user' ? (isRTL ? 'flex-row-reverse' : 'flex-row') : (isRTL ? 'flex-row-reverse' : 'flex-row')}
              `}>
                {/* Avatar */}
                <div className={`
                  w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0
                  ${message.sender === 'user' 
                    ? 'bg-inovara-primary text-white' 
                    : 'bg-gray-100 text-gray-600'
                  }
                `}>
                  {message.sender === 'user' ? (
                    <User className="w-4 h-4" />
                  ) : (
                    <Bot className="w-4 h-4" />
                  )}
                </div>
                
                {/* Message Bubble */}
                <div className={`
                  px-4 py-3 rounded-2xl text-sm
                  ${message.sender === 'user'
                    ? 'bg-inovara-primary text-white'
                    : 'bg-gray-100 text-gray-800'
                  }
                `}>
                  <p className={isRTL ? 'text-right' : 'text-left'}>{message.text}</p>
                  <p className={`
                    text-xs mt-1 opacity-70
                    ${isRTL ? 'text-right' : 'text-left'}
                  `}>
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            </div>
          ))}
          
          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex justify-start">
              <div className={`flex items-start gap-3 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
                <div className="w-8 h-8 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center flex-shrink-0">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="bg-gray-100 text-gray-800 px-4 py-3 rounded-2xl">
                  <div className="flex items-center gap-1">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span className="text-sm">{t('chatbot.typing')}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Questions */}
        {messages.length === 1 && (
          <div className="px-4 pb-2">
            <p className="text-sm text-gray-600 mb-3 font-medium">{t('chatbot.quickQuestions.title')}</p>
            <div className="grid grid-cols-2 gap-2">
              {quickQuestions.map((question, index) => (
                <button
                  key={index}
                  onClick={() => handleQuickQuestion(question)}
                  className="text-xs p-2 bg-gray-50 hover:bg-gray-100 rounded-lg text-left transition-colors duration-200"
                >
                  {question}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input */}
        <div className="p-4 border-t border-gray-200">
          <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={t('chatbot.inputPlaceholder')}
              className={`
                flex-1 px-4 py-3 border border-gray-300 rounded-xl
                focus:outline-none focus:ring-2 focus:ring-inovara-accent/20 focus:border-inovara-accent
                text-sm placeholder-gray-500
                ${isRTL ? 'text-right' : 'text-left'}
              `}
              disabled={isTyping}
            />
            <button
              onClick={handleSendMessage}
              disabled={!inputValue.trim() || isTyping}
              className="p-3 bg-gradient-to-r from-inovara-primary to-inovara-secondary text-white rounded-xl hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatbotWidget;
