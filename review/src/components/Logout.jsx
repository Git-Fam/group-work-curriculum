import React from 'react';
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import './Logout.css';

const Logout = ({ setIsAuth, onClose }) => {

  const handleLogout = () => {
    signOut(auth).then(() => {
      localStorage.clear();
      setIsAuth(false);
      onClose();
    });
  };

  const handleOverlayClick = (e) => {
    if (e.target.classList.contains("modal-overlay")) {
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-content">
        <h2>ログアウトしますか？</h2>
        <div className="modal-button">
          <button onClick={handleLogout}>ログアウト</button>
        </div>
      </div>
    </div>
  );
};

export default Logout;
