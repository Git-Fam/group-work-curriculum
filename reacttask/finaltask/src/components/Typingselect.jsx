import React from 'react'
import "./Typingselect.css";
import { useNavigate } from 'react-router-dom';

const Typingselect = () => {
    const navigate = useNavigate();

    const selectRouletteB = () => {
        navigate("/Rouletteselect")
    };

  return (
    <div className='typingSelectWrapper'>
        <div className='selectButton'>
            <button className='selectDefault'>Default choice</button>
            <button className='selectRoulette' onClick={selectRouletteB}>Roulette choice</button>
        </div>
    </div>
  )
}

export default Typingselect