import React from 'react';
import Navbar from "./Navbar";
import "./css/RouletteChoise.css";
import { useNavigate } from 'react-router-dom';
import Animation from "./Animation";
import { useState, useEffect } from "react";


const RouletteChoise = () => {

  const navigate = useNavigate();

  const [buttonIvent, setButtonIvent] = useState(1);
  const [index, setIndex] = useState(0);
  const [buttonText, setButtonText] = useState("start");

  const rouletteContents = [
    "タイトルタイトルタイトル",
    "あいうえおあいうえおあい",
    "ABCABCABCABCABCABCABC"
  ];

  const handleClick = () => {
    setButtonIvent(buttonIvent + 1);
    if(buttonIvent === 2){
      setButtonText("stop");
      const interval = setInterval(() => {
        setIndex((oldIndex) => {
          if (oldIndex < rouletteContents.length - 1) return oldIndex + 1;
          return 0;
        });
      }, 50);
      return () => clearInterval(interval);
    }else if(buttonText === 3){
      setButtonText("select");
    }else if(buttonText === 4){
      navigate("/typingstart");
    }
  }


  // const interval = function(){
  //   setIndex((oldIndex) => {
  //     if (oldIndex < rouletteContents.length - 1) return oldIndex + 1;
  //     return 0;
  //   })};

  // ボタンの文字変更

  // const buttonIventNumber = () =>{
    
  //   if (buttonIvent === 2) {
  //     seButtonText("stop");
  //     buttonIvent ++;
  //   }else if (buttonIvent === 3) {
  //     seButtonText("select");
  //     buttonIvent ++;
  //   }else if (buttonIvent === 4){
  //     navigate("/typingstart")
  //   }    
  // } 

  console.log(buttonIvent);

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
                <button onClick={handleClick} id='rouletteStartButton' className='mainFont'>
                  {buttonText}
                </button>
            </div>
        </div>
      </div>
    </div>        
  )
}


export default RouletteChoise;
