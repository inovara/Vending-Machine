import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, AlertTriangle, Shield, FileText, Scale, Building2, Mail, Phone, MapPin } from 'lucide-react';
import { useTranslation } from '../contexts/TranslationContext';

const DisclaimerPage: React.FC = () => {
  const { t, isRTL } = useTranslation();

  return (
    <div className={`min-h-screen ${isRTL ? 'rtl' : 'ltr'}`}>
      {/* Hero Section */}
      <section 
        className="relative py-24 px-6 overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, rgba(255,255,255,1) 0%, rgba(248,250,252,0.8) 50%, rgba(255,255,255,1) 100%)'
        }}
      >
        {/* Subtle Background Effects */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-inovara-accent/3 to-inovara-secondary/3 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-gradient-to-tr from-inovara-primary/2 to-inovara-accent/2 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto">
          {/* Breadcrumb */}
          <nav className={`flex items-center gap-2 mb-8 text-sm ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
            <Link to="/" className="text-inovara-primary/70 hover:text-inovara-primary transition-colors">
              {t('legal.breadcrumb.home')}
            </Link>
            <ArrowRight className={`w-4 h-4 text-inovara-primary/50 ${isRTL ? 'rotate-180' : ''}`} />
            <span className="text-inovara-primary font-medium">{t('legal.disclaimer.title')}</span>
          </nav>

          {/* Hero Content */}
          <div className={`mb-16 ${isRTL ? 'text-right' : 'text-center'}`}>
            <div className={`flex items-center justify-center gap-4 mb-6 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
              <div className="w-16 h-16 bg-gradient-to-br from-inovara-primary to-inovara-secondary rounded-3xl flex items-center justify-center shadow-lg">
                <AlertTriangle className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-inovara-primary tracking-tight leading-[0.9]">
                {t('legal.disclaimer.title')}
              </h1>
            </div>
            
            {/* Professional Divider */}
            <div className={`w-32 h-1 bg-gradient-to-r from-inovara-accent to-inovara-secondary mb-8 rounded-full ${isRTL ? 'ml-auto' : 'mx-auto'}`}></div>
            
            <div className="max-w-4xl mx-auto">
              <p className={`text-xl md:text-2xl text-inovara-primary/70 font-light leading-relaxed ${isRTL ? 'text-right' : 'text-center'}`}>
                {t('legal.disclaimer.subtitle')}
              </p>
              <p className={`text-sm text-inovara-primary/60 mt-4 ${isRTL ? 'text-right' : 'text-center'}`}>
                {t('legal.lastUpdated')}: {t('legal.disclaimer.lastUpdated')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          {/* Introduction */}
          <div className="mb-16">
            <div className="bg-gradient-to-r from-inovara-primary/5 to-inovara-secondary/5 rounded-3xl p-8 border border-inovara-primary/10">
              <div className={`flex items-start gap-4 mb-6 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
                <div className="w-12 h-12 bg-gradient-to-br from-inovara-accent to-inovara-secondary rounded-2xl flex items-center justify-center flex-shrink-0">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <div className={`flex-1 ${isRTL ? 'text-right' : 'text-left'}`}>
                  <h2 className="text-2xl font-black text-inovara-primary mb-4">{t('legal.disclaimer.introduction.title')}</h2>
                  <p className="text-inovara-primary/70 leading-relaxed">
                    {t('legal.disclaimer.introduction.content')}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Content Sections */}
          <div className="space-y-16">
            {/* General Disclaimer */}
            <div>
              <h2 className="text-3xl font-black text-inovara-primary mb-8">{t('legal.disclaimer.general.title')}</h2>
              <div className="bg-white/90 backdrop-blur-sm border border-inovara-primary/10 rounded-2xl p-8 shadow-lg">
                <div className={`flex items-start gap-4 mb-6 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
                  <div className="w-10 h-10 bg-gradient-to-br from-inovara-primary to-inovara-primary/80 rounded-xl flex items-center justify-center flex-shrink-0">
                    <AlertTriangle className="w-5 h-5 text-white" />
                  </div>
                  <div className={`flex-1 ${isRTL ? 'text-right' : 'text-left'}`}>
                    <h3 className="text-xl font-bold text-inovara-primary mb-3">{t('legal.disclaimer.general.nature.title')}</h3>
                    <p className="text-inovara-primary/70 leading-relaxed">
                      {t('legal.disclaimer.general.nature.content')}
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-4 bg-white/50 rounded-xl">
                    <h4 className="font-bold text-inovara-primary mb-2">{t('legal.disclaimer.general.accuracy.title')}</h4>
                    <p className="text-sm text-inovara-primary/70">{t('legal.disclaimer.general.accuracy.content')}</p>
                  </div>
                  <div className="p-4 bg-white/50 rounded-xl">
                    <h4 className="font-bold text-inovara-primary mb-2">{t('legal.disclaimer.general.completeness.title')}</h4>
                    <p className="text-sm text-inovara-primary/70">{t('legal.disclaimer.general.completeness.content')}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Product Information */}
            <div>
              <h2 className="text-3xl font-black text-inovara-primary mb-8">{t('legal.disclaimer.products.title')}</h2>
              <div className="bg-gradient-to-r from-inovara-primary/5 to-inovara-secondary/5 rounded-3xl p-8 border border-inovara-primary/10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-bold text-inovara-primary mb-4 flex items-center gap-3">
                      <Building2 className="w-5 h-5 text-inovara-accent" />
                      {t('legal.disclaimer.products.specifications.title')}
                    </h3>
                    <p className="text-inovara-primary/70 leading-relaxed mb-4">
                      {t('legal.disclaimer.products.specifications.content')}
                    </p>
                    <div className="space-y-2">
                      {['technical', 'performance', 'compatibility', 'availability'].map((item, index) => (
                        <div key={index} className={`flex items-start gap-2 ${isRTL ? 'flex-row-reverse text-right' : 'flex-row text-left'}`}>
                          <div className="w-1.5 h-1.5 bg-inovara-accent rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-sm text-inovara-primary/70">
                            {t(`legal.disclaimer.products.specifications.${item}`)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-inovara-primary mb-4 flex items-center gap-3">
                      <Scale className="w-5 h-5 text-inovara-secondary" />
                      {t('legal.disclaimer.products.performance.title')}
                    </h3>
                    <p className="text-inovara-primary/70 leading-relaxed mb-4">
                      {t('legal.disclaimer.products.performance.content')}
                    </p>
                    <div className="space-y-2">
                      {['results', 'conditions', 'maintenance', 'variables'].map((item, index) => (
                        <div key={index} className={`flex items-start gap-2 ${isRTL ? 'flex-row-reverse text-right' : 'flex-row text-left'}`}>
                          <div className="w-1.5 h-1.5 bg-inovara-secondary rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-sm text-inovara-primary/70">
                            {t(`legal.disclaimer.products.performance.${item}`)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Liability Limitations */}
            <div>
              <h2 className="text-3xl font-black text-inovara-primary mb-8">{t('legal.disclaimer.liability.title')}</h2>
              <div className="bg-white/90 backdrop-blur-sm border border-inovara-primary/10 rounded-2xl p-8 shadow-lg">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    { key: 'damages', icon: AlertTriangle, color: 'from-inovara-primary to-inovara-primary/80' },
                    { key: 'indirect', icon: Shield, color: 'from-inovara-accent to-inovara-secondary' },
                    { key: 'consequential', icon: FileText, color: 'from-inovara-secondary to-inovara-secondary/80' },
                    { key: 'limitation', icon: Scale, color: 'from-inovara-primary/80 to-inovara-accent' }
                  ].map((liability, index) => {
                    const IconComponent = liability.icon;
                    return (
                      <div key={index} className={`flex items-start gap-4 p-4 rounded-xl bg-white/50 hover:bg-white/70 transition-all duration-300 ${isRTL ? 'flex-row-reverse text-right' : 'flex-row text-left'}`}>
                        <div className={`w-10 h-10 bg-gradient-to-br ${liability.color} rounded-xl flex items-center justify-center flex-shrink-0`}>
                          <IconComponent className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h3 className="font-bold text-inovara-primary mb-2">
                            {t(`legal.disclaimer.liability.${liability.key}.title`)}
                          </h3>
                          <p className="text-sm text-inovara-primary/70">
                            {t(`legal.disclaimer.liability.${liability.key}.description`)}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Third-Party Content */}
            <div>
              <h2 className="text-3xl font-black text-inovara-primary mb-8">{t('legal.disclaimer.thirdParty.title')}</h2>
              <div className="bg-gradient-to-r from-inovara-primary/5 to-inovara-secondary/5 rounded-3xl p-8 border border-inovara-primary/10">
                <p className="text-inovara-primary/70 leading-relaxed mb-8">
                  {t('legal.disclaimer.thirdParty.intro')}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    { key: 'links', name: 'External Links', description: 'Links to third-party websites and services' },
                    { key: 'content', name: 'Third-Party Content', description: 'User-generated and partner content' },
                    { key: 'services', name: 'Integrated Services', description: 'Third-party tools and integrations' }
                  ].map((item, index) => (
                    <div key={index} className={`p-6 bg-white/60 rounded-2xl hover:bg-white/80 transition-all duration-300 ${isRTL ? 'text-right' : 'text-center'}`}>
                      <div className="w-12 h-12 bg-gradient-to-br from-inovara-primary to-inovara-secondary rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <Shield className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="font-bold text-inovara-primary mb-2">{item.name}</h3>
                      <p className="text-sm text-inovara-primary/70">{item.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Investment and Business Advice */}
            <div>
              <h2 className="text-3xl font-black text-inovara-primary mb-8">{t('legal.disclaimer.advice.title')}</h2>
              <div className="bg-white/90 backdrop-blur-sm border border-inovara-primary/10 rounded-2xl p-8 shadow-lg">
                <div className={`flex items-start gap-4 mb-6 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
                  <div className="w-12 h-12 bg-gradient-to-br from-inovara-secondary to-inovara-secondary/80 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <Scale className="w-6 h-6 text-white" />
                  </div>
                  <div className={`flex-1 ${isRTL ? 'text-right' : 'text-left'}`}>
                    <h3 className="text-xl font-bold text-inovara-primary mb-3">{t('legal.disclaimer.advice.nature.title')}</h3>
                    <p className="text-inovara-primary/70 leading-relaxed mb-4">
                      {t('legal.disclaimer.advice.nature.content')}
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-3 bg-white/50 rounded-xl">
                        <h4 className="font-bold text-inovara-primary mb-1 text-sm">{t('legal.disclaimer.advice.investment.title')}</h4>
                        <p className="text-xs text-inovara-primary/70">{t('legal.disclaimer.advice.investment.content')}</p>
                      </div>
                      <div className="p-3 bg-white/50 rounded-xl">
                        <h4 className="font-bold text-inovara-primary mb-1 text-sm">{t('legal.disclaimer.advice.business.title')}</h4>
                        <p className="text-xs text-inovara-primary/70">{t('legal.disclaimer.advice.business.content')}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Updates and Changes */}
            <div>
              <h2 className="text-3xl font-black text-inovara-primary mb-8">{t('legal.disclaimer.updates.title')}</h2>
              <div className="bg-gradient-to-r from-inovara-primary/5 to-inovara-secondary/5 rounded-3xl p-8 border border-inovara-primary/10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-bold text-inovara-primary mb-4 flex items-center gap-3">
                      <FileText className="w-5 h-5 text-inovara-accent" />
                      {t('legal.disclaimer.updates.changes.title')}
                    </h3>
                    <p className="text-inovara-primary/70 leading-relaxed mb-4">
                      {t('legal.disclaimer.updates.changes.content')}
                    </p>
                    <div className="space-y-2">
                      {['notification', 'effectiveness', 'responsibility', 'review'].map((item, index) => (
                        <div key={index} className={`flex items-start gap-2 ${isRTL ? 'flex-row-reverse text-right' : 'flex-row text-left'}`}>
                          <div className="w-1.5 h-1.5 bg-inovara-accent rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-sm text-inovara-primary/70">
                            {t(`legal.disclaimer.updates.changes.${item}`)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-inovara-primary mb-4 flex items-center gap-3">
                      <AlertTriangle className="w-5 h-5 text-inovara-secondary" />
                      {t('legal.disclaimer.updates.responsibility.title')}
                    </h3>
                    <p className="text-inovara-primary/70 leading-relaxed mb-4">
                      {t('legal.disclaimer.updates.responsibility.content')}
                    </p>
                    <div className="space-y-2">
                      {['monitoring', 'awareness', 'consultation', 'compliance'].map((item, index) => (
                        <div key={index} className={`flex items-start gap-2 ${isRTL ? 'flex-row-reverse text-right' : 'flex-row text-left'}`}>
                          <div className="w-1.5 h-1.5 bg-inovara-secondary rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-sm text-inovara-primary/70">
                            {t(`legal.disclaimer.updates.responsibility.${item}`)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div>
              <h2 className="text-3xl font-black text-inovara-primary mb-8">{t('legal.disclaimer.contact.title')}</h2>
              <div className="bg-gradient-to-r from-inovara-primary/5 to-inovara-secondary/5 rounded-3xl p-8 border border-inovara-primary/10">
                <p className="text-inovara-primary/70 leading-relaxed mb-8">
                  {t('legal.disclaimer.contact.intro')}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className={`${isRTL ? 'text-right' : 'text-center'}`}>
                    <div className="w-12 h-12 bg-gradient-to-br from-inovara-accent to-inovara-secondary rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <Mail className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-bold text-inovara-primary mb-2">{t('legal.disclaimer.contact.email.title')}</h3>
                    <p className="text-sm text-inovara-primary/70">legal@inovara.com</p>
                  </div>
                  <div className={`${isRTL ? 'text-right' : 'text-center'}`}>
                    <div className="w-12 h-12 bg-gradient-to-br from-inovara-primary to-inovara-primary/80 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <Phone className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-bold text-inovara-primary mb-2">{t('legal.disclaimer.contact.phone.title')}</h3>
                    <p className="text-sm text-inovara-primary/70">+20 123 456 7890</p>
                  </div>
                  <div className={`${isRTL ? 'text-right' : 'text-center'}`}>
                    <div className="w-12 h-12 bg-gradient-to-br from-inovara-secondary to-inovara-secondary/80 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <MapPin className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-bold text-inovara-primary mb-2">{t('legal.disclaimer.contact.address.title')}</h3>
                    <p className="text-sm text-inovara-primary/70">{t('legal.disclaimer.contact.address.content')}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 bg-gradient-to-r from-inovara-primary to-inovara-secondary">
        <div className={`max-w-4xl mx-auto ${isRTL ? 'text-right' : 'text-center'}`}>
          <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-12 border border-white/20">
            <h2 className="text-3xl md:text-4xl font-black text-white mb-6">
              {t('legal.disclaimer.cta.title')}
            </h2>
            <p className="text-xl text-white/90 font-light leading-relaxed mb-8">
              {t('legal.disclaimer.cta.description')}
            </p>
            
            <div className={`flex flex-col sm:flex-row gap-4 justify-center items-center ${isRTL ? 'sm:flex-row-reverse' : ''}`}>
              <Link 
                to="/contact"
                className="group px-12 py-5 bg-white text-inovara-primary font-bold text-lg rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-white/30"
              >
                <span className={`flex items-center justify-center gap-3 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
                  {t('legal.disclaimer.cta.contact')}
                  <ArrowRight className={`w-6 h-6 group-hover:translate-x-1 transition-transform duration-300 ${isRTL ? 'rotate-180 group-hover:-translate-x-1' : ''}`} />
                </span>
              </Link>
              
              <Link 
                to="/terms"
                className="px-12 py-5 border-2 border-white text-white font-bold text-lg rounded-2xl hover:bg-white hover:text-inovara-primary transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-white/30"
              >
                {t('legal.disclaimer.cta.terms')}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DisclaimerPage;
