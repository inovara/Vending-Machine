import React, { useState, useRef } from 'react';
import { Mail, Phone, MapPin, Send, ArrowRight, Download, CheckCircle, AlertCircle } from 'lucide-react';
import { useMutation } from '@tanstack/react-query';
import { useTranslation } from '../contexts/TranslationContext';
import { contactUs } from '../network/contact';
import { ContactFormData, ContactResponse } from '../types/api';

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
      className={`relative py-24 px-6 overflow-hidden ${isRTL ? 'rtl' : 'ltr'}`}
      style={{
        background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 50%, #f1f5f9 100%)'
      }}
    >
      {/* Premium Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-inovara-accent/10 to-inovara-secondary/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-inovara-primary/10 to-inovara-accent/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-inovara-secondary/5 to-inovara-accent/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Premium Section Header */}
        <div className={`text-center mb-20 ${isRTL ? 'rtl' : 'ltr'}`}>
          <div className="inline-block mb-6">
            <div className="w-20 h-1 bg-gradient-to-r from-inovara-accent via-inovara-secondary to-inovara-primary mx-auto rounded-full"></div>
          </div>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-black mb-8 text-inovara-primary leading-tight">
            {t('contact.title')}
            <br />
            <span className="bg-gradient-to-r from-inovara-accent via-inovara-secondary to-inovara-primary bg-clip-text text-transparent">
              {t('contact.titleAccent')}
            </span>
          </h2>
          <p className="text-xl md:text-2xl text-inovara-primary/80 max-w-5xl mx-auto font-light leading-relaxed">
            {t('contact.description')}
          </p>
        </div>

        {/* Premium Contact Card */}
        <div className="max-w-6xl mx-auto">
          <div className={`relative bg-white/95 backdrop-blur-sm border border-inovara-primary/20 shadow-2xl shadow-inovara-primary/15 rounded-3xl overflow-hidden ${isRTL ? 'rtl' : 'ltr'} hover:shadow-3xl hover:shadow-inovara-primary/20 transition-all duration-500`}>
            {/* Premium Card Background Pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute inset-0 bg-gradient-to-br from-inovara-accent/20 via-transparent to-inovara-secondary/20"></div>
            </div>
            
            <div className="relative z-10 grid lg:grid-cols-2 gap-0">
              {/* Premium Contact Info Section */}
              <div className={`relative bg-gradient-to-br from-inovara-primary/8 via-inovara-secondary/6 to-inovara-accent/8 p-10 lg:p-16 ${isRTL ? 'lg:order-2' : 'lg:order-1'}`}>
                {/* Decorative Background Elements */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-inovara-accent/20 to-transparent rounded-bl-full"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-inovara-secondary/20 to-transparent rounded-tr-full"></div>
                <div className={`relative z-10 mb-12 ${isRTL ? 'text-right' : 'text-left'}`}>
                  <h3 className="text-3xl font-black text-inovara-primary mb-3">{t('contact.company.name')}</h3>
                  <p className="text-inovara-primary/80 text-base leading-relaxed font-medium">{t('contact.company.tagline')}</p>
                </div>
                
                <div className="relative z-10 space-y-6 mb-12">
                  <div className={`flex items-center ${isRTL ? 'space-x-reverse space-x-4 flex-row-reverse' : 'space-x-4 flex-row'} p-4 rounded-2xl bg-white/90 hover:bg-white transition-all duration-300 shadow-md hover:shadow-lg border border-inovara-primary/10 hover:border-inovara-accent/30`}>
                    <div className="w-12 h-12 bg-gradient-to-br from-inovara-accent to-inovara-accent/80 rounded-xl flex items-center justify-center shadow-md">
                      <Mail className="w-6 h-6 text-white" />
                    </div>
                    <span className={`text-inovara-primary font-semibold text-base flex-1 ${isRTL ? 'text-right' : 'text-left'}`}>{t('contact.info.email')}</span>
                  </div>
                  <div className={`flex items-center ${isRTL ? 'space-x-reverse space-x-4 flex-row-reverse' : 'space-x-4 flex-row'} p-4 rounded-2xl bg-white/90 hover:bg-white transition-all duration-300 shadow-md hover:shadow-lg border border-inovara-primary/10 hover:border-inovara-accent/30`}>
                    <div className="w-12 h-12 bg-gradient-to-br from-inovara-accent to-inovara-accent/80 rounded-xl flex items-center justify-center shadow-md">
                      <Phone className="w-6 h-6 text-white" />
                    </div>
                    <span className={`text-inovara-primary font-semibold text-base flex-1 ${isRTL ? 'text-right' : 'text-left'}`}>{t('contact.info.phone')}</span>
                  </div>
                  <div className={`flex items-center ${isRTL ? 'space-x-reverse space-x-4 flex-row-reverse' : 'space-x-4 flex-row'} p-4 rounded-2xl bg-white/90 hover:bg-white transition-all duration-300 shadow-md hover:shadow-lg border border-inovara-primary/10 hover:border-inovara-accent/30`}>
                    <div className="w-12 h-12 bg-gradient-to-br from-inovara-accent to-inovara-accent/80 rounded-xl flex items-center justify-center shadow-md">
                      <MapPin className="w-6 h-6 text-white" />
                    </div>
                    <span className={`text-inovara-primary font-semibold text-base flex-1 ${isRTL ? 'text-right' : 'text-left'}`}>{t('contact.info.address')}</span>
                  </div>
                </div>

                <div className={`relative z-10 text-center p-6 rounded-2xl bg-gradient-to-r from-inovara-accent/20 to-inovara-secondary/20 border-2 border-inovara-accent/30 shadow-lg ${isRTL ? 'rtl' : 'ltr'}`}>
                  <div className="text-inovara-primary/80 text-sm mb-3 font-bold uppercase tracking-wider">{t('contact.response.time')}</div>
                  <div className="text-inovara-accent font-black text-xl">{t('contact.response.within24Hours')}</div>
                </div>
              </div>

              {/* Premium Contact Form Section */}
              <div className={`relative p-10 lg:p-16 bg-white ${isRTL ? 'lg:order-1' : 'lg:order-2'}`}>
                {/* Subtle background pattern */}
                <div className="absolute inset-0 opacity-3">
                  <div className="absolute inset-0 bg-gradient-to-br from-inovara-primary/5 via-transparent to-inovara-accent/5"></div>
                </div>
                
                <div className={`relative z-10 mb-10 ${isRTL ? 'text-right' : 'text-left'}`}>
                  <h3 className="text-4xl font-black text-inovara-primary mb-4 leading-tight">{t('contact.form.title')}</h3>
                  <p className="text-inovara-primary/80 text-lg leading-relaxed">{t('contact.form.subtitle')}</p>
                </div>
                
                {!isSubmitted ? (
                <form onSubmit={handleSubmit} className={`relative z-10 space-y-8 ${isRTL ? 'rtl' : 'ltr'}`}>
                  {/* Error Message */}
                  {submitError && (
                    <div className={`flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-2xl ${isRTL ? 'flex-row-reverse text-right' : 'flex-row text-left'}`}>
                      <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                      <span className="text-red-700 font-medium">{submitError}</span>
                    </div>
                  )}
                  <div className={`grid md:grid-cols-2 gap-8 ${isRTL ? 'rtl' : 'ltr'}`}>
                    <div>
                      <label className={`block text-inovara-primary text-sm font-bold mb-3 ${isRTL ? 'text-right' : 'text-left'}`}>{t('contact.form.name')} *</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        dir={isRTL ? 'rtl' : 'ltr'}
                        className={`w-full px-5 py-4 bg-white border-2 border-inovara-primary/15 rounded-2xl text-inovara-primary placeholder-inovara-primary/60 focus:outline-none transition-all duration-300 focus:ring-4 focus:ring-inovara-accent/20 focus:border-inovara-accent ${isRTL ? 'text-right' : 'text-left'} hover:border-inovara-accent/30 shadow-sm hover:shadow-md`}
                        placeholder={t('contact.form.name')}
                        required
                      />
                    </div>
                    <div>
                      <label className={`block text-inovara-primary text-sm font-bold mb-3 ${isRTL ? 'text-right' : 'text-left'}`}>{t('contact.form.email')} *</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        dir={isRTL ? 'rtl' : 'ltr'}
                        className={`w-full px-5 py-4 bg-white border-2 border-inovara-primary/15 rounded-2xl text-inovara-primary placeholder-inovara-primary/60 focus:outline-none transition-all duration-300 focus:ring-4 focus:ring-inovara-accent/20 focus:border-inovara-accent ${isRTL ? 'text-right' : 'text-left'} hover:border-inovara-accent/30 shadow-sm hover:shadow-md`}
                        placeholder={t('contact.form.email')}
                        required
                      />
                    </div>
                  </div>

                  <div className={`grid md:grid-cols-2 gap-8 ${isRTL ? 'rtl' : 'ltr'}`}>
                    <div>
                      <label className={`block text-inovara-primary text-sm font-bold mb-3 ${isRTL ? 'text-right' : 'text-left'}`}>{t('contact.form.phone')}</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        dir={isRTL ? 'rtl' : 'ltr'}
                        className={`w-full px-5 py-4 bg-white border-2 border-inovara-primary/15 rounded-2xl text-inovara-primary placeholder-inovara-primary/60 focus:outline-none transition-all duration-300 focus:ring-4 focus:ring-inovara-accent/20 focus:border-inovara-accent ${isRTL ? 'text-right' : 'text-left'} hover:border-inovara-accent/30 shadow-sm hover:shadow-md`}
                        placeholder={t('contact.form.phone')}
                      />
                    </div>
                    <div>
                      <label className={`block text-inovara-primary text-sm font-bold mb-3 ${isRTL ? 'text-right' : 'text-left'}`}>{t('contact.form.company')}</label>
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        dir={isRTL ? 'rtl' : 'ltr'}
                        className={`w-full px-5 py-4 bg-white border-2 border-inovara-primary/15 rounded-2xl text-inovara-primary placeholder-inovara-primary/60 focus:outline-none transition-all duration-300 focus:ring-4 focus:ring-inovara-accent/20 focus:border-inovara-accent ${isRTL ? 'text-right' : 'text-left'} hover:border-inovara-accent/30 shadow-sm hover:shadow-md`}
                        placeholder={t('contact.form.company')}
                      />
                    </div>
                  </div>

                  <div>
                    <label className={`block text-inovara-primary text-sm font-bold mb-3 ${isRTL ? 'text-right' : 'text-left'}`}>{t('contact.form.requirements')}</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      dir={isRTL ? 'rtl' : 'ltr'}
                      rows={5}
                      className={`w-full px-5 py-4 bg-white border-2 border-inovara-primary/15 rounded-2xl text-inovara-primary placeholder-inovara-primary/60 focus:outline-none transition-all duration-300 focus:ring-4 focus:ring-inovara-accent/20 focus:border-inovara-accent resize-none ${isRTL ? 'text-right' : 'text-left'} hover:border-inovara-accent/30 shadow-sm hover:shadow-md`}
                      placeholder={t('contact.form.requirementsPlaceholder')}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full px-8 py-5 bg-[rgb(46,0,20)] text-white hover:bg-[rgb(35,0,15)] focus:ring-4 focus:ring-inovara-accent/20 font-bold text-lg rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    {isLoading ? (
                      <span className={`flex items-center justify-center ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
                        <div className={`animate-spin rounded-full h-6 w-6 border-b-2 border-white ${isRTL ? 'ml-3' : 'mr-3'}`}></div>
                        {t('contact.form.gettingQuote')}
                      </span>
                    ) : (
                      <span className={`flex items-center justify-center ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
                        {t('contact.form.submit')}
                        <Send className={`${isRTL ? 'mr-3' : 'ml-3'} h-6 w-6 transition-transform group-hover:translate-x-1`} />
                      </span>
                    )}
                  </button>
                </form>
              ) : (
                <div className={`relative z-10 text-center py-16 ${isRTL ? 'rtl' : 'ltr'}`}>
                  <div className="w-24 h-24 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl ring-4 ring-green-200">
                    <CheckCircle className="h-12 w-12 text-white" />
                  </div>
                  <h3 className="text-4xl font-black text-inovara-primary mb-6">{t('contact.success.title')}</h3>
                  <p className="text-inovara-primary/80 mb-10 text-lg leading-relaxed max-w-md mx-auto">{t('contact.success.message')}</p>
                  <div className={`flex flex-col sm:flex-row gap-6 justify-center ${isRTL ? 'sm:flex-row-reverse' : 'sm:flex-row'}`}>
                    <button
                      onClick={() => {
                        setIsSubmitted(false);
                        setSubmitError(null);
                      }}
                      className={`border-2 border-inovara-accent/30 text-inovara-primary bg-inovara-accent/10 hover:bg-inovara-accent/20 transition-all duration-300 flex items-center justify-center focus:ring-4 focus:ring-inovara-accent/20 px-6 py-3 rounded-2xl font-semibold shadow-md hover:shadow-lg ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}
                    >
                      {t('contact.success.submitAnother')}
                      <ArrowRight className={`${isRTL ? 'mr-3' : 'ml-3'} h-5 w-5 transition-transform group-hover:translate-x-1`} />
                    </button>
                    <button className={`border-2 border-inovara-primary/30 text-inovara-primary bg-inovara-primary/5 hover:bg-inovara-primary/10 transition-all duration-300 flex items-center justify-center focus:ring-4 focus:ring-inovara-primary/20 px-6 py-3 rounded-2xl font-semibold shadow-md hover:shadow-lg ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
                      <Download className={`${isRTL ? 'ml-3' : 'mr-3'} h-5 w-5`} />
                      {t('contact.success.downloadBrochure')}
                    </button>
                  </div>
                </div>
              )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;