import React from 'react';
import {Link} from "react-router-dom";
import Navbar from "./Navbar";
import "./css/SelectRoulette.css";
 
const SelectRoulette = () => {
  return (
    <div className='body'>
      <div className='baseColor'>
        <Navbar />
        <div className='baseBody'>
            <div className='selectButton'>
                <button>
                  <Link to="/typingstart">Default choice</Link>
                </button>
                <button>
                  <Link to="/roulettechoise">Roulette  choice</Link>
                </button>
            </div>
        </div>
      </div>
    </div>    
  )
}

export default SelectRoulette;
