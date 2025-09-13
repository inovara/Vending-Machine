import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useTranslation } from '../contexts/TranslationContext';

interface ProductsSectionProps {
  onQuoteClick: () => void;
}

const ProductsSection: React.FC<ProductsSectionProps> = ({ onQuoteClick }) => {
  const { t, isRTL } = useTranslation();

  const cards = [
    { title: t('products.smart.title'), description: t('products.smart.description'), price: t('products.smart.price') },
    { title: t('products.premium.title'), description: t('products.premium.description'), price: t('products.premium.price') },
    { title: t('products.enterprise.title'), description: t('products.enterprise.description'), price: t('products.enterprise.price') },
    { title: t('products.custom.title'), description: t('products.custom.description'), price: t('products.custom.price') },
  ];

  return (
    <section id="products" className={`professional-section bg-section-light ${isRTL ? 'rtl' : 'ltr'}`}>
      <div className="professional-container">
        <div className="text-center mb-16">
          <h2 className="text-professional-heading text-inovara-primary mb-4">
            {t('products.title')}
          </h2>
          <p className="text-inovara-secondary text-lg max-w-3xl mx-auto">
            {t('products.subtitle')}
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {cards.map((c, idx) => (
            <div key={idx} className="enterprise-card p-6 hover:shadow-enterprise-lg transition-all duration-300">
              <div className="aspect-video bg-white/70 rounded-xl mb-4" />
              <h3 className="text-xl font-semibold text-inovara-primary mb-2">
                {c.title}
              </h3>
              <p className="text-inovara-primary/70 text-sm mb-4">
                {c.description}
              </p>
              <div className="text-2xl font-bold text-inovara-primary mb-4">
                {c.price}
              </div>
              <button onClick={onQuoteClick} className="btn-enterprise w-full px-4 py-2 text-sm focus-ring inline-flex items-center justify-center">
                {t('contact.form.getQuote')}
                <ArrowRight className={`${isRTL ? 'mr-2 rotate-180' : 'ml-2'} w-4 h-4`} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;