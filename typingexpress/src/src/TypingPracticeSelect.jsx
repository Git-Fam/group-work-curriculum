import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./TypingPracticeSelect.css";
import Header from "./components/Header/Headerlogout";

const TypingPracticeSelect = () => {
  const navigate = useNavigate();

  const handleDefaultClick = () => {
        navigate("/typing", { state: { Default: true } });
    };

  return (
    <div className="select-Page">   
      <Header />
        <div className="select-container">
          <button className="selectbtn selectbtn-text" onClick={handleDefaultClick}>
            Default choice
          </button>
          
          <button className="selectbtn selectbtn-text" onClick={() => navigate("/roulette")}>
            Roulette  choice
          </button>
        </div>
    </div>
  );
};

export default TypingPracticeSelect;