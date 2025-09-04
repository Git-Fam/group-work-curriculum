import React from "react";
import "./Header.css";
import Loginbtn from "./Button/Loginbtn";

const Headerlogin = () => {
  return (
    <header>
      <h1 className="headertitle">Typing Express</h1>
      <Loginbtn />
    </header>
  );
};

export default Headerlogin;