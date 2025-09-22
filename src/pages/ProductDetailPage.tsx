import React, { useState, useEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, Truck, Shield as ShieldIcon, Users, Zap, ChevronLeft, ChevronRight, Play, Loader2, AlertCircle, Maximize2 } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from '../contexts/TranslationContext';
import { productDetails } from '../network/product';
import { queryKeys } from '../services/react-query/queryKeys';
import { Product } from '../types/api';
import VideoModal from '../components/VideoModal';
import ImageSkeleton from '../components/ImageSkeleton';
import ImagePreviewModal from '../components/ImagePreviewModal';

export interface ProductDetailPageProps {
  onQuoteClick: (productId?: number) => void;
}

const ProductDetailPage: React.FC<ProductDetailPageProps> = ({ onQuoteClick }) => {
  const { slug } = useParams<{ slug: string }>();
  const { t, isRTL, language } = useTranslation();
  const [selectedImage, setSelectedImage] = useState(0);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [isImagePreviewOpen, setIsImagePreviewOpen] = useState(false);
  const [videoPreloaded, setVideoPreloaded] = useState(false);
  const [mainImageLoaded, setMainImageLoaded] = useState(false);
  const [thumbnailImagesLoaded, setThumbnailImagesLoaded] = useState<boolean[]>([]);

  const {
    data: product,
    isLoading,
    isError,
    refetch
  } = useQuery<Product>({
    queryKey: [queryKeys.listProducts, slug, language],
    queryFn: () => productDetails(slug!),
    enabled: !!slug,
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes
  });

  // Preload video when product data is available
  useEffect(() => {
    if (product?.videos?.[0] && !videoPreloaded) {
      const video = document.createElement('video');
      video.preload = 'metadata';
      video.src = product.videos[0];
      video.onloadedmetadata = () => {
        setVideoPreloaded(true);
      };
      video.onerror = () => {
        // Video preload failed - silently continue
      };
    }
  }, [product?.videos, videoPreloaded]);

  // Initialize thumbnail loading states when product images change
  useEffect(() => {
    if (product?.images && Array.isArray(product.images)) {
      setThumbnailImagesLoaded(new Array(product.images.length).fill(false));
    }
  }, [product?.images]);

  // Use product images or fallback to single image
  const productImages = product?.images && Array.isArray(product.images) && product.images.length > 0
    ? product.images
    : [product?.image_url || 'https://via.placeholder.com/800x600?text=Product+Image'];

  // Memoized navigation handlers
  const handlePreviousImage = useCallback(() => {
    if (isRTL) {
      setSelectedImage(Math.min(productImages.length - 1, selectedImage + 1));
    } else {
      setSelectedImage(Math.max(0, selectedImage - 1));
    }
  }, [isRTL, productImages.length, selectedImage]);

  const handleNextImage = useCallback(() => {
    if (isRTL) {
      setSelectedImage(Math.max(0, selectedImage - 1));
    } else {
      setSelectedImage(Math.min(productImages.length - 1, selectedImage + 1));
    }
  }, [isRTL, productImages.length, selectedImage]);

  const handleImagePreview = useCallback(() => {
    setIsImagePreviewOpen(true);
  }, []);

  const handleVideoModal = useCallback(() => {
    if (product?.videos?.[0]) {
      setIsVideoModalOpen(true);
    }
  }, [product?.videos]);

  // Loading state
  if (isLoading) {
    return (
      <div className={`min-h-screen ${isRTL ? 'rtl' : 'ltr'}`}>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <Loader2 className="w-12 h-12 animate-spin text-inovara-primary mx-auto mb-4" />
            <p className="text-inovara-primary/70">{t('productDetail.loading')}</p>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (isError || !product) {
    return (
      <div className={`min-h-screen ${isRTL ? 'rtl' : 'ltr'}`}>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-inovara-primary mb-4">{t('productDetail.notFound')}</h2>
            <p className="text-inovara-primary/70 mb-8">{t('productDetail.notFoundDesc')}</p>
            <div className="flex gap-4 justify-center">
              <button
                onClick={() => refetch()}
                className="px-6 py-3 bg-inovara-primary text-white rounded-lg hover:bg-inovara-primary/90 transition-colors"
              >
                {t('productDetail.tryAgain')}
              </button>
              <Link
                to="/products"
                className="px-6 py-3 border border-inovara-primary text-inovara-primary rounded-lg hover:bg-inovara-primary hover:text-white transition-colors"
              >
                {t('productDetail.viewAllProducts')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${isRTL ? 'rtl' : 'ltr'}`}>
      {/* Unified Hero Section */}
      <section
        className="relative py-12 sm:py-16 px-4 sm:px-6 overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, rgba(255,255,255,1) 0%, rgba(248,250,252,0.8) 50%, rgba(255,255,255,1) 100%)'
        }}
      >
        {/* Unified Background Effects */}
        <div className="absolute inset-0 overflow-hidden">
          <div className={`absolute top-1/4 ${isRTL ? 'left-1/4' : 'right-1/4'} w-72 sm:w-96 h-72 sm:h-96 bg-gradient-to-br from-inovara-accent/3 to-inovara-secondary/3 rounded-full blur-3xl`}></div>
          <div className={`absolute bottom-1/4 ${isRTL ? 'right-1/4' : 'left-1/4'} w-64 sm:w-80 h-64 sm:h-80 bg-gradient-to-tr from-inovara-primary/2 to-inovara-accent/2 rounded-full blur-3xl`}></div>
        </div>

        <div className="relative z-10 mt-8 max-w-7xl mx-auto">
          {/* Unified Breadcrumb */}
          <nav className={`flex items-center gap-1 sm:gap-2 mb-6 sm:mb-8 text-xs sm:text-sm ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
            <Link to="/" className="text-inovara-primary/70 hover:text-inovara-primary transition-colors px-2 py-1 rounded-lg hover:bg-inovara-primary/5">
              {t('products.breadcrumb.home')}
            </Link>
            <ArrowRight className={`w-3 h-3 sm:w-4 sm:h-4 text-inovara-primary/50 ${isRTL ? 'rotate-180' : ''}`} />
            <Link to="/products" className="text-inovara-primary/70 hover:text-inovara-primary transition-colors px-2 py-1 rounded-lg hover:bg-inovara-primary/5">
              {t('products.breadcrumb.products')}
            </Link>
            <ArrowRight className={`w-3 h-3 sm:w-4 sm:h-4 text-inovara-primary/50 ${isRTL ? 'rotate-180' : ''}`} />
            <span className={`text-inovara-primary font-medium px-1 sm:px-2 md:px-3 lg:px-4 py-1 sm:py-1.5 md:py-2 truncate min-w-0 flex-1 ${isRTL ? 'text-right' : 'text-left'}`}>
              {product.name}
            </span>
          </nav>
        </div>
      </section>

      {/* Enhanced Main Product Section */}
      <section className="px-4 sm:px-6 bg-gradient-to-br from-white via-gray-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className={`grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-start ${isRTL ? 'rtl' : 'ltr'}`}>
            {/* Enhanced Product Gallery */}
            <div className="space-y-6 sm:space-y-8">
              {/* Enhanced Main Image */}
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-inovara-primary/10 to-inovara-secondary/10 rounded-2xl sm:rounded-3xl transform rotate-1 group-hover:rotate-0 transition-transform duration-500"></div>
                <div 
                  className="relative overflow-hidden rounded-2xl sm:rounded-3xl shadow-xl sm:shadow-2xl group-hover:shadow-2xl sm:group-hover:shadow-3xl transition-all duration-500 cursor-pointer"
                  onClick={handleImagePreview}
                  title="Click to preview image"
                >
                  {/* Skeleton Loading */}
                  {!mainImageLoaded && (
                    <ImageSkeleton
                      className="w-full aspect-square"
                      variant="hero"
                      rounded="2xl"
                    />
                  )}
                  
                  {/* Actual Image */}
                  <img
                    src={productImages[selectedImage]}
                    alt={product.name}
                    className={`w-full aspect-square object-cover group-hover:scale-105 transition-all duration-700 cursor-pointer ${
                      mainImageLoaded ? 'opacity-100' : 'opacity-0 absolute inset-0'
                    }`}
                    loading="lazy"
                    onLoad={() => setMainImageLoaded(true)}
                    onError={(e) => {
                      e.currentTarget.src = 'https://via.placeholder.com/800x600?text=Product+Image';
                      setMainImageLoaded(true);
                    }}
                    onDoubleClick={() => setIsImagePreviewOpen(true)}
                    title="Double-click to preview image"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  {/* Preview Button */}
                  <button
                    onClick={handleImagePreview}
                    className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 opacity-0 group-hover:opacity-100"
                    aria-label="Open image preview"
                  >
                    <Maximize2 className="w-5 h-5 text-inovara-primary" />
                  </button>
                </div>

                {/* Enhanced Image Navigation */}
                {productImages.length > 1 && (
                  <>
                    <button
                      onClick={handlePreviousImage}
                      disabled={selectedImage === 0}
                      className={`absolute top-1/2 ${isRTL ? 'right-3 sm:right-4' : 'left-3 sm:left-4'} transform -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group`}
                      aria-label={isRTL ? 'الصورة السابقة' : 'Previous image'}
                    >
                      <ChevronLeft className={`w-5 h-5 sm:w-6 sm:h-6 text-inovara-primary group-hover:scale-110 transition-transform duration-200 ${isRTL ? 'rotate-180' : ''}`} />
                    </button>

                    <button
                      onClick={handleNextImage}
                      disabled={selectedImage === productImages.length - 1}
                      className={`absolute top-1/2 ${isRTL ? 'left-3 sm:left-4' : 'right-3 sm:right-4'} transform -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group`}
                      aria-label={isRTL ? 'الصورة التالية' : 'Next image'}
                    >
                      <ChevronRight className={`w-5 h-5 sm:w-6 sm:h-6 text-inovara-primary group-hover:scale-110 transition-transform duration-200 ${isRTL ? 'rotate-180' : ''}`} />
                    </button>
                  </>
                )}
              </div>

              {/* Enhanced Thumbnail Images */}
              {productImages.length > 1 && (
                <div className={`flex gap-3 sm:gap-4 overflow-x-auto pb-2 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
                  {productImages.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-lg sm:rounded-xl overflow-hidden border-2 transition-all duration-300 group relative ${selectedImage === index
                        ? 'border-inovara-primary shadow-lg scale-105'
                        : 'border-transparent hover:border-inovara-primary/50 hover:scale-105'
                        }`}
                      aria-label={`${isRTL ? 'عرض الصورة' : 'View image'} ${index + 1}`}
                    >
                      {/* Thumbnail Skeleton */}
                      {!thumbnailImagesLoaded[index] && (
                        <ImageSkeleton
                          className="absolute inset-0"
                          variant="thumbnail"
                          rounded="lg"
                        />
                      )}
                      
                      {/* Thumbnail Image */}
                      <img
                        src={image}
                        alt={`${product.name} ${index + 1}`}
                        className={`w-full h-full object-cover group-hover:scale-110 transition-all duration-200 ${
                          thumbnailImagesLoaded[index] ? 'opacity-100' : 'opacity-0 absolute inset-0'
                        }`}
                        onLoad={() => {
                          setThumbnailImagesLoaded(prev => {
                            const newState = [...prev];
                            newState[index] = true;
                            return newState;
                          });
                        }}
                        onError={(e) => {
                          e.currentTarget.src = 'https://via.placeholder.com/200x200?text=Image';
                          setThumbnailImagesLoaded(prev => {
                            const newState = [...prev];
                            newState[index] = true;
                            return newState;
                          });
                        }}
                      />
                      
                      {/* Thumbnail Preview Button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedImage(index);
                          setIsImagePreviewOpen(true);
                        }}
                        className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
                        aria-label={`Preview image ${index + 1}`}
                      >
                        <Maximize2 className="w-4 h-4 text-white" />
                      </button>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Enhanced Product Information */}
            <div className={`space-y-6 sm:space-y-8 ${isRTL ? 'rtl' : 'ltr'}`}>
              {/* Enhanced Header */}
              <div>
                <div className={`flex items-center gap-4 mb-3 sm:mb-4 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
                  <div className={`flex-1 ${isRTL ? 'text-right' : 'text-left'}`}>
                    <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-inovara-primary mb-2 leading-tight">
                      {product.name}
                    </h1>
                  </div>
                </div>

                <p className={`text-base sm:text-lg lg:text-xl text-inovara-primary/70 leading-relaxed ${isRTL ? 'text-right' : 'text-left'}`}>
                  {product.description}
                </p>
              </div>

              {/* Enhanced Quick Features Preview */}
              <div>
                <h3 className={`text-xl sm:text-2xl font-black text-inovara-primary mb-4 sm:mb-6 ${isRTL ? 'text-right' : 'text-left'}`}>
                  {t('productDetail.keyFeatures')}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  {product.features && typeof product.features === 'string' ? (
                    // Handle string features (split by line breaks) - show first 4
                    (product.features as string).split('\n').filter((feature: string) => feature.trim()).slice(0, 4).map((feature: string, index: number) => (
                      <div key={index} className={`flex items-center gap-2 sm:gap-3 p-3 sm:p-4 bg-white/70 rounded-lg sm:rounded-xl border border-inovara-primary/10 hover:border-inovara-primary/20 transition-all duration-300 group ${isRTL ? 'flex-row-reverse text-right' : 'flex-row text-left'}`}>
                        <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-inovara-accent flex-shrink-0 group-hover:scale-110 transition-transform duration-200" />
                        <span className="font-medium text-sm sm:text-base text-inovara-primary">{feature.trim()}</span>
                      </div>
                    ))
                  ) : product.features && Array.isArray(product.features) && product.features.length > 0 ? (
                    product.features.slice(0, 4).map((feature, index) => (
                      <div key={index} className={`flex items-center gap-2 sm:gap-3 p-3 sm:p-4 bg-white/70 rounded-lg sm:rounded-xl border border-inovara-primary/10 hover:border-inovara-primary/20 transition-all duration-300 group ${isRTL ? 'flex-row-reverse text-right' : 'flex-row text-left'}`}>
                        <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-inovara-accent flex-shrink-0 group-hover:scale-110 transition-transform duration-200" />
                        <span className="font-medium text-sm sm:text-base text-inovara-primary">{feature}</span>
                      </div>
                    ))
                  ) : (
                    // Fallback features when API doesn't provide them
                    <>
                      <div className={`flex items-center gap-2 sm:gap-3 p-3 sm:p-4 bg-white/70 rounded-lg sm:rounded-xl border border-inovara-primary/10 hover:border-inovara-primary/20 transition-all duration-300 group ${isRTL ? 'flex-row-reverse text-right' : 'flex-row text-left'}`}>
                        <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-inovara-accent flex-shrink-0 group-hover:scale-110 transition-transform duration-200" />
                        <span className="font-medium text-sm sm:text-base text-inovara-primary">{t('productDetail.fallbackFeatures.quality')}</span>
                      </div>
                      <div className={`flex items-center gap-2 sm:gap-3 p-3 sm:p-4 bg-white/70 rounded-lg sm:rounded-xl border border-inovara-primary/10 hover:border-inovara-primary/20 transition-all duration-300 group ${isRTL ? 'flex-row-reverse text-right' : 'flex-row text-left'}`}>
                        <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-inovara-accent flex-shrink-0 group-hover:scale-110 transition-transform duration-200" />
                        <span className="font-medium text-sm sm:text-base text-inovara-primary">{t('productDetail.fallbackFeatures.reliability')}</span>
                      </div>
                      <div className={`flex items-center gap-2 sm:gap-3 p-3 sm:p-4 bg-white/70 rounded-lg sm:rounded-xl border border-inovara-primary/10 hover:border-inovara-primary/20 transition-all duration-300 group ${isRTL ? 'flex-row-reverse text-right' : 'flex-row text-left'}`}>
                        <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-inovara-accent flex-shrink-0 group-hover:scale-110 transition-transform duration-200" />
                        <span className="font-medium text-sm sm:text-base text-inovara-primary">{t('productDetail.fallbackFeatures.innovation')}</span>
                      </div>
                      <div className={`flex items-center gap-2 sm:gap-3 p-3 sm:p-4 bg-white/70 rounded-lg sm:rounded-xl border border-inovara-primary/10 hover:border-inovara-primary/20 transition-all duration-300 group ${isRTL ? 'flex-row-reverse text-right' : 'flex-row text-left'}`}>
                        <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-inovara-accent flex-shrink-0 group-hover:scale-110 transition-transform duration-200" />
                        <span className="font-medium text-sm sm:text-base text-inovara-primary">{t('productDetail.fallbackFeatures.maintenance')}</span>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Enhanced Action Buttons */}
              <div className={`space-y-3 sm:space-y-4 ${isRTL ? 'text-right' : 'text-left'}`}>
                <button
                  onClick={() => onQuoteClick(product.id)}
                  className="w-full group relative overflow-hidden bg-gradient-to-r from-inovara-primary to-inovara-secondary text-white font-bold py-4 sm:py-5 px-6 sm:px-8 rounded-xl sm:rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-inovara-accent/30"
                >
                  <span className={`flex items-center justify-center gap-2 sm:gap-3 text-sm sm:text-base ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
                    <span>{t('productDetail.getFreeQuote')}</span>
                    <ArrowRight className={`w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform duration-300 ${isRTL ? 'rotate-180 group-hover:-translate-x-1' : ''}`} />
                  </span>
                  <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500 skew-x-12"></div>
                </button>

                <button 
                  onClick={handleVideoModal}
                  disabled={!product?.videos?.[0]}
                  className={`w-full py-3 sm:py-4 border-2 border-inovara-primary text-inovara-primary font-bold rounded-xl sm:rounded-2xl hover:bg-inovara-primary hover:text-white transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-inovara-primary/20 group relative disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-inovara-primary ${
                    videoPreloaded ? 'ring-2 ring-green-400/50' : ''
                  }`}
                >
                  <span className={`flex items-center justify-center gap-2 sm:gap-3 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
                    {t('productDetail.watchDemo')}
                    <Play className={`w-4 h-4 sm:w-6 sm:h-6 group-hover:translate-x-1 transition-transform duration-300 ${isRTL ? 'rotate-180 group-hover:-translate-x-1' : ''}`} />
                  </span>
                  
                  {/* Video ready indicator */}
                  {videoPreloaded && (
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features and Specifications Section */}
      <section className="py-24 px-4 sm:px-6 bg-gradient-to-br from-gray-50 via-white to-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className={`text-center mb-16 ${isRTL ? 'rtl' : 'ltr'}`}>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-inovara-primary mb-4 leading-tight">
              {t('productDetail.featuresAndSpecs')}
            </h2>
            <p className="text-lg sm:text-xl text-inovara-primary/70 max-w-3xl mx-auto leading-relaxed">
              {t('productDetail.featuresAndSpecsDesc')}
            </p>
          </div>

          {/* Features and Specifications Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 lg:gap-12">
            {/* Features Section */}
            <div className="space-y-6">
              <div className="bg-white/90 backdrop-blur-sm border border-inovara-primary/10 rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className={`flex items-center gap-4 mb-6 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
                  <div className="w-12 h-12 bg-gradient-to-br from-inovara-primary to-inovara-secondary rounded-xl flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-black text-inovara-primary">
                    {t('productDetail.keyFeatures')}
                  </h3>
                </div>

                <div className="space-y-4">
                  {product.features && typeof product.features === 'string' ? (
                    // Handle string features (split by line breaks)
                    (product.features as string).split('\n').filter((feature: string) => feature.trim()).map((feature: string, index: number) => (
                      <div key={index} className={`flex items-start gap-3 p-4 bg-gradient-to-r from-inovara-primary/5 to-inovara-secondary/5 rounded-xl border border-inovara-primary/10 hover:border-inovara-primary/20 transition-all duration-300 ${isRTL ? 'flex-row-reverse text-right' : 'flex-row text-left'}`}>
                        <CheckCircle className="w-5 h-5 text-inovara-accent flex-shrink-0 mt-0.5" />
                        <span className="font-medium text-inovara-primary leading-relaxed">{feature.trim()}</span>
                      </div>
                    ))
                  ) : product.features && Array.isArray(product.features) && product.features.length > 0 ? (
                    product.features.map((feature, index) => (
                      <div key={index} className={`flex items-start gap-3 p-4 bg-gradient-to-r from-inovara-primary/5 to-inovara-secondary/5 rounded-xl border border-inovara-primary/10 hover:border-inovara-primary/20 transition-all duration-300 ${isRTL ? 'flex-row-reverse text-right' : 'flex-row text-left'}`}>
                        <CheckCircle className="w-5 h-5 text-inovara-accent flex-shrink-0 mt-0.5" />
                        <span className="font-medium text-inovara-primary leading-relaxed">{feature}</span>
                      </div>
                    ))
                  ) : (
                    // Fallback features when API doesn't provide them
                    <>
                      <div className={`flex items-start gap-3 p-4 bg-gradient-to-r from-inovara-primary/5 to-inovara-secondary/5 rounded-xl border border-inovara-primary/10 hover:border-inovara-primary/20 transition-all duration-300 ${isRTL ? 'flex-row-reverse text-right' : 'flex-row text-left'}`}>
                        <CheckCircle className="w-5 h-5 text-inovara-accent flex-shrink-0 mt-0.5" />
                        <span className="font-medium text-inovara-primary leading-relaxed">{t('productDetail.fallbackFeatures.quality')}</span>
                      </div>
                      <div className={`flex items-start gap-3 p-4 bg-gradient-to-r from-inovara-primary/5 to-inovara-secondary/5 rounded-xl border border-inovara-primary/10 hover:border-inovara-primary/20 transition-all duration-300 ${isRTL ? 'flex-row-reverse text-right' : 'flex-row text-left'}`}>
                        <CheckCircle className="w-5 h-5 text-inovara-accent flex-shrink-0 mt-0.5" />
                        <span className="font-medium text-inovara-primary leading-relaxed">{t('productDetail.fallbackFeatures.reliability')}</span>
                      </div>
                      <div className={`flex items-start gap-3 p-4 bg-gradient-to-r from-inovara-primary/5 to-inovara-secondary/5 rounded-xl border border-inovara-primary/10 hover:border-inovara-primary/20 transition-all duration-300 ${isRTL ? 'flex-row-reverse text-right' : 'flex-row text-left'}`}>
                        <CheckCircle className="w-5 h-5 text-inovara-accent flex-shrink-0 mt-0.5" />
                        <span className="font-medium text-inovara-primary leading-relaxed">{t('productDetail.fallbackFeatures.innovation')}</span>
                      </div>
                      <div className={`flex items-start gap-3 p-4 bg-gradient-to-r from-inovara-primary/5 to-inovara-secondary/5 rounded-xl border border-inovara-primary/10 hover:border-inovara-primary/20 transition-all duration-300 ${isRTL ? 'flex-row-reverse text-right' : 'flex-row text-left'}`}>
                        <CheckCircle className="w-5 h-5 text-inovara-accent flex-shrink-0 mt-0.5" />
                        <span className="font-medium text-inovara-primary leading-relaxed">{t('productDetail.fallbackFeatures.maintenance')}</span>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Specifications Section */}
            <div className="space-y-6">
              <div className="bg-white/90 backdrop-blur-sm border border-inovara-primary/10 rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className={`flex items-center gap-4 mb-6 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
                  <div className="w-12 h-12 bg-gradient-to-br from-inovara-secondary to-inovara-accent rounded-xl flex items-center justify-center flex-shrink-0">
                    <Zap className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-black text-inovara-primary">
                    {t('productDetail.specifications')}
                  </h3>
                </div>

                <div className="space-y-4">
                  {product.specifications && typeof product.specifications === 'string' ? (
                    // Handle string specifications (split by line breaks)
                    (product.specifications as string).split('\n').filter((spec: string) => spec.trim()).map((spec: string, index: number) => {
                      const [key, ...valueParts] = spec.split(':');
                      const value = valueParts.join(':').trim();
                      return (
                        <div key={index} className={`group p-4 bg-gradient-to-r from-inovara-secondary/5 to-inovara-accent/5 rounded-xl border border-inovara-secondary/10 hover:border-inovara-secondary/20 transition-all duration-300 ${isRTL ? 'text-right' : 'text-left'}`}>
                          <div className={`flex items-start gap-3 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
                            <div className="w-8 h-8 bg-gradient-to-br from-inovara-secondary to-inovara-accent rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                              <Zap className="w-4 h-4 text-white" />
                            </div>
                            <div className="flex-1">
                              <h4 className="font-bold text-inovara-primary text-base mb-1">{key?.trim() || spec.trim()}</h4>
                              {value && <p className="text-inovara-primary/70 font-medium text-sm leading-relaxed">{value}</p>}
                            </div>
                          </div>
                        </div>
                      );
                    })
                  ) : product.specifications && typeof product.specifications === 'object' ? Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key} className={`group p-4 bg-gradient-to-r from-inovara-secondary/5 to-inovara-accent/5 rounded-xl border border-inovara-secondary/10 hover:border-inovara-secondary/20 transition-all duration-300 ${isRTL ? 'text-right' : 'text-left'}`}>
                      <div className={`flex items-start gap-3 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
                        <div className="w-8 h-8 bg-gradient-to-br from-inovara-secondary to-inovara-accent rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                          <Zap className="w-4 h-4 text-white" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-bold text-inovara-primary text-base mb-1">{key.replace(/([A-Z])/g, ' $1')}</h4>
                          <p className="text-inovara-primary/70 font-medium text-sm leading-relaxed">{value}</p>
                        </div>
                      </div>
                    </div>
                  )) : (
                    // Fallback specifications from translation data
                    Object.entries(t('productDetail.specificationData') || {}).map(([key, value]) => (
                      <div key={key} className={`group p-4 bg-gradient-to-r from-inovara-secondary/5 to-inovara-accent/5 rounded-xl border border-inovara-secondary/10 hover:border-inovara-secondary/20 transition-all duration-300 ${isRTL ? 'text-right' : 'text-left'}`}>
                        <div className={`flex items-start gap-3 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
                          <div className="w-8 h-8 bg-gradient-to-br from-inovara-secondary to-inovara-accent rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                            <Zap className="w-4 h-4 text-white" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-bold text-inovara-primary text-base mb-1">{key.replace(/([A-Z])/g, ' $1')}</h4>
                            <p className="text-inovara-primary/70 font-medium text-sm leading-relaxed">{String(value)}</p>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Business Benefits Section */}
          <div className="mt-16">
            <div className="bg-gradient-to-r from-inovara-primary/5 to-inovara-secondary/5 rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-inovara-primary/10">
              <div className={`text-center mb-8 ${isRTL ? 'rtl' : 'ltr'}`}>
                <h3 className="text-2xl sm:text-3xl font-black text-inovara-primary mb-4">
                  {t('productDetail.businessBenefits')}
                </h3>
                <p className="text-lg text-inovara-primary/70 max-w-2xl mx-auto">
                  {t('productDetail.businessBenefitsDesc')}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className={`text-center group ${isRTL ? 'rtl' : 'ltr'}`}>
                  <div className="w-16 h-16 bg-gradient-to-br from-inovara-primary to-inovara-secondary rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Truck className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="font-bold text-inovara-primary text-lg mb-2">{t('productDetail.businessBenefitsItems.operations.title')}</h4>
                  <p className="text-inovara-primary/70 text-sm leading-relaxed">{t('productDetail.businessBenefitsItems.operations.description')}</p>
                </div>

                <div className={`text-center group ${isRTL ? 'rtl' : 'ltr'}`}>
                  <div className="w-16 h-16 bg-gradient-to-br from-inovara-accent to-inovara-secondary rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <ShieldIcon className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="font-bold text-inovara-primary text-lg mb-2">{t('productDetail.businessBenefitsItems.payments.title')}</h4>
                  <p className="text-inovara-primary/70 text-sm leading-relaxed">{t('productDetail.businessBenefitsItems.payments.description')}</p>
                </div>

                <div className={`text-center group ${isRTL ? 'rtl' : 'ltr'}`}>
                  <div className="w-16 h-16 bg-gradient-to-br from-inovara-secondary to-inovara-accent rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Users className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="font-bold text-inovara-primary text-lg mb-2">{t('productDetail.businessBenefitsItems.satisfaction.title')}</h4>
                  <p className="text-inovara-primary/70 text-sm leading-relaxed">{t('productDetail.businessBenefitsItems.satisfaction.description')}</p>
                </div>

                <div className={`text-center group ${isRTL ? 'rtl' : 'ltr'}`}>
                  <div className="w-16 h-16 bg-gradient-to-br from-inovara-primary to-inovara-accent rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Zap className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="font-bold text-inovara-primary text-lg mb-2">{t('productDetail.businessBenefitsItems.analytics.title')}</h4>
                  <p className="text-inovara-primary/70 text-sm leading-relaxed">{t('productDetail.businessBenefitsItems.analytics.description')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Trust Indicators */}
      <section className="py-24 px-4 sm:px-6 bg-gradient-to-br from-gray-50 via-white to-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className={`text-center mb-16 sm:mb-20 ${isRTL ? 'rtl' : 'ltr'}`}>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-inovara-primary mb-4 sm:mb-6 leading-tight">
              {t('productDetail.whyChoose')}
            </h2>
            <p className="text-lg sm:text-xl text-inovara-primary/70 max-w-3xl mx-auto leading-relaxed">
              {t('productDetail.whyChooseDesc')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {/* Enhanced Trust Features */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-inovara-primary/5 to-inovara-secondary/5 rounded-2xl sm:rounded-3xl transform rotate-1 group-hover:rotate-0 transition-transform duration-500"></div>
              <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-inovara-primary/10 group-hover:border-inovara-primary/20 transition-all duration-300 group-hover:shadow-2xl">
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-inovara-accent to-inovara-secondary rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <ShieldIcon className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-inovara-primary mb-3 sm:mb-4 text-center">
                  {t('productDetail.warranty')}
                </h3>
                <p className="text-sm sm:text-base text-inovara-primary/70 leading-relaxed text-center">
                  {t('productDetail.warrantyDesc')}
                </p>
                <div className="mt-4 sm:mt-6 flex justify-center">
                  <div className="w-10 sm:w-12 h-1 bg-gradient-to-r from-inovara-primary to-inovara-secondary rounded-full"></div>
                </div>
              </div>
            </div>

            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-inovara-primary/5 to-inovara-secondary/5 rounded-2xl sm:rounded-3xl transform -rotate-1 group-hover:rotate-0 transition-transform duration-500"></div>
              <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-inovara-primary/10 group-hover:border-inovara-primary/20 transition-all duration-300 group-hover:shadow-2xl">
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-inovara-primary to-inovara-primary/80 rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <Truck className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-inovara-primary mb-3 sm:mb-4 text-center">
                  {t('productDetail.freeInstallation')}
                </h3>
                <p className="text-sm sm:text-base text-inovara-primary/70 leading-relaxed text-center">
                  {t('productDetail.freeInstallationDesc')}
                </p>
                <div className="mt-4 sm:mt-6 flex justify-center">
                  <div className="w-10 sm:w-12 h-1 bg-gradient-to-r from-inovara-primary to-inovara-secondary rounded-full"></div>
                </div>
              </div>
            </div>

            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-inovara-primary/5 to-inovara-secondary/5 rounded-2xl sm:rounded-3xl transform rotate-1 group-hover:rotate-0 transition-transform duration-500"></div>
              <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-inovara-primary/10 group-hover:border-inovara-primary/20 transition-all duration-300 group-hover:shadow-2xl">
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-inovara-secondary to-inovara-secondary/80 rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <Users className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-inovara-primary mb-3 sm:mb-4 text-center">
                  {t('productDetail.expertSupport')}
                </h3>
                <p className="text-sm sm:text-base text-inovara-primary/70 leading-relaxed text-center">
                  {t('productDetail.expertSupportDesc')}
                </p>
                <div className="mt-4 sm:mt-6 flex justify-center">
                  <div className="w-10 sm:w-12 h-1 bg-gradient-to-r from-inovara-primary to-inovara-secondary rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
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
                onClick={() => onQuoteClick(product.id)}
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

      {/* Video Modal */}
      <VideoModal
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
        videoUrl={product?.videos?.[0]}
        title={product?.name}
      />

      {/* Image Preview Modal */}
      <ImagePreviewModal
        isOpen={isImagePreviewOpen}
        onClose={() => setIsImagePreviewOpen(false)}
        images={productImages}
        currentIndex={selectedImage}
        onIndexChange={setSelectedImage}
        productName={product?.name || 'Product'}
      />
    </div>
  );
};

export default ProductDetailPage;
