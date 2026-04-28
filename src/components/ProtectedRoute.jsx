import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import useAuthStore from '../store/authStore';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, token, role } = useAuthStore();
  const location = useLocation();

  if (!token) {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  if (allowedRoles && !allowedRoles.includes(role)) {
    // Redirect based on their actual role if they try to access a route they aren't allowed in
    if (role === 'authority') return <Navigate to="/authority/dashboard" replace />;
    return <Navigate to="/map" replace />;
  }

  return children;
};

export default ProtectedRoute;
