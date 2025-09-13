import React from 'react';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from '../contexts/TranslationContext';

export interface ProductsPageProps {
  onQuoteClick: () => void;
}

const products = [
  { slug: 'smart', key: 'products.smart', img: '/images/smart.png' },
  { slug: 'premium', key: 'products.premium', img: '/images/premium.png' },
  { slug: 'enterprise', key: 'products.enterprise', img: '/images/enterprise.png' },
  { slug: 'custom', key: 'products.custom', img: '/images/custom.png' },
  { slug: 'compact', key: 'products.compact', img: '/images/compact.png' },
];

const fallbackSpecs = [
  'Cashless Payments',
  'Real-time Analytics',
  'Remote Management',
];

const ProductsPage: React.FC<ProductsPageProps> = ({ onQuoteClick }) => {
  const { t, isRTL } = useTranslation();

  return (
    <section className={`professional-section bg-section-light ${isRTL ? 'rtl' : 'ltr'}`}>
      <div className="professional-container">
        <div className="text-center mb-12">
          <h1 className="text-professional-heading text-inovara-primary mb-3">{t('products.title')}</h1>
          <p className="text-inovara-secondary text-lg max-w-3xl mx-auto">{t('products.subtitle')}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((p) => (
            <div key={p.slug} className="enterprise-card p-6">
              <div className="aspect-video bg-white/70 rounded-xl mb-4 flex items-center justify-center text-inovara-primary/40">
                <span className="text-sm">Image: {p.slug}</span>
              </div>
              <h3 className="text-xl font-bold text-inovara-primary mb-1">{t(`${p.key}.title`)}</h3>
              <p className="text-inovara-primary/70 text-sm mb-4">{t(`${p.key}.description`, { defaultValue: t(`${p.key}.subtitle`) })}</p>

              <div className="space-y-2 mb-4">
                {fallbackSpecs.map((s, i) => (
                  <div key={i} className="flex items-center text-sm text-inovara-primary/70">
                    <CheckCircle className={`w-4 h-4 text-inovara-accent ${isRTL ? 'ml-2' : 'mr-2'}`} />
                    <span>{s}</span>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between">
                <Link to={`/products/${p.slug}`} className="text-inovara-primary font-semibold inline-flex items-center hover:opacity-80">
                  {isRTL ? (
                    <>
                      <ArrowRight className="w-4 h-4 ml-2 rotate-180" /> {t('common.more')}
                    </>
                  ) : (
                    <>
                      {t('common.more')} <ArrowRight className="w-4 h-4 ml-2" />
                    </>
                  )}
                </Link>
                <button onClick={onQuoteClick} className="btn-enterprise px-4 py-2 text-sm focus-ring">
                  {t('contact.form.getQuote')}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductsPage;
