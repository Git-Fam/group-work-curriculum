import React from 'react';
import {Link} from "react-router-dom";
import Navbar from "./Navbar";
import "./css/RouletteChoise.css";
import { useNavigate } from 'react-router-dom';

const RouletteChoise = () => {

  const navigate = useNavigate();
  let buttonIvent = 1;

  const buttonIventNumber = () =>{
    
    const buttonChoiseText = document.getElementById('rouletteStartButton')
    buttonIvent ++;
    if (buttonIvent === 1) {
      buttonChoiseText.innerHTML = 'Start';
    }else if (buttonIvent === 2) {
      buttonChoiseText.innerHTML = 'Stop';
    }else if (buttonIvent === 3) {
      buttonChoiseText.innerHTML = 'select';
      
    }else if (buttonIvent === 4){
      navigate("/typingstart")
    }    
  } 


  return (
    <div className='body'>
      <div className='baseColor'>
        <Navbar />
        <div className='baseBody'>
            <div className='choiseButton'>
                <div className='selectTitle'>
                    <div className='choise'>&#9654;</div>
                    <button className='titleChoise'>
                        <div>タイトルタイトルタイトル</div>
                    </button>
                    <div className='choise'>&#9664;</div>
                </div>
                <button onClick={buttonIventNumber} id='rouletteStartButton' className='mainFont'>
                  Start
                </button>
            </div>
        </div>
      </div>
    </div>        
  )
}


export default RouletteChoise;
