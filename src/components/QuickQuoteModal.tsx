import React, { useState } from 'react';
import { X, Send, ShoppingCart } from 'lucide-react';
import { useTranslation } from '../contexts/TranslationContext';

interface QuickQuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const QuickQuoteModal: React.FC<QuickQuoteModalProps> = ({ isOpen, onClose }) => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    industry: '',
    machinesNeeded: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 2000);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      company: '',
      industry: '',
      machinesNeeded: '',
      message: ''
    });
    setIsSubmitted(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gradient-to-br from-luxury-steel/95 to-luxury-charcoal/95 backdrop-blur-md border border-white/10 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-inovara-primary to-inovara-secondary rounded-xl flex items-center justify-center">
                <ShoppingCart className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">{t('quote.title')}</h2>
                <p className="text-white/70 text-sm">{t('quote.subtitle')}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-white/60 hover:text-white hover:bg-white/10 rounded-lg transition-colors duration-300"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Quick Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-white/80 text-sm font-medium mb-2">{t('quote.name')} *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-luxury-charcoal/50 border border-white/20 rounded-xl text-white placeholder-white/50 focus:border-inovara-accent focus:ring-2 focus:ring-inovara-accent/20 focus:outline-none transition-all duration-300"
                    placeholder={t('quote.name')}
                    required
                  />
                </div>
                <div>
                  <label className="block text-white/80 text-sm font-medium mb-2">{t('quote.email')} *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-luxury-charcoal/50 border border-white/20 rounded-xl text-white placeholder-white/50 focus:border-inovara-accent focus:ring-2 focus:ring-inovara-accent/20 focus:outline-none transition-all duration-300"
                    placeholder={t('quote.email')}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-white/80 text-sm font-medium mb-2">{t('quote.phone')}</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-luxury-charcoal/50 border border-white/20 rounded-xl text-white placeholder-white/50 focus:border-inovara-accent focus:ring-2 focus:ring-inovara-accent/20 focus:outline-none transition-all duration-300"
                    placeholder={t('quote.phone')}
                  />
                </div>
                <div>
                  <label className="block text-white/80 text-sm font-medium mb-2">{t('quote.company')} *</label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-luxury-charcoal/50 border border-white/20 rounded-xl text-white placeholder-white/50 focus:border-inovara-accent focus:ring-2 focus:ring-inovara-accent/20 focus:outline-none transition-all duration-300"
                    placeholder={t('quote.company')}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-white/80 text-sm font-medium mb-2">{t('quote.industry')} *</label>
                  <select
                    name="industry"
                    value={formData.industry}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-luxury-charcoal/50 border border-white/20 rounded-xl text-white focus:border-inovara-accent focus:ring-2 focus:ring-inovara-accent/20 focus:outline-none transition-all duration-300"
                    required
                  >
                    <option value="" className="bg-luxury-charcoal">{t('quote.industry')}</option>
                    <option value="corporate" className="bg-luxury-charcoal">{t('quote.industryOptions.office')}</option>
                    <option value="healthcare" className="bg-luxury-charcoal">{t('quote.industryOptions.healthcare')}</option>
                    <option value="education" className="bg-luxury-charcoal">{t('quote.industryOptions.education')}</option>
                    <option value="retail" className="bg-luxury-charcoal">{t('quote.industryOptions.retail')}</option>
                    <option value="manufacturing" className="bg-luxury-charcoal">{t('quote.industryOptions.manufacturing')}</option>
                    <option value="hospitality" className="bg-luxury-charcoal">{t('quote.industryOptions.hospitality')}</option>
                    <option value="other" className="bg-luxury-charcoal">{t('quote.industryOptions.other')}</option>
                  </select>
                </div>
                <div>
                  <label className="block text-white/80 text-sm font-medium mb-2">{t('quote.machines')}</label>
                  <select
                    name="machinesNeeded"
                    value={formData.machinesNeeded}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-luxury-charcoal/50 border border-white/20 rounded-xl text-white focus:border-inovara-accent focus:ring-2 focus:ring-inovara-accent/20 focus:outline-none transition-all duration-300"
                  >
                    <option value="" className="bg-luxury-charcoal">{t('quote.machines')}</option>
                    <option value="1-5" className="bg-luxury-charcoal">{t('quote.machineOptions.1-5')}</option>
                    <option value="6-20" className="bg-luxury-charcoal">{t('quote.machineOptions.6-20')}</option>
                    <option value="21-50" className="bg-luxury-charcoal">{t('quote.machineOptions.21-50')}</option>
                    <option value="51-100" className="bg-luxury-charcoal">{t('quote.machineOptions.51-100')}</option>
                    <option value="100+" className="bg-luxury-charcoal">{t('quote.machineOptions.100+')}</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-white/80 text-sm font-medium mb-2">{t('quote.requirements')}</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-4 py-3 bg-luxury-charcoal/50 border border-white/20 rounded-xl text-white placeholder-white/50 focus:border-inovara-accent focus:ring-2 focus:ring-inovara-accent/20 focus:outline-none transition-all duration-300 resize-none"
                  placeholder={t('quote.requirementsPlaceholder')}
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-8 py-4 bg-gradient-to-r from-inovara-primary to-inovara-secondary text-white font-semibold rounded-xl shadow-2xl hover:shadow-inovara-primary/25 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                    {t('common.loading')}...
                  </span>
                ) : (
                  <span className="flex items-center justify-center">
                    <Send className="mr-2 h-5 w-5" />
                    {t('quote.submit')}
                  </span>
                )}
              </button>
            </form>
          ) : (
            <div className="text-center py-8">
              <div className="w-20 h-20 bg-gradient-to-r from-inovara-primary to-inovara-secondary rounded-full flex items-center justify-center mx-auto mb-6">
                <Send className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Quote Request Sent!</h3>
              <p className="text-white/80 mb-6">
                Thank you for your interest! We'll send you a detailed quote within 24 hours.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={resetForm}
                  className="px-6 py-3 bg-inovara-accent text-white font-semibold rounded-xl hover:bg-inovara-accent/80 transition-colors duration-300"
                >
                  Request Another Quote
                </button>
                <button
                  onClick={onClose}
                  className="px-6 py-3 border border-white/20 text-white font-semibold rounded-xl hover:bg-white/10 transition-colors duration-300"
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuickQuoteModal;
