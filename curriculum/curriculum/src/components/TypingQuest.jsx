import React from 'react';
import Navbar from "./Navbar";
import "./css/TypingQuest.css";
import { useNavigate } from 'react-router-dom';
import {useState, useEffect} from 'react';
import Animation from "./Animation";


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


  const [data, setData] = useState(undefined);

  useEffect(() => {
    fetch("http://api.quotable.io/random")
    .then((res) => res.json())
    .then((json) => setData(json))
    .catch(() => alert("error"));
  }, []);

console.log(data);
  
  
  return (
    <div className='body'>
      <div className='baseColor'>
        <Navbar />
        <Animation/>
        <div className='baseBody typingQuest'>
            <div className='typingArea'>
                <div className='questionNumber'>〇〇〇〇〇〇〇〇〇〇〇〇〇〇</div>
                {data === undefined ? "" : <div className='questText'>{data[0].content}</div>}
                <input id='typingInput' type='text'></input>
            </div>          
        </div>
      </div>
    </div>
  )
}

export default PyingQuest;