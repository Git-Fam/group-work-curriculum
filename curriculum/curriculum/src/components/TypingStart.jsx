import React from 'react';
import Navbar from "./Navbar";
import "./css/TypingStart.css";
import { useNavigate } from 'react-router-dom';
import Animation from "./Animation";


const TypingStart = () => {

  const navigate = useNavigate();
  const typingPracticeStart = () =>{
    navigate("/typingcount")
  }

  return (
    <div className='body'>
      <div className='baseColor typingStart'>
        <Navbar />
        <Animation/>
        <div className='baseBody'>
            <div className='typingArea'>
                <div className='questionNumber'>〇〇〇〇〇〇〇〇〇〇〇〇〇〇</div>
                <button className='typingStartButton' onClick={typingPracticeStart}>Typing Start</button>
            </div>
        </div>
      </div>
    </div>
  )
} 

export default TypingStart;
