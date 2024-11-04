// src/redux/slices/authSlice.js

import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    loading: false,
    error: null,
    user: null,
    users: [], // Add users array to store all users
  },
  reducers: {
    registerRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    registerSuccess: (state) => {
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
      state.user = action.payload;
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.loading = false;
      state.error = null;
      // Optionally, clear users or other state
      state.users = [];
    },
    getAllUsersRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    getAllUsersSuccess: (state, action) => {
      state.loading = false;
      state.users = action.payload;
    },
    getAllUsersFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

// Selector to get the total number of users
export const selectTotalUsers = (state) => state.auth.users.length;

// Export the action creators
export const {
  registerRequest,
  registerSuccess,
  registerFailure,
  loginRequest,
  loginSuccess,
  loginFailure,
  logout,
  getAllUsersRequest,
  getAllUsersSuccess,
  getAllUsersFailure,
} = authSlice.actions;

// Export the reducer
export default authSlice.reducer;
