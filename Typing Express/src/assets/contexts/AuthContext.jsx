//テスト用

import React, { createContext, useContext, useState, useEffect } from 'react';

// AuthContextを作成
const AuthContext = createContext(null);

// AuthProviderコンポーネント: 認証状態とログイン/ログアウト関数を提供
export const AuthProvider = ({ children }) => {
  // テスト用として、最初はnull（未ログイン）
  const [user, setUser] = useState(null); //アプリ起動時にlocalStorageからユーザー情報を読み込む

  useEffect(() => {
    const storedUser = localStorage.getItem('authUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []); //ユーザー情報が変化したらlocalStorageに保存／削除

  useEffect(() => {
    if (user) {
      localStorage.setItem('authUser', JSON.stringify(user));
    } else {
      localStorage.removeItem('authUser');
    }
  }, [user]);

  // ログイン処理をシミュレートする関数

  // この関数が、Login.jsx から呼ばれることになります。
  const login = async (username, password) => {
    // テスト用に簡単な遅延と成功/失敗をシミュレートします。
    console.log(
      `[AuthContext Test] ログイン試行: ユーザー名=${username}, パスワード=${password}`
    );

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // 非同期処理をシミュレートするために少し遅延させる
        if (username === 'testuser' && password === 'password123') {
          // 成功時のダミーユーザーデータ
          const dummyUser = {
            uid: 'test-uid-' + Math.random().toString(36).substring(7), // ユニークなUIDを生成
            email: `${username}@example.com`,
            username: username,
          };
          setUser(dummyUser); // コンテキストのユーザー状態を更新
          console.log('[AuthContext Test] ログイン成功:', dummyUser);
          resolve(dummyUser); // ログインコンポーネントにユーザーデータを返す
        } else {
          // 失敗時のエラー
          console.error('[AuthContext Test] ログイン失敗: 無効な認証情報');
          reject(new Error('ユーザー名またはパスワードが正しくありません。'));
        }
      }, 500); // 0.5秒の遅延
    });
  };

  // ログアウト処理をシミュレートする関数
  const logout = async () => {
    console.log('[AuthContext Test] ログアウト処理');
    return new Promise((resolve) => {
      setTimeout(() => {
        setUser(null); // ユーザー状態をクリア
        console.log('[AuthContext Test] ログアウト成功');
        resolve();
      }, 300); // 少し遅延
    });
  };

  // アプリケーション起動時に認証状態をチェックする
  // 例: ローカルストレージに保存されたトークンをチェックするなど
  useEffect(() => {
    console.log('[AuthContext Test] コンテキスト初期化 - 認証状態チェック');
  }, []);

  // コンテキストプロバイダーが提供する値
  const value = {
    user, // 現在のログインユーザー情報
    login, // ログイン関数
    logout, // ログアウト関数
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// AuthContextを使用するためのカスタムフック
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    // AuthProviderの外でuseAuthが使われた場合にエラーを出す
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
