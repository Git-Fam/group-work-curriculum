import React from 'react';
import "./css/animation.css";
import {useEffect} from 'react';
import {useAnimation} from "react-animatable";

// Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope Process

const Animation = () => {

  

  useEffect(() => {
    const el = document.querySelector("#animation");

    
    

    for(let i = 0; i < 11; i++){
      const moji = ["あ", "い", "う", "え", "お", "A", "B", "C", "D", "E", "F", "G"];
      const mojiRamdomNum = Math.floor(Math.random() * 10);

      const p = document.createElement("p");
      p.textContent = moji[mojiRamdomNum];
      el.appendChild(p);
      const marginRandom = Math.random() * (-100 - -50) + 50 + "%";
      const marginSide = Math.random() * (0 - 100) + 100;
      el.style.left = marginSide + "%";

      const playing = el.animate([
        {transform: "rotateY(0)", transform: "translateY(500%)", opacity: "0", offset: "0"},
        {transform: "rotateY(630deg)", transform: "translateY(marginRandom)", opacity: "1", offset: "0.2"},
        {transform: "rotateY(360deg)", transform: "translateY(500%)", opacity: "0", offset: "1.0"},
      ],{
        duration: 10000,
      
  })
  p.textContent = moji[mojiRamdomNum];
    }

    
  }, []);

  
    
    
  return (
    <div id='animation'></div>
  )
}

export default Animation;