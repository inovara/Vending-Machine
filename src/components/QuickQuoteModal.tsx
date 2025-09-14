import React, { useState } from 'react';
import { X, Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { useMutation } from '@tanstack/react-query';
import { useTranslation } from '../contexts/TranslationContext';
import { storeQuote } from '../network/quote';
import { QuoteFormData, QuoteResponse } from '../types/api';

interface QuickQuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const QuickQuoteModal: React.FC<QuickQuoteModalProps> = ({ isOpen, onClose }) => {
  const { t, isRTL } = useTranslation();
  const [formData, setFormData] = useState<QuoteFormData>({
    name: '',
    email: '',
    phone: '',
    company: '',
    industry: '',
    machines: '',
    budget: '',
    message: ''
  });
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Mutation for quote submission
  const { 
    mutate: submitQuote, 
    isLoading, 
    isSuccess 
  } = useMutation<QuoteResponse, Error, QuoteFormData>({
    mutationFn: storeQuote,
    onSuccess: () => {
      setSubmitError(null);
      // Reset form after successful submission
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        industry: '',
        machines: '',
        budget: '',
        message: ''
      });
    },
    onError: (error) => {
      setSubmitError(error.message || 'Failed to submit quote. Please try again.');
    },
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (submitError) setSubmitError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.email || !formData.company || !formData.industry) {
      setSubmitError('Please fill in all required fields.');
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setSubmitError('Please enter a valid email address.');
      return;
    }

    submitQuote(formData);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      company: '',
      industry: '',
      machines: '',
      budget: '',
      message: ''
    });
    setSubmitError(null);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white/95 backdrop-blur-md border border-inovara-primary/20 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="p-8">
          {/* Header */}
          <div className={`flex items-center justify-between mb-8 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
            <div className={`flex items-center gap-4 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
              <div className={isRTL ? 'text-right' : 'text-left'}>
                <h2 className="text-3xl font-black text-inovara-primary mb-1">{t('quote.title')}</h2>
                <p className="text-inovara-primary/70 text-sm font-medium">{t('quote.subtitle')}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-3 text-inovara-primary/60 hover:text-inovara-primary hover:bg-inovara-primary/10 rounded-xl transition-all duration-300 group"
            >
              <X className="w-6 h-6 group-hover:rotate-90 transition-transform duration-300" />
            </button>
          </div>

          {/* Error Message */}
          {submitError && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-2xl flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
              <p className="text-red-700 text-sm font-medium">{submitError}</p>
            </div>
          )}

          {!isSuccess ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Quick Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className={`block text-inovara-primary font-bold text-sm mb-3 ${isRTL ? 'text-right' : 'text-left'}`}>
                    {t('quote.name')} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-4 bg-white border-2 border-inovara-primary/20 rounded-2xl text-inovara-primary placeholder-inovara-primary/50 focus:border-inovara-accent focus:ring-4 focus:ring-inovara-accent/20 focus:outline-none transition-all duration-300 ${isRTL ? 'text-right' : 'text-left'}`}
                    placeholder={t('quote.name')}
                    required
                  />
                </div>
                <div>
                  <label className={`block text-inovara-primary font-bold text-sm mb-3 ${isRTL ? 'text-right' : 'text-left'}`}>
                    {t('quote.email')} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-4 bg-white border-2 border-inovara-primary/20 rounded-2xl text-inovara-primary placeholder-inovara-primary/50 focus:border-inovara-accent focus:ring-4 focus:ring-inovara-accent/20 focus:outline-none transition-all duration-300 ${isRTL ? 'text-right' : 'text-left'}`}
                    placeholder={t('quote.email')}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className={`block text-inovara-primary font-bold text-sm mb-3 ${isRTL ? 'text-right' : 'text-left'}`}>
                    {t('quote.phone')}
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-4 bg-white border-2 border-inovara-primary/20 rounded-2xl text-inovara-primary placeholder-inovara-primary/50 focus:border-inovara-accent focus:ring-4 focus:ring-inovara-accent/20 focus:outline-none transition-all duration-300 ${isRTL ? 'text-right' : 'text-left'}`}
                    placeholder={t('quote.phone')}
                  />
                </div>
                <div>
                  <label className={`block text-inovara-primary font-bold text-sm mb-3 ${isRTL ? 'text-right' : 'text-left'}`}>
                    {t('quote.company')} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-4 bg-white border-2 border-inovara-primary/20 rounded-2xl text-inovara-primary placeholder-inovara-primary/50 focus:border-inovara-accent focus:ring-4 focus:ring-inovara-accent/20 focus:outline-none transition-all duration-300 ${isRTL ? 'text-right' : 'text-left'}`}
                    placeholder={t('quote.company')}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className={`block text-inovara-primary font-bold text-sm mb-3 ${isRTL ? 'text-right' : 'text-left'}`}>
                    {t('quote.industry')} <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="industry"
                    value={formData.industry}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-4 bg-white border-2 border-inovara-primary/20 rounded-2xl text-inovara-primary focus:border-inovara-accent focus:ring-4 focus:ring-inovara-accent/20 focus:outline-none transition-all duration-300 ${isRTL ? 'text-right' : 'text-left'}`}
                    required
                  >
                    <option value="" className="text-inovara-primary/50">{t('quote.industry')}</option>
                    <option value="corporate" className="text-inovara-primary">{t('quote.industryOptions.office')}</option>
                    <option value="healthcare" className="text-inovara-primary">{t('quote.industryOptions.healthcare')}</option>
                    <option value="education" className="text-inovara-primary">{t('quote.industryOptions.education')}</option>
                    <option value="retail" className="text-inovara-primary">{t('quote.industryOptions.retail')}</option>
                    <option value="manufacturing" className="text-inovara-primary">{t('quote.industryOptions.manufacturing')}</option>
                    <option value="hospitality" className="text-inovara-primary">{t('quote.industryOptions.hospitality')}</option>
                    <option value="other" className="text-inovara-primary">{t('quote.industryOptions.other')}</option>
                  </select>
                </div>
                <div>
                  <label className={`block text-inovara-primary font-bold text-sm mb-3 ${isRTL ? 'text-right' : 'text-left'}`}>
                    {t('quote.machines')}
                  </label>
                  <select
                    name="machines"
                    value={formData.machines}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-4 bg-white border-2 border-inovara-primary/20 rounded-2xl text-inovara-primary focus:border-inovara-accent focus:ring-4 focus:ring-inovara-accent/20 focus:outline-none transition-all duration-300 ${isRTL ? 'text-right' : 'text-left'}`}
                  >
                    <option value="" className="text-inovara-primary/50">{t('quote.machines')}</option>
                    <option value="1-5" className="text-inovara-primary">{t('quote.machineOptions.1-5')}</option>
                    <option value="6-20" className="text-inovara-primary">{t('quote.machineOptions.6-20')}</option>
                    <option value="21-50" className="text-inovara-primary">{t('quote.machineOptions.21-50')}</option>
                    <option value="51-100" className="text-inovara-primary">{t('quote.machineOptions.51-100')}</option>
                    <option value="100+" className="text-inovara-primary">{t('quote.machineOptions.100+')}</option>
                  </select>
                </div>
              </div>

              {/* Budget Field */}
              <div>
                <label className={`block text-inovara-primary font-bold text-sm mb-3 ${isRTL ? 'text-right' : 'text-left'}`}>
                  {t('quote.budget')}
                </label>
                <select
                  name="budget"
                  value={formData.budget}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-4 bg-white border-2 border-inovara-primary/20 rounded-2xl text-inovara-primary focus:border-inovara-accent focus:ring-4 focus:ring-inovara-accent/20 focus:outline-none transition-all duration-300 ${isRTL ? 'text-right' : 'text-left'}`}
                >
                  <option value="" className="text-inovara-primary/50">{t('quote.budget')}</option>
                  <option value="under-10k" className="text-inovara-primary">{t('quote.budgetOptions.under10k')}</option>
                  <option value="10k-50k" className="text-inovara-primary">{t('quote.budgetOptions.10k50k')}</option>
                  <option value="50k-100k" className="text-inovara-primary">{t('quote.budgetOptions.50k100k')}</option>
                  <option value="100k-500k" className="text-inovara-primary">{t('quote.budgetOptions.100k500k')}</option>
                  <option value="500k+" className="text-inovara-primary">{t('quote.budgetOptions.500k+')}</option>
                </select>
              </div>

              <div>
                <label className={`block text-inovara-primary font-bold text-sm mb-3 ${isRTL ? 'text-right' : 'text-left'}`}>
                  {t('quote.requirements')}
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={4}
                  className={`w-full px-4 py-4 bg-white border-2 border-inovara-primary/20 rounded-2xl text-inovara-primary placeholder-inovara-primary/50 focus:border-inovara-accent focus:ring-4 focus:ring-inovara-accent/20 focus:outline-none transition-all duration-300 resize-none ${isRTL ? 'text-right' : 'text-left'}`}
                  placeholder={t('quote.requirementsPlaceholder')}
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full group/btn relative overflow-hidden bg-gradient-to-r from-inovara-primary to-inovara-secondary text-white font-bold py-4 px-8 rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none focus:outline-none focus:ring-4 focus:ring-inovara-accent/30"
              >
                {isLoading ? (
                  <span className={`flex items-center justify-center gap-3 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    {t('common.loading')}...
                  </span>
                ) : (
                  <span className={`flex items-center justify-center gap-3 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
                    <Send className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform duration-300" />
                    {t('quote.submit')}
                  </span>
                )}
                
                {/* Button Hover Effect */}
                <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-500 skew-x-12"></div>
              </button>
            </form>
          ) : (
            <div className={`text-center py-12 ${isRTL ? 'rtl' : 'ltr'}`}>
              <div className="w-24 h-24 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl">
                <CheckCircle className="h-12 w-12 text-white" />
              </div>
              <h3 className="text-3xl font-black text-inovara-primary mb-4">Quote Request Sent!</h3>
              <p className="text-inovara-primary/70 text-lg font-medium mb-8 max-w-md mx-auto leading-relaxed">
                Thank you for your interest! We'll send you a detailed quote within 24 hours.
              </p>
              <div className={`flex flex-col sm:flex-row gap-4 justify-center ${isRTL ? 'sm:flex-row-reverse' : ''}`}>
                <button
                  onClick={resetForm}
                  className="group px-8 py-4 bg-gradient-to-r from-inovara-primary to-inovara-secondary text-white font-bold rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-inovara-accent/30"
                >
                  <span className={`flex items-center justify-center gap-3 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
                    <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                    Request Another Quote
                  </span>
                </button>
                <button
                  onClick={onClose}
                  className="px-8 py-4 border-2 border-inovara-primary text-inovara-primary font-bold rounded-2xl hover:bg-inovara-primary hover:text-white transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-inovara-primary/20"
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
