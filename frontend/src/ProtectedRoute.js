import React, { useContext } from 'react';
import { AuthContext } from './AuthContext';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children }) {
  const { token } = useContext(AuthContext);

  if (!token) {
    // If the user is not authenticated, redirect them to the login page
    return <Navigate to="/login" replace />;
  }

  // If the user is authenticated, render the child components
  return children;
}

export default ProtectedRoute;
