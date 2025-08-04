import React from 'react'
import "./Scorelist.css";

const Scorelist = () => {
  return (
    <div className='scoreListWrapper'>
      <div className='scoreLists'>
        <div className='scoreTitles'>Score</div>
        <div className='scoreList'>
          <div className='listWrapper'>
            <div className='scoreListTitkle'>スコア</div>
              <div className='scoreGraph2'>

                <div className="scoreWrapper">
                  <div className="bar2 barA"><span>80%</span></div>
                  <div className='scoreDate1'>2025/01/01</div>
                </div>

                <div className="scoreWrapper">
                  <div className="bar2 barB"><span>80%</span></div>
                  <div className='scoreDate1'>2025/01/01</div>
                </div>

                <div className="scoreWrapper">
                  <div className="bar2 barC"><span>80%</span></div>
                  <div className='scoreDate1'>2025/01/01</div>
                </div>

                <div className="scoreWrapper">
                  <div className="bar2 barD"><span>80%</span></div>
                  <div className='scoreDate1'>2025/01/01</div>
                </div>

                <div className="scoreWrapper">
                  <div className="bar2 barE"><span>80%</span></div>
                  <div className='scoreDate1'>2025/01/01</div>
                </div>

              </div>

          </div>
          
          <div className='corect'>正解率</div>

            <div className='scoreGraph2'>

              <div className="scoreWrapper2">
                <div className="bar2 barF"><span>80%</span></div>
              </div>

            </div>

          <div className='unCorect'>不正解率</div>

            <div className='scoreGraph2'>

              <div className="scoreWrapper2">
                <div className="bar2 barG"><span>20%</span></div>
              </div>

            </div>
        </div>
      </div>
    </div>
  )
}

export default Scorelist