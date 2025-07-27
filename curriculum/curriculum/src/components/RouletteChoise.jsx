import React from 'react';
import {Link} from "react-router-dom";
import Navbar from "./Navbar";
import "./RouletteChoise.css"

const RouletteChoise = () => {
  return (
    <div className='body'>
      <div className='baseColor'>
        <Navbar />
        <div className='choiseBody'>
            <div className='choiseButton'>
                <div className='selectTitle'>
                    <div className='choise'>&#9654;</div>
                    <button className='titleChoise'>
                        タイトルタイトルタイトル
                    </button>
                    <div className='choise'>&#9664;</div>
                </div>
                <button className='startButton'>
                <Link to="/typingpractice">Start</Link>
                </button>
            </div>
        </div>
      </div>
    </div>        
  )
}

export default RouletteChoise