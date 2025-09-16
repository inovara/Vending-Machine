import React, { useState, useRef } from 'react';
import { Mail, Phone, MapPin, Send, ArrowRight, CheckCircle, AlertCircle, Building2 } from 'lucide-react';
import { useMutation } from '@tanstack/react-query';
import { useTranslation } from '../contexts/TranslationContext';
import { contactUs } from '../network/contact';
import { ContactFormData, ContactResponse } from '../types/api';
import QuickQuoteModal from './QuickQuoteModal';

const ContactSection: React.FC = () => {
  const { t, isRTL } = useTranslation();
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (submitError) setSubmitError(null);
  };

  const { mutate: sendContactMessage, isLoading } = useMutation<ContactResponse, Error, ContactFormData>({
    mutationFn: contactUs,
    onSuccess: () => {
      setIsSubmitted(true);
      setSubmitError(null);
      // Reset form after successful submission
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        message: ''
      });
    },
    onError: (error) => {
      setSubmitError(error.message || t('contact.error.generic'));
      setIsSubmitted(false);
    }
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name.trim() || !formData.email.trim()) {
      setSubmitError(t('contact.error.requiredFields'));
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setSubmitError(t('contact.error.invalidEmail'));
      return;
    }

    sendContactMessage(formData);
  };


  return (
    <section
      ref={sectionRef}
      id="contact"
      className={`relative py-20 px-6 overflow-hidden ${isRTL ? 'rtl' : 'ltr'}`}
      style={{
        background: 'linear-gradient(135deg, rgba(255,255,255,1) 0%, rgba(245,245,245,0.8) 50%, rgba(255,255,255,1) 100%)'
      }}
    >
      {/* Minimal Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-inovara-accent/6 to-inovara-secondary/6 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-gradient-to-tr from-inovara-primary/5 to-inovara-accent/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* B2B Section Header */}
        <div className={`text-center mb-16 ${isRTL ? 'rtl' : 'ltr'}`}>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-inovara-primary tracking-tight mb-6 leading-[0.9]">
            {t('contact.title')}
          </h2>
          
          {/* Professional Divider */}
          <div className="w-20 h-1 bg-gradient-to-r from-inovara-accent to-inovara-secondary mx-auto mb-8 rounded-full"></div>
          
          <div className="max-w-3xl mx-auto">
            <p className="text-lg md:text-xl text-inovara-primary/80 font-medium leading-relaxed">
              {t('contact.description')}
            </p>
          </div>
        </div>

        {/* B2B Contact Layout */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Contact Information */}
          <div className={`bg-white/90 backdrop-blur-sm border border-inovara-primary/15 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 ${isRTL ? 'rtl lg:order-2' : 'ltr lg:order-1'}`}>
            <div className={`mb-8 ${isRTL ? 'text-right' : 'text-left'}`}>
              <h3 className="text-2xl font-bold text-inovara-primary mb-3">{t('contact.company.name')}</h3>
              <p className="text-inovara-primary/70 text-base font-medium">{t('contact.company.tagline')}</p>
            </div>
            
            <div className="space-y-4">
              <div className={`flex items-center ${isRTL ? 'space-x-reverse space-x-3 flex-row-reverse' : 'space-x-3 flex-row'} p-4 rounded-xl bg-white/80 hover:bg-white transition-all duration-300 border border-inovara-primary/10 hover:border-inovara-accent/30`}>
                <div className="w-10 h-10 bg-gradient-to-br from-inovara-accent to-inovara-accent/80 rounded-lg flex items-center justify-center shadow-md">
                  <Mail className="w-5 h-5 text-white" />
                </div>
                <div className={`flex-1 ${isRTL ? 'text-right' : 'text-left'}`}>
                  <div className="text-sm text-inovara-primary/60 font-medium mb-1">{t('info.emailLabel')}</div>
                  <div className="text-inovara-primary font-semibold">{t('info.email')}</div>
                </div>
              </div>
              
              <div className={`flex items-center ${isRTL ? 'space-x-reverse space-x-3 flex-row-reverse' : 'space-x-3 flex-row'} p-4 rounded-xl bg-white/80 hover:bg-white transition-all duration-300 border border-inovara-primary/10 hover:border-inovara-accent/30`}>
                <div className="w-10 h-10 bg-gradient-to-br from-inovara-secondary to-inovara-secondary/80 rounded-lg flex items-center justify-center shadow-md">
                  <Phone className="w-5 h-5 text-white" />
                </div>
                <div className={`flex-1 ${isRTL ? 'text-right' : 'text-left'}`}>
                  <div className="text-sm text-inovara-primary/60 font-medium mb-1">{t('info.phoneLabel')}</div>
                  <div className="text-inovara-primary font-semibold">{t('info.phone')}</div>
                </div>
              </div>
              
              <div className={`flex items-center ${isRTL ? 'space-x-reverse space-x-3 flex-row-reverse' : 'space-x-3 flex-row'} p-4 rounded-xl bg-white/80 hover:bg-white transition-all duration-300 border border-inovara-primary/10 hover:border-inovara-accent/30`}>
                <div className="w-10 h-10 bg-gradient-to-br from-inovara-primary to-inovara-primary/80 rounded-lg flex items-center justify-center shadow-md">
                  <MapPin className="w-5 h-5 text-white" />
                </div>
                <div className={`flex-1 ${isRTL ? 'text-right' : 'text-left'}`}>
                  <div className="text-sm text-inovara-primary/60 font-medium mb-1">{t('info.addressLabel')}</div>
                  <div className="text-inovara-primary font-semibold">{t('info.address')}</div>
                </div>
              </div>
            </div>

            {/* Response Time */}
            <div className={`mt-8 p-4 rounded-xl bg-gradient-to-r from-inovara-accent/10 to-inovara-secondary/10 border border-inovara-accent/20 text-center ${isRTL ? 'rtl' : 'ltr'}`}>
              <div className="text-inovara-primary/70 text-sm font-medium mb-1">{t('contact.response.time')}</div>
              <div className="text-inovara-accent font-bold text-lg">{t('contact.response.within24Hours')}</div>
            </div>
          </div>

          {/* Contact Form */}
          <div className={`bg-white/90 backdrop-blur-sm border border-inovara-primary/15 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 ${isRTL ? 'rtl lg:order-1' : 'ltr lg:order-2'}`}>
            <div className={`mb-8 ${isRTL ? 'text-right' : 'text-left'}`}>
              <h3 className="text-2xl font-bold text-inovara-primary mb-3">{t('contact.form.title')}</h3>
              <p className="text-inovara-primary/70 text-base font-medium">{t('contact.form.subtitle')}</p>
            </div>
                
            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className={`space-y-6 ${isRTL ? 'rtl' : 'ltr'}`}>
                {/* Error Message */}
                {submitError && (
                  <div className={`flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-xl ${isRTL ? 'flex-row-reverse text-right' : 'flex-row text-left'}`}>
                    <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                    <span className="text-red-700 font-medium">{submitError}</span>
                  </div>
                )}
                
                {/* Name and Email */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div className={isRTL ? 'md:order-2' : 'md:order-1'}>
                    <label className={`block text-inovara-primary text-sm font-bold mb-2 ${isRTL ? 'text-right' : 'text-left'}`}>{t('contact.form.name')} *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      dir={isRTL ? 'rtl' : 'ltr'}
                      className={`w-full px-4 py-3 bg-white border-2 border-inovara-primary/15 rounded-xl text-inovara-primary placeholder-inovara-primary/60 focus:outline-none transition-all duration-300 focus:ring-4 focus:ring-inovara-accent/20 focus:border-inovara-accent ${isRTL ? 'text-right' : 'text-left'} hover:border-inovara-accent/30`}
                      placeholder={t('contact.form.name')}
                      required
                    />
                  </div>
                  <div className={isRTL ? 'md:order-1' : 'md:order-2'}>
                    <label className={`block text-inovara-primary text-sm font-bold mb-2 ${isRTL ? 'text-right' : 'text-left'}`}>{t('contact.form.email')} *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      dir={isRTL ? 'rtl' : 'ltr'}
                      className={`w-full px-4 py-3 bg-white border-2 border-inovara-primary/15 rounded-xl text-inovara-primary placeholder-inovara-primary/60 focus:outline-none transition-all duration-300 focus:ring-4 focus:ring-inovara-accent/20 focus:border-inovara-accent ${isRTL ? 'text-right' : 'text-left'} hover:border-inovara-accent/30`}
                      placeholder={t('contact.form.email')}
                      required
                    />
                  </div>
                </div>

                {/* Company and Phone */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div className={isRTL ? 'md:order-2' : 'md:order-1'}>
                    <label className={`block text-inovara-primary text-sm font-bold mb-2 ${isRTL ? 'text-right' : 'text-left'}`}>{t('contact.form.company')}</label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      dir={isRTL ? 'rtl' : 'ltr'}
                      className={`w-full px-4 py-3 bg-white border-2 border-inovara-primary/15 rounded-xl text-inovara-primary placeholder-inovara-primary/60 focus:outline-none transition-all duration-300 focus:ring-4 focus:ring-inovara-accent/20 focus:border-inovara-accent ${isRTL ? 'text-right' : 'text-left'} hover:border-inovara-accent/30`}
                      placeholder={t('contact.form.company')}
                    />
                  </div>
                  <div className={isRTL ? 'md:order-1' : 'md:order-2'}>
                    <label className={`block text-inovara-primary text-sm font-bold mb-2 ${isRTL ? 'text-right' : 'text-left'}`}>{t('contact.form.phone')}</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      dir={isRTL ? 'rtl' : 'ltr'}
                      className={`w-full px-4 py-3 bg-white border-2 border-inovara-primary/15 rounded-xl text-inovara-primary placeholder-inovara-primary/60 focus:outline-none transition-all duration-300 focus:ring-4 focus:ring-inovara-accent/20 focus:border-inovara-accent ${isRTL ? 'text-right' : 'text-left'} hover:border-inovara-accent/30`}
                      placeholder={t('contact.form.phone')}
                    />
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className={`block text-inovara-primary text-sm font-bold mb-2 ${isRTL ? 'text-right' : 'text-left'}`}>{t('contact.form.message')}</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    dir={isRTL ? 'rtl' : 'ltr'}
                    rows={4}
                    className={`w-full px-4 py-3 bg-white border-2 border-inovara-primary/15 rounded-xl text-inovara-primary placeholder-inovara-primary/60 focus:outline-none transition-all duration-300 focus:ring-4 focus:ring-inovara-accent/20 focus:border-inovara-accent resize-none ${isRTL ? 'text-right' : 'text-left'} hover:border-inovara-accent/30`}
                    placeholder={t('contact.form.messagePlaceholder')}
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full px-6 py-4 bg-gradient-to-r from-inovara-primary to-inovara-secondary text-white font-bold text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {isLoading ? (
                    <span className={`flex items-center justify-center ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
                      <div className={`animate-spin rounded-full h-5 w-5 border-b-2 border-white ${isRTL ? 'ml-3' : 'mr-3'}`}></div>
                      {t('contact.form.sending')}
                    </span>
                  ) : (
                    <span className={`flex items-center justify-center ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
                      {t('contact.form.submit')}
                      <Send className={`${isRTL ? 'mr-3' : 'ml-3'} h-5 w-5`} />
                    </span>
                  )}
                </button>
              </form>
            ) : (
              <div className={`text-center py-12 ${isRTL ? 'rtl' : 'ltr'}`}>
                <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl ring-4 ring-green-200">
                  <CheckCircle className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-inovara-primary mb-4">{t('contact.success.title')}</h3>
                <p className="text-inovara-primary/70 mb-6 text-base leading-relaxed max-w-md mx-auto">{t('contact.success.message')}</p>
                <button
                  onClick={() => {
                    setIsSubmitted(false);
                    setSubmitError(null);
                  }}
                  className={`border-2 border-inovara-accent/30 text-inovara-primary bg-inovara-accent/10 hover:bg-inovara-accent/20 transition-all duration-300 flex items-center justify-center focus:ring-4 focus:ring-inovara-accent/20 px-6 py-3 rounded-xl font-semibold shadow-md hover:shadow-lg mx-auto ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}
                >
                  {t('contact.success.submitAnother')}
                  <ArrowRight className={`${isRTL ? 'mr-3' : 'ml-3'} h-5 w-5`} />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* B2B CTA Section */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-inovara-primary/5 to-inovara-secondary/5 rounded-2xl p-8 border border-inovara-primary/20">
            <h3 className="text-2xl md:text-3xl font-bold text-inovara-primary mb-4">
              {t('contact.cta.title')}
            </h3>
            <p className="text-lg text-inovara-primary/70 font-medium leading-relaxed mb-6 max-w-2xl mx-auto">
              {t('contact.cta.description')}
            </p>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="group px-8 py-4 bg-gradient-to-r from-inovara-primary to-inovara-secondary text-white font-bold text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-inovara-accent/30"
            >
              <span className={`flex items-center justify-center ${isRTL ? 'flex-row-reverse' : 'flex-row'} gap-3`}>
                {t('contact.cta.button')}
                <Building2 className={`w-5 h-5 group-hover:scale-110 transition-transform duration-300 ${isRTL ? 'rotate-180' : ''}`} />
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Quick Quote Modal */}
      <QuickQuoteModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </section>
  );
};

export default ContactSection;