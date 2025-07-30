import React from 'react';
import Navbar from "./Navbar";
import "./TypingPractice.css";

const TypingPravtice = () => {
  return (
    <div className='body'>
      <div className='baseColor'>
        <Navbar />
        <div className='typingBody'>
            <div className='typingArea'>
                <div className='questionNumber'>〇〇〇〇〇〇〇〇〇〇〇〇〇〇</div>
                <button className='startButton'>Typing Start</button>
            </div>
        </div>
      </div>
    </div>
  )
} 

export default TypingPravtice;
