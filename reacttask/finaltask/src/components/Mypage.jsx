import React from 'react'
import "./Mypage.css";
import { useNavigate } from 'react-router-dom';

const Mypage = () => {

  const navigate = useNavigate();

  const moveScoreBord = () => {
    navigate("/Scorelist")
  };

  const moveRouletto = () => {
    navigate("/Roulettelist")
  };

  const moveSelect = () => {
    navigate("/Typingselect")
  };

  return (
    <div className='myWrapper'>
      <div className='myBox'>
        <div className='myTitle'>MyPage</div>

        <div className='myInfo'>
          <div className='logUserInfo'>
            <div className='logUser'>ユーザー情報</div>

            <div className='logName'>
              <div className='logName2'>ユーザー名</div>
              <div className='logName3'>:</div>
              <div className='logName4'>テスト太郎</div>
            </div>

            <div className='logAdress'>
              <div className='logAdress2'>メールアドレス</div>
              <div className='logAdress3'>:</div>
              <div className='logAdress4'>hogefuga@hoge.com</div>
            </div>
          </div>

          <div className='myScoreBord'>
            <div className='myScore'>最高スコア</div>
            <div className='myScoreGraph'>
              <div className="bar1 barA"><span>80%</span></div>
              <div className='myScoreDate'>2025/01/01</div>
            </div>
            <button className='moveScorePage' onClick={ moveScoreBord }>スコア一覧へ</button>
          </div>

          <div className='myRouletteBord'>
            <div className='myRouletteTitle'>ルーレット</div>
            <table className='myRouletteList'>
              <tr>
                <th className='listTitleA'>ルーレットタイトル</th><th className='listDateA'>作成日</th>
              </tr>
              <tr>
                <td>○○○○○○○○○○○</td><td>2025/01/01</td>
              </tr>
              <tr>
                <td>○○○○○○○</td><td>2025/01/01</td>
              </tr>
              <tr>
                <td>○○○○○○○○○○○○○○○</td><td>2025/01/01</td>
              </tr>
            </table>
            <button className='moveRoulettePage' onClick={moveRouletto}>ルーレット一覧へ</button>
          </div>

          <button className='moveTry' onClick={moveSelect}>TRY</button>
        </div>
      </div>
    </div>
  )
}

export default Mypage