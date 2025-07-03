import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/styles/global.scss';
import '../assets/styles/signup.scss';
import '../assets/styles/button.scss';
import Layout from '../components/Layout';

import { useAuth } from '../assets/contexts/AuthContext';

const Signup = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [successMessage, setSuccessMessage] = useState('');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (password && password.length < 6) {
      setPasswordError('パスワードは6文字以上で入力してください。');
    } else {
      setPasswordError('');
    }
  }, [password]);

  const handleSignup = async (e) => {
    e.preventDefault();
    console.log('フォーム送信');

    if (isSubmitting) return;
    setIsSubmitting(true);
    setError('');
    setEmailError('');
    setPasswordError('');
    setSuccessMessage('');

    if (password.length < 6) {
      setError('パスワードは6文字以上で入力してください。');
      setIsSubmitting(false);
      return;
    }

    // テスト用　//

    try {
      console.log('テスト用ユーザー登録処理開始'); // テスト用の既存ユーザー確認（localStorageに保存されたemailと比較）

      const existingUser = JSON.parse(localStorage.getItem('authUser'));
      if (existingUser && existingUser.email === email) {
        setEmailError('このメールアドレスはすでに使用されています。');
        setIsSubmitting(false);
        return;
      } // ダミーユーザー作成

      const dummyUser = {
        uid: 'test-uid-' + Math.random().toString(36).substring(7),
        email,
        username,
        createdAt: new Date().toISOString(),
      }; // localStorageに保存（ログイン状態を模倣）

      localStorage.setItem('authUser', JSON.stringify(dummyUser));

      // 登録後にログイン処理
      await login(username, password);

      setSuccessMessage('登録が完了しました！ログインページへ移動します。');
      alert('登録が完了しました！ログインページへ移動します。');

      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      console.error('Signup error:', err);
      setError('アカウント作成中にエラーが発生しました。');
    } finally {
      setIsSubmitting(false);
    }
  };

  // テスト用 //

  return (
    <Layout>
      {/* main */}
      <main className="signup__body">
        <div className="signup__card card">
          {/* 入力フォーム */}
          <form className="signup-form form" onSubmit={handleSignup}>
            <h2 className="signup__page-title page-title">Signup</h2>

            {/* ユーザー名入力 */}
            <div className="signup-form__field signup-form__field--name">
              <label
                className="signup-form__label form__label"
                htmlFor="username"
              >
                ユーザー名
              </label>
              <input
                className="signup-form__input form__input"
                type="text"
                id="username"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            {/* メールアドレス入力 */}
            <div className="signup-form__field signup-form__field--email form__field">
              <label className="signup-form__label form__label" htmlFor="email">
                メールアドレス
              </label>
              <input
                className="signup-form__input form__input"
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setEmailError('');
                }}
                required
              />
            </div>
            <div className="signup-form__error-space--email">
              {emailError && <p className="error-message">{emailError}</p>}
            </div>
            <div className="signup-form__field signup-form__field--password form__field">
              <label
                className="signup-form__label form__label"
                htmlFor="password"
              >
                パスワード
              </label>
              <input
                className="signup-form__input form__input form__input--password"
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <div className="signup-form__error-space--password">
                {passwordError && (
                  <p className="error-message">{passwordError}</p>
                )}
              </div>
            </div>
            <button
              className="signup-form__button form__button button-gradient"
              type="submit"
              disabled={isSubmitting || password.length < 6}
            >
              Signup
            </button>

            {error && (
              <p style={{ color: 'red', marginTop: '1rem' }}>{error}</p>
            )}
          </form>
        </div>
      </main>
    </Layout>
  );
};
export default Signup;
