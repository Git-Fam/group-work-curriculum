import React from 'react';
import Navbar from "./Navbar";
import "./css/Results.css";


const Results = () => {
  return (
    <div className='body'>
      <div className='baseColor'>
        <Navbar />
        <div className='baseBody resultsBody'>
            <div className='typingArea'>

                <div className='questionNumber'>〇〇〇〇〇〇〇〇〇〇〇〇〇〇</div>
                <div className='mainFont resultTitle'>
                    <div className='border'></div>
                    <div className='thisScore'>score</div>    
                    <div className='border'></div>                
                </div>
                <div className='mainFont resultsScore'>
                    <div className='results'>80%</div>
                    <div className='border'></div>
                    <div className='border'></div>
                </div>
                <button className='mainFont endButton'>END</button>
            </div>          
        </div>
      </div>
    </div>
  )
}

export default Results;