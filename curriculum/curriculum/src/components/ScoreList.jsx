import React from 'react';
import Navbar from "./Navbar";
import {useEffect} from 'react';
import "./css/ScoreList.css";
import Score from './Score';
import Animation from "./Animation";

const ScoreList = () => {

    const worst = 20;
    const average = 80;

    const worstScoreData = worst + "%";
    const averageScoreData = average + "%";
    const maxScoreDate = "2025/01/01";

    useEffect(() => {
        const element1 = document.getElementById("worstScore");
        element1.style.width = worstScoreData;

        const element2 = document.getElementById("averageScore");
        element2.style.width = averageScoreData;
    })

  return (
    <div className='body'>
      <div className='baseColor'>
        <Navbar />
        <Animation/>
        <div className='scoreBody'>
          <div className='baseBG onUserBG'>
            <h2>Score</h2>
            <div>
                <div className='form'>
                    <div className='scoreRanking'>
                    <p className='subTitle'>スコア</p>
                    
                    <div className='scoreGroup inContents'>
                      <Score />
                    </div>
                    <div className='scoreGroup inContents'>
                      <Score />
                    </div>
                    <div className='scoreGroup inContents'>
                      <Score />
                    </div>
                    <div className='scoreGroup inContents'>
                      <Score />
                    </div>
                </div>
            
                <div className='average'>
                    <p className='subTitle'>正解率</p>
                    <div className='scoreGroup inContents'>
                        <div className='scoreGauge'>
                        <p className='scoreNumbar'>{averageScoreData}</p>
                        <div id='averageScore'></div>
                        </div>
                        <div className='date'>{maxScoreDate}</div>
                    </div>            
                </div>

                
                <div className='worst'>
                    <p className='subTitle'>不正解率</p>
                    <div className='scoreGroup inContents'>
                        <div className='scoreGauge'>
                        <p className='scoreNumbar'>{worstScoreData}</p>
                        <div id='worstScore'></div>
                        </div>
                        <div className='date'>{maxScoreDate}</div>
                    </div>
                  </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ScoreList;
