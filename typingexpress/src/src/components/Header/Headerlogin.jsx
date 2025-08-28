import React from "react";
import "./Header.css";
import Loginbtn from "./Button/Loginbtn";

const Headerlogin = () => {
  return (
    <header>
      <div className="header">
        
        <h1 className="headertitle headertitle2">Typing Express</h1>
        
        <Loginbtn />
       
      </div>
    </header>
  );
};

export default Headerlogin;