import React, { useState} from "react";
import { useNavigate } from "react-router-dom";
import "./MyPage.css";
import "../App.css";
import Header from "./components/Header/Headerlogout";

const MyPage = () => {
  const navigate = useNavigate();

  return (
    <div className="mypage-Page">
      
      <Header />
      <div className="mypage-container">
        <h1 className="registertitle">MyPage</h1>
        <div className="profilesection-m section">
          <h2>ユーザー情報</h2>
          <div className="mypage-container2">
            <div className="profile-section">
              <div className="profile"><p>ユーザー名　　　:</p><div>　　テスト太郎</div></div>
              <div className="profile"><p>メールアドレス　:</p><div>　　hogefuga@hoge.com</div></div>
            </div>
          </div>
        </div>
          
        <div className="scoresection-m section">
          <h2>最高スコア</h2>
            <div className="progress-container">
              <div className="progress-bar"></div>    
            </div>
            <p className="score-value">0%</p>
            <p className="score-date">2025/01/01</p>
            <a href="/score-list" className="link link1 score-link">スコア一覧へ</a>
        </div>

        <div className="roulletsection-m section">
          <h2>ルーレット</h2>
          <div className="roulette-table-container">
            <table className="roulette-table">
              <thead>
                <tr>
                  <th>ルーレットタイトル</th>
                  <th>作成日</th>
                </tr>
              </thead>
              <tbody>
                  <tr>
                    <td>○○○○○○○○○○○</td>
                    <td>2025/01/01</td>
                  </tr>
                  <tr>
                    <td>○○○○○○○</td>
                    <td>2025/01/01</td>
                  </tr>
                  <tr>
                    <td>○○○○○○○○○○○○○○</td>
                    <td>2025/01/01</td>
                  </tr>
              </tbody>
            </table>
            <a href="/roulette-list" className="link link2 roulette-link">ルーレット一覧へ</a>
          </div>
        </div>

        <button className="try-btn green" onClick={() => navigate("/typing-practice-select")}><span>TRY</span></button>
        
      </div>
    
    </div>
  );
};

export default MyPage;