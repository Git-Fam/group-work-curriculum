import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../assets/contexts/AuthContext';
import { signInWithEmailAndPassword } from 'firebase/auth';
// Firestore からデータを検索・取得する関数をインポート
import { collection, query, where, getDocs } from 'firebase/firestore';
import { auth, db } from '../firebase';
import '../assets/styles/global.scss';
import '../assets/styles/login.scss';
import '../assets/styles/button.scss';
import Layout from '../components/Layout';
import { Button } from '../components/Button';

function Login() {
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(''); // エラーメッセージをクリア

    if (!username || !password) {
      setError('ユーザー名とパスワードを入力してください。');
      return;
    }

    try {
      console.log('ユーザー名でFirestore検索開始:', { username });

      // 1. ユーザー名でFirestoreからユーザー情報を検索
      const usersRef = collection(db, 'users');
      const q = query(usersRef, where('username', '==', username));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        // ユーザー名に一致するドキュメントが見つからない場合
        setError('ユーザー名またはパスワードが正しくありません。');
        console.log('ユーザー名が見つかりませんでした:', username);
        return;
      }

      // ユーザー名がユニークであることを前提とする場合、最初のドキュメントを取得
      const userDoc = querySnapshot.docs[0];
      const userData = userDoc.data();
      const userEmail = userData.email; // 2. Firestoreからメールアドレスを取得

      if (!userEmail) {
        setError('ユーザー情報が不完全です。');
        console.error(
          'Firestore ドキュメントにメールアドレスが含まれていません:',
          userDoc.id,
          userData
        );
        return;
      }

      console.log('Firestoreから取得したメールアドレス:', userEmail);
      console.log('Firebase Auth でサインイン試行:', { email: userEmail });

      const userCredential = await signInWithEmailAndPassword(
        auth,
        userEmail,
        password
      );
      const user = userCredential.user;
      console.log('Firebase Auth サインイン成功:', user.uid);
      await login(userEmail, password);
      console.log('ログイン成功、マイページへ移動');
      navigate('/mypage', {
        state: {
          uid: user.uid,
          email: user.email,
          username: userData.username,
        },
      });
    } catch (err) {
      console.error('ログインエラー:', err);
      // Firebase Authentication のエラーコードに基づいてエラーメッセージを表示
      switch (err.code) {
        case 'auth/user-disabled':
        case 'auth/user-not-found':
        case 'auth/wrong-password':
          setError('ユーザー名またはパスワードが正しくありません。');
          break;
        case 'auth/invalid-credential':
          setError('ユーザー名またはパスワードが正しくありません。');
          break;
        case 'auth/invalid-email':
          setError('登録されているメールアドレスが無効です。');
          break;
        default:
          setError('ログイン中に予期せぬエラーが発生しました。');
      }
    }
  };

  return (
    <Layout>
      <main className="login__body body">
        <div className="login__card card">
          {/* 入力フォーム */}
          <form className="login__form form" onSubmit={handleLogin}>
            <h2 className="login__page-title page-title">Login</h2>

            {/* ユーザー名入力フィールド */}
            <div className="login-form__field login-form__field--name form__field">
              <label
                className="login-form__label form__label"
                htmlFor="username"
              >
                ユーザー名
              </label>
              <input
                className="login-form__input form__input"
                type="text"
                placeholder="ユーザー名"
                value={username}
                id="username"
                name="username"
                onChange={(e) => setUsername(e.target.value)} // stateを更新
                required
              />
            </div>

            {/* パスワード入力 */}
            <div className="login-form__field login-form__field--password form__field">
              <label
                className="login-form__label form__label"
                htmlFor="password"
              >
                パスワード
              </label>
              <input
                className="login-form__input form__input form__input--password"
                type="password"
                id="password"
                name="password"
                value={password} // stateの値を反映
                onChange={(e) => setPassword(e.target.value)} // stateを更新
                required
              />
            </div>

            {/* エラーメッセージの表示 */}
            {error && (
              <p style={{ color: 'red', marginTop: '1rem' }}>{error}</p>
            )}

            <button
              className="login-form__button form__button button-gradient"
              type="submit"
            >
              Login
            </button>
          </form>
        </div>
      </main>
    </Layout>
  );
}

export default Login;
