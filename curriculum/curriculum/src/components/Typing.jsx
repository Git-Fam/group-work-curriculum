import React from 'react';
import Navbar from "./Navbar";
import "./css/Typing.css";

const Typing = () => {

    let timeLeft = 3;
    const countdownElement = document.getElementById('count');

    window.onload = function (){
    const timer = setInterval(() => {
      timeLeft--;
      if (timeLeft > 0) {
        countdownElement.innerHTML = timeLeft;
      } else {
        countdownElement.innerHTML = '完了';
        clearInterval(timer);
      }
    }, 1000);
    }


  return (
    <div className='body'>
      <div className='baseColor'>
        <Navbar />
        <div className='typingBody'>
            <div id='count'>{timeLeft}</div>
        </div>
      </div>
    </div>    
  )
}

export default Typing


// @Ikumi Kaku 
// お疲れ様です。
// 現在、タイピング練習が始まる前の3秒のカウントダウンに取り組んでいます。

// 「Cannot set properties of null (setting 'innerHTML')」とのエラーが出てきて、
// このエラーが未取得エラー：空（から）の属性タイプ”innerHTML”を設定することが出来ない ということが分かったのですが、改善方法が分かりません。

// ・classnameではなくidで設定されているか、idの名前のスペルは間違っていないかを確認
// ・ページが完全に読み込まれた直後に実行するために「window.omload」を使用

// 上記を試してみたのですが、同じエラーが出たままでした。
// こちら修正点をご教授いただけますでしょうか。