import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Sparkles, AlertCircle } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from '../contexts/TranslationContext';
import { listProducts } from '../network/product';
import { queryKeys } from '../services/react-query/queryKeys';
import { Product, PaginatedResponse } from '../types/api';

interface ProductsSectionProps {
  onQuoteClick?: () => void;
}

const ProductsSection: React.FC<ProductsSectionProps> = ({ onQuoteClick }) => {
  const { t, isRTL, language } = useTranslation();
  const navigate = useNavigate();

  // Fetch products from API
  const { 
    data: productsResponse, 
    isLoading, 
    isError 
  } = useQuery<PaginatedResponse<Product>>({
    queryKey: [queryKeys.listProducts, { page: 1, per_page: 4, category_id: 2 }, language],
    queryFn: () => listProducts({ page: 1, per_page: 4, category_id: 2 }),
    enabled: !!language,
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes
  });

  // Extract products from API response
  const products = productsResponse?.data || [];

  // Format price with currency
  const formatPrice = (price: string | number, currency?: string) => {
    const numericPrice = typeof price === 'string' ? parseFloat(price) : price;
    if (isNaN(numericPrice)) return 'Price on request';
    
    return new Intl.NumberFormat(language === 'ar' ? 'ar-SA' : 'en-US', {
      style: 'currency',
      currency: currency || 'USD',
      minimumFractionDigits: 0,
    }).format(numericPrice);
  };

  // Get gradient color based on category
  const getCategoryGradient = (categorySlug?: string) => {
    const gradients: Record<string, string> = {
      'flower': 'from-pink-500 to-rose-600',
      'snack': 'from-orange-500 to-amber-600',
      'food': 'from-red-500 to-orange-600',
      'beverage': 'from-blue-500 to-cyan-600',
      'default': 'from-inovara-primary to-inovara-secondary'
    };
    return gradients[categorySlug || 'default'] || gradients.default;
  };

  const handleViewDetails = (product: Product) => {
    navigate(`/products/${product.slug || product.id}`);
  };

  const handleViewAllProducts = () => {
    navigate('/products');
  };

  return (
    <section 
      id="products" 
      className={`relative py-24 px-6 overflow-hidden ${isRTL ? 'rtl' : 'ltr'}`}
      style={{
        background: 'linear-gradient(135deg, rgba(255,255,255,1) 0%, rgba(248,250,252,0.8) 50%, rgba(255,255,255,1) 100%)'
      }}
    >
      {/* Subtle Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-gradient-to-br from-inovara-accent/2 to-inovara-secondary/2 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 left-1/4 w-80 h-80 bg-gradient-to-tr from-inovara-primary/2 to-inovara-accent/2 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Enterprise Header */}
        <div className={`text-center mb-20 ${isRTL ? 'rtl' : 'ltr'}`}>
          <div className="flex items-center justify-center gap-3 mb-6">
            <Sparkles className="w-8 h-8 text-inovara-accent" />
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-inovara-primary tracking-tight leading-[0.9]">
              {t('showcase.title')}
            </h2>
            <Sparkles className="w-8 h-8 text-inovara-accent" />
          </div>
          
          {/* Professional Divider */}
          <div className="w-32 h-1 bg-gradient-to-r from-inovara-accent to-inovara-secondary mx-auto mb-8 rounded-full"></div>
          
          <div className="max-w-4xl mx-auto">
            <p className="text-xl md:text-2xl text-inovara-primary/70 font-light leading-relaxed">
              {t('showcase.subtitle')}
            </p>
          </div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {Array.from({ length: 4 }).map((_, index) => (
              <div 
                key={index}
                className="bg-white/90 backdrop-blur-sm border border-inovara-primary/10 rounded-3xl overflow-hidden animate-pulse"
              >
                <div className="h-48 bg-gray-200"></div>
                <div className="p-6">
                  <div className="h-6 bg-gray-200 rounded mb-3"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded mb-6 w-3/4"></div>
                  <div className="h-12 bg-gray-200 rounded-2xl"></div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Error State */}
        {isError && (
          <div className="text-center py-16 mb-16">
            <div className="w-24 h-24 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <AlertCircle className="w-12 h-12 text-yellow-500" />
            </div>
            <h3 className="text-2xl font-bold text-inovara-primary mb-4">
              {t('products.errorTitle')}
            </h3>
            <p className="text-inovara-primary/70 mb-8 max-w-md mx-auto">
              {t('products.errorDescription')} Showing sample products below.
            </p>
          </div>
        )}

        {/* Products Grid */}
        {!isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {products.map((product, index) => {
              return (
                <div 
                  key={product.id}
                  className={`group relative bg-white/90 backdrop-blur-sm border border-inovara-primary/10 rounded-3xl overflow-hidden hover:-translate-y-2 transition-all duration-500 shadow-lg hover:shadow-2xl hover:shadow-inovara-primary/10 ${isRTL ? 'rtl' : 'ltr'}`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {/* Image Container */}
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={product.images?.[0] || product.image_url || 'https://via.placeholder.com/600x400?text=Product+Image'} 
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      loading="lazy"
                      onError={(e) => {
                        e.currentTarget.src = 'https://via.placeholder.com/600x400?text=Product+Image';
                      }}
                    />
                    
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                    
                    {/* Price Badge */}
                    <div className={`absolute top-4 ${isRTL ? 'left-4' : 'right-4'} bg-gradient-to-r ${getCategoryGradient(product.category?.slug)} text-white px-3 py-1 rounded-full text-xs font-bold`}>
                      {formatPrice(product.price, product.currency)}
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="p-6">
                    <h3 className={`text-xl font-black text-inovara-primary mb-3 group-hover:text-inovara-accent transition-colors duration-300 ${isRTL ? 'text-right' : 'text-left'}`}>
                      {product.name}
                    </h3>
                    
                    <p className={`text-inovara-primary/70 font-light leading-relaxed mb-6 ${isRTL ? 'text-right' : 'text-left'}`}>
                      {product.description}
                    </p>
                    
                    {/* Action Button */}
                    <button
                      onClick={() => handleViewDetails(product)}
                      className={`
                        w-full group/btn relative overflow-hidden bg-gradient-to-r from-inovara-primary to-inovara-secondary
                        text-white font-bold py-3 px-6 rounded-2xl shadow-lg hover:shadow-xl
                        transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-inovara-accent/30
                        ${isRTL ? 'rtl' : 'ltr'}
                      `}
                    >
                      <span className={`flex items-center justify-center gap-2 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
                        {t('showcase.viewDetails')}
                        <ArrowRight className={`w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300 ${isRTL ? 'rotate-180 group-hover/btn:-translate-x-1' : ''}`} />
                      </span>
                      
                      {/* Button Hover Effect */}
                      <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-500 skew-x-12"></div>
                    </button>
                  </div>
                  
                  {/* Card Hover Glow */}
                  <div className="absolute inset-0 bg-gradient-to-br from-inovara-accent/5 to-inovara-secondary/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                </div>
              );
            })}
          </div>
        )}

        {/* Fallback for when no products are available */}
        {!isLoading && !isError && products.length === 0 && (
          <div className="text-center py-16 mb-16">
            <div className="w-24 h-24 bg-inovara-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Sparkles className="w-12 h-12 text-inovara-primary/50" />
            </div>
            <h3 className="text-2xl font-bold text-inovara-primary mb-4">
              {t('products.noResults')}
            </h3>
            <p className="text-inovara-primary/70 mb-8 max-w-md mx-auto">
              {t('products.noResultsDesc')}
            </p>
          </div>
        )}

        {/* Main CTA Section */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-inovara-primary/10 to-inovara-secondary/10 rounded-3xl p-12 border border-inovara-primary/20 backdrop-blur-sm">
            <h3 className="text-3xl md:text-4xl font-black text-inovara-primary mb-6">
              {t('showcase.cta.title')}
            </h3>
            <p className="text-xl text-inovara-primary/70 font-light leading-relaxed mb-8 max-w-3xl mx-auto">
              {t('showcase.cta.description')}
            </p>
            
            <div className={`flex flex-col sm:flex-row gap-4 justify-center items-center ${isRTL ? 'sm:flex-row-reverse' : ''}`}>
              <button 
                onClick={handleViewAllProducts}
                className="group px-12 py-5 bg-gradient-to-r from-inovara-primary to-inovara-secondary text-white font-bold text-lg rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-inovara-accent/30"
              >
                <span className={`flex items-center justify-center gap-3 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
                  {t('showcase.cta.viewAll')}
                  <ArrowRight className={`w-6 h-6 group-hover:translate-x-1 transition-transform duration-300 ${isRTL ? 'rotate-180 group-hover:-translate-x-1' : ''}`} />
                </span>
              </button>
              
              <button 
                onClick={onQuoteClick}
                className="px-12 py-5 border-2 border-inovara-primary text-inovara-primary font-bold text-lg rounded-2xl hover:bg-inovara-primary hover:text-white transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-inovara-primary/20"
              >
                {t('showcase.cta.getQuote')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;
