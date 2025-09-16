import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Cookie, Settings, Shield, Eye, Lock, Mail, Phone, MapPin } from 'lucide-react';
import { useTranslation } from '../contexts/TranslationContext';

const CookiePolicyPage: React.FC = () => {
  const { t, isRTL } = useTranslation();

  return (
    <div className={`min-h-screen ${isRTL ? 'rtl' : 'ltr'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      <section
        className="relative pt-24 px-6 overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, rgba(255,255,255,1) 0%, rgba(248,250,252,0.8) 50%, rgba(255,255,255,1) 100%)'
        }}
      >
        {/* Subtle Background Effects */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 ${isRTL ? 'left-1/4 right-auto' : 'right-1/4 left-auto'} w-96 h-96 bg-gradient-to-br from-inovara-accent/3 to-inovara-secondary/3 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 ${isRTL ? 'right-1/4 left-auto' : 'left-1/4 right-auto'} w-80 h-80 bg-gradient-to-tr from-inovara-primary/2 to-inovara-accent/2 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 mb-8 text-sm">
            <Link to="/" className="text-inovara-primary/70 hover:text-inovara-primary transition-colors">
              {t('legal.breadcrumb.home')}
            </Link>
            <ArrowRight className={`w-4 h-4 text-inovara-primary/50 ${isRTL ? 'rotate-180' : ''}`} />
            <span className="text-inovara-primary font-medium">{t('legal.cookies.title')}</span>
          </nav>

          {/* Hero Content */}
          <div className={`mb-16 ${isRTL ? 'text-right' : 'text-center'}`}>
            <div className="flex items-center justify-center gap-4 mb-6">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-inovara-primary tracking-tight leading-[0.9]">
                {t('legal.cookies.title')}
              </h1>
            </div>

            {/* Professional Divider */}
            <div className="w-32 h-1 bg-gradient-to-r from-inovara-accent to-inovara-secondary mx-auto mb-8 rounded-full"></div>

            <div className="max-w-4xl mx-auto">
              <p className={`text-xl md:text-2xl text-inovara-primary/70 font-light leading-relaxed text-center`}>
                {t('legal.cookies.subtitle')}
              </p>
              <p className={`text-sm text-inovara-primary/60 mt-4 text-center`}>
                {t('legal.lastUpdated')}: {t('legal.cookies.lastUpdated')}
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
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-inovara-accent to-inovara-secondary rounded-2xl flex items-center justify-center flex-shrink-0 ${isRTL ? 'ml-4 mr-0' : 'mr-4 ml-0'}">
                  <Settings className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1 ${isRTL ? 'text-right' : 'text-left'}">
                  <h2 className="text-2xl font-black text-inovara-primary mb-4 ${isRTL ? 'text-right' : 'text-left'}">{t('legal.cookies.introduction.title')}</h2>
                  <p className="text-inovara-primary/70 leading-relaxed ${isRTL ? 'text-right' : 'text-left'}">
                    {t('legal.cookies.introduction.content')}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Content Sections */}
          <div className="space-y-16">
            {/* What Are Cookies */}
            <div>
              <h2 className="text-3xl font-black text-inovara-primary mb-8 ${isRTL ? 'text-right' : 'text-left'}">{t('legal.cookies.what.title')}</h2>
              <div className="bg-white/90 backdrop-blur-sm border border-inovara-primary/10 rounded-2xl p-8 shadow-lg">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-br from-inovara-primary to-inovara-primary/80 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Cookie className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1 ${isRTL ? 'text-right' : 'text-left'}">
                    <h3 className="text-xl font-bold text-inovara-primary mb-3">{t('legal.cookies.what.definition.title')}</h3>
                    <p className="text-inovara-primary/70 leading-relaxed">
                      {t('legal.cookies.what.definition.content')}
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-4 bg-white/50 rounded-xl">
                    <h4 className="font-bold text-inovara-primary mb-2">{t('legal.cookies.what.types.firstParty.title')}</h4>
                    <p className="text-sm text-inovara-primary/70">{t('legal.cookies.what.types.firstParty.description')}</p>
                  </div>
                  <div className="p-4 bg-white/50 rounded-xl">
                    <h4 className="font-bold text-inovara-primary mb-2">{t('legal.cookies.what.types.thirdParty.title')}</h4>
                    <p className="text-sm text-inovara-primary/70">{t('legal.cookies.what.types.thirdParty.description')}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Types of Cookies */}
            <div>
              <h2 className="text-3xl font-black text-inovara-primary mb-8 ${isRTL ? 'text-right' : 'text-left'}">{t('legal.cookies.types.title')}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[
                  { key: 'essential', icon: Shield, color: 'from-inovara-primary to-inovara-primary/80' },
                  { key: 'performance', icon: Eye, color: 'from-inovara-accent to-inovara-secondary' },
                  { key: 'functional', icon: Settings, color: 'from-inovara-secondary to-inovara-secondary/80' },
                  { key: 'marketing', icon: Cookie, color: 'from-inovara-primary/80 to-inovara-accent' }
                ].map((type, index) => {
                  const IconComponent = type.icon;
                  return (
                    <div key={index} className="bg-white/90 backdrop-blur-sm border border-inovara-primary/10 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                      <div className="flex items-start gap-4 mb-4">
                        <div className={`w-12 h-12 bg-gradient-to-br ${type.color} rounded-2xl flex items-center justify-center flex-shrink-0`}>
                          <IconComponent className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1 ${isRTL ? 'text-right' : 'text-left'}">
                          <h3 className="text-xl font-bold text-inovara-primary mb-2">
                            {t(`legal.cookies.types.${type.key}.title`)}
                          </h3>
                          <p className="text-inovara-primary/70 leading-relaxed mb-4">
                            {t(`legal.cookies.types.${type.key}.description`)}
                          </p>
                        </div>
                      </div>
                      <div className="space-y-2">
                        {t(`legal.cookies.types.${type.key}.examples`).split(',').map((example: string, exampleIndex: React.Key | null | undefined) => (
                          <div key={exampleIndex} className="flex items-start gap-2 ${isRTL ? 'text-right' : 'text-left'}">
                            <div className="w-1.5 h-1.5 bg-inovara-accent rounded-full mt-2 flex-shrink-0"></div>
                            <span className="text-sm text-inovara-primary/70">{example.trim()}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* How We Use Cookies */}
            <div>
              <h2 className="text-3xl font-black text-inovara-primary mb-8 ${isRTL ? 'text-right' : 'text-left'}">{t('legal.cookies.usage.title')}</h2>
              <div className="bg-gradient-to-r from-inovara-primary/5 to-inovara-secondary/5 rounded-3xl p-8 border border-inovara-primary/10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-bold text-inovara-primary mb-4 flex items-center gap-3 ${isRTL ? 'text-right' : 'text-left'}">
                      <Eye className="w-5 h-5 text-inovara-accent" />
                      {t('legal.cookies.usage.analytics.title')}
                    </h3>
                    <p className="text-inovara-primary/70 leading-relaxed mb-4 ${isRTL ? 'text-right' : 'text-left'}">
                      {t('legal.cookies.usage.analytics.content')}
                    </p>
                    <div className="space-y-2">
                      {['traffic', 'behavior', 'performance', 'optimization'].map((item, index) => (
                        <div key={index} className="flex items-start gap-2 ${isRTL ? 'text-right' : 'text-left'}">
                          <div className="w-1.5 h-1.5 bg-inovara-accent rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-sm text-inovara-primary/70">
                            {t(`legal.cookies.usage.analytics.${item}`)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-inovara-primary mb-4 flex items-center gap-3">
                      <Lock className="w-5 h-5 text-inovara-secondary" />
                      {t('legal.cookies.usage.security.title')}
                    </h3>
                    <p className="text-inovara-primary/70 leading-relaxed mb-4">
                      {t('legal.cookies.usage.security.content')}
                    </p>
                    <div className="space-y-2">
                      {['authentication', 'prevention', 'monitoring', 'protection'].map((item, index) => (
                        <div key={index} className="flex items-start gap-2 ${isRTL ? 'text-right' : 'text-left'}">
                          <div className="w-1.5 h-1.5 bg-inovara-secondary rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-sm text-inovara-primary/70">
                            {t(`legal.cookies.usage.security.${item}`)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Cookie Management */}
            <div>
              <h2 className="text-3xl font-black text-inovara-primary mb-8 ${isRTL ? 'text-right' : 'text-left'}">{t('legal.cookies.management.title')}</h2>
              <div className="bg-white/90 backdrop-blur-sm border border-inovara-primary/10 rounded-2xl p-8 shadow-lg">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-bold text-inovara-primary mb-4 flex items-center gap-3 ${isRTL ? 'text-right' : 'text-left'}">
                      <Settings className="w-5 h-5 text-inovara-accent" />
                      {t('legal.cookies.management.browser.title')}
                    </h3>
                    <p className="text-inovara-primary/70 leading-relaxed mb-4 ${isRTL ? 'text-right' : 'text-left'}">
                      {t('legal.cookies.management.browser.content')}
                    </p>
                    <div className="space-y-3">
                      {['chrome', 'firefox', 'safari', 'edge'].map((browser, index) => (
                        <div key={index} className="flex items-center gap-3 p-3 rounded-xl bg-white/50 hover:bg-white/70 transition-all duration-300 ${isRTL ? 'text-right' : 'text-left'}">
                          <div className="w-8 h-8 bg-gradient-to-br from-inovara-primary to-inovara-secondary rounded-lg flex items-center justify-center flex-shrink-0">
                            <span className="text-white font-bold text-xs">{browser.charAt(0).toUpperCase()}</span>
                          </div>
                          <span className="font-medium text-inovara-primary text-sm">
                            {t(`legal.cookies.management.browser.${browser}`)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-inovara-primary mb-4 flex items-center gap-3 ${isRTL ? 'text-right' : 'text-left'}">
                      <Cookie className="w-5 h-5 text-inovara-secondary" />
                      {t('legal.cookies.management.consent.title')}
                    </h3>
                    <p className="text-inovara-primary/70 leading-relaxed mb-4 ${isRTL ? 'text-right' : 'text-left'}">
                      {t('legal.cookies.management.consent.content')}
                    </p>
                    <div className="space-y-3">
                      {['banner', 'preferences', 'withdrawal', 'updates'].map((item, index) => (
                        <div key={index} className="flex items-start gap-3 p-3 rounded-xl bg-white/50 hover:bg-white/70 transition-all duration-300 ${isRTL ? 'text-right' : 'text-left'}">
                          <div className="w-2 h-2 bg-gradient-to-r from-inovara-secondary to-inovara-accent rounded-full mt-2 flex-shrink-0"></div>
                          <span className="font-medium text-inovara-primary text-sm">
                            {t(`legal.cookies.management.consent.${item}`)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Third-Party Cookies */}
            <div>
              <h2 className="text-3xl font-black text-inovara-primary mb-8 ${isRTL ? 'text-right' : 'text-left'}">{t('legal.cookies.thirdParty.title')}</h2>
              <div className="bg-gradient-to-r from-inovara-primary/5 to-inovara-secondary/5 rounded-3xl p-8 border border-inovara-primary/10">
                <p className="text-inovara-primary/70 leading-relaxed mb-8 ${isRTL ? 'text-right' : 'text-left'}">
                  {t('legal.cookies.thirdParty.intro')}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    { key: 'analytics', nameKey: 'legal.cookies.thirdParty.services.analytics.name', purposeKey: 'legal.cookies.thirdParty.services.analytics.purpose' },
                    { key: 'marketing', nameKey: 'legal.cookies.thirdParty.services.marketing.name', purposeKey: 'legal.cookies.thirdParty.services.marketing.purpose' },
                    { key: 'security', nameKey: 'legal.cookies.thirdParty.services.security.name', purposeKey: 'legal.cookies.thirdParty.services.security.purpose' }
                  ].map((service, index) => (
                    <div key={index} className={`p-6 bg-white/60 rounded-2xl hover:bg-white/80 transition-all duration-300 text-center`}>
                      <div className="w-12 h-12 bg-gradient-to-br from-inovara-primary to-inovara-secondary rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <Shield className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="font-bold text-inovara-primary mb-2">{t(service.nameKey)}</h3>
                      <p className="text-sm text-inovara-primary/70">{t(service.purposeKey)}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div>
              <h2 className={`text-3xl font-black text-inovara-primary mb-8 ${isRTL ? 'text-right' : 'text-left'}`}>{t('legal.cookies.contact.title')}</h2>
              <div className="bg-gradient-to-r from-inovara-primary/5 to-inovara-secondary/5 rounded-3xl p-8 border border-inovara-primary/10">
                <p className={`text-inovara-primary/70 leading-relaxed mb-8 ${isRTL ? 'text-right' : 'text-left'}`}>
                  {t('legal.cookies.contact.intro')}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-gradient-to-br from-inovara-accent to-inovara-secondary rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <Mail className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-bold text-inovara-primary mb-2">{t('legal.cookies.contact.email.title')}</h3>
                    <p className="text-sm text-inovara-primary/70">{t('legal.cookies.contact.email.content')}</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-gradient-to-br from-inovara-primary to-inovara-primary/80 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <Phone className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-bold text-inovara-primary mb-2">{t('legal.cookies.contact.phone.title')}</h3>
                    <p className="text-sm text-inovara-primary/70">+20 123 456 7890</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-gradient-to-br from-inovara-secondary to-inovara-secondary/80 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <MapPin className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-bold text-inovara-primary mb-2">{t('legal.cookies.contact.address.title')}</h3>
                    <p className="text-sm text-inovara-primary/70">{t('legal.cookies.contact.address.content')}</p>
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
              {t('legal.cookies.cta.title')}
            </h2>
            <p className="text-xl text-white/90 font-light leading-relaxed mb-8">
              {t('legal.cookies.cta.description')}
            </p>

            <div className={`flex flex-col gap-4 justify-center items-center ${isRTL ? 'sm:flex-row-reverse' : 'sm:flex-row'}`}>
              <Link
                to="/#contact"
                className="group px-12 py-5 bg-white text-inovara-primary font-bold text-lg rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-white/30"
              >
                <span className="flex items-center justify-center gap-3">
                  {t('legal.cookies.cta.contact')}
                  <ArrowRight className={`w-6 h-6 group-hover:translate-x-1 transition-transform duration-300 ${isRTL ? 'rotate-180 group-hover:-translate-x-1' : ''}`} />
                </span>
              </Link>

              <Link
                to="/privacy"
                className="px-12 py-5 border-2 border-white text-white font-bold text-lg rounded-2xl hover:bg-white hover:text-inovara-primary transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-white/30"
              >
                {t('legal.cookies.cta.privacy')}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div >
  );
};

export default CookiePolicyPage;
