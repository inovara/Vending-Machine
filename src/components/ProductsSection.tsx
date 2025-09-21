import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Sparkles, AlertCircle } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from '../contexts/TranslationContext';
import { listProducts } from '../network/product';
import { queryKeys } from '../services/react-query/queryKeys';
import { Product, PaginatedResponse } from '../types/api';

interface ProductsSectionProps {
  onQuoteClick?: (productId?: number) => void;
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
      className={`relative py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden ${isRTL ? 'rtl' : 'ltr'}`}
      style={{
        background: 'linear-gradient(135deg, rgba(255,255,255,1) 0%, rgba(248,250,252,0.8) 50%, rgba(255,255,255,1) 100%)'
      }}
    >
      {/* Unified Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className={`absolute top-1/3 ${isRTL ? 'left-1/4' : 'right-1/4'} w-72 sm:w-96 h-72 sm:h-96 bg-gradient-to-br from-inovara-accent/2 to-inovara-secondary/2 rounded-full blur-3xl`}></div>
        <div className={`absolute bottom-1/3 ${isRTL ? 'right-1/4' : 'left-1/4'} w-64 sm:w-80 h-64 sm:h-80 bg-gradient-to-tr from-inovara-primary/2 to-inovara-accent/2 rounded-full blur-3xl`}></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Unified Section Header */}
        <div className={`text-center mb-12 sm:mb-16 lg:mb-20 ${isRTL ? 'rtl' : 'ltr'}`}>
          <div className={`flex items-center justify-center gap-2 sm:gap-3 mb-4 sm:mb-6 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-inovara-primary tracking-tight leading-[0.9]">
              {t('showcase.title')}
            </h2>
          </div>
          
          {/* Unified Divider */}
          <div className="w-24 sm:w-32 h-0.5 sm:h-1 bg-gradient-to-r from-inovara-accent to-inovara-secondary mx-auto mb-6 sm:mb-8 rounded-full"></div>
          
          <div className="max-w-3xl sm:max-w-4xl mx-auto px-4">
            <p className="text-lg sm:text-xl md:text-2xl text-inovara-primary/70 font-light leading-relaxed">
              {t('showcase.subtitle')}
            </p>
          </div>
        </div>

        {/* Enhanced Loading State */}
        {isLoading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8 mb-12 sm:mb-16">
            {Array.from({ length: 4 }).map((_, index) => (
              <div 
                key={index}
                className="bg-white/90 backdrop-blur-sm border border-inovara-primary/10 rounded-2xl sm:rounded-3xl overflow-hidden animate-pulse shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="aspect-[4/3] bg-gradient-to-br from-gray-200 to-gray-300"></div>
                <div className="p-5 sm:p-6">
                  <div className="h-5 sm:h-6 bg-gradient-to-r from-gray-200 to-gray-300 rounded mb-3"></div>
                  <div className="h-3 sm:h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded mb-2"></div>
                  <div className="h-3 sm:h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded mb-4 sm:mb-6 w-3/4"></div>
                  <div className="h-12 sm:h-14 bg-gradient-to-r from-gray-200 to-gray-300 rounded-xl sm:rounded-2xl"></div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Unified Error State */}
        {isError && (
          <div className={`text-center py-12 sm:py-16 mb-12 sm:mb-16 ${isRTL ? 'rtl' : 'ltr'}`}>
            <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-yellow-100 to-yellow-200 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-lg">
              <AlertCircle className="w-10 h-10 sm:w-12 sm:h-12 text-yellow-600" />
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-inovara-primary mb-3 sm:mb-4">
              {t('products.errorTitle')}
            </h3>
            <p className="text-sm sm:text-base text-inovara-primary/70 mb-6 sm:mb-8 max-w-md mx-auto px-4 leading-relaxed">
              {t('products.errorDescription')} Showing sample products below.
            </p>
          </div>
        )}

        {/* Enhanced Products Grid */}
        {!isLoading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8 mb-12 sm:mb-16">
            {products.map((product, index) => {
              return (
                <div 
                  key={product.id}
                  className={`group relative bg-white/95 backdrop-blur-sm border border-inovara-primary/10 rounded-2xl sm:rounded-3xl overflow-hidden hover:-translate-y-2 sm:hover:-translate-y-3 transition-all duration-700 shadow-lg hover:shadow-2xl hover:shadow-inovara-primary/20 ${isRTL ? 'rtl' : 'ltr'}`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {/* Enhanced Image Container with Aspect Ratio */}
                  <div className="relative aspect-[4/3] sm:aspect-[4/3] overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
                    <img 
                      src={product.images?.[0] || product.image_url || 'https://via.placeholder.com/600x400?text=Product+Image'} 
                      alt={product.name}
                      className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-700 ease-out"
                      loading="lazy"
                      onError={(e) => {
                        e.currentTarget.src = 'https://via.placeholder.com/600x400?text=Product+Image';
                      }}
                    />
                    
                    {/* Enhanced Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    
                    {/* Enhanced Price Badge */}
                    <div className={`absolute top-3 sm:top-4 ${isRTL ? 'left-3 sm:left-4' : 'right-3 sm:right-4'} bg-gradient-to-r ${getCategoryGradient(product.category?.slug)} text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-bold shadow-xl backdrop-blur-sm border border-white/20`}>
                      {formatPrice(product.price, product.currency)}
                    </div>
                    
                    {/* New: Category Badge */}
                    {product.category?.name && (
                      <div className={`absolute top-3 sm:top-4 ${isRTL ? 'right-3 sm:right-4' : 'left-3 sm:left-4'} bg-white/90 backdrop-blur-sm text-inovara-primary px-2 sm:px-3 py-1 rounded-full text-xs font-semibold shadow-lg border border-inovara-primary/20`}>
                        {product.category.name}
                      </div>
                    )}
                    
                    {/* New: Hover Overlay with Quick Actions */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                      <button
                        onClick={() => handleViewDetails(product)}
                        className="bg-white/90 backdrop-blur-sm text-inovara-primary px-6 py-3 rounded-full font-bold text-sm shadow-xl hover:bg-white hover:scale-105 transition-all duration-300 flex items-center gap-2"
                      >
                        {t('showcase.viewDetails')}
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  
                  {/* Enhanced Content */}
                  <div className="p-5 sm:p-6">
                    <h3 className={`text-lg sm:text-xl font-black text-inovara-primary mb-2 sm:mb-3 group-hover:text-inovara-accent transition-colors duration-300 line-clamp-2 leading-tight ${isRTL ? 'text-right' : 'text-left'}`}>
                      {product.name}
                    </h3>
                    
                    <p className={`text-sm sm:text-base text-inovara-primary/70 font-light leading-relaxed mb-4 sm:mb-6 line-clamp-3 ${isRTL ? 'text-right' : 'text-left'}`}>
                      {product.description}
                    </p>
                    
                    {/* Enhanced Action Buttons */}
                    <div className="flex flex-col gap-2 sm:gap-3">
                      <button
                        onClick={() => handleViewDetails(product)}
                        className={`
                          w-full group/btn relative overflow-hidden bg-gradient-to-r from-inovara-primary to-inovara-secondary
                          text-white font-bold py-3 sm:py-3.5 px-4 sm:px-6 rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl
                          transition-all duration-300 transform hover:scale-[1.02] focus:outline-none focus:ring-4 focus:ring-inovara-accent/30
                          ${isRTL ? 'rtl' : 'ltr'}
                        `}
                      >
                        <span className={`flex items-center justify-center gap-2 text-sm sm:text-base ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
                          {t('showcase.viewDetails')}
                          <ArrowRight className={`w-3 h-3 sm:w-4 sm:h-4 group-hover/btn:translate-x-1 transition-transform duration-300 ${isRTL ? 'rotate-180 group-hover/btn:-translate-x-1' : ''}`} />
                        </span>
                        
                        {/* Enhanced Button Hover Effect */}
                        <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-700 skew-x-12"></div>
                      </button>
                      
                      <button
                        onClick={() => onQuoteClick?.(product.id)}
                        className="w-full px-4 sm:px-6 py-2.5 sm:py-3 border-2 border-inovara-primary text-inovara-primary font-bold text-xs sm:text-sm rounded-xl hover:bg-inovara-primary hover:text-white transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-inovara-primary/20"
                      >
                        {t('showcase.cta.getQuote')}
                      </button>
                    </div>
                  </div>
                  
                  {/* Enhanced Card Hover Glow */}
                  <div className="absolute inset-0 bg-gradient-to-br from-inovara-accent/10 to-inovara-secondary/10 rounded-2xl sm:rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
                  
                  {/* New: Card Border Glow Effect */}
                  <div className="absolute inset-0 rounded-2xl sm:rounded-3xl bg-gradient-to-r from-inovara-primary/20 via-inovara-accent/20 to-inovara-secondary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none -z-10 blur-sm"></div>
                </div>
              );
            })}
          </div>
        )}

        {/* Unified No Results State */}
        {!isLoading && !isError && products.length === 0 && (
          <div className={`text-center py-12 sm:py-16 mb-12 sm:mb-16 ${isRTL ? 'rtl' : 'ltr'}`}>
            <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-inovara-primary/10 to-inovara-primary/20 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-lg">
              <Sparkles className="w-10 h-10 sm:w-12 sm:h-12 text-inovara-primary/50" />
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-inovara-primary mb-3 sm:mb-4">
              {t('products.noResults')}
            </h3>
            <p className="text-sm sm:text-base text-inovara-primary/70 mb-6 sm:mb-8 max-w-md mx-auto px-4 leading-relaxed">
              {t('products.noResultsDesc')}
            </p>
          </div>
        )}

        {/* Unified CTA Section */}
        <div className={`text-center ${isRTL ? 'rtl' : 'ltr'}`}>
          <div className="bg-gradient-to-r from-inovara-primary/10 to-inovara-secondary/10 rounded-2xl sm:rounded-3xl p-8 sm:p-12 border border-inovara-primary/20 backdrop-blur-sm shadow-lg">
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-inovara-primary mb-4 sm:mb-6">
              {t('showcase.cta.title')}
            </h3>
            <p className="text-lg sm:text-xl text-inovara-primary/70 font-light leading-relaxed mb-6 sm:mb-8 max-w-3xl mx-auto px-4">
              {t('showcase.cta.description')}
            </p>
            
            <div className={`flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center ${isRTL ? 'sm:flex-row-reverse' : ''}`}>
              <button 
                onClick={handleViewAllProducts}
                className="group px-8 sm:px-12 py-4 sm:py-5 bg-gradient-to-r from-inovara-primary to-inovara-secondary text-white font-bold text-base sm:text-lg rounded-xl sm:rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-inovara-accent/30 relative overflow-hidden"
              >
                <span className={`flex items-center justify-center gap-2 sm:gap-3 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
                  {t('showcase.cta.viewAll')}
                  <ArrowRight className={`w-4 h-4 sm:w-6 sm:h-6 group-hover:translate-x-1 transition-transform duration-300 ${isRTL ? 'rotate-180 group-hover:-translate-x-1' : ''}`} />
                </span>
                <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500 skew-x-12"></div>
              </button>
              
              <button 
                onClick={() => onQuoteClick?.()}
                className="px-8 sm:px-12 py-4 sm:py-5 border-2 border-inovara-primary text-inovara-primary font-bold text-base sm:text-lg rounded-xl sm:rounded-2xl hover:bg-inovara-primary hover:text-white transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-inovara-primary/20"
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
