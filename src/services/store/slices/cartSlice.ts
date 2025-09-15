import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartState, CartItem } from '../types';

const initialState: CartState = {
  items: [],
  promoCodeId: null,
  promoCode: null,
  promoDiscount: 0,
  delivery_address: null,
  currentStep: 0,
  total: 0,
  subtotal: 0,
  tax: 0,
  shipping: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCartItems: (state: CartState, action: PayloadAction<CartItem[]>) => {
      state.items = action.payload;
      // Recalculate totals
      state.subtotal = state.items.reduce((sum: number, item: CartItem) => sum + item.total, 0);
      state.total = state.subtotal + state.tax + state.shipping - state.promoDiscount;
    },
    
    setCart: (state: CartState, action: PayloadAction<Partial<CartState>>) => {
      Object.assign(state, action.payload);
    },
    
    setPromoCodeId: (state: CartState, action: PayloadAction<string | null>) => {
      state.promoCodeId = action.payload;
    },
    
    applyPromo: (state: CartState, action: PayloadAction<{ code: string; discount: number }>) => {
      state.promoCode = action.payload.code;
      state.promoDiscount = action.payload.discount;
      // Recalculate total with discount
      state.total = state.subtotal + state.tax + state.shipping - state.promoDiscount;
    },
    
    setDeliveryAddress: (state: CartState, action: PayloadAction<string>) => {
      state.delivery_address = action.payload;
    },
    
    updateItemQuantity: (state: CartState, action: PayloadAction<{ itemId: number; quantity: number }>) => {
      const { itemId, quantity } = action.payload;
      const item = state.items.find((item: CartItem) => item.id === itemId);
      
      if (item) {
        item.quantity = Math.max(0, quantity); // Ensure quantity is not negative
        item.total = item.price * item.quantity;
        
        // Recalculate totals
        state.subtotal = state.items.reduce((sum: number, item: CartItem) => sum + item.total, 0);
        state.total = state.subtotal + state.tax + state.shipping - state.promoDiscount;
      }
    },
    
    removeItem: (state: CartState, action: PayloadAction<number>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
      
      // Recalculate totals
      state.subtotal = state.items.reduce((sum, item) => sum + item.total, 0);
      state.total = state.subtotal + state.tax + state.shipping - state.promoDiscount;
    },
    
    addItem: (state, action: PayloadAction<CartItem>) => {
      const existingItem = state.items.find((item) => item.id === action.payload.id);
      
      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
        existingItem.total = existingItem.price * existingItem.quantity;
      } else {
        state.items.push(action.payload);
      }
      
      // Recalculate totals
      state.subtotal = state.items.reduce((sum, item) => sum + item.total, 0);
      state.total = state.subtotal + state.tax + state.shipping - state.promoDiscount;
    },
    
    nextStep: (state: CartState) => {
      state.currentStep += 1;
    },
    
    prevStep: (state: CartState) => {
      if (state.currentStep > 0) {
        state.currentStep -= 1;
      }
    },
    
    setCurrentStep: (state, action: PayloadAction<number>) => {
      state.currentStep = action.payload;
    },
    
    resetSteps: (state: CartState) => {
      state.currentStep = 0;
    },
    
    clearCart: (state: CartState) => {
      state.items = [];
      state.promoCodeId = null;
      state.promoCode = null;
      state.promoDiscount = 0;
      state.delivery_address = null;
      state.currentStep = 0;
      state.total = 0;
      state.subtotal = 0;
      state.tax = 0;
      state.shipping = 0;
    },
    
    setTax: (state, action: PayloadAction<number>) => {
      state.tax = action.payload;
      state.total = state.subtotal + state.tax + state.shipping - state.promoDiscount;
    },
    
    setShipping: (state, action: PayloadAction<number>) => {
      state.shipping = action.payload;
      state.total = state.subtotal + state.tax + state.shipping - state.promoDiscount;
    },
  },
});

export const {
  setCartItems,
  setCart,
  setPromoCodeId,
  applyPromo,
  setDeliveryAddress,
  updateItemQuantity,
  removeItem,
  addItem,
  nextStep,
  prevStep,
  setCurrentStep,
  resetSteps,
  clearCart,
  setTax,
  setShipping,
} = cartSlice.actions;

export default cartSlice.reducer;
