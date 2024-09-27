// src/features/auth/authSlice.ts

import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface AuthState {
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logIn: state => {
      state.isAuthenticated = true;
    },
    logOut: state => {
      state.isAuthenticated = false;
    },
    setAuthentication: (state, action: PayloadAction<boolean>) => {
      state.isAuthenticated = action.payload;
    },
  },
});

// Export actions for dispatching
export const {logIn, logOut, setAuthentication} = authSlice.actions;

// Export the reducer for configuring the store
export default authSlice.reducer;
