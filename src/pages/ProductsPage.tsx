import React, { useState, useMemo } from 'react';
import { ArrowRight, Sparkles, Loader2, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from '../contexts/TranslationContext';
import { listProducts } from '../network/product';
import { queryKeys } from '../services/react-query/queryKeys';
import { Product, PaginatedResponse } from '../types/api';

export interface ProductsPageProps {
  onQuoteClick: (productId?: number) => void;
}

const ProductsPage: React.FC<ProductsPageProps> = ({ onQuoteClick }) => {
  const { t, isRTL, language } = useTranslation();
  const [currentPage, setCurrentPage] = useState(1);

  const filters = {
    page: currentPage,
    per_page: 12,
    category_id: 2,
  };

  const {
    data: productsResponse,
    isLoading,
    isError,
    refetch
  } = useQuery<PaginatedResponse<Product>>({
    queryKey: [queryKeys.listProducts, filters, language],
    queryFn: () => listProducts(filters),
    enabled: !!language,
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes
    retry: 1, // Only retry once on failure
    retryOnMount: false, // Don't retry on mount if it failed
  });

  // Extract products from API response
  const products = useMemo(() => productsResponse?.data || [], [productsResponse?.data]);
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


  return (
    <div className={`min-h-screen ${isRTL ? 'rtl' : 'ltr'}`}>
      {/* Unified Hero Section */}
      <section
        className="relative pt-16 sm:pt-20 lg:pt-24 px-4 sm:px-6 overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, rgba(255,255,255,1) 0%, rgba(248,250,252,0.8) 50%, rgba(255,255,255,1) 100%)'
        }}
      >
        {/* Unified Background Effects */}
        <div className="absolute inset-0 overflow-hidden">
          <div className={`absolute top-1/4 ${isRTL ? 'left-1/4' : 'right-1/4'} w-72 sm:w-96 h-72 sm:h-96 bg-gradient-to-br from-inovara-accent/3 to-inovara-secondary/3 rounded-full blur-3xl`}></div>
          <div className={`absolute bottom-1/4 ${isRTL ? 'right-1/4' : 'left-1/4'} w-64 sm:w-80 h-64 sm:h-80 bg-gradient-to-tr from-inovara-primary/2 to-inovara-accent/2 rounded-full blur-3xl`}></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto">
          {/* Unified Breadcrumb */}
          <nav className={`flex items-center gap-1 sm:gap-2 mb-6 sm:mb-8 text-xs sm:text-sm ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
            <Link to="/" className="text-inovara-primary/70 hover:text-inovara-primary transition-colors px-2 py-1 rounded-lg hover:bg-inovara-primary/5">
              {t('products.breadcrumb.home')}
            </Link>
            <ArrowRight className={`w-3 h-3 sm:w-4 sm:h-4 text-inovara-primary/50 ${isRTL ? 'rotate-180' : ''}`} />
            <span className="text-inovara-primary font-medium">{t('products.breadcrumb.products')}</span>
          </nav>

          {/* Unified Hero Content */}
          <div className="text-center mb-8 sm:mb-10">
            <div className={`flex items-center justify-center gap-2 sm:gap-3 mb-4 sm:mb-6 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-inovara-primary tracking-tight leading-[0.9]">
                {t('products.title')}
              </h1>
            </div>

            {/* Unified Divider */}
            <div className="w-24 sm:w-32 h-0.5 sm:h-1 bg-gradient-to-r from-inovara-accent to-inovara-secondary mx-auto mb-6 sm:mb-8 rounded-full"></div>

            <div className="max-w-3xl sm:max-w-4xl mx-auto px-4">
              <p className="text-lg sm:text-xl md:text-2xl text-inovara-primary/70 font-light leading-relaxed">
                {t('products.subtitle')}
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* Unified Products Grid */}
      <section className="px-4 sm:px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          {/* Unified Results Header */}
          <div className={`flex items-center justify-between mb-8 sm:mb-12 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-inovara-primary mb-1 sm:mb-2">
                {isLoading ? (
                  <div className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
                    <Loader2 className="w-5 h-5 sm:w-6 sm:h-6 animate-spin" />
                    <span className="text-sm sm:text-base">{t('products.loading')}</span>
                  </div>
                ) : (
                  `${products.length} ${t('products.resultsFound')}`
                )}
              </h2>
              <p className="text-sm sm:text-base text-inovara-primary/70">
                {isLoading
                  ? t('products.loadingDescription')
                  : t('products.allResults')
                }
              </p>
            </div>
          </div>

          {/* Enhanced Loading State */}
          {isLoading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-6 sm:gap-8">
              {Array.from({ length: 4 }).map((_, index) => (
                <div
                  key={index}
                  className="bg-white/90 backdrop-blur-sm border border-inovara-primary/10 rounded-2xl sm:rounded-3xl overflow-hidden animate-pulse shadow-lg hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="aspect-[4/3] bg-gradient-to-br from-gray-200 to-gray-300"></div>
                  <div className="p-6 sm:p-8">
                    <div className="h-5 sm:h-6 bg-gradient-to-r from-gray-200 to-gray-300 rounded mb-3 sm:mb-4"></div>
                    <div className="h-3 sm:h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded mb-2"></div>
                    <div className="h-3 sm:h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded mb-4 sm:mb-6 w-3/4"></div>
                    <div className="space-y-2 sm:space-y-3 mb-6 sm:mb-8">
                      {Array.from({ length: 3 }).map((_, i) => (
                        <div key={i} className="h-3 sm:h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded"></div>
                      ))}
                    </div>
                    <div className="flex gap-3 sm:gap-4">
                      <div className="h-10 sm:h-12 bg-gradient-to-r from-gray-200 to-gray-300 rounded-xl sm:rounded-2xl flex-1"></div>
                      <div className="h-10 sm:h-12 bg-gradient-to-r from-gray-200 to-gray-300 rounded-xl sm:rounded-2xl w-20 sm:w-24"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Error State - Show static content with retry option */}
          {isError && (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <AlertCircle className="w-12 h-12 text-yellow-500" />
              </div>
              <h3 className="text-2xl font-bold text-inovara-primary mb-4">
                {t('products.errorTitle')}
              </h3>
              <p className="text-inovara-primary/70 mb-8 max-w-md mx-auto">
                {t('products.errorDescription')} Showing sample categories below.
              </p>
              <button
                onClick={() => refetch()}
                className="px-8 py-4 bg-gradient-to-r from-inovara-primary to-inovara-secondary text-white font-bold rounded-2xl hover:shadow-xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-inovara-accent/30"
              >
                {t('products.retry')}
              </button>
            </div>
          )}

          {/* Enhanced Products Grid */}
          {!isLoading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-6 sm:gap-8">
              {products.map((product, index) => {
                return (
                  <div
                    key={product.id}
                    className={`group relative bg-white/95 backdrop-blur-sm border border-inovara-primary/10 rounded-2xl sm:rounded-3xl overflow-hidden hover:-translate-y-2 sm:hover:-translate-y-3 transition-all duration-700 shadow-lg hover:shadow-2xl hover:shadow-inovara-primary/20 ${isRTL ? 'rtl' : 'ltr'}`}
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    {/* Enhanced Image Container with Aspect Ratio */}
                    <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
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
                      <div className={`absolute top-3 sm:top-4 ${isRTL ? 'right-3 sm:right-4' : 'left-3 sm:left-4'} bg-gradient-to-r from-inovara-primary to-inovara-secondary text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-bold shadow-xl backdrop-blur-sm border border-white/20`}>
                        {formatPrice(product.price, product.currency)}
                      </div>

                      {/* New: Category Badge */}
                      {product.category?.name && (
                        <div className={`absolute top-3 sm:top-4 ${isRTL ? 'left-3 sm:left-4' : 'right-3 sm:right-4'} bg-white/90 backdrop-blur-sm text-inovara-primary px-2 sm:px-3 py-1 rounded-full text-xs font-semibold shadow-lg border border-inovara-primary/20`}>
                          {product.category.name}
                        </div>
                      )}

                      {/* New: Hover Overlay with Quick Actions */}
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                        <Link
                          to={`/products/${product.slug || product.id}`}
                          className="bg-white/90 backdrop-blur-sm text-inovara-primary px-6 py-3 rounded-full font-bold text-sm shadow-xl hover:bg-white hover:scale-105 transition-all duration-300 flex items-center gap-2"
                        >
                          {t('products.viewDetails')}
                          <ArrowRight className="w-4 h-4" />
                        </Link>
                      </div>
                    </div>

                    {/* Enhanced Content */}
                    <div className="p-6 sm:p-8">
                      <div className={`flex items-start gap-4 mb-4 sm:mb-6 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
                        <div className={`flex-1 ${isRTL ? 'text-right' : 'text-left'}`}>
                          <h3 className="text-xl sm:text-2xl font-black text-inovara-primary mb-2 group-hover:text-inovara-accent transition-colors duration-300 leading-tight">
                            {product.name}
                          </h3>
                          <p className="text-sm sm:text-base text-inovara-primary/70 font-light leading-relaxed line-clamp-3">
                            {product.description}
                          </p>
                        </div>
                      </div>

                      {/* Enhanced Action Buttons */}
                      <div className={`flex flex-col sm:flex-row gap-3 sm:gap-4 ${isRTL ? 'sm:flex-row-reverse' : ''}`}>
                        <Link
                          to={`/products/${product.slug || product.id}`}
                          className="flex-1 group/btn relative overflow-hidden bg-gradient-to-r from-inovara-primary to-inovara-secondary text-white font-bold py-3 sm:py-4 px-4 sm:px-6 rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] focus:outline-none focus:ring-4 focus:ring-inovara-accent/30"
                        >
                          <span className={`flex items-center justify-center gap-2 text-sm sm:text-base ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
                            {t('products.viewDetails')}
                            <ArrowRight className={`w-3 h-3 sm:w-4 sm:h-4 group-hover/btn:translate-x-1 transition-transform duration-300 ${isRTL ? 'rotate-180 group-hover/btn:-translate-x-1' : ''}`} />
                          </span>

                          {/* Enhanced Button Hover Effect */}
                          <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-700 skew-x-12"></div>
                        </Link>

                        <button
                          onClick={onQuoteClick}
                          className="px-4 sm:px-6 py-3 sm:py-4 border-2 border-inovara-primary text-inovara-primary font-bold rounded-xl sm:rounded-2xl hover:bg-inovara-primary hover:text-white transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-inovara-primary/20 text-sm sm:text-base"
                        >
                          {t('products.cta.getQuote')}
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

          {/* Unified No Results */}
          {!isLoading && products.length === 0 && (
            <div className={`text-center py-12 sm:py-16 ${isRTL ? 'rtl' : 'ltr'}`}>
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

          {/* Unified Pagination */}
          {!isLoading && productsResponse?.meta && productsResponse.meta.last_page > 1 && (
            <div className={`flex justify-center items-center gap-3 sm:gap-4 mt-8 sm:mt-12 ${isRTL ? 'rtl' : 'ltr'}`}>
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-3 sm:px-4 py-2 border border-inovara-primary/20 text-inovara-primary rounded-lg hover:bg-inovara-primary/10 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 text-sm sm:text-base"
              >
                {t('products.previous')}
              </button>

              <div className="flex items-center gap-1 sm:gap-2">
                {Array.from({ length: Math.min(5, productsResponse.meta.last_page) }, (_, i) => {
                  const page = i + 1;
                  return (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`px-2 sm:px-3 py-2 rounded-lg transition-all duration-300 text-sm sm:text-base ${currentPage === page
                          ? 'bg-inovara-primary text-white shadow-lg'
                          : 'text-inovara-primary hover:bg-inovara-primary/10'
                        }`}
                    >
                      {page}
                    </button>
                  );
                })}
              </div>

              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, productsResponse.meta.last_page))}
                disabled={currentPage === productsResponse.meta.last_page}
                className="px-3 sm:px-4 py-2 border border-inovara-primary/20 text-inovara-primary rounded-lg hover:bg-inovara-primary/10 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 text-sm sm:text-base"
              >
                {t('products.next')}
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Unified CTA Section */}
      <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 bg-gradient-to-r from-inovara-primary/5 to-inovara-secondary/5">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-white/90 backdrop-blur-sm border border-inovara-primary/20 rounded-2xl sm:rounded-3xl p-8 sm:p-12 shadow-lg">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-inovara-primary mb-4 sm:mb-6">
              {t('products.cta.title')}
            </h2>
            <p className="text-lg sm:text-xl text-inovara-primary/70 font-light leading-relaxed mb-6 sm:mb-8">
              {t('products.cta.description')}
            </p>

            <div className={`flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center ${isRTL ? 'sm:flex-row-reverse' : ''}`}>
              <button
                onClick={onQuoteClick}
                className="group px-8 sm:px-12 py-4 sm:py-5 bg-gradient-to-r from-inovara-primary to-inovara-secondary text-white font-bold text-base sm:text-lg rounded-xl sm:rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-inovara-accent/30 relative overflow-hidden"
              >
                <span className={`flex items-center justify-center gap-2 sm:gap-3 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
                  {t('products.cta.getQuote')}
                  <ArrowRight className={`w-4 h-4 sm:w-6 sm:h-6 group-hover:translate-x-1 transition-transform duration-300 ${isRTL ? 'rotate-180 group-hover:-translate-x-1' : ''}`} />
                </span>
                <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500 skew-x-12"></div>
              </button>

              <Link
                to="/industries"
                className="px-8 sm:px-12 py-4 sm:py-5 border-2 border-inovara-primary text-inovara-primary font-bold text-base sm:text-lg rounded-xl sm:rounded-2xl hover:bg-inovara-primary hover:text-white transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-inovara-primary/20"
              >
                {t('products.cta.viewIndustries')}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductsPage;
