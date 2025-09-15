import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../types';
import { UserState } from '../types';

const initialState: UserState = {
  data: null,
  isLoading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserData: (state: UserState, action: PayloadAction<User | null>) => {
      state.data = action.payload;
      state.error = null;
    },
    
    setLoading: (state: UserState, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    
    setError: (state: UserState, action: PayloadAction<string | null>) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    
    clearUser: (state: UserState) => {
      state.data = null;
      state.isLoading = false;
      state.error = null;
    },
    
    updateUserProfile: (state: UserState, action: PayloadAction<Partial<User>>) => {
      if (state.data) {
        state.data = { ...state.data, ...action.payload };
      }
    },
  },
});

export const {
  setUserData,
  setLoading,
  setError,
  clearUser,
  updateUserProfile,
} = userSlice.actions;

export default userSlice.reducer;
