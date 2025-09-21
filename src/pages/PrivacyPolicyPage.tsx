import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Shield, Eye, Lock, FileText, Mail, Phone, MapPin } from 'lucide-react';
import { useTranslation } from '../contexts/TranslationContext';

const PrivacyPolicyPage: React.FC = () => {
  const { t, isRTL } = useTranslation();

  return (
    <div className={`min-h-screen ${isRTL ? 'rtl' : 'ltr'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Hero Section */}
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
            <span className="text-inovara-primary font-medium">{t('legal.privacy.title')}</span>
          </nav>

          {/* Hero Content */}
          <div className={`mb-16 ${isRTL ? 'text-right' : 'text-center'}`}>
            <div className="flex items-center justify-center gap-4 mb-6">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-inovara-primary tracking-tight leading-[0.9]">
                {t('legal.privacy.title')}
              </h1>
            </div>

            {/* Professional Divider */}
            <div className="w-32 h-1 bg-gradient-to-r from-inovara-accent to-inovara-secondary mx-auto mb-8 rounded-full"></div>

            <div className="max-w-4xl mx-auto">
              <p className="text-xl md:text-2xl text-inovara-primary/70 font-light leading-relaxed text-center">
                {t('legal.privacy.subtitle')}
              </p>
              <p className={`text-sm text-inovara-primary/60 mt-4 text-center`}>
                {t('legal.lastUpdated')}: {t('legal.privacy.lastUpdated')}
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
                  <Eye className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1 ${isRTL ? 'text-right' : 'text-left'}">
                  <h2 className="text-2xl font-black text-inovara-primary mb-4 ${isRTL ? 'text-right' : 'text-left'}">{t('legal.privacy.introduction.title')}</h2>
                  <p className="text-inovara-primary/70 leading-relaxed ${isRTL ? 'text-right' : 'text-left'}">
                    {t('legal.privacy.introduction.content')}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Content Sections */}
          <div className="space-y-16">
            {/* Information We Collect */}
            <div>
              <h2 className="text-3xl font-black text-inovara-primary mb-8 ${isRTL ? 'text-right' : 'text-left'}">{t('legal.privacy.collection.title')}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white/90 backdrop-blur-sm border border-inovara-primary/10 rounded-2xl p-6 shadow-lg">
                  <h3 className="text-xl font-bold text-inovara-primary mb-4 flex items-center gap-3 ${isRTL ? 'text-right' : 'text-left'}">
                    <FileText className="w-5 h-5 text-inovara-accent" />
                    {t('legal.privacy.collection.personal.title')}
                  </h3>
                  <ul className="space-y-2 text-inovara-primary/70 ${isRTL ? 'text-right' : 'text-left'}">
                    <li className="flex items-start gap-2 ${isRTL ? 'text-right' : 'text-left'}">
                      <div className="w-1.5 h-1.5 bg-inovara-accent rounded-full mt-2 flex-shrink-0"></div>
                      <span>{t('legal.privacy.collection.personal.name')}</span>
                    </li>
                    <li className="flex items-start gap-2 ${isRTL ? 'text-right' : 'text-left'}">
                      <div className="w-1.5 h-1.5 bg-inovara-accent rounded-full mt-2 flex-shrink-0"></div>
                      <span>{t('legal.privacy.collection.personal.email')}</span>
                    </li>
                    <li className="flex items-start gap-2 ${isRTL ? 'text-right' : 'text-left'}">
                      <div className="w-1.5 h-1.5 bg-inovara-accent rounded-full mt-2 flex-shrink-0"></div>
                      <span>{t('legal.privacy.collection.personal.phone')}</span>
                    </li>
                    <li className="flex items-start gap-2 ${isRTL ? 'text-right' : 'text-left'}">
                      <div className="w-1.5 h-1.5 bg-inovara-accent rounded-full mt-2 flex-shrink-0"></div>
                      <span>{t('legal.privacy.collection.personal.company')}</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white/90 backdrop-blur-sm border border-inovara-primary/10 rounded-2xl p-6 shadow-lg">
                  <h3 className="text-xl font-bold text-inovara-primary mb-4 flex items-center gap-3 ${isRTL ? 'text-right' : 'text-left'}">
                    <Lock className="w-5 h-5 text-inovara-secondary" />
                    {t('legal.privacy.collection.automatic.title')}
                  </h3>
                  <ul className="space-y-2 text-inovara-primary/70 ${isRTL ? 'text-right' : 'text-left'}">
                    <li className="flex items-start gap-2 ${isRTL ? 'text-right' : 'text-left'}">
                      <div className="w-1.5 h-1.5 bg-inovara-secondary rounded-full mt-2 flex-shrink-0"></div>
                      <span>{t('legal.privacy.collection.automatic.ip')}</span>
                    </li>
                    <li className="flex items-start gap-2 ${isRTL ? 'text-right' : 'text-left'}">
                      <div className="w-1.5 h-1.5 bg-inovara-secondary rounded-full mt-2 flex-shrink-0"></div>
                      <span>{t('legal.privacy.collection.automatic.browser')}</span>
                    </li>
                    <li className="flex items-start gap-2 ${isRTL ? 'text-right' : 'text-left'}">
                      <div className="w-1.5 h-1.5 bg-inovara-secondary rounded-full mt-2 flex-shrink-0"></div>
                      <span>{t('legal.privacy.collection.automatic.device')}</span>
                    </li>
                    <li className="flex items-start gap-2 ${isRTL ? 'text-right' : 'text-left'}">
                      <div className="w-1.5 h-1.5 bg-inovara-secondary rounded-full mt-2 flex-shrink-0"></div>
                      <span>{t('legal.privacy.collection.automatic.cookies')}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* How We Use Information */}
            <div>
              <h2 className="text-3xl font-black text-inovara-primary mb-8 ${isRTL ? 'text-right' : 'text-left'}">{t('legal.privacy.usage.title')}</h2>
              <div className="bg-white/90 backdrop-blur-sm border border-inovara-primary/10 rounded-2xl p-8 shadow-lg">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    { key: 'service', icon: FileText },
                    { key: 'communication', icon: Mail },
                    { key: 'improvement', icon: Eye },
                    { key: 'legal', icon: Shield }
                  ].map((item, index) => {
                    const IconComponent = item.icon;
                    return (
                      <div key={index} className="flex items-start gap-4 p-4 rounded-xl bg-white/50 hover:bg-white/70 transition-all duration-300 ${isRTL ? 'text-right' : 'text-left'}">
                        <div className="w-10 h-10 bg-gradient-to-br from-inovara-accent to-inovara-secondary rounded-xl flex items-center justify-center flex-shrink-0 ${isRTL ? 'ml-4 mr-0' : 'mr-4 ml-0'}">
                          <IconComponent className="w-5 h-5 text-white" />
                        </div>
                        <div className="${isRTL ? 'text-right' : 'text-left'}">
                          <h3 className="font-bold text-inovara-primary mb-2 ${isRTL ? 'text-right' : 'text-left'}">
                            {t(`legal.privacy.usage.${item.key}.title`)}
                          </h3>
                          <p className="text-sm text-inovara-primary/70 ${isRTL ? 'text-right' : 'text-left'}">
                            {t(`legal.privacy.usage.${item.key}.description`)}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Data Protection */}
            <div>
              <h2 className="text-3xl font-black text-inovara-primary mb-8 ${isRTL ? 'text-right' : 'text-left'}">{t('legal.privacy.protection.title')}</h2>
              <div className="bg-gradient-to-r from-inovara-primary/5 to-inovara-secondary/5 rounded-3xl p-8 border border-inovara-primary/10">
                <p className="text-inovara-primary/70 leading-relaxed mb-6 ${isRTL ? 'text-right' : 'text-left'}">
                  {t('legal.privacy.protection.content')}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    { key: 'encryption', icon: Lock },
                    { key: 'access', icon: Shield },
                    { key: 'monitoring', icon: Eye }
                  ].map((item, index) => {
                    const IconComponent = item.icon;
                    return (
                      <div key={index} className="${isRTL ? 'text-right' : 'text-center'}">
                        <div className="w-16 h-16 bg-gradient-to-br from-inovara-primary to-inovara-secondary rounded-2xl flex items-center justify-center mb-4 shadow-lg ${isRTL ? 'ml-auto mr-0' : 'mx-auto'}">
                          <IconComponent className="w-8 h-8 text-white" />
                        </div>
                        <h3 className="font-bold text-inovara-primary mb-2 ${isRTL ? 'text-right' : 'text-center'}">
                          {t(`legal.privacy.protection.${item.key}.title`)}
                        </h3>
                        <p className="text-sm text-inovara-primary/70 ${isRTL ? 'text-right' : 'text-center'}">
                          {t(`legal.privacy.protection.${item.key}.description`)}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Your Rights */}
            <div>
              <h2 className="text-3xl font-black text-inovara-primary mb-8 ${isRTL ? 'text-right' : 'text-left'}">{t('legal.privacy.rights.title')}</h2>
              <div className="bg-white/90 backdrop-blur-sm border border-inovara-primary/10 rounded-2xl p-8 shadow-lg">
                <p className="text-inovara-primary/70 leading-relaxed mb-6 ${isRTL ? 'text-right' : 'text-left'}">
                  {t('legal.privacy.rights.intro')}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    'access', 'rectification', 'erasure', 'portability',
                    'restriction', 'objection', 'withdraw', 'complaint'
                  ].map((right, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 rounded-xl bg-white/50 hover:bg-white/70 transition-all duration-300 ${isRTL ? 'text-right' : 'text-left'}">
                      <div className="w-2 h-2 bg-gradient-to-r from-inovara-accent to-inovara-secondary rounded-full flex-shrink-0"></div>
                      <span className="font-medium text-inovara-primary">
                        {t(`legal.privacy.rights.${right}`)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div>
              <h2 className={`text-3xl font-black text-inovara-primary mb-8 ${isRTL ? 'text-right' : 'text-left'}`}>{t('legal.privacy.contact.title')}</h2>
              <div className="bg-gradient-to-r from-inovara-primary/5 to-inovara-secondary/5 rounded-3xl p-8 border border-inovara-primary/10">
                <p className={`text-inovara-primary/70 leading-relaxed mb-8 ${isRTL ? 'text-right' : 'text-left'}`}>
                  {t('legal.privacy.contact.intro')}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-gradient-to-br from-inovara-accent to-inovara-secondary rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <Mail className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-bold text-inovara-primary mb-2">{t('legal.privacy.contact.email.title')}</h3>
                    <p className="text-sm text-inovara-primary/70">{t('legal.privacy.contact.email.content')}</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-gradient-to-br from-inovara-primary to-inovara-primary/80 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <Phone className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-bold text-inovara-primary mb-2">{t('legal.privacy.contact.phone.title')}</h3>
                    <p className="text-sm text-inovara-primary/70">+201116392600</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-gradient-to-br from-inovara-secondary to-inovara-secondary/80 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <MapPin className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-bold text-inovara-primary mb-2">{t('legal.privacy.contact.address.title')}</h3>
                    <p className="text-sm text-inovara-primary/70">{t('legal.privacy.contact.address.content')}</p>
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
              {t('legal.privacy.cta.title')}
            </h2>
            <p className="text-xl text-white/90 font-light leading-relaxed mb-8">
              {t('legal.privacy.cta.description')}
            </p>

            <div className={`flex flex-col gap-4 justify-center items-center ${isRTL ? 'sm:flex-row-reverse' : 'sm:flex-row'}`}>
              <Link
                to="/contact"
                className="group px-12 py-5 bg-white text-inovara-primary font-bold text-lg rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-white/30"
              >
                <span className="flex items-center justify-center gap-3">
                  {t('legal.privacy.cta.contact')}
                  <ArrowRight className={`w-6 h-6 group-hover:translate-x-1 transition-transform duration-300 ${isRTL ? 'rotate-180 group-hover:-translate-x-1' : ''}`} />
                </span>
              </Link>

              <Link
                to="/terms"
                className="px-12 py-5 border-2 border-white text-white font-bold text-lg rounded-2xl hover:bg-white hover:text-inovara-primary transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-white/30"
              >
                {t('legal.privacy.cta.terms')}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PrivacyPolicyPage;
