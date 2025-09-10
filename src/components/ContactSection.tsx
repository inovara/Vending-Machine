import React, { useState, useEffect, useRef } from 'react';
import { Mail, Phone, MapPin, Send, Building, Clock, ArrowRight, ShoppingCart, Users, Calculator, Download } from 'lucide-react';
import { useTranslation } from '../contexts/TranslationContext';

interface FormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  industry: string;
  machinesNeeded: string;
  contactMethod: string;
  message: string;
}

const ContactSection: React.FC = () => {
  const { t, isRTL } = useTranslation();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    company: '',
    industry: '',
    machinesNeeded: '',
    contactMethod: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

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

  return (
    <section
      ref={sectionRef}
      className={`py-20 px-6 bg-luxury-charcoal ${isRTL ? 'rtl' : 'ltr'}`}
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black mb-6 text-white">
            {t('contact.title')}
            <br />
            <span className="text-inovara-accent">{t('contact.titleAccent')}</span>
          </h2>
          <p className="text-xl text-white/80 max-w-4xl mx-auto font-light leading-relaxed">
            {t('contact.description')}
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Company Details Card */}
          <div className="lg:col-span-1">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-inovara-primary to-inovara-secondary rounded-full flex items-center justify-center text-white font-bold text-2xl">
                  🛒
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">{t('contact.company.name')}</h3>
                  <p className="text-white/70 text-sm">{t('contact.company.tagline')}</p>
                </div>
              </div>
              
              <div className="space-y-4 mb-6">
                <div className={`flex items-center ${isRTL ? 'space-x-reverse space-x-3' : 'space-x-3'}`}>
                  <Mail className="w-5 h-5 text-inovara-accent" />
                  <span className="text-white/80">{t('contact.info.email')}</span>
                </div>
                <div className={`flex items-center ${isRTL ? 'space-x-reverse space-x-3' : 'space-x-3'}`}>
                  <Phone className="w-5 h-5 text-inovara-accent" />
                  <span className="text-white/80">{t('contact.info.phone')}</span>
                </div>
                <div className={`flex items-center ${isRTL ? 'space-x-reverse space-x-3' : 'space-x-3'}`}>
                  <MapPin className="w-5 h-5 text-inovara-accent" />
                  <span className="text-white/80">{t('contact.info.address')}</span>
                </div>
              </div>

              <div className="mb-6">
                <h4 className={`text-white font-semibold mb-3 flex items-center ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
                  <ShoppingCart className={`h-4 w-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                  {t('contact.solutions.title')}
                </h4>
                <div className="grid grid-cols-2 gap-2">
                  <div className={`flex items-center ${isRTL ? 'space-x-reverse space-x-2' : 'space-x-2'}`}>
                    <div className="w-2 h-2 bg-inovara-accent rounded-full"></div>
                    <span className="text-xs text-white/90">{t('contact.solutions.smartVending')}</span>
                  </div>
                  <div className={`flex items-center ${isRTL ? 'space-x-reverse space-x-2' : 'space-x-2'}`}>
                    <div className="w-2 h-2 bg-inovara-accent rounded-full"></div>
                    <span className="text-xs text-white/90">{t('contact.solutions.paymentSystems')}</span>
                  </div>
                  <div className={`flex items-center ${isRTL ? 'space-x-reverse space-x-2' : 'space-x-2'}`}>
                    <div className="w-2 h-2 bg-inovara-accent rounded-full"></div>
                    <span className="text-xs text-white/90">{t('contact.solutions.managementSoftware')}</span>
                  </div>
                  <div className={`flex items-center ${isRTL ? 'space-x-reverse space-x-2' : 'space-x-2'}`}>
                    <div className="w-2 h-2 bg-inovara-accent rounded-full"></div>
                    <span className="text-xs text-white/90">{t('contact.solutions.iotIntegration')}</span>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <div className="text-white/60 text-sm mb-2">{t('contact.response.time')}</div>
                <div className="text-inovara-accent font-bold text-lg">{t('contact.response.within24Hours')}</div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8">
              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-white/80 text-sm font-medium mb-2">{t('contact.form.name')} *</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        onFocus={() => setFocusedField('name')}
                        onBlur={() => setFocusedField(null)}
                        className={`w-full px-4 py-3 bg-luxury-charcoal/50 border rounded-xl text-white placeholder-white/50 focus:outline-none transition-all duration-300 ${
                          focusedField === 'name'
                            ? 'border-inovara-accent shadow-lg shadow-inovara-accent/30 ring-2 ring-inovara-accent/20'
                            : 'border-white/20 hover:border-white/30'
                        }`}
                        placeholder={t('contact.form.name')}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-white/80 text-sm font-medium mb-2">{t('contact.form.email')} *</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        onFocus={() => setFocusedField('email')}
                        onBlur={() => setFocusedField(null)}
                        className={`w-full px-4 py-3 bg-luxury-charcoal/50 border rounded-xl text-white placeholder-white/50 focus:outline-none transition-all duration-300 ${
                          focusedField === 'email'
                            ? 'border-inovara-accent shadow-lg shadow-inovara-accent/30 ring-2 ring-inovara-accent/20'
                            : 'border-white/20 hover:border-white/30'
                        }`}
                        placeholder={t('contact.form.email')}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-white/80 text-sm font-medium mb-2">{t('contact.form.phone')}</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        onFocus={() => setFocusedField('phone')}
                        onBlur={() => setFocusedField(null)}
                        className={`w-full px-4 py-3 bg-luxury-charcoal/50 border rounded-xl text-white placeholder-white/50 focus:outline-none transition-all duration-300 ${
                          focusedField === 'phone'
                            ? 'border-inovara-accent shadow-lg shadow-inovara-accent/30 ring-2 ring-inovara-accent/20'
                            : 'border-white/20 hover:border-white/30'
                        }`}
                        placeholder={t('contact.form.phone')}
                      />
                    </div>
                    <div>
                      <label className="block text-white/80 text-sm font-medium mb-2">{t('contact.form.company')} *</label>
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        onFocus={() => setFocusedField('company')}
                        onBlur={() => setFocusedField(null)}
                        className={`w-full px-4 py-3 bg-luxury-charcoal/50 border rounded-xl text-white placeholder-white/50 focus:outline-none transition-all duration-300 ${
                          focusedField === 'company'
                            ? 'border-inovara-accent shadow-lg shadow-inovara-accent/30 ring-2 ring-inovara-accent/20'
                            : 'border-white/20 hover:border-white/30'
                        }`}
                        placeholder={t('contact.form.company')}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-white/80 text-sm font-medium mb-2">{t('contact.form.industry')} *</label>
                      <select
                        name="industry"
                        value={formData.industry}
                        onChange={handleInputChange}
                        onFocus={() => setFocusedField('industry')}
                        onBlur={() => setFocusedField(null)}
                        className={`w-full px-4 py-3 bg-luxury-charcoal/50 border rounded-xl text-white focus:outline-none transition-all duration-300 ${
                          focusedField === 'industry'
                            ? 'border-inovara-accent shadow-lg shadow-inovara-accent/30 ring-2 ring-inovara-accent/20'
                            : 'border-white/20 hover:border-white/30'
                        }`}
                        required
                      >
                        <option value="" className="bg-luxury-charcoal">{t('contact.form.selectIndustry')}</option>
                        <option value="corporate" className="bg-luxury-charcoal">{t('contact.form.industryOptions.corporate')}</option>
                        <option value="healthcare" className="bg-luxury-charcoal">{t('contact.form.industryOptions.healthcare')}</option>
                        <option value="education" className="bg-luxury-charcoal">{t('contact.form.industryOptions.education')}</option>
                        <option value="retail" className="bg-luxury-charcoal">{t('contact.form.industryOptions.retail')}</option>
                        <option value="manufacturing" className="bg-luxury-charcoal">{t('contact.form.industryOptions.manufacturing')}</option>
                        <option value="transportation" className="bg-luxury-charcoal">{t('contact.form.industryOptions.transportation')}</option>
                        <option value="other" className="bg-luxury-charcoal">{t('contact.form.industryOptions.other')}</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-white/80 text-sm font-medium mb-2">{t('contact.form.machines')}</label>
                      <select
                        name="machinesNeeded"
                        value={formData.machinesNeeded}
                        onChange={handleInputChange}
                        onFocus={() => setFocusedField('machinesNeeded')}
                        onBlur={() => setFocusedField(null)}
                        className={`w-full px-4 py-3 bg-luxury-charcoal/50 border rounded-xl text-white focus:outline-none transition-all duration-300 ${
                          focusedField === 'machinesNeeded'
                            ? 'border-inovara-accent shadow-lg shadow-inovara-accent/30 ring-2 ring-inovara-accent/20'
                            : 'border-white/20 hover:border-white/30'
                        }`}
                      >
                        <option value="" className="bg-luxury-charcoal">{t('contact.form.selectQuantity')}</option>
                        <option value="1-5" className="bg-luxury-charcoal">{t('contact.form.machineOptions.1-5')}</option>
                        <option value="6-20" className="bg-luxury-charcoal">{t('contact.form.machineOptions.6-20')}</option>
                        <option value="21-50" className="bg-luxury-charcoal">{t('contact.form.machineOptions.21-50')}</option>
                        <option value="51-100" className="bg-luxury-charcoal">{t('contact.form.machineOptions.51-100')}</option>
                        <option value="100+" className="bg-luxury-charcoal">{t('contact.form.machineOptions.100+')}</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-white/80 text-sm font-medium mb-2">{t('contact.form.contactMethod')}</label>
                    <div className="grid grid-cols-3 gap-4">
                      {[
                        { key: 'email', value: t('contact.form.contactMethods.email') },
                        { key: 'phone', value: t('contact.form.contactMethods.phone') },
                        { key: 'video-call', value: t('contact.form.contactMethods.video-call') }
                      ].map((method) => (
                        <label key={method.key} className={`flex items-center ${isRTL ? 'space-x-reverse space-x-2' : 'space-x-2'} cursor-pointer`}>
                          <input
                            type="radio"
                            name="contactMethod"
                            value={method.key}
                            checked={formData.contactMethod === method.key}
                            onChange={handleInputChange}
                            className="w-4 h-4 text-inovara-accent bg-luxury-charcoal border-white/20 focus:ring-inovara-accent"
                          />
                          <span className="text-white/80 text-sm">{method.value}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-white/80 text-sm font-medium mb-2">{t('contact.form.requirements')}</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      onFocus={() => setFocusedField('message')}
                      onBlur={() => setFocusedField(null)}
                      rows={4}
                      className={`w-full px-4 py-3 bg-luxury-charcoal/50 border rounded-xl text-white placeholder-white/50 focus:outline-none transition-all duration-300 resize-none ${
                        focusedField === 'message'
                          ? 'border-inovara-accent shadow-lg shadow-inovara-accent/30 ring-2 ring-inovara-accent/20'
                          : 'border-white/20 hover:border-white/30'
                      }`}
                      placeholder={t('contact.form.requirementsPlaceholder')}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full px-8 py-4 bg-gradient-to-r from-inovara-primary to-inovara-secondary text-white font-semibold rounded-xl shadow-2xl hover:shadow-inovara-primary/25 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    {isSubmitting ? (
                      <span className={`flex items-center justify-center ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
                        <div className={`animate-spin rounded-full h-5 w-5 border-b-2 border-white ${isRTL ? 'ml-3' : 'mr-3'}`}></div>
                        {t('contact.form.gettingQuote')}
                      </span>
                    ) : (
                      <span className={`flex items-center justify-center ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
                        {t('contact.form.getQuote')}
                        <Send className={`${isRTL ? 'mr-2' : 'ml-2'} h-5 w-5 group-hover:translate-x-1 transition-transform`} />
                      </span>
                    )}
                  </button>
                </form>
              ) : (
                <div className="text-center py-12">
                  <div className="w-20 h-20 bg-gradient-to-r from-inovara-primary to-inovara-secondary rounded-full flex items-center justify-center mx-auto mb-6">
                    <Send className="h-10 w-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">{t('contact.success.title')}</h3>
                  <p className="text-white/80 mb-6">{t('contact.success.message')}</p>
                  <div className={`flex flex-col sm:flex-row gap-4 justify-center ${isRTL ? 'sm:flex-row-reverse' : 'sm:flex-row'}`}>
                    <button
                      onClick={() => setIsSubmitted(false)}
                      className={`text-inovara-accent hover:text-white transition-colors duration-300 flex items-center justify-center ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}
                    >
                      {t('contact.success.submitAnother')}
                      <ArrowRight className={`${isRTL ? 'mr-2' : 'ml-2'} h-4 w-4`} />
                    </button>
                    <button className={`text-inovara-secondary hover:text-white transition-colors duration-300 flex items-center justify-center ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
                      <Download className={`${isRTL ? 'ml-2' : 'mr-2'} h-4 w-4`} />
                      {t('contact.success.downloadBrochure')}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;