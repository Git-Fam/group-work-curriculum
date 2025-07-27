import {useEffect} from 'react';
import {signInWithPopup} from 'firebase/auth';
import {auth, provider} from "../firebase";
import {useState} from "react";
import {Link, useNavigate } from 'react-router-dom';
import "./Logout.css";


const Login = () => {

  const [loginName, setLoginName] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const navigate = useNavigate();

    const loginGoogle = () => {
        navigate("/mypage");
    };


  return (
    <div className='body'>
      <div className='baseColor'>
        <nav>
          <div className='title'>Typing Express</div>
          <button className='navButton siginButton'>
            <Link to={"/newusercreate"}>Singup</Link>
          </button>
        </nav>

        <div className='loginBody'>
          <div className='baseBG offUserBG'>
            <h2>Login</h2>
            <div className='form'>
              <div className='formItem'>
                <label>ユーザー名</label>
                <input type='text' placeholder='HogePage' value={loginName} onChange={(e) => setLoginName(e.target.value)} />
              </div>
              <div className='formItem'>
                <label>パスワード</label>
                <input type="password" placeholder='・・・・・・・' value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} />
              </div>
            </div>
            <button onClick={loginGoogle} className='formButton '>Login</button>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Login;