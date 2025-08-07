import React from "react";
import { Link } from "react-router-dom";
import "./Loginbtn.css";

const Loginbtn = () => {
  return (
    <div>   
        <Link to="/login">
            <button className="loginbtn">Login</button>
        </Link>   
    </div>
  );
};

export default Loginbtn;