import React from "react";
import ReactDOM from "react-dom/client"; // updated for React 18
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"; // updated imports for v6
import { Provider } from "react-redux";
import store from "./redux/store";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/styles/tailwind.css";

// layouts and components
import Admin from "layouts/Admin.js";
import Auth from "layouts/Auth.js";
import Login from "./views/Login.js";
import Register from "views/Register.js";

// Initialize React 18 root
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        {/* Redirect the root route to the Login page */}
        <Route path="/" element={<Navigate to="/login" />} />

        {/* Define routes with layouts */}
        <Route path="/user/:userId/*" element={<Admin />} />
        <Route path="/auth/*" element={<Auth />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Redirect any unknown paths to login */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  </Provider>
);
