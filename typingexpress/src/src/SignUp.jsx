import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SignUp.css";
import Header from "./components/Header/Headerlogin";
import Textanimation from"./components/Textanimation";

const SignUp = () => {
  return (
    <div className="register-Page">
    <Textanimation />
    <Header />
    <div className="register-Page2">
      <div className="register-container">
      <h1 className="registertitle">Signup</h1>
        <form>
        <div className="container">
          <label className="registerbtnformlabel">ユーザー名</label>
          <input className="register-input"  value="HogePage" type="text"/>
        </div>
        <div className="container">
          <label className="registerbtnformlabel">メールアドレス</label>
          <input className="register-input" value="example@fam.com" type="email"/>
        </div>

        <div className="container">
          <label className="registerbtnformlabel">パスワード</label>
          <input className="register-input" value="・・・・・・・" type="password"/>
        </div>
          <button type="submit" className="registerPagebtn">Signup</button>

        </form>
      </div>
      </div>
    </div>
  );
};

export default SignUp;