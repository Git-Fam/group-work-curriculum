import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from './Button';
import { useAuth } from '../assets/contexts/AuthContext';
import '../assets/styles/global.scss';

const AuthHeader = () => {
  const navigate = useNavigate();
  const location = useLocation(); // 現在のURL情報を取得
  const { currentUser, logout } = useAuth(); // currentUserとlogout関数を取得

  let buttonText = '';
  let handleClick = () => {};

  //現在のパス、ログイン中かの確認
  const IsLoginPage = location.pathname === '/login';
  const isSignupPage = location.pathname === '/signup';
  const isLoggedIn = !!currentUser;

  let buttonClasses = 'button-page-jump';
  let appNameClasses = 'app-name header-app-name';
  let headerClasses = 'header';

  if (isLoggedIn) {
    // ユーザーがログインしている場合
    buttonText = 'Logout';
    handleClick = async () => {
      try {
        await logout();
        navigate('/login'); // ログアウト後、ログインページへ遷移
      } catch (error) {
        console.error('ログアウト中にエラーが発生しました:', error);
        // エラー表示などの処理を追加することも可能
      }
    };
    buttonClasses += ' button-logout';
  } else if (IsLoginPage) {
    // ログイン画面
    buttonText = 'Signup';
    handleClick = () => navigate('/signup');
    buttonClasses += ' button-signup login__button-signup';
  } else if (isSignupPage) {
    //サインアップ画面
    buttonText = 'Login';
    handleClick = () => navigate('/login');
    appNameClasses += ' signup__app-title';
    buttonClasses += ' button-login signup__button-login';
    headerClasses += ' signup__header';
  }

  return (
    <header className={headerClasses}>
      <h1 className={appNameClasses}>Typing Express</h1>
      {buttonText && (
        <Button className={buttonClasses} onClick={handleClick}>
          {buttonText}
        </Button>
      )}
    </header>
  );
};

export default AuthHeader;
export { AuthHeader };
