import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/styles/global.scss';
import '../assets/styles/login.scss';
import '../assets/styles/button.scss';
import Layout from '../components/Layout';



function Login() {
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(''); // エラーメッセージをクリア

    if (!username || !password) {
      setError('ユーザー名とパスワードを入力してください。');
      return;
    }

    // ログイン処理を実行、ユーザーデータは存在しないためダミーを渡す
      console.log('マイページへ移動');
      navigate('/mypage'); // ログイン成功後、マイページへ遷移
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
