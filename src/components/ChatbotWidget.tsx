import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, Send, X, Sparkles } from 'lucide-react';
import { useTranslation } from '../contexts/TranslationContext';

interface ChatMessage {
  id: string;
  role: 'user' | 'bot';
  text: string;
}

const ChatbotWidget: React.FC = () => {
  const { t, isRTL } = useTranslation();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open && messages.length === 0) {
      setMessages([
        { id: 'welcome', role: 'bot', text: t('chatbot.welcome') },
      ]);
    }
  }, [open]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, open]);

  const handleSend = () => {
    const trimmed = input.trim();
    if (!trimmed) return;
    const userMsg: ChatMessage = { id: `${Date.now()}-u`, role: 'user', text: trimmed };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');

    // Simple heuristic replies to capture leads and guide users
    setTimeout(() => {
      let reply = t('chatbot.fallback');
      const lower = trimmed.toLowerCase();
      if (lower.includes('price') || lower.includes('quote')) reply = t('chatbot.reply.quote');
      else if (lower.includes('product') || lower.includes('machine')) reply = t('chatbot.reply.products');
      else if (lower.includes('support')) reply = t('chatbot.reply.support');
      else if (lower.includes('contact')) reply = t('chatbot.reply.contact');

      const botMsg: ChatMessage = { id: `${Date.now()}-b`, role: 'bot', text: reply };
      setMessages((prev) => [...prev, botMsg]);
    }, 400);
  };

  return (
    <div className={`fixed z-40 ${isRTL ? 'left-6' : 'right-6'} bottom-12`}> {/* offset above quote button */}
      {/* Toggle Button */}
      <button
        onClick={() => setOpen(!open)}
        className="group relative bg-gradient-to-r from-inovara-secondary to-inovara-accent text-white font-bold rounded-full p-4 shadow-2xl hover:shadow-inovara-accent/25 transition-all duration-300 transform hover:scale-110"
        aria-label={open ? t('chatbot.close') : t('chatbot.open')}
      >
        {open ? <X className="w-6 h-6" aria-hidden="true" /> : <MessageCircle className="w-6 h-6" aria-hidden="true" />}
        <div className={`absolute bottom-full mb-2 px-3 py-2 bg-luxury-charcoal text-white text-sm font-medium rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap ${isRTL ? 'left-0' : 'right-0'}`}>
          {open ? t('chatbot.close') : t('chatbot.open')}
        </div>
      </button>

      {/* Panel */}
      {open && (
        <div className={`mt-3 w-80 max-w-[90vw] bg-white/90 backdrop-blur-md border border-inovara-neutral-20 rounded-2xl shadow-2xl overflow-hidden ${isRTL ? 'text-right' : 'text-left'}`}>
          <div className="px-4 py-3 bg-gradient-to-r from-inovara-primary-10 to-inovara-secondary-10 flex items-center justify-between">
            <div className={`flex items-center ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
              <Sparkles className={`w-4 h-4 text-inovara-accent ${isRTL ? 'ml-2' : 'mr-2'}`} aria-hidden="true" />
              <span className="text-inovara-primary font-semibold text-sm">{t('chatbot.title')}</span>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="text-inovara-primary/70 hover:text-inovara-primary"
              aria-label={t('chatbot.close')}
            >
              <X className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>

          <div ref={scrollRef} className="max-h-72 overflow-y-auto px-4 py-3 space-y-2">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`text-sm leading-relaxed ${m.role === 'bot' ? 'text-inovara-primary' : 'text-inovara-primary'} ${m.role === 'bot' ? 'bg-inovara-neutral-10' : 'bg-inovara-accent-10'} rounded-xl px-3 py-2 ${isRTL ? (m.role === 'bot' ? 'mr-10' : 'ml-10') : (m.role === 'bot' ? 'ml-10' : 'mr-10')}`}
              >
                {m.text}
              </div>
            ))}
          </div>

          <div className={`p-3 border-t border-inovara-neutral-20 ${isRTL ? 'text-right' : 'text-left'}`}>
            <div className={`flex items-center ${isRTL ? 'flex-row-reverse' : 'flex-row'} gap-2`}>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                className="flex-1 px-3 py-2 bg-white/70 border border-inovara-neutral-30 rounded-lg text-inovara-primary placeholder-inovara-primary/40 focus:outline-none focus:ring-2 focus:ring-inovara-accent/40"
                placeholder={t('chatbot.placeholder')}
                aria-label={t('chatbot.placeholder')}
              />
              <button
                onClick={handleSend}
                className="btn-enterprise px-4 py-2"
                aria-label={t('chatbot.send')}
              >
                <Send className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatbotWidget;
