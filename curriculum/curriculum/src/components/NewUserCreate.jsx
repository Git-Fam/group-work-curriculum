import React from 'react';
import {useState} from "react";
import { createUserWithEmailAndPassword } from 'firebase/auth';
import {auth} from "../firebase";
import { useNavigate } from 'react-router-dom';
import "./Logout.css";
import {Link} from "react-router-dom";

const NewUserCreate = () => {

  const [inputName, setInputName] = useState("");
  const [inputEmail, setInputEmail] = useState("");
  const [inputPassword, setInputPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try{
      await createUserWithEmailAndPassword(
        auth,
        inputEmail,
        inputPassword
      );
      navigate("/mypage")
    }
      catch(error){
      alert("正しく入力してください");
    }
  };

  return (
    <div className='body'>
      <div className='baseColor'>
        <nav>
          <div className='title'>Typing Express</div>
          <button className='navButton loginButton'>
            <Link to={"/login"}>Login</Link> 
          </button>
        </nav>

        <div className='siginBody'>
          <div className='baseBG offUserBG'>
            <h2>Signup</h2>
            <div className='form'>
              <div className='formItem'>
                <label>ユーザー名</label>
                <input type='text' placeholder='HogePage' value={inputName} onChange={(e) => setInputName(e.target.value)} />
              </div>
              <div className='formItem'>
                <label>メールアドレス</label>
                <input type="email" placeholder='ex2mple@fam.com' value={inputEmail} onChange={(e) => setInputEmail(e.target.value)} />
              </div>
              <div className='formItem'>
                <label>パスワード</label>
                <input type="password" placeholder='・・・・・・・' value={inputPassword} onChange={(e) => setInputPassword(e.target.value)} />
              </div>
            </div>
            <button onClick={handleSubmit} className='signinButton formButton'>Singup</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NewUserCreate;
