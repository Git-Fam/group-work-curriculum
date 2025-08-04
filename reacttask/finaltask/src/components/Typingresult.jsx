import React from 'react';
import "./Typingresult.css";
import { useNavigate } from 'react-router-dom';

const Typingresult = () => {

    const navigate = useNavigate();

    const endButton = () => {
        navigate("/Mypage")
    };

  return (
    <div className='typingPracticeWrapper'>
        <div className='practiceBox'>
            <div className='practiceTitle'>○○○○○○○○○○○○○○</div>
            <div className='resultTitle'>ーscoreー</div>
            <div className='prevScore'>80%</div>
            <button className='practiceEnd' onClick={endButton}>END</button>
        </div>
    </div>
  )
}

export default Typingresult