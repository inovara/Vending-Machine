import React, { useState, useMemo } from 'react';
import { ArrowRight, CheckCircle, Search, Filter, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from '../contexts/TranslationContext';

export interface ProductsPageProps {
  onQuoteClick: () => void;
}

const products = [
  {
    slug: 'flower-vending-machine',
    key: 'flower',
    image: 'https://images.unsplash.com/photo-1563241527-3004b7be0ffd?w=600&h=400&fit=crop&crop=center',
    category: 'Flower Vending',
    gradient: 'from-pink-500 to-rose-600',
    price: '$9,999',
    features: ['Temperature Control', 'Automated Watering', 'Freshness Monitoring']
  },
  {
    slug: 'snack-vending-machine',
    key: 'snack',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop&crop=center',
    category: 'Snack Vending',
    gradient: 'from-orange-500 to-amber-600',
    price: '$7,999',
    features: ['Real-time Inventory', 'Cashless Payments', 'Smart Analytics']
  },
  {
    slug: 'pizza-vending-machine',
    key: 'pizza',
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=600&h=400&fit=crop&crop=center',
    category: 'Food Vending',
    gradient: 'from-red-500 to-orange-600',
    price: '$18,999',
    features: ['Automated Cooking', 'Fresh Ingredients', 'Customizable Options']
  },
  {
    slug: 'beverage-vending-machine',
    key: 'beverage',
    image: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=600&h=400&fit=crop&crop=center',
    category: 'Beverage Vending',
    gradient: 'from-blue-500 to-cyan-600',
    price: '$6,999',
    features: ['Multi-Temperature Zones', 'Cashless Payments', 'Consumption Analytics']
  }
];

const categories = [
  { id: 'all', name: 'All Products' },
  { id: 'flower', name: 'Flower Vending' },
  { id: 'snack', name: 'Snack Vending'},
  { id: 'pizza', name: 'Food Vending' },
  { id: 'beverage', name: 'Beverage Vending' }
];

const ProductsPage: React.FC<ProductsPageProps> = ({ onQuoteClick }) => {
  const { t, isRTL } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredProducts = useMemo(() => {
    let filtered = products;
    
    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.key === selectedCategory);
    }
    
    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(product => 
        t(`products.${product.key}.title`).toLowerCase().includes(searchTerm.toLowerCase()) ||
        t(`products.${product.key}.description`).toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    return filtered;
  }, [searchTerm, selectedCategory, t]);

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

          {/* Search and Filter */}
          <div className="max-w-4xl mx-auto">
            <div className="bg-white/90 backdrop-blur-sm border border-inovara-primary/10 rounded-3xl p-6 shadow-lg">
              <div className={`flex flex-col lg:flex-row gap-6 ${isRTL ? 'lg:flex-row-reverse' : ''}`}>
                {/* Search */}
                <div className="flex-1">
                  <div className="relative">
                    <Search className={`absolute top-1/2 transform -translate-y-1/2 w-5 h-5 text-inovara-primary/50 ${isRTL ? 'right-2' : 'left-4'}`} />
                    <input
                      type="text"
                      placeholder={t('products.searchPlaceholder')}
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className={`w-full pl-12 pr-4 py-4 bg-white border border-inovara-primary/20 rounded-2xl text-inovara-primary placeholder-inovara-primary/50 focus:outline-none focus:ring-4 focus:ring-inovara-accent/30 focus:border-inovara-accent transition-all duration-300 ${isRTL ? 'text-right' : 'text-left'}`}
                    />
                  </div>
                </div>

                {/* Category Filter */}
                <div className="lg:w-80">
                  <div className="relative">
                    <Filter className={`absolute top-1/2 transform -translate-y-1/2 w-5 h-5 text-inovara-primary/50 ${isRTL ? 'right-4' : 'left-4'}`} />
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className={`w-full pl-12 pr-4 py-4 bg-white border border-inovara-primary/20 rounded-2xl text-inovara-primary focus:outline-none focus:ring-4 focus:ring-inovara-accent/30 focus:border-inovara-accent transition-all duration-300 appearance-none ${isRTL ? 'text-right' : 'text-left'}`}
                    >
                      {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
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
                {filteredProducts.length} {t('products.resultsFound')}
              </h2>
              <p className="text-inovara-primary/70">
                {searchTerm || selectedCategory !== 'all' 
                  ? t('products.filteredResults') 
                  : t('products.allResults')
                }
              </p>
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-8">
            {filteredProducts.map((product, index) => {
              return (
                <div 
                  key={product.slug}
                  className={`group relative bg-white/90 backdrop-blur-sm border border-inovara-primary/10 rounded-3xl overflow-hidden hover:-translate-y-2 transition-all duration-500 shadow-lg hover:shadow-2xl hover:shadow-inovara-primary/10 ${isRTL ? 'rtl' : 'ltr'}`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {/* Image Container */}
                  <div className="relative h-64 overflow-hidden">
                    <img 
                      src={product.image} 
                      alt={t(`products.${product.key}.title`)}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      loading="lazy"
                    />
                    
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                    
                    {/* Category Badge */}
                    <div className={`absolute top-4 ${isRTL ? 'left-4' : 'right-4'} bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-inovara-primary`}>
                      {product.category}
                    </div>
                    
                    {/* Price Badge */}
                    <div className={`absolute top-4 ${isRTL ? 'right-4' : 'left-4'} bg-gradient-to-r ${product.gradient} text-white px-3 py-1 rounded-full text-sm font-bold`}>
                      {product.price}
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="p-8">
                    <div className={`flex items-start gap-4 mb-6 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
                      <div className={`flex-1 ${isRTL ? 'text-right' : 'text-left'}`}>
                        <h3 className="text-2xl font-black text-inovara-primary mb-2 group-hover:text-inovara-accent transition-colors duration-300">
                          {t(`products.${product.key}.title`)}
                        </h3>
                        <p className="text-inovara-primary/70 font-light leading-relaxed">
                          {t(`products.${product.key}.description`)}
                        </p>
                      </div>
                    </div>
                    
                    {/* Features */}
                    <div className="space-y-3 mb-8">
                      {product.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className={`flex items-center text-sm text-inovara-primary/80 ${isRTL ? 'flex-row-reverse text-right' : 'flex-row text-left'}`}>
                          <CheckCircle className={`w-4 h-4 text-inovara-accent ${isRTL ? 'ml-3' : 'mr-3'} flex-shrink-0`} />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                    
                    {/* Action Buttons */}
                    <div className={`flex flex-col sm:flex-row gap-4 ${isRTL ? 'sm:flex-row-reverse' : ''}`}>
                      <Link
                        to={`/products/${product.slug}`}
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

          {/* No Results */}
          {filteredProducts.length === 0 && (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-inovara-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="w-12 h-12 text-inovara-primary/50" />
              </div>
              <h3 className="text-2xl font-bold text-inovara-primary mb-4">
                {t('products.noResults')}
              </h3>
              <p className="text-inovara-primary/70 mb-8 max-w-md mx-auto">
                {t('products.noResultsDesc')}
              </p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('all');
                }}
                className="px-8 py-4 bg-gradient-to-r from-inovara-primary to-inovara-secondary text-white font-bold rounded-2xl hover:shadow-xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-inovara-accent/30"
              >
                {t('products.clearFilters')}
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
