// src/redux/slices/authSlice.js

import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    loading: false,
    error: null,
    user: null,
  },
  reducers: {
    registerRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    registerSuccess: (state) => {
      // Do not set user on successful registration
      state.loading = false;
    },
    registerFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    loginRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload; // Set user only on login
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    // Add a logout action to reset user state
    logout: (state) => {
      state.user = null;
    },
  },
});

// Export the action creators
export const {
  registerRequest,
  registerSuccess,
  registerFailure,
  loginRequest,
  loginSuccess,
  loginFailure,
  logout,
} = authSlice.actions;

// Export the reducer
export default authSlice.reducer;
