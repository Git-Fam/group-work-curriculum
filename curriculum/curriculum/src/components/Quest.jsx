import React from 'react';
import {useState} from "react";

const Quest = () => {

  return (
    <div className='box'>
        <label className='questList'>問題</label>
        <div className='question'>
            <input type="text" placeholder='〇〇〇〇〇〇〇〇〇'></input>
            <button className='delete'>削除</button>
        </div>
    </div>
  )
}

export default Quest;