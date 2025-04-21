import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

function AdminProtected() {
  const role = localStorage.getItem("role");
  const isAdmin = role && role.toUpperCase() === "ADMIN";

  return isAdmin ? <Outlet /> : <Navigate to="/" />;
}

export default AdminProtected;
