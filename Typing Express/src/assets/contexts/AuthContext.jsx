import React, { createContext, useState, useContext, useEffect } from 'react';
import { auth } from '../../firebase';
import { useNavigate } from 'react-router-dom';
import { app } from '../../firebase';
import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const authInstance = getAuth(app);

  const login = async (email, password) => {
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(
        authInstance,
        email,
        password
      );
      setCurrentUser(userCredential.user);
      setIsAuthenticated(true);
      setLoading(false);
      return Promise.resolve();
    } catch (error) {
      setIsAuthenticated(false);
      setLoading(false);
      return Promise.reject(error);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await signOut(authInstance);
      setCurrentUser(null);
      setIsAuthenticated(false);
      setLoading(false);
      navigate('/login');
    } catch (error) {
      console.error('ログアウトエラー:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(authInstance, (user) => {
      setCurrentUser(user);
      setIsAuthenticated(!!user); // user が存在すれば true, なければ false
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, login, logout, loading, currentUser }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error(
      'useAuth は AuthProvider の内部で使用される必要があります。'
    );
  }
  return context;
};
