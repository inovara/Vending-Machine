import React, { useState, useEffect } from 'react';
import { X, Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useTranslation } from '../contexts/TranslationContext';
import { storeQuote } from '../network/quote';
import { listProducts } from '../network/product';
import { QuoteFormData, QuoteResponse, Product } from '../types/api';
import { queryKeys } from '../services/react-query/queryKeys';

interface QuickQuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  productId?: number;
}

const QuickQuoteModal: React.FC<QuickQuoteModalProps> = ({ isOpen, onClose, productId }) => {
  const { t, isRTL, language } = useTranslation();
  const [formData, setFormData] = useState<QuoteFormData>({
    name: '',
    email: '',
    phone: '',
    company: '',
    products: productId ? [{ id: productId }] : [],
    message: ''
  });
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    if (productId) {
      setFormData(prev => ({
        ...prev,
        products: [{ id: productId }]
      }));
    }
  }, [productId]);


  const {
    mutate: submitQuote,
    isLoading: isSubmitting,
    isSuccess,
    reset: resetMutation
  } = useMutation<QuoteResponse, Error, QuoteFormData>({
    mutationFn: storeQuote,
    onSuccess: () => {
      setSubmitError(null);
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        products: productId ? [{ id: productId }] : [],
        message: ''
      });
    },
    onError: (error) => {
      setSubmitError(error.message || t('quote.error.submitFailed'));
    },
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (submitError) setSubmitError(null);
  };

  const handleProductChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedProductId = parseInt(e.target.value);
    if (selectedProductId) {
      setFormData(prev => ({ ...prev, products: [{ id: selectedProductId }] }));
    } else {
      setFormData(prev => ({ ...prev, products: productId ? [{ id: productId }] : [] }));
    }
    if (submitError) setSubmitError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.company || (!productId && formData.products.length === 0)) {
      setSubmitError(t('quote.validation.requiredFields'));
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setSubmitError(t('quote.validation.invalidEmail'));
      return;
    }

    submitQuote(formData);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      company: '',
      products: productId ? [{ id: productId }] : [],
      message: ''
    });
    setSubmitError(null);
    resetMutation();
  };

  const {
    data: productsResponse,
    isLoading: isLoadingProducts,
    isError: isProductsError
  } = useQuery({
    queryKey: [queryKeys.listProducts, { page: 1, per_page: 100, category_id: 2 }, language],
    queryFn: () => listProducts({ page: 1, per_page: 100, category_id: 2 }),
    enabled: !!language,
    staleTime: 5 * 60 * 1000,
    cacheTime: 10 * 60 * 1000,
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-2 sm:p-4">
      <div className="bg-white/95 backdrop-blur-md border border-inovara-primary/20 rounded-2xl sm:rounded-3xl max-w-xs sm:max-w-md md:max-w-2xl lg:max-w-3xl w-full max-h-[95vh] sm:max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="p-4 sm:p-6 md:p-8">
          <div className={`flex items-start justify-between mb-6 sm:mb-8 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
            <div className={`flex items-center gap-3 sm:gap-4 flex-1 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
              <div className={`flex-1 ${isRTL ? 'text-right' : 'text-left'}`}>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-inovara-primary mb-1 leading-tight">{t('quote.title')}</h2>
                <p className="text-inovara-primary/70 text-xs sm:text-sm font-medium leading-relaxed">{t('quote.subtitle')}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className={`p-2 sm:p-3 text-inovara-primary/60 hover:text-inovara-primary hover:bg-inovara-primary/10 rounded-xl transition-all duration-300 group flex-shrink-0 ${isRTL ? 'mr-2' : 'ml-2'}`}
              aria-label="Close modal"
            >
              <X className="w-5 h-5 sm:w-6 sm:h-6 group-hover:rotate-90 transition-transform duration-300" />
            </button>
          </div>

          {submitError && (
            <div className={`mb-4 sm:mb-6 p-3 sm:p-4 bg-red-50 border border-red-200 rounded-xl sm:rounded-2xl flex items-start gap-3 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
              <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 text-red-500 flex-shrink-0 mt-0.5" />
              <p className="text-red-700 text-xs sm:text-sm font-medium leading-relaxed">{submitError}</p>
            </div>
          )}

          {!isSuccess ? (
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div className={isRTL ? 'sm:order-2' : 'sm:order-1'}>
                  <label className={`block text-inovara-primary font-bold text-xs sm:text-sm mb-2 sm:mb-3 ${isRTL ? 'text-right' : 'text-left'}`}>
                    {t('quote.name')} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    dir={isRTL ? 'rtl' : 'ltr'}
                    className={`w-full px-3 sm:px-4 py-3 sm:py-4 bg-white border-2 border-inovara-primary/20 rounded-xl sm:rounded-2xl text-inovara-primary placeholder-inovara-primary/50 focus:border-inovara-accent focus:ring-4 focus:ring-inovara-accent/20 focus:outline-none transition-all duration-300 text-sm sm:text-base ${isRTL ? 'text-right' : 'text-left'}`}
                    placeholder={t('quote.name')}
                    required
                  />
                </div>
                <div className={isRTL ? 'sm:order-1' : 'sm:order-2'}>
                  <label className={`block text-inovara-primary font-bold text-xs sm:text-sm mb-2 sm:mb-3 ${isRTL ? 'text-right' : 'text-left'}`}>
                    {t('quote.email')} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    dir={isRTL ? 'rtl' : 'ltr'}
                    className={`w-full px-3 sm:px-4 py-3 sm:py-4 bg-white border-2 border-inovara-primary/20 rounded-xl sm:rounded-2xl text-inovara-primary placeholder-inovara-primary/50 focus:border-inovara-accent focus:ring-4 focus:ring-inovara-accent/20 focus:outline-none transition-all duration-300 text-sm sm:text-base ${isRTL ? 'text-right' : 'text-left'}`}
                    placeholder={t('quote.email')}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div className={isRTL ? 'sm:order-2' : 'sm:order-1'}>
                  <label className={`block text-inovara-primary font-bold text-xs sm:text-sm mb-2 sm:mb-3 ${isRTL ? 'text-right' : 'text-left'}`}>
                    {t('quote.phone')}
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    dir={isRTL ? 'rtl' : 'ltr'}
                    className={`w-full px-3 sm:px-4 py-3 sm:py-4 bg-white border-2 border-inovara-primary/20 rounded-xl sm:rounded-2xl text-inovara-primary placeholder-inovara-primary/50 focus:border-inovara-accent focus:ring-4 focus:ring-inovara-accent/20 focus:outline-none transition-all duration-300 text-sm sm:text-base ${isRTL ? 'text-right' : 'text-left'}`}
                    placeholder={t('quote.phone')}
                  />
                </div>
                <div className={isRTL ? 'sm:order-1' : 'sm:order-2'}>
                  <label className={`block text-inovara-primary font-bold text-xs sm:text-sm mb-2 sm:mb-3 ${isRTL ? 'text-right' : 'text-left'}`}>
                    {t('quote.company')} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    dir={isRTL ? 'rtl' : 'ltr'}
                    className={`w-full px-3 sm:px-4 py-3 sm:py-4 bg-white border-2 border-inovara-primary/20 rounded-xl sm:rounded-2xl text-inovara-primary placeholder-inovara-primary/50 focus:border-inovara-accent focus:ring-4 focus:ring-inovara-accent/20 focus:outline-none transition-all duration-300 text-sm sm:text-base ${isRTL ? 'text-right' : 'text-left'}`}
                    placeholder={t('quote.company')}
                    required
                  />
                </div>
              </div>

              <div>
                <div className={isRTL ? 'sm:order-2' : 'sm:order-1'}>
                  <label className={`block text-inovara-primary font-bold text-xs sm:text-sm mb-2 sm:mb-3 ${isRTL ? 'text-right' : 'text-left'}`}>
                    {t('quote.product')} <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="products"
                    value={formData.products[0]?.id || ''}
                    onChange={handleProductChange}
                    dir={isRTL ? 'rtl' : 'ltr'}
                    className={`w-full px-3 sm:px-4 py-3 sm:py-4 bg-white border-2 border-inovara-primary/20 rounded-xl sm:rounded-2xl text-inovara-primary focus:border-inovara-accent focus:ring-4 focus:ring-inovara-accent/20 focus:outline-none transition-all duration-300 text-sm sm:text-base ${isRTL ? 'text-right' : 'text-left'}`}
                    required
                    disabled={isLoadingProducts}
                  >
                    <option value="" className="text-inovara-primary/50">
                      {isLoadingProducts ? t('common.loading') : t('quote.selectProduct')}
                    </option>
                    {productsResponse?.data?.map((product: Product) => (
                      <option key={product.id} value={product.id} className="text-inovara-primary">
                        {product.name}
                      </option>
                    ))}
                  </select>
                  {isProductsError && (
                    <p className="text-red-500 text-xs mt-1">{t('quote.productLoadError')}</p>
                  )}
                </div>
              </div>

              <div>
                <label className={`block text-inovara-primary font-bold text-xs sm:text-sm mb-2 sm:mb-3 ${isRTL ? 'text-right' : 'text-left'}`}>
                  {t('quote.requirements')}
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  dir={isRTL ? 'rtl' : 'ltr'}
                  rows={3}
                  className={`w-full px-3 sm:px-4 py-3 sm:py-4 bg-white border-2 border-inovara-primary/20 rounded-xl sm:rounded-2xl text-inovara-primary placeholder-inovara-primary/50 focus:border-inovara-accent focus:ring-4 focus:ring-inovara-accent/20 focus:outline-none transition-all duration-300 resize-none text-sm sm:text-base ${isRTL ? 'text-right' : 'text-left'}`}
                  placeholder={t('quote.requirementsPlaceholder')}
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full group/btn relative overflow-hidden bg-gradient-to-r from-inovara-primary to-inovara-secondary text-white font-bold py-3 sm:py-4 px-6 sm:px-8 rounded-xl sm:rounded-2xl shadow-xl sm:shadow-2xl hover:shadow-2xl sm:hover:shadow-3xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none focus:outline-none focus:ring-4 focus:ring-inovara-accent/30"
              >
                {isSubmitting ? (
                  <span className={`flex items-center justify-center gap-2 sm:gap-3 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
                    <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
                    <span className="text-sm sm:text-base">{t('common.loading')}...</span>
                  </span>
                ) : (
                  <span className={`flex items-center justify-center gap-2 sm:gap-3 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
                    <span className="text-sm sm:text-base">{t('quote.submit')}</span>
                    <Send className={`w-4 h-4 sm:w-6 sm:h-6 roup-hover/btn:translate-x-1 transition-transform duration-300 ${isRTL ? 'rotate-360 group-hover:-translate-x-1' : ''}`} />
                  </span>
                )}

                <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-500 skew-x-12"></div>
              </button>
            </form>
          ) : (
            <div className={`text-center py-8 sm:py-12 ${isRTL ? 'rtl' : 'ltr'}`}>
              <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 sm:mb-8 shadow-2xl">
                <CheckCircle className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 text-white" />
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-inovara-primary mb-3 sm:mb-4 leading-tight">{t('quote.success.title')}</h3>
              <p className="text-inovara-primary/70 text-sm sm:text-base md:text-lg font-medium mb-6 sm:mb-8 max-w-md mx-auto leading-relaxed">
                {t('quote.success.message')}
              </p>
              <div className={`flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center ${isRTL ? 'sm:flex-row-reverse' : ''}`}>
                <button
                  onClick={resetForm}
                  className="group px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-inovara-primary to-inovara-secondary text-white font-bold rounded-xl sm:rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-inovara-accent/30"
                >
                  <span className={`flex items-center justify-center gap-2 sm:gap-3 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
                    <span className="text-sm sm:text-base">{t('quote.success.requestAnother')}</span>
                    <Send className={`w-4 h-4 sm:w-6 sm:h-6 roup-hover/btn:translate-x-1 transition-transform duration-300 ${isRTL ? 'rotate-360 group-hover:-translate-x-1' : ''}`} />
                  </span>
                </button>
                <button
                  onClick={onClose}
                  className="px-6 sm:px-8 py-3 sm:py-4 border-2 border-inovara-primary text-inovara-primary font-bold rounded-xl sm:rounded-2xl hover:bg-inovara-primary hover:text-white transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-inovara-primary/20"
                >
                  <span className="text-sm sm:text-base">{t('quote.success.close')}</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuickQuoteModal;
