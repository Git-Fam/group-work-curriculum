import React from 'react';
import { useNavigate } from 'react-router-dom';
import "./css/Logout.css";
import {Link} from "react-router-dom";
import Animation from "./Animation";

const NewUserCreate = () => {

  const navigate = useNavigate();

  const handleSubmit = () => {
    navigate("/mypage");
  };

  return (
    <div className='body'>
      <div className='baseColor'>
        <nav>
          <div className='title'>Typing Express</div>
          <button className='loginButton'>
            <Link to={"/login"}>Login</Link> 
          </button>
        </nav>
        <Animation/>

        <div className='baseBody'>
          <div className='baseBG offUserBG'>
            <h2>Signup</h2>
            <div className='form'>
              <div className='formItem'>
                <label>ユーザー名</label>
                <input type='text' placeholder='HogePage'/>
              </div>
              <div className='formItem'>
                <label>メールアドレス</label>
                <input type="email" placeholder='ex2mple@fam.com'/>
              </div>
              <div className='formItem'>
                <label>パスワード</label>
                <input type="password" placeholder='・・・・・・・' />
              </div>
            </div>
            <button onClick={handleSubmit} className='signinButton formButton mainButtonDesign'>Singup</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NewUserCreate;
