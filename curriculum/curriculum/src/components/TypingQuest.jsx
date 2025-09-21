import React from 'react';
import Navbar from "./Navbar";
import "./css/TypingQuest.css";
import { useNavigate } from 'react-router-dom';
import {useEffect} from 'react';


const PyingQuest = () => {

  const navigate = useNavigate();

  useEffect(() => {
    const typingInputText = document.getElementById("typingInput");
    typingInputText.focus();
    typingInputText.addEventListener("keyup", (event) => {
      if(event.key === "Enter"){
        navigate("/results");
      }
    })
  })

  
  return (
    <div className='body'>
      <div className='baseColor'>
        <Navbar />
        <div className='baseBody typingQuest'>
            <div className='typingArea'>
                <div className='questionNumber'>〇〇〇〇〇〇〇〇〇〇〇〇〇〇</div>
                <div className='questText'>あかさたなはまやらわ</div>
                <input id='typingInput' type='text'></input>
            </div>          
        </div>
      </div>
    </div>
  )
}

export default PyingQuest;