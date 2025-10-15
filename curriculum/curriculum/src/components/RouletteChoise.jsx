import React from 'react';
import Navbar from "./Navbar";
import "./css/RouletteChoise.css";
import { useNavigate } from 'react-router-dom';
import Animation from "./Animation";
import { useState, useEffect } from "react";


const RouletteChoise = () => {

  const navigate = useNavigate();
  let buttonIvent = 1;

  const [index, setIndex] = useState(0);

  const rouletteContents = [
    "タイトルタイトルタイトル",
    "あいうえおあいうえおあい",
    "ABCABCABCABCABCABCABC"
  ];

  const interval = function(){
    setIndex((oldIndex) => {
      if (oldIndex < rouletteContents.length - 1) return oldIndex + 1;
      return 0;
    })};

  // ボタンの文字変更

  const buttonIventNumber = () =>{

    const buttonChoiseText = document.getElementById('rouletteStartButton')
    buttonIvent ++;
    if (buttonIvent === 1) {
      buttonChoiseText.innerHTML = 'Start';
    }else if (buttonIvent === 2) {
      buttonChoiseText.innerHTML = 'Stop';
      setInterval(interval, 100);
      
    }else if (buttonIvent === 3) {
      buttonChoiseText.innerHTML = 'select';
      clearInterval(interval);
      
    }else if (buttonIvent === 4){
      navigate("/typingstart")
    }    
  } 

  // useEffect(() => {
  //   if (buttonIvent === 2) {
  //     const interval = setInterval(() => {
  //       setIndex((oldIndex) => {
  //         if (oldIndex < rouletteContents.length - 1) return oldIndex + 1;
  //         return 0;
  //       });
  //     }, 50);//ルーレットの中身を切り替える速度
  //     return () => clearInterval(interval);
  //   } else if (buttonIvent === 3) {
  //     return () => clearInterval();
  //   }
  // }, []);

  return (
    <div className='body'>
      <div className='baseColor'>
        <Navbar />
        <Animation/>
        <div className='baseBody'>
            <div className='choiseButton'>
                <div className='selectTitle'>
                    <div className='choise'>&#9654;</div>
                    <button className='titleChoise'>
                        <div>{rouletteContents[index]}</div>
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
