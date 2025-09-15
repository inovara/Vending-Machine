import { User } from '../types';

// Cart Types
export interface CartItem {
  id: number;
  product_id: number;
  product_name: string;
  product_image: string;
  price: number;
  quantity: number;
  total: number;
}

export interface CartState {
  items: CartItem[];
  promoCodeId: string | null;
  promoCode: string | null;
  promoDiscount: number;
  delivery_address: string | null;
  currentStep: number;
  total: number;
  subtotal: number;
  tax: number;
  shipping: number;
}

export interface UserState {
  data: User | null;
  isLoading: boolean;
  error: string | null;
}

// Root State Type
export interface RootState {
  cart: CartState;
  user: UserState;
}

// App Dispatch Type
export type AppDispatch = any; // Will be properly typed when store is configured

// Store Configuration
export interface StoreConfig {
  reducer: any;
  middleware: any[];
  devTools?: boolean;
}

// Persist Configuration
export interface PersistConfig {
  key: string;
  storage: any;
  whitelist?: string[];
  blacklist?: string[];
}

// Action Types
export interface Action<T = any> {
  type: string;
  payload?: T;
}

// Cart Actions
export interface CartActions {
  setCartItems: (items: CartItem[]) => Action<CartItem[]>;
  setCart: (cart: Partial<CartState>) => Action<Partial<CartState>>;
  setPromoCodeId: (id: string | null) => Action<string | null>;
  applyPromo: (promo: { code: string; discount: number }) => Action<{ code: string; discount: number }>;
  setDeliveryAddress: (address: string) => Action<string>;
  updateItemQuantity: (payload: { itemId: number; quantity: number }) => Action<{ itemId: number; quantity: number }>;
  removeItem: (itemId: number) => Action<number>;
  nextStep: () => Action;
  prevStep: () => Action;
  setCurrentStep: (step: number) => Action<number>;
  resetSteps: () => Action;
}

// User Actions
export interface UserActions {
  setUserData: (user: User | null) => Action<User | null>;
}

