import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, BarChart3, Monitor, Shield, Building2, Wrench, Star, Share2, Heart, Truck, Shield as ShieldIcon, Clock, Users, Zap, ChevronLeft, ChevronRight, Play, Award, Quote } from 'lucide-react';
import { useTranslation } from '../contexts/TranslationContext';

export interface ProductDetailPageProps {
  onQuoteClick: () => void;
}

const ProductDetailPage: React.FC<ProductDetailPageProps> = ({ onQuoteClick }) => {
  const { slug } = useParams<{ slug: string }>();
  const { t, isRTL } = useTranslation();
  const [selectedImage, setSelectedImage] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);

  // Map slug to product type
  const productMap: { [key: string]: string } = {
    'flower-vending-machine': 'flower',
    'snack-vending-machine': 'snack', 
    'pizza-vending-machine': 'pizza',
    'beverage-vending-machine': 'beverage'
  };

  const productType = productMap[slug || ''] || 'flower';
  const title = t(`products.${productType}.title`);
  const description = t(`products.${productType}.description`);
  const price = t(`products.${productType}.price`);

  // Product data with enhanced information
  const productData = {
    'flower': {
      images: [
        'https://images.unsplash.com/photo-1563241527-3004b7be0ffd?w=800&h=600&fit=crop&crop=center',
        'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=800&h=600&fit=crop&crop=center',
        'https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=800&h=600&fit=crop&crop=center'
      ],
      icon: Monitor,
      gradient: 'from-pink-500 to-rose-600',
      rating: 4.9,
      reviews: 127,
      features: ['Temperature Control', 'Automated Watering', 'Freshness Monitoring', 'Cashless Payments'],
      specifications: {
        dimensions: '120cm x 80cm x 200cm',
        weight: '180kg',
        capacity: '50 bouquets',
        power: '220V AC',
        connectivity: 'WiFi, 4G, Bluetooth'
      },
      benefits: ['24/7 Availability', 'Reduced Waste', 'Higher Margins', 'Customer Satisfaction']
    },
    'snack': {
      images: [
        'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop&crop=center',
        'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=600&fit=crop&crop=center',
        'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=800&h=600&fit=crop&crop=center'
      ],
      icon: Shield,
      gradient: 'from-orange-500 to-amber-600',
      rating: 4.8,
      reviews: 89,
      features: ['Real-time Inventory', 'Cashless Payments', 'Smart Analytics', 'Remote Management'],
      specifications: {
        dimensions: '100cm x 70cm x 180cm',
        weight: '150kg',
        capacity: '200 items',
        power: '220V AC',
        connectivity: 'WiFi, 4G, Ethernet'
      },
      benefits: ['Increased Sales', 'Better Inventory Control', 'Reduced Theft', 'Analytics Insights']
    },
    'pizza': {
      images: [
        'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=800&h=600&fit=crop&crop=center',
        'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=800&h=600&fit=crop&crop=center',
        'https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?w=800&h=600&fit=crop&crop=center'
      ],
      icon: Building2,
      gradient: 'from-red-500 to-orange-600',
      rating: 4.9,
      reviews: 156,
      features: ['Automated Cooking', 'Fresh Ingredients', 'Customizable Options', 'Temperature Control'],
      specifications: {
        dimensions: '140cm x 90cm x 220cm',
        weight: '280kg',
        capacity: '30 pizzas',
        power: '380V AC',
        connectivity: 'WiFi, 4G, Ethernet'
      },
      benefits: ['Fresh Food 24/7', 'Custom Orders', 'Consistent Quality', 'Higher Profit Margins']
    },
    'beverage': {
      images: [
        'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=800&h=600&fit=crop&crop=center',
        'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop&crop=center',
        'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop&crop=center'
      ],
      icon: Wrench,
      gradient: 'from-blue-500 to-cyan-600',
      rating: 4.7,
      reviews: 203,
      features: ['Multi-Temperature Zones', 'Cashless Payments', 'Consumption Analytics', 'Smart Dispensing'],
      specifications: {
        dimensions: '110cm x 75cm x 190cm',
        weight: '200kg',
        capacity: '150 bottles',
        power: '220V AC',
        connectivity: 'WiFi, 4G, Bluetooth'
      },
      benefits: ['Perfect Temperature', 'Variety of Drinks', 'Real-time Analytics', 'Low Maintenance']
    }
  };

  const currentProduct = productData[productType as keyof typeof productData];
  const IconComponent = currentProduct.icon;

  return (
    <div className={`min-h-screen ${isRTL ? 'rtl' : 'ltr'}`}>
      {/* Hero Section */}
      <section 
        className="relative py-16 px-6 overflow-hidden"
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
            <Link to="/products" className="text-inovara-primary/70 hover:text-inovara-primary transition-colors">
              {t('products.breadcrumb.products')}
          </Link>
            <ArrowRight className={`w-4 h-4 text-inovara-primary/50 ${isRTL ? 'rotate-180' : ''}`} />
            <span className="text-inovara-primary font-medium">{title}</span>
          </nav>
        </div>
      </section>

      {/* Main Product Section */}
      <section className="py-12 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Product Gallery */}
            <div className="space-y-6">
              {/* Main Image */}
              <div className="relative group">
                <img 
                  src={currentProduct.images[selectedImage]} 
                  alt={title}
                  className="w-full aspect-square object-cover rounded-3xl shadow-2xl group-hover:shadow-3xl transition-all duration-500"
                  loading="lazy"
                />
                
                {/* Image Navigation */}
                <button 
                  onClick={() => setSelectedImage(Math.max(0, selectedImage - 1))}
                  disabled={selectedImage === 0}
                  className={`absolute top-1/2 ${isRTL ? 'right-4' : 'left-4'} transform -translate-y-1/2 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  <ChevronLeft className={`w-6 h-6 text-inovara-primary ${isRTL ? 'rotate-180' : ''}`} />
                </button>
                
                <button 
                  onClick={() => setSelectedImage(Math.min(currentProduct.images.length - 1, selectedImage + 1))}
                  disabled={selectedImage === currentProduct.images.length - 1}
                  className={`absolute top-1/2 ${isRTL ? 'left-4' : 'right-4'} transform -translate-y-1/2 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  <ChevronRight className={`w-6 h-6 text-inovara-primary ${isRTL ? 'rotate-180' : ''}`} />
                </button>

                {/* Action Buttons */}
                <div className={`absolute top-4 ${isRTL ? 'left-4' : 'right-4'} flex flex-col gap-2`}>
                  <button 
                    onClick={() => setIsFavorite(!isFavorite)}
                    className="w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <Heart className={`w-5 h-5 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-inovara-primary'}`} />
                  </button>
                  <button className="w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300">
                    <Share2 className="w-5 h-5 text-inovara-primary" />
                  </button>
                </div>

                {/* Category Badge */}
                <div className={`absolute top-4 ${isRTL ? 'right-4' : 'left-4'} bg-gradient-to-r ${currentProduct.gradient} text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg`}>
                  {t(`products.${productType}.category`)}
                </div>
              </div>

              {/* Thumbnail Images */}
              <div className="flex gap-4 overflow-x-auto pb-2">
                {currentProduct.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition-all duration-300 ${
                      selectedImage === index 
                        ? 'border-inovara-primary shadow-lg' 
                        : 'border-transparent hover:border-inovara-primary/50'
                    }`}
                  >
                    <img 
                      src={image} 
                      alt={`${title} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Information */}
            <div className={`space-y-8 ${isRTL ? 'rtl' : 'ltr'}`}>
              {/* Header */}
              <div>
                <div className={`flex items-center gap-4 mb-4 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
                  <div className={`flex-1 ${isRTL ? 'text-right' : 'text-left'}`}>
                    <h1 className="text-4xl md:text-5xl font-black text-inovara-primary mb-2 leading-tight">
                      {title}
                    </h1>
                    <div className={`flex items-center gap-4 ${isRTL ? 'flex-row-reverse justify-end' : 'flex-row'}`}>
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`w-4 h-4 ${i < Math.floor(currentProduct.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
                        ))}
                        <span className="ml-2 text-inovara-primary font-semibold">{currentProduct.rating}</span>
                      </div>
                      <span className="text-inovara-primary/70">({currentProduct.reviews} reviews)</span>
                    </div>
                  </div>
                </div>

                <p className={`text-xl text-inovara-primary/70 leading-relaxed ${isRTL ? 'text-right' : 'text-left'}`}>
                  {description}
                </p>
              </div>

              {/* Price */}
              <div className={`bg-gradient-to-r from-inovara-primary/5 to-inovara-secondary/5 rounded-2xl p-6 ${isRTL ? 'text-right' : 'text-left'}`}>
                <div className="text-3xl font-black text-inovara-primary mb-2">{price}</div>
                <div className="text-inovara-primary/70">Starting price - Contact for custom quotes</div>
              </div>

              {/* Features */}
              <div>
                <h3 className={`text-2xl font-black text-inovara-primary mb-6 ${isRTL ? 'text-right' : 'text-left'}`}>
                  Key Features
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {currentProduct.features.map((feature, index) => (
                    <div key={index} className={`flex items-center gap-3 p-4 bg-white/70 rounded-xl border border-inovara-primary/10 hover:border-inovara-primary/20 transition-all duration-300 ${isRTL ? 'flex-row-reverse text-right' : 'flex-row text-left'}`}>
                      <CheckCircle className="w-5 h-5 text-inovara-accent flex-shrink-0" />
                      <span className="font-medium text-inovara-primary">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className={`space-y-4 ${isRTL ? 'text-right' : 'text-left'}`}>
                <button 
                  onClick={onQuoteClick}
                  className="w-full group relative overflow-hidden bg-gradient-to-r from-inovara-primary to-inovara-secondary text-white font-bold py-5 px-8 rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-inovara-accent/30"
                >
                  <span className={`flex items-center justify-center gap-3 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
                    <span>Get Free Quote</span>
                    <ArrowRight className={`w-5 h-5 group-hover:translate-x-1 transition-transform duration-300 ${isRTL ? 'rotate-180 group-hover:-translate-x-1' : ''}`} />
                  </span>
                  <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500 skew-x-12"></div>
                </button>

                <button className="w-full py-4 border-2 border-inovara-primary text-inovara-primary font-bold rounded-2xl hover:bg-inovara-primary hover:text-white transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-inovara-primary/20">
                  <span className={`flex items-center justify-center gap-3 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
                    <Play className="w-5 h-5" />
                    <span>Watch Demo Video</span>
                  </span>
              </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Specifications Section */}
      <section className="py-24 px-6 bg-gradient-to-r from-inovara-primary/5 to-inovara-secondary/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-inovara-primary mb-4">Technical Specifications</h2>
            <p className="text-xl text-inovara-primary/70">Detailed technical information about this vending machine</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Specifications */}
            <div className="bg-white/90 backdrop-blur-sm border border-inovara-primary/10 rounded-3xl p-8 shadow-lg">
              <h3 className="text-2xl font-black text-inovara-primary mb-6">Specifications</h3>
              <div className="space-y-4">
                {Object.entries(currentProduct.specifications).map(([key, value]) => (
                  <div key={key} className={`flex items-center justify-between py-3 px-4 bg-white/50 rounded-xl ${isRTL ? 'flex-row-reverse text-right' : 'flex-row text-left'}`}>
                    <span className="font-semibold text-inovara-primary capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                    <span className="text-inovara-primary/70 font-medium">{value}</span>
                  </div>
                ))}
          </div>
        </div>

            {/* Benefits */}
            <div className="bg-white/90 backdrop-blur-sm border border-inovara-primary/10 rounded-3xl p-8 shadow-lg">
              <h3 className="text-2xl font-black text-inovara-primary mb-6">Business Benefits</h3>
              <div className="space-y-4">
                {currentProduct.benefits.map((benefit, index) => (
                  <div key={index} className={`flex items-center gap-4 p-4 bg-white/50 rounded-xl hover:bg-white/70 transition-all duration-300 ${isRTL ? 'flex-row-reverse text-right' : 'flex-row text-left'}`}>
                    <div className="w-10 h-10 bg-gradient-to-br from-inovara-accent to-inovara-secondary rounded-xl flex items-center justify-center flex-shrink-0">
                      <Zap className="w-5 h-5 text-white" />
                    </div>
                    <span className="font-medium text-inovara-primary">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-inovara-primary mb-4">Why Choose Our Vending Machines?</h2>
            <p className="text-xl text-inovara-primary/70">Trusted by businesses worldwide</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Trust Features */}
            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-inovara-accent to-inovara-secondary rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <ShieldIcon className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-black text-inovara-primary mb-4">2-Year Warranty</h3>
              <p className="text-inovara-primary/70 leading-relaxed">Comprehensive warranty coverage with 24/7 technical support and maintenance services.</p>
            </div>

            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-inovara-primary to-inovara-primary/80 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <Truck className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-black text-inovara-primary mb-4">Free Installation</h3>
              <p className="text-inovara-primary/70 leading-relaxed">Professional installation and setup included with every purchase, anywhere in Egypt.</p>
            </div>

            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-inovara-secondary to-inovara-secondary/80 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <Users className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-black text-inovara-primary mb-4">Expert Support</h3>
              <p className="text-inovara-primary/70 leading-relaxed">Dedicated customer success team and training programs for optimal machine performance.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 px-6 bg-gradient-to-r from-inovara-primary/5 to-inovara-secondary/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-inovara-primary mb-4">What Our Customers Say</h2>
            <p className="text-xl text-inovara-primary/70">Real feedback from satisfied customers</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-white/90 backdrop-blur-sm border border-inovara-primary/10 rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <blockquote className="text-inovara-primary/80 leading-relaxed mb-6">
                "The flower vending machine has revolutionized our business. Sales increased by 40% and customers love the convenience."
              </blockquote>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-inovara-accent to-inovara-secondary rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">MR</span>
                </div>
                <div>
                  <div className="font-semibold text-inovara-primary">Mohamed Rashed</div>
                  <div className="text-sm text-inovara-primary/70">Flower Shop Owner</div>
                </div>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-white/90 backdrop-blur-sm border border-inovara-primary/10 rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <blockquote className="text-inovara-primary/80 leading-relaxed mb-6">
                "Excellent customer service and the pizza machine works flawlessly. Our office productivity has improved significantly."
              </blockquote>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-inovara-primary to-inovara-primary/80 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">AS</span>
                </div>
                <div>
                  <div className="font-semibold text-inovara-primary">Ahmed Salem</div>
                  <div className="text-sm text-inovara-primary/70">Office Manager</div>
                </div>
          </div>
        </div>

            {/* Testimonial 3 */}
            <div className="bg-white/90 backdrop-blur-sm border border-inovara-primary/10 rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <blockquote className="text-inovara-primary/80 leading-relaxed mb-6">
                "Smart analytics and real-time monitoring make inventory management effortless. Highly recommended!"
              </blockquote>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-inovara-secondary to-inovara-secondary/80 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">FA</span>
                </div>
                <div>
                  <div className="font-semibold text-inovara-primary">Fatma Ahmed</div>
                  <div className="text-sm text-inovara-primary/70">Retail Manager</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 bg-gradient-to-r from-inovara-primary to-inovara-secondary">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-12 border border-white/20">
            <h2 className="text-3xl md:text-4xl font-black text-white mb-6">
              Ready to Transform Your Business?
            </h2>
            <p className="text-xl text-white/90 font-light leading-relaxed mb-8">
              Join hundreds of satisfied customers who have revolutionized their operations with our smart vending solutions.
            </p>
            
            <div className={`flex flex-col sm:flex-row gap-4 justify-center items-center ${isRTL ? 'sm:flex-row-reverse' : ''}`}>
              <button 
                onClick={onQuoteClick}
                className="group px-12 py-5 bg-white text-inovara-primary font-bold text-lg rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-white/30"
              >
                <span className={`flex items-center justify-center gap-3 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
                  Get Free Quote
                  <ArrowRight className={`w-6 h-6 group-hover:translate-x-1 transition-transform duration-300 ${isRTL ? 'rotate-180 group-hover:-translate-x-1' : ''}`} />
                </span>
              </button>
              
              <Link 
                to="/products"
                className="px-12 py-5 border-2 border-white text-white font-bold text-lg rounded-2xl hover:bg-white hover:text-inovara-primary transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-white/30"
              >
                View All Products
              </Link>
            </div>
          </div>
        </div>
      </section>
      </div>
  );
};

export default ProductDetailPage;
