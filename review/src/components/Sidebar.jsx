import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css";
import logoImg from "../images/logo.png";

const Sidebar = ({ openLogoutModal }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleSidebar = () => setIsOpen(prev => !prev);

  return (
    <>
      <div className="mobile-topbar">
        <img src={logoImg} alt="泊まレコ" className="mobile-logo" />
        <button
          className={`hamburger ${isOpen ? "open" : ""}`}
          onClick={toggleSidebar}
          aria-label={isOpen ? "閉じる" : "メニュー"}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      <div className="sidebar-pc">
        <div className="sidebar-header">
          <p className="text-title">あなたの旅を、記録しよう</p>
          <p className="text-small">
            だれかの宿泊体験が、<br />
            次の旅人へつながる―――
          </p>
          <div className="logo-container">
            <img src={logoImg} alt="泊まレコ" className="logo" />
          </div>
        </div>
        <nav>
          <Link to="/">レビュー一覧</Link>
          <Link to="/ranking">ランキング</Link>
          <Link to="/createpost">投稿する</Link>
          <Link to="/mypage">マイページ</Link>
          <button className="logout-btn" onClick={openLogoutModal}>ログアウト</button>
        </nav>
      </div>

      <div className={`sidebar-mobile ${isOpen ? "open" : ""}`}>
        <div className="sidebar-header">
          <p className="text-title">あなたの旅を、記録しよう</p>
          <p className="text-small">
            だれかの宿泊体験が、<br />
            次の旅人へつながる―――
          </p>
          <div className="logo-container">
            <img src={logoImg} alt="泊まレコ" className="logo" />
          </div>
        </div>
        <nav>
          <Link to="/" onClick={() => setIsOpen(false)}>レビュー一覧</Link>
          <Link to="/ranking" onClick={() => setIsOpen(false)}>ランキング</Link>
          <Link to="/createpost" onClick={() => setIsOpen(false)}>投稿する</Link>
          <Link to="/mypage" onClick={() => setIsOpen(false)}>マイページ</Link>
          <button
            className="logout-btn"
            onClick={() => {
              openLogoutModal();
              setIsOpen(false);
            }}
          >
            ログアウト
          </button>
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
