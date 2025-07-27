import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';
import logoImg from '../images/logo.png';

const Sidebar = () => {
  return (
    <div className="sidebar">
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
        <Link to="/logout">ログアウト</Link>
      </nav>

    </div>
  );
};

export default Sidebar;