import React from 'react'
import "./Signup.css";
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const navigate = useNavigate();

  const signbtn = () => {
    navigate("/mypage")
  };

  return (
    <div className='signWrapper'>

      <div className='signBox'>

        <div className='signTitle'>Signup</div>
        <div className='signUser'>
          <div className='signName'>ユーザー名</div>
          <input className='signUserName'
           type='text'
           placeholder='HogePage'/>
        </div>

        <div className='signMail'>
          <div className='signAdress'>メールアドレス</div>
          <input className='signMailAdress'
           type='email'
           placeholder='example@fam.com'/>
        </div>

        <div className='signPass'>
          <div className='signPass2'>パスワード</div>
          <input className='signPass3'
            type='password'
            placeholder='・・・・・・・'/>
        </div>

        <button className='signButton' onClick={ signbtn }>Signup</button>

      </div>

    </div>
  )
}

export default Signup