import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SignUp.css";
import Header from "./components/Header/Headersignup";
import Textanimation from"./components/Textanimation";

const Login = () => {
  return (
    <div className="register-Page">
      <Textanimation />
      <Header />
      <div className="register-Page2">
      <div className="register-container">
        <h1 className="registertitle">Login</h1>
        <form>
          <div className="container">
            <label className="registerbtnformlabel">ユーザー名</label>
            <input className="register-input" value="HogePage" type="text"/>
          </div>
          <div className="container">
            <label className="registerbtnformlabel">パスワード</label>
            <input className="register-input" value="・・・・・・・" type="password"/>
          </div>

          <button className="registerPagebtn">Login</button>

        </form>
      </div>
      </div>
    </div>
  );
};

export default Login;