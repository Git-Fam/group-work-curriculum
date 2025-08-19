import React from 'react';
import Navbar from "./Navbar";
import "./css/TypingStart.css";
import { useNavigate } from 'react-router-dom';

const TypingStart = () => {

  const navigate = useNavigate();
  const typingPracticeStart = () =>{
    navigate("/typing")
  }

  return (
    <div className='body'>
      <div className='baseColor'>
        <Navbar />
        <div className='typingStartBody'>
            <div className='typingArea'>
                <div className='questionNumber'>〇〇〇〇〇〇〇〇〇〇〇〇〇〇</div>
                <button className='typingStart' onClick={typingPracticeStart}>Typing Start</button>
            </div>
        </div>
      </div>
    </div>
  )
} 

export default TypingStart;
