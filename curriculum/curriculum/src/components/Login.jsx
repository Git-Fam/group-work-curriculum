import {useState} from "react";
import {Link, useNavigate } from 'react-router-dom';
import "./css/Logout.css";
import Animation from "./Animation";


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
          <button className='siginButton'>
            <Link to={"/newusercreate"}>Singup</Link>
          </button>
        </nav>
        <Animation/>

        <div className='baseBody'>
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
            <button onClick={loginGoogle} className='formButton mainButtonDesign'>Login</button>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Login;
