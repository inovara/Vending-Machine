import { useEffect, useRef, useState } from 'react';
import { ScrollAnimationConfig } from '../types';

interface UseScrollAnimationOptions extends ScrollAnimationConfig {
  triggerOnce?: boolean;
  rootMargin?: string;
}

export const useScrollAnimation = (options: Partial<UseScrollAnimationOptions> = {}) => {
  const {
    threshold = 0.1,
    rootMargin = '0px',
    triggerOnce = true,
    duration = 600,
    delay = 0,
    easing = 'ease-out',
    direction = 'normal',
    fillMode = 'forwards'
  } = options;

  const elementRef = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (triggerOnce) {
            setHasAnimated(true);
          }
        } else if (!triggerOnce) {
          setIsVisible(false);
        }
      },
      {
        threshold,
        rootMargin
      }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [threshold, rootMargin, triggerOnce]);

  const animationStyle: React.CSSProperties = {
    animationDuration: `${duration}ms`,
    animationDelay: `${delay}ms`,
    animationTimingFunction: easing,
    animationDirection: direction,
    animationFillMode: fillMode,
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
    transition: `opacity ${duration}ms ${easing}, transform ${duration}ms ${easing}`
  };

  return {
    elementRef,
    isVisible,
    hasAnimated,
    animationStyle
  };
};

export const useStaggeredAnimation = (itemCount: number, staggerDelay: number = 100) => {
  const [visibleItems, setVisibleItems] = useState<number[]>([]);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Stagger the animation for each item
          for (let i = 0; i < itemCount; i++) {
            setTimeout(() => {
              setVisibleItems(prev => [...prev, i]);
            }, i * staggerDelay);
          }
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(container);

    return () => {
      observer.unobserve(container);
    };
  }, [itemCount, staggerDelay]);

  const getItemAnimationStyle = (index: number): React.CSSProperties => {
    const isVisible = visibleItems.includes(index);
    return {
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
      transition: `opacity 600ms ease-out, transform 600ms ease-out`
    };
  };

  return {
    containerRef,
    visibleItems,
    getItemAnimationStyle
  };
};

export const useParallaxScroll = (speed: number = 0.5) => {
  const [offset, setOffset] = useState(0);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const element = elementRef.current;
      if (!element) return;
      const scrolled = window.pageYOffset;
      const rate = scrolled * -speed;
      
      setOffset(rate);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed]);

  const parallaxStyle: React.CSSProperties = {
    transform: `translateY(${offset}px)`
  };

  return {
    elementRef,
    parallaxStyle
  };
};

export const useHoverAnimation = () => {
  const [isHovered, setIsHovered] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  const hoverStyle: React.CSSProperties = {
    transform: isHovered ? 'scale(1.05) translateY(-4px)' : 'scale(1) translateY(0)',
    transition: 'transform 300ms ease-out'
  };

  return {
    elementRef,
    isHovered,
    handleMouseEnter,
    handleMouseLeave,
    hoverStyle
  };
};
