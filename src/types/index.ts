// Core Types
export interface Product {
  id: number;
  title: string;
  titleKey: string;
  icon: React.ComponentType<any>;
  gradient: string;
  features: string[];
  featureKeys: string[];
  description: string;
  descriptionKey: string;
  price: string;
  priceKey: string;
  image: string;
  category: 'smart' | 'premium' | 'enterprise' | 'custom';
  specifications?: ProductSpecification[];
  benefits?: string[];
  benefitsKeys?: string[];
}

export interface ProductSpecification {
  name: string;
  value: string;
  unit?: string;
}

export interface Industry {
  id: number;
  name: string;
  nameKey: string;
  description: string;
  descriptionKey: string;
  icon: React.ComponentType<any>;
  gradient: string;
  features: string[];
  featureKeys: string[];
  caseStudies?: number[];
}


export interface Feature {
  id: number;
  title: string;
  titleKey: string;
  description: string;
  descriptionKey: string;
  icon: React.ComponentType<any>;
  gradient: string;
  benefits: string[];
  benefitsKeys: string[];
}

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  industry: string;
  machines: string;
  message: string;
  budget?: string;
  timeline?: string;
  location?: string;
}

export interface QuoteRequest extends ContactFormData {
  id: string;
  timestamp: Date;
  status: 'pending' | 'contacted' | 'quoted' | 'closed';
  assignedTo?: string;
  notes?: string;
}

// Component Props
export interface SectionProps {
  className?: string;
  children?: React.ReactNode;
}

export interface ProductCardProps {
  product: Product;
  isActive: boolean;
  onClick: () => void;
  onQuoteClick: () => void;
}

export interface IndustryCardProps {
  industry: Industry;
  onQuoteClick: () => void;
}


// Animation Types
export interface AnimationConfig {
  duration: number;
  delay?: number;
  easing?: string;
  direction?: 'normal' | 'reverse' | 'alternate' | 'alternate-reverse';
  fillMode?: 'none' | 'forwards' | 'backwards' | 'both';
}

export interface ScrollAnimationConfig extends AnimationConfig {
  threshold: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

// Theme Types
export interface ThemeColors {
  primary: string;
  secondary: string;
  accent: string;
  neutral: string;
  sage: string;
  blush: string;
  success: string;
  warning: string;
  error: string;
  info: string;
}

export interface ThemeSpacing {
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  '2xl': string;
  '3xl': string;
}

export interface ThemeTypography {
  fontFamily: {
    primary: string;
    secondary: string;
    mono: string;
  };
  fontSize: {
    xs: string;
    sm: string;
    base: string;
    lg: string;
    xl: string;
    '2xl': string;
    '3xl': string;
    '4xl': string;
    '5xl': string;
    '6xl': string;
  };
  fontWeight: {
    light: number;
    normal: number;
    medium: number;
    semibold: number;
    bold: number;
    extrabold: number;
    black: number;
  };
  lineHeight: {
    tight: string;
    snug: string;
    normal: string;
    relaxed: string;
    loose: string;
  };
}

// API Types
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  errors?: string[];
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Form Types
export interface FormField {
  name: string;
  label: string;
  labelKey: string;
  type: 'text' | 'email' | 'tel' | 'select' | 'textarea' | 'number';
  required: boolean;
  placeholder?: string;
  placeholderKey?: string;
  options?: { value: string; label: string; labelKey: string }[];
  validation?: {
    min?: number;
    max?: number;
    pattern?: string;
    message?: string;
    messageKey?: string;
  };
}

// Language Types
export type Language = 'en' | 'ar';

export interface LanguageConfig {
  code: Language;
  name: string;
  nativeName: string;
  rtl: boolean;
  dateFormat: string;
  currency: string;
}

// Business Types
export interface BusinessMetrics {
  revenue: number;
  costSavings: number;
  efficiency: number;
  customerSatisfaction: number;
  uptime: number;
  roi: number;
}

export interface PricingTier {
  name: string;
  nameKey: string;
  price: number;
  currency: string;
  period: 'month' | 'year' | 'one-time';
  features: string[];
  featuresKeys: string[];
  popular?: boolean;
  cta: string;
  ctaKey: string;
}

// Utility Types
export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
export type Required<T, K extends keyof T> = T & { [P in K]-?: T[P] };
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};