import React from 'react'
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Login = ({ setIsAuth }) => {
const navigate = useNavigate();
const loginGoogle = () => {
    signInWithPopup(auth,provider).then((result) => {
    localStorage.setItem("isAuth",true);
    setIsAuth(true);
    navigate("/");
    });
};

  return (
    <div className='iog-btn'>
        <p>ログイン</p>
        <button onClick={loginGoogle}>Googleでログイン</button>
    </div>
  );
};

export default Login