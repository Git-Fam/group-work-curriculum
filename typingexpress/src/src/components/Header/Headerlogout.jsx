import React from "react";
import "./Header.css";
import Logoutbtn from "./Button/Logoutbtn";

const Headerlogout = () => {
  return (
    <header>
      <h1 className="headertitle">Typing Express</h1>
      <Logoutbtn/>
    </header>
  );
};

export default Headerlogout;