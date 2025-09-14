import React, { useState, useMemo } from 'react';
import { ArrowRight, CheckCircle, Sparkles, Loader2, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from '../contexts/TranslationContext';
import { listProducts } from '../network/product';
import { queryKeys } from '../services/react-query/queryKeys';
import { Product, PaginatedResponse } from '../types/api';

export interface ProductsPageProps {
  onQuoteClick: () => void;
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
              {t('products.breadcrumb.home')}
            </Link>
            <ArrowRight className={`w-4 h-4 text-inovara-primary/50 ${isRTL ? 'rotate-180' : ''}`} />
            <span className="text-inovara-primary font-medium">{t('products.breadcrumb.products')}</span>
          </nav>

          {/* Hero Content */}
          <div className="text-center mb-10">
            <div className="flex items-center justify-center gap-3 mb-6">
              <Sparkles className="w-8 h-8 text-inovara-accent" />
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-inovara-primary tracking-tight leading-[0.9]">
                {t('products.title')}
              </h1>
              <Sparkles className="w-8 h-8 text-inovara-accent" />
            </div>
            
            {/* Professional Divider */}
            <div className="w-32 h-1 bg-gradient-to-r from-inovara-accent to-inovara-secondary mx-auto mb-8 rounded-full"></div>
            
            <div className="max-w-4xl mx-auto">
              <p className="text-xl md:text-2xl text-inovara-primary/70 font-light leading-relaxed">
                {t('products.subtitle')}
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          {/* Results Header */}
          <div className={`flex items-center justify-between mb-12 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
            <div>
              <h2 className="text-2xl font-black text-inovara-primary mb-2">
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <Loader2 className="w-6 h-6 animate-spin" />
                    {t('products.loading')}
                  </div>
                ) : (
                  `${products.length} ${t('products.resultsFound')}`
                )}
              </h2>
              <p className="text-inovara-primary/70">
                {isLoading 
                  ? t('products.loadingDescription')
                  : t('products.allResults')
                }
              </p>
            </div>
          </div>

          {/* Loading State */}
          {isLoading && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-8">
              {Array.from({ length: 4 }).map((_, index) => (
                <div 
                  key={index}
                  className="bg-white/90 backdrop-blur-sm border border-inovara-primary/10 rounded-3xl overflow-hidden animate-pulse"
                >
                  <div className="h-64 bg-gray-200"></div>
                  <div className="p-8">
                    <div className="h-6 bg-gray-200 rounded mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded mb-6 w-3/4"></div>
                    <div className="space-y-3 mb-8">
                      {Array.from({ length: 3 }).map((_, i) => (
                        <div key={i} className="h-4 bg-gray-200 rounded"></div>
                      ))}
                    </div>
                    <div className="flex gap-4">
                      <div className="h-12 bg-gray-200 rounded-2xl flex-1"></div>
                      <div className="h-12 bg-gray-200 rounded-2xl w-24"></div>
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

          {/* Products Grid */}
          {!isLoading && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-8">
              {products.map((product, index) => {
                return (
                  <div 
                    key={product.id}
                    className={`group relative bg-white/90 backdrop-blur-sm border border-inovara-primary/10 rounded-3xl overflow-hidden hover:-translate-y-2 transition-all duration-500 shadow-lg hover:shadow-2xl hover:shadow-inovara-primary/10 ${isRTL ? 'rtl' : 'ltr'}`}
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    {/* Image Container */}
                    <div className="relative h-64 overflow-hidden">
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
                      <div className={`absolute top-4 ${isRTL ? 'right-4' : 'left-4'} bg-gradient-to-r from-inovara-primary to-inovara-secondary text-white px-3 py-1 rounded-full text-sm font-bold`}>
                        {formatPrice(product.price, product.currency)}
                      </div>
                    </div>
                    
                    {/* Content */}
                    <div className="p-8">
                      <div className={`flex items-start gap-4 mb-6 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
                        <div className={`flex-1 ${isRTL ? 'text-right' : 'text-left'}`}>
                          <h3 className="text-2xl font-black text-inovara-primary mb-2 group-hover:text-inovara-accent transition-colors duration-300">
                            {product.name}
                          </h3>
                          <p className="text-inovara-primary/70 font-light leading-relaxed">
                            {product.description}
                          </p>
                        </div>
                      </div>
                      
                      {/* Features */}
                      <div className="space-y-3 mb-8">
                        {product.features && Array.isArray(product.features) && product.features.length > 0 ? (
                          product.features.slice(0, 3).map((feature, featureIndex) => (
                            <div key={featureIndex} className={`flex items-center text-sm text-inovara-primary/80 ${isRTL ? 'flex-row-reverse text-right' : 'flex-row text-left'}`}>
                              <CheckCircle className={`w-4 h-4 text-inovara-accent ${isRTL ? 'ml-3' : 'mr-3'} flex-shrink-0`} />
                              <span>{feature}</span>
                            </div>
                          ))
                        ) : (
                          // Fallback features when API doesn't provide them
                          <>
                            <div className={`flex items-center text-sm text-inovara-primary/80 ${isRTL ? 'flex-row-reverse text-right' : 'flex-row text-left'}`}>
                              <CheckCircle className={`w-4 h-4 text-inovara-accent ${isRTL ? 'ml-3' : 'mr-3'} flex-shrink-0`} />
                              <span>{t('products.features.quality')}</span>
                            </div>
                            <div className={`flex items-center text-sm text-inovara-primary/80 ${isRTL ? 'flex-row-reverse text-right' : 'flex-row text-left'}`}>
                              <CheckCircle className={`w-4 h-4 text-inovara-accent ${isRTL ? 'ml-3' : 'mr-3'} flex-shrink-0`} />
                              <span>{t('products.features.reliable')}</span>
                            </div>
                            <div className={`flex items-center text-sm text-inovara-primary/80 ${isRTL ? 'flex-row-reverse text-right' : 'flex-row text-left'}`}>
                              <CheckCircle className={`w-4 h-4 text-inovara-accent ${isRTL ? 'ml-3' : 'mr-3'} flex-shrink-0`} />
                              <span>{t('products.features.innovative')}</span>
                            </div>
                          </>
                        )}
                      </div>
                      
                      {/* Action Buttons */}
                      <div className={`flex flex-col sm:flex-row gap-4 ${isRTL ? 'sm:flex-row-reverse' : ''}`}>
                        <Link
                          to={`/products/${product.slug || product.id}`}
                          className="flex-1 group/btn relative overflow-hidden bg-gradient-to-r from-inovara-primary to-inovara-secondary text-white font-bold py-4 px-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-inovara-accent/30"
                        >
                          <span className={`flex items-center justify-center gap-2 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
                            {t('products.viewDetails')}
                            <ArrowRight className={`w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300 ${isRTL ? 'rotate-180 group-hover/btn:-translate-x-1' : ''}`} />
                          </span>
                          
                          {/* Button Hover Effect */}
                          <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-500 skew-x-12"></div>
                        </Link>
                        
                        <button
                          onClick={onQuoteClick}
                          className="px-6 py-4 border-2 border-inovara-primary text-inovara-primary font-bold rounded-2xl hover:bg-inovara-primary hover:text-white transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-inovara-primary/20"
                        >
                          {t('contact.form.getQuote')}
                        </button>
                      </div>
                    </div>
                    
                    {/* Card Hover Glow */}
                    <div className="absolute inset-0 bg-gradient-to-br from-inovara-accent/5 to-inovara-secondary/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                  </div>
                );
              })}
            </div>
          )}

          {/* No Results */}
          {!isLoading && products.length === 0 && (
            <div className="text-center py-16">
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

          {/* Pagination */}
          {!isLoading && productsResponse?.meta && productsResponse.meta.last_page > 1 && (
            <div className="flex justify-center items-center gap-4 mt-12">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 border border-inovara-primary/20 text-inovara-primary rounded-lg hover:bg-inovara-primary/10 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
              >
                {t('products.previous')}
              </button>
              
              <div className="flex items-center gap-2">
                {Array.from({ length: Math.min(5, productsResponse.meta.last_page) }, (_, i) => {
                  const page = i + 1;
                  return (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`px-3 py-2 rounded-lg transition-all duration-300 ${
                        currentPage === page
                          ? 'bg-inovara-primary text-white'
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
                className="px-4 py-2 border border-inovara-primary/20 text-inovara-primary rounded-lg hover:bg-inovara-primary/10 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
              >
                {t('products.next')}
              </button>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 bg-gradient-to-r from-inovara-primary/5 to-inovara-secondary/5">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-white/90 backdrop-blur-sm border border-inovara-primary/20 rounded-3xl p-12">
            <h2 className="text-3xl md:text-4xl font-black text-inovara-primary mb-6">
              {t('products.cta.title')}
            </h2>
            <p className="text-xl text-inovara-primary/70 font-light leading-relaxed mb-8">
              {t('products.cta.description')}
            </p>
            
            <div className={`flex flex-col sm:flex-row gap-4 justify-center items-center ${isRTL ? 'sm:flex-row-reverse' : ''}`}>
              <button 
                onClick={onQuoteClick}
                className="group px-12 py-5 bg-gradient-to-r from-inovara-primary to-inovara-secondary text-white font-bold text-lg rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-inovara-accent/30"
              >
                <span className={`flex items-center justify-center gap-3 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
                  {t('products.cta.getQuote')}
                  <ArrowRight className={`w-6 h-6 group-hover:translate-x-1 transition-transform duration-300 ${isRTL ? 'rotate-180 group-hover:-translate-x-1' : ''}`} />
                </span>
              </button>
              
              <Link 
                to="/industries"
                className="px-12 py-5 border-2 border-inovara-primary text-inovara-primary font-bold text-lg rounded-2xl hover:bg-inovara-primary hover:text-white transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-inovara-primary/20"
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
