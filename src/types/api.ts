// Base API Response Types
export interface ApiResponse<T = unknown> {
  status: string;
  message: string;
  data: T;
  errors?: string[];
}

export interface PaginatedResponse<T = unknown> extends ApiResponse<T[]> {
  meta: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
}

export interface ApiError {
  message: string;
  status?: number;
  code?: string;
  validation?: any;
}

// Contact Types
export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  message: string;
}

export interface ContactResponse {
  success: boolean;
  message: string;
  data?: {
    id: number;
    name: string;
    email: string;
    phone?: string;
    company?: string;
    message: string;
    created_at: string;
    updated_at: string;
  };
}

// Product Types
export interface Product {
  id: number;
  name: string;
  slug?: string;
  description: string;
  price: string;
  supply_price: string;
  currency?: string;
  image_url?: string;
  images?: string[];
  videos?: string[];
  category?: {
    id: number;
    name: string;
    slug: string;
  };
  features?: string[];
  specifications?: {
    dimensions: string;
    weight: string;
    capacity: string;
    power: string;
    connectivity: string;
  };
  benefits?: string[];
  is_popular?: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface ProductFilter {
  category_id?: string | number;
  is_popular?: boolean;
  page?: number;
  per_page?: number;
  search?: string;
}

// Category Types
export interface Category {
  id: number;
  name: string;
  slug: string;
  description?: string;
  image_url?: string;
  created_at: string;
  updated_at: string;
}

export interface CategoryFilter {
  page?: number;
  per_page?: number;
}

// Quote Types
export interface QuoteFormData {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  products: { id: number }[];
  machines?: string;
  budget?: string;
  timeline?: string;
  location?: string;
  message: string;
}

export interface QuoteResponse {
  success: boolean;
  message: string;
  data?: {
    id: number;
    name: string;
    email: string;
    phone?: string;
    company?: string;
    industry?: string;
    machines?: string;
    budget?: string;
    timeline?: string;
    location?: string;
    message: string;
    status: 'pending' | 'contacted' | 'quoted' | 'closed';
    created_at: string;
    updated_at: string;
  };
}

// Appointment Types
export interface AppointmentFormData {
  name: string;
  email: string;
  phone: string;
  company?: string;
  preferred_date: string;
  preferred_time: string;
  message?: string;
}

export interface AppointmentResponse {
  success: boolean;
  message: string;
  data?: {
    id: number;
    name: string;
    email: string;
    phone: string;
    company?: string;
    preferred_date: string;
    preferred_time: string;
    message?: string;
    status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
    created_at: string;
    updated_at: string;
  };
}

// Order Types
export interface OrderDetails {
  id: number;
  order_number: string;
  status: string;
  total: number;
  currency: string;
  items: OrderItem[];
  customer: {
    name: string;
    email: string;
    phone: string;
  };
  created_at: string;
  updated_at: string;
}

export interface OrderItem {
  id: number;
  product_id: number;
  product_name: string;
  quantity: number;
  price: number;
  total: number;
}

export interface OrderFormData {
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  items: {
    product_id: number;
    quantity: number;
  }[];
  notes?: string;
}

// Home Page Types
export interface HomePageData {
  hero: {
    title: string;
    subtitle: string;
    background_image: string;
  };
  features: {
    id: number;
    title: string;
    description: string;
    icon: string;
  }[];
  testimonials: {
    id: number;
    name: string;
    company: string;
    content: string;
    rating: number;
    image?: string;
  }[];
  stats: {
    customers: number;
    machines_sold: number;
    years_experience: number;
    satisfaction_rate: number;
  };
}
