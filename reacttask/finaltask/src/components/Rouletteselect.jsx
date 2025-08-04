import React from 'react'
import "./Rouletteselect.css";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Rouletteselect = () => {

    const navigate = useNavigate();

    const ButtonC = () => {
        navigate("/Typingpractice");
    };

    const [step, setStep] = useState(0); // 0: A, 1: B, 2: C

    const handleClick = () => {
        setStep(prev => prev + 1);
    };

  return (
    <div className='rouletteSelectWrapper'>
        <div className='selectBox'>
            <div className='rouletteBox'>
                <div className='leftSide'></div>
                <div className='centerBox'>タイトルタイトルタイトル</div>
                <div className='rightSide'></div>
            </div>
            {step === 0 && <button className='changeButton' onClick={handleClick}>Start</button>}
            {step === 1 && <button className='changeButton' onClick={handleClick}>Stop</button>}
            {step === 2 && <button className='changeButton' onClick={ButtonC}>Select</button>}        
        </div>
    </div>
  )
}

export default Rouletteselect