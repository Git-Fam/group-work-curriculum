import React from "react";
import "./Header.css";
import SignUpbtn from "./Button/SignUpbtn";

const Headersignup = () => {
  return (
    <header>
      <h1 className="headertitle">Typing Express</h1>
      <SignUpbtn/>
    </header>
  );
};

export default Headersignup;