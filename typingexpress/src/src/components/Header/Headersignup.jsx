import React from "react";
import "./Header.css";
import SignUpbtn from "./Button/SignUpbtn";

const Headersignup = () => {
  return (
    <header>
      <div className="header">
        
        <h1 className="headertitle headertitle1 ">Typing Express</h1>
      
        <SignUpbtn/>
       
      </div>
    </header>
  );
};

export default Headersignup;