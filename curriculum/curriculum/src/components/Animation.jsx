import React from 'react';
import "./css/animation.css";
import {useEffect} from 'react';
import {useAnimation} from "react-animatable";

const Animation = () => {

  const el = document.querySelector("#animation");
  const playing = el.animate([
    {transform: "rotateY(0) translateY(40px)", opacity: "0", buttom: "20%"},
    {transform: "rotateY(360deg) translateY(0)", opacity: "1", buttom: "80%"}
  ],{
    duration: 1000,
  })

  useEffect(() => {
    playing.play();
  }, []);
    
    
  return (
    <div id='animation'>animation</div>
  )
}

export default Animation;