import React from 'react';
import { Navigate, useLocation, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function PrivateRoute({}) {
  const { isAuthenticated, loading, currentUser } = useAuth();
  const location = useLocation();
  console.log('isAuthenticated in PrivateRoute:', isAuthenticated);

  if (loading) {
    return <div>Loading...</div>;
  }

  // ユーザーが認証されていない場合、ログインページにリダイレクト
  if (!isAuthenticated) {
    console.log('Redirecting to /login from PrivateRoute');
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  console.log('Rendering children in PrivateRoute');
  return <Outlet />;
}

export default PrivateRoute;
