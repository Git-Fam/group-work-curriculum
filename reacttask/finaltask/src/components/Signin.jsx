import React from 'react'
import "./Signin.css";
import { useNavigate } from 'react-router-dom';

const Signin = () => {
  const navigate = useNavigate();

  const logbtn = () => {
    navigate("/mypage")
  };

  const signbtn = () => {
    navigate("/signup")
  };

  return (
    <div className='loginWrapper'>

      <div className='loginBox'>

        <div className='loginTitle'>Login</div>

        <div className='loginInput'>
          <div className='loginUser'>
            <div className='loginName'>ユーザー名</div>
            <input className='loginUserName'
            type='text'
            placeholder='HogePage'/>
          </div>

          <div className='loginPass'>
            <div className='loginPass2'>パスワード</div>
            <input className='loginPass3'
            type='text'
            placeholder='・・・・・・・'/>
          </div>
        </div>

        <button className='loginButton' onClick={ logbtn }>Login</button>

      </div>

    </div>
  )
}

export default Signin