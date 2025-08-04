import React from 'react'
import "./Typingpractice2.css";
import { useEffect } from 'react';
import { getTypData } from '../utils/Typing';

const Typingpractice2 = () => {

  const initialURL = "http://api.quotable.io/random";
  
  useEffect(() => {
    const fetchTypData = async () => {
      let res = await getTypData( initialURL );
      console.log(res);
    };
    fetchTypData();
  },[]);

  return (
    <div className='typingPracticeWrapper'>
        <div className='practiceBox'>
            <div className='practiceTitle'>○○○○○○○○○○○○○○</div>
            <div className='practiceQ'>あかさたなはまやらわ</div>
            <input 
            className='practiceAnswer'
            type='text'>
            </input>
        </div>
    </div>
  )
}

export default Typingpractice2