import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, BarChart3 } from 'lucide-react';
import { useTranslation } from '../contexts/TranslationContext';

export interface ProductDetailPageProps {
  onQuoteClick: () => void;
}

const ProductDetailPage: React.FC<ProductDetailPageProps> = ({ onQuoteClick }) => {
  const { slug } = useParams<{ slug: string }>();
  const { t, isRTL } = useTranslation();

  const title = t(`products.${slug}.title`, { defaultValue: t('products.smart.title') });
  const description = t(`products.${slug}.description`, { defaultValue: t('products.smart.description') });

  const specs = [
    t('features.payment'),
    t('features.inventory'),
    t('features.monitoring'),
    t('features.temperature'),
  ];

  return (
    <section className={`professional-section bg-section-light ${isRTL ? 'rtl' : 'ltr'}`}>
      <div className="professional-container">
        <div className="mb-8">
          <Link to="/products" className="text-inovara-primary/80 hover:text-inovara-primary font-medium">
            {isRTL ? '← ' : '← '} {t('common.back', { defaultValue: 'Back' })}
          </Link>
        </div>

        {/* Hero Visual + Summary */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start mb-12">
          <div className="aspect-video bg-white/70 rounded-2xl enterprise-glow"></div>
          <div>
            <h1 className="text-professional-heading text-inovara-primary mb-3">{title}</h1>
            <p className="text-inovara-primary/70 text-lg mb-6">{description}</p>
            <div className="space-y-2 mb-6">
              {specs.map((s, i) => (
                <div key={i} className="flex items-center text-inovara-primary/80">
                  <CheckCircle className={`w-4 h-4 text-inovara-accent ${isRTL ? 'ml-2' : 'mr-2'}`} />
                  <span className="text-sm">{s}</span>
                </div>
              ))}
            </div>
            <div className={`flex gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <button onClick={onQuoteClick} className="btn-enterprise px-6 py-3 text-base focus-ring">
                {t('contact.form.getQuote')}
              </button>
              <a href="#specs" className="btn-secondary px-6 py-3 text-base focus-ring">
                {t('common.more')}
              </a>
            </div>
          </div>
        </div>

        {/* Specs + ROI-like visualization */}
        <div id="specs" className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <div className="enterprise-card p-6">
            <h2 className="text-xl font-bold text-inovara-primary mb-4">{t('products.parameters', { defaultValue: 'Specifications' })}</h2>
            <ul className="space-y-2 text-inovara-primary/80 text-sm">
              {specs.map((s, i) => (
                <li key={i} className="flex items-center">
                  <CheckCircle className={`w-4 h-4 text-inovara-accent ${isRTL ? 'ml-2' : 'mr-2'}`} />
                  {s}
                </li>
              ))}
            </ul>
          </div>
          <div className="enterprise-card p-6">
            <h2 className="text-xl font-bold text-inovara-primary mb-4">{t('roi.title', { defaultValue: 'ROI Overview' })}</h2>
            <div className="h-48 bg-gradient-to-br from-inovara-accent/20 to-inovara-secondary/20 rounded-xl flex items-center justify-center">
              <BarChart3 className="w-10 h-10 text-inovara-primary" />
            </div>
            <p className="text-inovara-primary/70 text-sm mt-3">
              {t('roi.subtitle', { defaultValue: 'Estimated performance based on typical deployment scenarios.' })}
            </p>
          </div>
        </div>

        {/* Slide-in CTA banner */}
        <div className="mt-12">
          <div className="bg-gradient-to-r from-inovara-primary-10 to-inovara-secondary-10 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-inovara-primary">
              <div className="text-lg font-bold mb-1">{t('contact.cta.title')}</div>
              <div className="text-inovara-primary/80 text-sm">{t('contact.cta.description')}</div>
            </div>
            <div className={`flex gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <button onClick={onQuoteClick} className="btn-enterprise px-6 py-3 text-base focus-ring">
                {t('contact.cta.button')}
              </button>
              <Link to="/case-studies" className="btn-secondary px-6 py-3 text-base focus-ring inline-flex items-center">
                {t('caseStudies.ctaButton')}
                {!isRTL && <ArrowRight className="w-4 h-4 ml-2" />}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetailPage;
