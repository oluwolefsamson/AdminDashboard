// src/store/index.js
import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import authReducer from "../redux/auth/authSlice";
import dashboardReducer from "../redux/dashboard/dashboardSlice";
import rootSaga from "../redux/rootSaga";

// Initialize saga middleware
const sagaMiddleware = createSagaMiddleware();

// Configure the store with reducers and middleware
const store = configureStore({
  reducer: {
    auth: authReducer,
    dashboard: dashboardReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
  devTools: process.env.NODE_ENV !== "production", // Enable Redux DevTools
});

// Run the root saga
sagaMiddleware.run(rootSaga);

export default store;
