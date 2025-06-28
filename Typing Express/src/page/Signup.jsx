import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../firebase';
import '../assets/styles/global.scss';
import '../assets/styles/signup.scss';
import '../assets/styles/button.scss';
import Layout from '../components/Layout';
import { Button } from '../components/Button';

const Signup = () => {
  const navigate = useNavigate();

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

    try {
      console.log('ユーザー作成開始');
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log('ユーザー作成成功');

      const user = userCredential.user;
      await updateProfile(user, { displayName: username });
      console.log('プロフィール更新成功');

      await setDoc(doc(db, 'users', user.uid), {
        uid: user.uid,
        username: username,
        email: email,
        createdAt: serverTimestamp(),
      });
      console.log('Firestore に保存完了');

      setSuccessMessage('登録が完了しました！ログインページへ移動します。');

      alert('登録が完了しました！ログインページへ移動します。');

      setTimeout(() => navigate('/login'), 2000); // 2秒後に遷移
    } catch (error) {
      console.error('Signup error:', error);
      console.error('Signup error:', error.message);
      if (error.code === 'auth/email-already-in-use') {
        setEmailError('このメールアドレスはすでに使用されています。');
      } else if (error.code === 'auth/invalid-email') {
        setEmailError('無効なメールアドレスです。');
      } else if (error.code === 'auth/weak-password') {
        setPasswordError('パスワードが弱すぎます。');
      } else {
        setError('アカウント作成中にエラーが発生しました。');
      }
    } finally {
      setIsSubmitting(false);
    }
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
