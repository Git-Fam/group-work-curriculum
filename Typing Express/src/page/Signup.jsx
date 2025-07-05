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
    setError('');
    setEmailError('');
    setPasswordError('');
    setSuccessMessage('');

    //未入力のバリデーション
    if (!username.trim()) {
      setError('ユーザー名を入力してください。');
      return;
    }
    if (!email.trim()) {
      setEmailError('メールアドレスを入力してください。');
      return;
    }
    if (!password.trim()) {
      setPasswordError('パスワードを入力してください。');
      return;
    }
    if (password.length < 6) {
      setPasswordError('パスワードは6文字以上で入力してください。');
      return;
    }

    setIsSubmitting(true);

    alert('サインアップ処理を実行（ダミー）');
    // ダミーのサインアップ処理
    navigate('/login');
  };


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
