import React, { useEffect } from 'react';

const Score = () => {
    const myScore = 80;

    const maxScore = myScore + "%";
    const maxScoreDate = "2025/01/01";

    useEffect(() => {
        var getClassName = document.getElementsByClassName("myScore");
        for (var i = 0; i < getClassName.length; i++){
            getClassName[i].style.width = maxScore;
        }
    })
    return (
            <div>
                <div className='scoreGroup'>
                    <div className='scoreGauge'>
                        <p className='scoreNumbar'>{maxScore}</p>
                        <div className='myScore'></div>
                    </div>
                </div>
                <div className='date'>{maxScoreDate}</div>
            </div>
    )
}

export default Score;