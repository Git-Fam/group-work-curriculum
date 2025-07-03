import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../assets/contexts/AuthContext';

const PublicRouteOnly = () => {
  const { currentUser } = useAuth();

  // ユーザーがログインしている場合、マイページにリダイレクト
  if (currentUser) {
    return <Navigate to="/mypage" replace />;
  }

  // ログインしていない場合、子コンポーネントをレンダリング（ログイン/サインアップ画面など）
  return <Outlet />;
};

export default PublicRouteOnly;
