import React from "react";
import { Link } from "react-router-dom";
import "./Logoutbtn.css";

const Logoutbtn = () => {
  return (
    <div>   
        <Link to="/">
            <button className="logoutbtn">Logout</button>
        </Link>   
    </div>
  );
};

export default Logoutbtn;