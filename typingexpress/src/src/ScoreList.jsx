import React, { useState } from "react";
import "./ScoreList.css";
import Header from "./components/Header/Headerlogout";

const ScoreList = () => {
  
  return (
    <div className="scorelist-Page">
      <Header />
      
        <div className="scorelist-container">
          <h1 className="registertitle">Score</h1>

          <div className="scorelist-container2">
            
            <h2>スコア</h2>
            <div className="scorelist-scorecontainer">
              <div className="progress-container">
                <div className="progress-bar"></div>    
              </div>
              <p className="score-value">80%</p>
                
              <p className="score-date">2025/01/01</p>
            </div>

            <div className="scorelist-scorecontainer">
              <div className="progress-container">
                <div className="progress-bar"></div>    
              </div>
              <p className="score-value">80%</p>
                
              <p className="score-date">2025/01/01</p>
            </div>
            <div className="scorelist-scorecontainer">
              <div className="progress-container">
                <div className="progress-bar"></div>    
              </div>
              <p className="score-value">80%</p>
                
              <p className="score-date">2025/01/01</p>
            </div>
            <div className="scorelist-scorecontainer">
              <div className="progress-container">
                <div className="progress-bar"></div>    
              </div>
              <p className="score-value">80%</p>
                
              <p className="score-date">2025/01/01</p>
            </div>
            <div className="scorelist-scorecontainer">
              <div className="progress-container">
                <div className="progress-bar"></div>    
              </div>
              <p className="score-value">80%</p>
                
              <p className="score-date">2025/01/01</p>
            </div>
            <div className="scorelist-scorecontainer">
              <div className="progress-container">
                <div className="progress-bar"></div>    
              </div>
              <p className="score-value">80%</p>
                
              <p className="score-date">2025/01/01</p>
            </div>
          </div>

          <div className="scorelist-container2">
            <h2>正解率</h2>
          
            <div className="progress-container">
              <div className="correct-bar"></div>    
            </div>
            <p className="score-value">80%</p>
            
          </div>

          <div className="scorelist-container2">
            <h2>不正解率</h2>
          
            <div className="progress-container">
              <div className="incorrect-bar"></div>    
            </div>
            <p className="score-value">20%</p>
            
          </div>
    
        </div>
    </div>
  )
};

export default ScoreList;