import React from 'react';
import Navbar from "./Navbar";
import "./css/Typing.css";
import {useState} from "react";

const Typing = () => {

    const countdownElement = document.getElementById('count');
    const [countdown, setCountdown] = useState(3);


    const timer = setInterval(() => {

      if (countdown > 1) {
        setCountdown(countdown - 1)
      } else {
        setCountdown('完了');
        clearInterval(timer);
      }
    }, 1000);


  return (
    <div className='body'>
      <div className='baseColor'>
        <Navbar />
        <div className='baseBody'>
            <div className='mainFont'>{countdown}</div>
        </div>
      </div>
    </div>    
  )
}

export default Typing


