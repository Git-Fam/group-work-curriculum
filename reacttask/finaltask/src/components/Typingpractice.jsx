import React from 'react'
import "./Typingpractice.css";
import { useNavigate } from 'react-router-dom';

const Typingpractice = () => {

  const navigate = useNavigate();

  const startTyping = () => {
    navigate("/Typingpractice2")
  };

  return (
    <div className='typingPracticeWrapper'>
        <div className='practiceBox'>
            <div className='practiceTitle'>○○○○○○○○○○○○○○</div>
            <button className='startTyping' onClick={startTyping}>Typing Start</button>
        </div>
    </div>
  )
}

export default Typingpractice