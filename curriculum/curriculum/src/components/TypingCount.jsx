import React from 'react';
import Navbar from "./Navbar";
import "./css/TypingCount.css";
import {useState} from "react";
import { useNavigate } from 'react-router-dom';
import Animation from "./Animation";

const Typing = () => {

   const navigate = useNavigate();

    const [countdown, setCountdown] = useState(3);


    const timer = setInterval(() => {

      if (countdown > 1) {
        setCountdown(countdown - 1)
      } else {
        setCountdown(navigate("/typingquest"));
        clearInterval(timer);
      }
    }, 1000);

  return (
    <div className='body'>
      <div className='baseColor'>
        <Navbar />
        <Animation/>
        <div className='baseBody typingCount'>
          <div className='typingArea'>
            <div className='questionNumber'>〇〇〇〇〇〇〇〇〇〇〇〇〇〇</div>
            <div className='mainFont countdown'>{countdown}</div>
          </div>
        </div>
      </div>
    </div>    
  )
}

export default Typing


