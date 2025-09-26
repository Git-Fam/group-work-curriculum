import React from 'react';
import "./css/animation.css";
import {useEffect} from 'react';
import {useAnimation} from "react-animatable";

// Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope Process

const Animation = () => {

  

  useEffect(() => {
    const el = document.querySelector("#animation");
    const playing = el.animate([
      {transform: "rotateY(0) translateY(1000%)", opacity: "0"},
      {transform: "rotateY(630deg) translateY(-500%)", opacity: "1"},
      {transform: "rotateY(360deg) translateY(1000%)", opacity: "0"},
    ],{
      duration: 7000,
  })
    playing.play();
  }, []);
    
    
  return (
    <div id='animation'>A</div>
  )
}

export default Animation;