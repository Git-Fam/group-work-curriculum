import React from "react";
import { Link } from "react-router-dom";
import "./SignUpbtn.css";

const SignUpbtn = () => {
  return (
    <div>
        <Link to="/signup">
            <button className="signupbtn">Signup</button>
        </Link>
    </div>
  );
};

export default SignUpbtn;