import React from 'react';
import { useTranslation } from '../contexts/TranslationContext';

const ProductsSection: React.FC = () => {
  const { t, isRTL } = useTranslation();

  return (
    <section id="products" className={`py-20 bg-section-light ${isRTL ? 'rtl' : 'ltr'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            {t('products.title')}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('products.subtitle')}
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Smart Vending Machine */}
          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {t('products.smart.title')}
            </h3>
            <p className="text-gray-600 mb-4">
              {t('products.smart.description')}
            </p>
            <div className="text-2xl font-bold text-inovara-primary">
              {t('products.smart.price')}
            </div>
          </div>

          {/* Premium Vending Machine */}
          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {t('products.premium.title')}
            </h3>
            <p className="text-gray-600 mb-4">
              {t('products.premium.description')}
            </p>
            <div className="text-2xl font-bold text-inovara-primary">
              {t('products.premium.price')}
            </div>
          </div>

          {/* Enterprise Vending Machine */}
          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {t('products.enterprise.title')}
            </h3>
            <p className="text-gray-600 mb-4">
              {t('products.enterprise.description')}
            </p>
            <div className="text-2xl font-bold text-inovara-primary">
              {t('products.enterprise.price')}
            </div>
          </div>

          {/* Custom Vending Machine */}
          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {t('products.custom.title')}
            </h3>
            <p className="text-gray-600 mb-4">
              {t('products.custom.description')}
            </p>
            <div className="text-2xl font-bold text-inovara-primary">
              {t('products.custom.price')}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;