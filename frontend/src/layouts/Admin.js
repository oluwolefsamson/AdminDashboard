import React from "react";
import { Routes, Route, useParams, Navigate } from "react-router-dom";

// components
import AdminNavbar from "components/Navbars/AdminNavbar.js";
import Sidebar from "components/Sidebar/Sidebar.js";
import HeaderStats from "components/Headers/HeaderStats.js";
import FooterAdmin from "components/Footers/FooterAdmin.js";

// views
import Dashboard from "views/admin/Dashboard.js";
import Settings from "views/admin/Settings.js";
import Tables from "views/admin/Tables.js";

export default function Admin() {
  const { userId } = useParams(); // Get userId from the route parameters

  return (
    <>
      <Sidebar />
      <div className="relative md:ml-64 bg-blueGray-100">
        <AdminNavbar />
        {/* Header */}
        <HeaderStats />
        <div className="px-4 md:px-10 mx-auto w-full -m-24">
          <Routes>
            <Route path="dashboard" element={<Dashboard userId={userId} />} />{" "}
            {/* Pass userId to Dashboard */}
            <Route
              path="settings"
              element={<Settings userId={userId} />}
            />{" "}
            {/* Pass userId to Settings */}
            <Route path="tables" element={<Tables userId={userId} />} />{" "}
            {/* Pass userId to Tables */}
            {/* Redirect to dashboard if the route doesn't match */}
            <Route path="*" element={<Navigate to="dashboard" />} />
          </Routes>
          <FooterAdmin />
        </div>
      </div>
    </>
  );
}
