import React, { useState, useEffect } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight, MapPin, Building, Users } from 'lucide-react';
import { useTranslation } from '../contexts/TranslationContext';
import { useScrollAnimation, useStaggeredAnimation } from '../hooks/useScrollAnimation';
import { Testimonial } from '../types';

interface TestimonialsSectionProps {
  className?: string;
}

const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({ className = '' }) => {
  const { t, isRTL } = useTranslation();
  const { elementRef, animationStyle } = useScrollAnimation({
    threshold: 0.2,
    duration: 800
  });

  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: t('testimonials.ahmed.name'),
      company: t('testimonials.ahmed.company'),
      position: t('testimonials.ahmed.position'),
      content: t('testimonials.ahmed.content'),
      contentKey: 'testimonials.ahmed.content',
      rating: 5,
      industry: 'Office Buildings',
      image: '/api/placeholder/80/80'
    },
    {
      id: 2,
      name: t('testimonials.fatima.name'),
      company: t('testimonials.fatima.company'),
      position: t('testimonials.fatima.position'),
      content: t('testimonials.fatima.content'),
      contentKey: 'testimonials.fatima.content',
      rating: 5,
      industry: 'Healthcare',
      image: '/api/placeholder/80/80'
    },
    {
      id: 3,
      name: t('testimonials.mohamed.name'),
      company: t('testimonials.mohamed.company'),
      position: t('testimonials.mohamed.position'),
      content: t('testimonials.mohamed.content'),
      contentKey: 'testimonials.mohamed.content',
      rating: 5,
      industry: 'Manufacturing',
      image: '/api/placeholder/80/80'
    },
    {
      id: 4,
      name: t('testimonials.sarah.name'),
      company: t('testimonials.sarah.company'),
      position: t('testimonials.sarah.position'),
      content: t('testimonials.sarah.content'),
      contentKey: 'testimonials.sarah.content',
      rating: 5,
      industry: 'Education',
      image: '/api/placeholder/80/80'
    },
    {
      id: 5,
      name: t('testimonials.omar.name'),
      company: t('testimonials.omar.company'),
      position: t('testimonials.omar.position'),
      content: t('testimonials.omar.content'),
      contentKey: 'testimonials.omar.content',
      rating: 5,
      industry: 'Hospitality',
      image: '/api/placeholder/80/80'
    }
  ];

  const { containerRef, getItemAnimationStyle } = useStaggeredAnimation(testimonials.length, 150);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, testimonials.length]);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    setIsAutoPlaying(false);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setIsAutoPlaying(false);
  };

  const goToTestimonial = (index: number) => {
    setCurrentTestimonial(index);
    setIsAutoPlaying(false);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < rating ? 'text-inovara-accent fill-current' : 'text-inovara-sage/30'
        }`}
      />
    ));
  };

  return (
    <section ref={elementRef} className={`py-20 px-6 bg-section-wash ${className}`} style={animationStyle}>
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-inovara-primary mb-6">
            {t('testimonials.title').split(' ').map((word, index) => (
              <span key={index} className={index === 2 ? 'bg-gradient-to-r from-inovara-accent to-inovara-secondary bg-clip-text text-transparent' : ''}>
                {word}{index < t('testimonials.title').split(' ').length - 1 ? ' ' : ''}
              </span>
            ))}
          </h2>
          <p className="text-xl text-inovara-secondary max-w-3xl mx-auto">
            {t('testimonials.subtitle')}
          </p>
        </div>

        {/* Main Testimonial */}
        <div className="relative mb-12">
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-inovara-accent/20 shadow-2xl">
            <div className="flex items-start space-x-6">
              <div className="flex-shrink-0">
                <div className="w-20 h-20 bg-gradient-to-r from-inovara-accent to-inovara-secondary rounded-full flex items-center justify-center">
                  <span className="text-2xl font-bold text-inovara-primary">
                    {testimonials[currentTestimonial].name.charAt(0)}
                  </span>
                </div>
              </div>
              
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-4">
                  {renderStars(testimonials[currentTestimonial].rating)}
                </div>
                
                <blockquote className="text-lg md:text-xl text-inovara-primary mb-6 leading-relaxed">
                  <Quote className="w-6 h-6 text-inovara-accent/50 mb-2" />
                  "{testimonials[currentTestimonial].content}"
                </blockquote>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-xl font-semibold text-inovara-primary">
                      {testimonials[currentTestimonial].name}
                    </h4>
                    <p className="text-inovara-secondary">
                      {testimonials[currentTestimonial].position}
                    </p>
                    <div className="flex items-center space-x-2 mt-1">
                      <Building className="w-4 h-4 text-inovara-accent" />
                      <span className="text-sm text-inovara-secondary">
                        {testimonials[currentTestimonial].company}
                      </span>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="inline-flex items-center space-x-1 bg-inovara-accent/10 px-3 py-1 rounded-full">
                      <MapPin className="w-4 h-4 text-inovara-accent" />
                      <span className="text-sm font-medium text-inovara-primary">Egypt</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevTestimonial}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-6 h-6 text-inovara-primary" />
          </button>
          
          <button
            onClick={nextTestimonial}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-6 h-6 text-inovara-primary" />
          </button>
        </div>

        {/* Testimonial Indicators */}
        <div className="flex justify-center space-x-2 mb-12">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => goToTestimonial(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentTestimonial
                  ? 'bg-inovara-accent scale-125'
                  : 'bg-inovara-sage/30 hover:bg-inovara-sage/50'
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>

        {/* Testimonial Grid */}
        <div ref={containerRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-inovara-accent/20 hover:shadow-lg transition-all duration-300 hover:scale-105"
              style={getItemAnimationStyle(index)}
            >
              <div className="flex items-center space-x-2 mb-4">
                {renderStars(testimonial.rating)}
              </div>
              
              <p className="text-inovara-primary mb-4 text-sm leading-relaxed">
                "{testimonial.content}"
              </p>
              
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-inovara-accent to-inovara-secondary rounded-full flex items-center justify-center">
                  <span className="text-sm font-bold text-inovara-primary">
                    {testimonial.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <h5 className="font-semibold text-inovara-primary text-sm">
                    {testimonial.name}
                  </h5>
                  <p className="text-xs text-inovara-secondary">
                    {testimonial.position}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-inovara-primary mb-2">500+</div>
            <div className="text-inovara-secondary">{t('testimonials.stats.clients')}</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-inovara-primary mb-2">99%</div>
            <div className="text-inovara-secondary">{t('testimonials.stats.satisfaction')}</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-inovara-primary mb-2">24/7</div>
            <div className="text-inovara-secondary">{t('testimonials.stats.support')}</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-inovara-primary mb-2">5+</div>
            <div className="text-inovara-secondary">{t('testimonials.stats.experience')}</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
