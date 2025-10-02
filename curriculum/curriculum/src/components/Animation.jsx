import React from 'react';
import "./css/animation.css";
import {useEffect} from 'react';
import {useAnimation} from "react-animatable";

// Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope Process

const Animation = () => {

  

  useEffect(() => {
    const el = document.querySelector("#animation");

    
    

    for(let i = 0; i < 11; i++){
      let n = 0;
      const moji = ["あ", "い", "う", "え", "お", "A", "B", "C", "D", "E", "F", "G"];
      const mojiRamdomNum = Math.floor(Math.random() * 10);

      const p = document.createElement("p");
      el.appendChild(p);

      el.children[n].textContent = moji[mojiRamdomNum];

      const elChild = el.children[n]      

      const marginSide = Math.random() * (0 - 100) + 100;
      elChild.style.position = "relative";
      elChild.style.left = marginSide + "vw";


      

      const heightRandom = Math.random() * (-50 - -15) + -15;
      
      

      const playing = elChild.animate([
        {transform: `rotateY(0deg) translateY(100vh)`, buttom: "0vh", opacity: "0", offset: "0"},
        {transform: `rotateY(360deg) translateY(${heightRandom}vh)`, buttom: "120vh", opacity: "1", offset: "0.2"},
        {transform: `rotateY(0deg) translateY(100vh)`, buttom: "0vh", opacity: "0", offset: "1.0"},
      ],{
        duration: 10000,
      
  })
  n++;
    }

    
  }, []);

  
    
    
  return (
    <div id='animation'></div>
  )
}

export default Animation;