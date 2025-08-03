import React, { useEffect } from 'react';

const Score = () => {
    const myScore = 80;

    const maxScore = myScore + "%";
    const maxScoreDate = "2025/01/01";

    useEffect(() => {
        const element = document.getElementById("myScore");
        element.style.width = maxScore;
    })
    return (
            <div className='inContents'>
                <div className='scoreGroup'>
                    <div className='scoreGauge'>
                        <p className='scoreNumbar'>{maxScore}</p>
                        <div id='myScore'></div>
                    </div>
                </div>
                <div className='date'>{maxScoreDate}</div>
            </div>
    )
}

export default Score;