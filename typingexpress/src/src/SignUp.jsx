import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SignUp.css";
import Header from "./components/Header/Headerlogin";

const SignUp = () => {
  const [inputValue1, setInputValue1] = useState("HogePage");
  const [inputValue2, setInputValue2] = useState("example@fam.com");
  const [inputValue3, setInputValue3] = useState("・・・・・・・");
  const [isFocused1, setIsFocused1] = useState(false);
  const [isFocused2, setIsFocused2] = useState(false);
  const [isFocused3, setIsFocused3] = useState(false);

  const handleFocus1 = () => {
    if (!isFocused1) {
      setIsFocused1(true);
      setInputValue1("");
    }
  };

  const handleFocus2 = () => {
    if (!isFocused2) {
      setIsFocused2(true);
      setInputValue2("");
    }
  };

  const handleFocus3 = () => {
    if (!isFocused3) {
      setIsFocused3(true);
      setInputValue3("");
    }
  };

  const handleChange1 = (e) => {
    setInputValue1(e.target.value);
  };

  const handleChange2 = (e) => {
    setInputValue2(e.target.value);
  };

  const handleChange3 = (e) => {
    setInputValue3(e.target.value);
  };
  
  return (
    <div className="register-Page">
   
    <Header />
    <div className="register-Page2">
      <div className="register-container">
      <h1 className="registertitle">Signup</h1>
        <form>
        <div className="container">
          <label className="registerbtnformlabel">ユーザー名</label>
          <input className="register-input" value={inputValue1} onChange={handleChange1} onFocus={handleFocus1} type="text"/>
        </div>
        <div className="container">
          <label className="registerbtnformlabel">メールアドレス</label>
          <input className="register-input" value={inputValue2} onChange={handleChange2} onFocus={handleFocus2} type="email"/>
        </div>

        <div className="container">
          <label className="registerbtnformlabel">パスワード</label>
          <input className="register-input" value={inputValue3} onChange={handleChange3} onFocus={handleFocus3} type="password"/>
        </div>
          <button type="submit" className="registerPagebtn green">Signup</button>

        </form>
      </div>
      </div>
    </div>
  );
};

export default SignUp;