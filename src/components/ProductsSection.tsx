import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useTranslation } from '../contexts/TranslationContext';

interface VendingMachinesShowcaseProps {
  onQuoteClick?: () => void;
}

const ProductsSection: React.FC<VendingMachinesShowcaseProps> = ({ onQuoteClick }) => {
  const { t, isRTL } = useTranslation();
  const navigate = useNavigate();

  const machines = [
    {
      id: 'flower',
      title: t('showcase.flower.title'),
      description: t('showcase.flower.description'),
      image: 'https://images.unsplash.com/photo-1563241527-3004b7be0ffd?w=600&h=400&fit=crop&crop=center',
      category: t('showcase.flower.category'),
      gradient: 'from-pink-500 to-rose-600',
      slug: 'flower-vending-machine'
    },
    {
      id: 'snack',
      title: t('showcase.snack.title'),
      description: t('showcase.snack.description'),
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop&crop=center',
      category: t('showcase.snack.category'),
      gradient: 'from-orange-500 to-amber-600',
      slug: 'snack-vending-machine'
    },
    {
      id: 'pizza',
      title: t('showcase.pizza.title'),
      description: t('showcase.pizza.description'),
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop&crop=center',
      category: t('showcase.pizza.category'),
      gradient: 'from-red-500 to-orange-600',
      slug: 'pizza-vending-machine'
    },
    {
      id: 'beverage',
      title: t('showcase.beverage.title'),
      description: t('showcase.beverage.description'),
      image: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=600&h=400&fit=crop&crop=center',
      category: t('showcase.beverage.category'),
      gradient: 'from-blue-500 to-cyan-600',
      slug: 'beverage-vending-machine'
    }
  ];

  const handleViewDetails = (slug: string) => {
    navigate(`/products/${slug}`);
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

        {/* Machines Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {machines.map((machine, index) => {
            return (
              <div 
                key={machine.id}
                className={`group relative bg-white/90 backdrop-blur-sm border border-inovara-primary/10 rounded-3xl overflow-hidden hover:-translate-y-2 transition-all duration-500 shadow-lg hover:shadow-2xl hover:shadow-inovara-primary/10 ${isRTL ? 'rtl' : 'ltr'}`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Image Container */}
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={machine.image} 
                    alt={machine.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                  />
                  
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                  
                  {/* Category Badge */}
                  <div className={`absolute top-4 ${isRTL ? 'left-4' : 'right-4'} bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-inovara-primary`}>
                    {machine.category}
                  </div>
                </div>
                
                {/* Content */}
                <div className="p-6">
                  <h3 className={`text-xl font-black text-inovara-primary mb-3 group-hover:text-inovara-accent transition-colors duration-300 ${isRTL ? 'text-right' : 'text-left'}`}>
                    {machine.title}
                  </h3>
                  
                  <p className={`text-inovara-primary/70 font-light leading-relaxed mb-6 ${isRTL ? 'text-right' : 'text-left'}`}>
                    {machine.description}
                  </p>
                  
                  {/* Action Button */}
                  <button
                    onClick={() => handleViewDetails(machine.slug)}
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
