import React from 'react';
import {useState} from "react";
import $ from 'jquery';


const Quest = () => {


    for (let i = 1; i < $(".questList").length; i++){
        $(".questList").prepend("<span>問題" + i + "</span>");
    }

  return (
    <div className='box'>
        <label className='questList'></label>
        <div className='question'>
            <input type="text" placeholder='〇〇〇〇〇〇〇〇〇'></input>
            <button className='delete'>削除</button>
        </div>
    </div>
  )
}

export default Quest; 