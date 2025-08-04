import React from 'react'
import "./Top.css";
import { useNavigate } from 'react-router-dom';

const Top = () => {

  const navigate = useNavigate();

  const Logbtn = () => {
    navigate("/Signin")
  };
  const Signbtn = () => {
    navigate("/signup")
  };

  return (
    <div className='topWrapper'>
        <div className='topTitle'>Typing Express</div>
        <div className='topButton'>
            <button className='moveLogin' onClick={Logbtn}>Login</button>
            <button className='moveSignup' onClick={Signbtn}>Signup</button>

        </div>
    </div>
  )
}
export default Top