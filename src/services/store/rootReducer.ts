import { combineReducers } from '@reduxjs/toolkit';
import cartReducer from './slices/cartSlice';
import userReducer from './slices/userSlice';

/**
 * Root reducer combining all feature reducers
 * @returns Combined reducer for the entire application state
 */
const rootReducer = combineReducers({
  cart: cartReducer,
  user: userReducer,
});

export default rootReducer;
