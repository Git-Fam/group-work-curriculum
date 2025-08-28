import React from "react";
import { Link } from "react-router-dom";
import "./TopPage.css";
import Loginbtn from "./components/Header/Button/Loginbtn";
import Registerbtn from "./components/Header/Button/SignUpbtn";


const TopPage = () => {
  return (
    <div className="top-Page">
      
      <div className="top-container">
        <h1 className="title registertitle">Typing <br className="space"></br>Express</h1>
        <div className="btn-container">
          <div className="a a1"><Loginbtn/></div>
          <div className="a a2"><Registerbtn/></div>
        </div>
      </div>
    </div>
  );
};

export default TopPage;