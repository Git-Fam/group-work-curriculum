import React from "react";
import "./Header.css";
import Logoutbtn from "./Button/Logoutbtn";

const Headerlogout = () => {
  return (
    <header>
      <div className="header">
        
        <h1 className="headertitle">Typing Express</h1>
        
        <Logoutbtn className='aaa'/>
        
      </div>
    </header>
  );
};

export default Headerlogout;