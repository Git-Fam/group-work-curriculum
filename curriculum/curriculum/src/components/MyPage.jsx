import React, { useEffect } from 'react';
import "./MyPage.css";
import {auth} from "../firebase";
import {Link} from "react-router-dom";
import Navbar from "./Navbar";


const MyPage = () => {

  const maxScore = 80 + "%";
  const maxScoreDate = "2025/01/01";

  useEffect(() => {
    const element = document.getElementById("myScore");
    element.style.width = maxScore;
  })

  
  return (
    <div className='body'>
      <div className='baseColor'>
        <Navbar />
        <div className='mypageBody'>
          <div className='baseBG onUserBG'>
            <h2>MyPage</h2>
            <div className='form'>
              <div>
                <p className='subTitle'>ユーザー情報</p>
                <div className='inContents'>
                  <div className='information'>
                    <div>ユーザー名　　　：　　</div>
                    <div className='userName'>テスト太郎</div>
                  </div>
                  <div className='information'>
                    <div>メールアドレス　：　　</div>
                    <div className='userMail'>hogefuga@hoge.com</div>
                  </div>
                </div>

              </div>
              <div className='score'>
                <p className='subTitle'>最高スコア</p>
                <div className='inContents'>
                  <div className='scoreGroup'>
                    <div className='scoreGauge'>
                      <p className='scoreNumbar'>{maxScore}</p>
                      <div id='myScore'></div>
                    </div>
                  </div>
                  <div className='date'>{maxScoreDate}</div>
                  <div className='linkPage'>
                    <Link to={"/scorelist"}>スコア一覧へ</Link>
                  </div>
                </div>
              </div>
              <div>
                <p className='subTitle'>ルーレット</p>
                <div className='inContents'>
                  <div className='tableBody'>
                  <table>
                      <tr>
                        <th className='mypageTh'>ルーレットタイトル</th>
                        <th className='mypageTh'>作成日</th>
                      </tr>
                      <tr>
                        <td>〇〇〇〇〇〇〇〇〇〇〇</td>
                        <td>2025/01/01</td>
                      </tr>
                      <tr>
                        <td>〇〇〇〇〇〇〇</td>
                        <td>2025/01/01</td>
                      </tr>
                      <tr>
                        <td>〇〇〇〇〇〇〇〇〇〇〇〇〇〇</td>
                        <td>2025/01/01</td>
                      </tr>
                    </table>                    
                  </div>

                  <div className='linkPage'>
                    <Link to={"/roulettelist"}>ルーレット一覧へ</Link>
                  </div>
                </div>
              </div>
              <button className='tryButton formButton'>
                <Link to={"/selectroulette"}>TRY</Link>
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default MyPage;
