import React, { useState, useEffect } from "react";
import { useNavigate,useLocation } from "react-router-dom";
import "./Typing.css";
import Header from "./components/Header/Headerlogout";


const Typing = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const selectedTitle = location.state?.title|| "";
  const useDefault = location.state?.Default || false;
  const [options, setOptions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [stage, setStage] = useState("start");
  const [countdown, setCountdown] = useState(3);
  const [userInput, setUserInput] = useState("");
  const [quote, setQuote] = useState("");
  const [isCorrect, setIsCorrect] = useState(null);
  const [score, setScore] = useState(0);
  const [isComposing, setIsComposing] = useState(false); 
  

  const generateRandomWords = () => {
  const wordList = [
    "りんご", "ごりら", "らっこ", "こぶた", "たぬき",
    "きつね", "ねこ", "こあら", "いぬ", "さる",
  ];
  //シャッフル
  const shuffledWords = wordList.sort(() => Math.random() - 0.5);
  return shuffledWords.slice(0, 10);
};
       
  useEffect(() => {
    if (useDefault) {
      const randomWords = generateRandomWords();
      setOptions(randomWords);
      setQuote(randomWords[0]);
    } else {
    const storedRoulettes = JSON.parse(localStorage.getItem("roulettes"));
    const roulette = storedRoulettes.find((r) => r.title === selectedTitle);
    if (roulette) {
        setOptions(roulette.options);
        setQuote(roulette.options[0]);
    }
    }
    
    }, [useDefault,selectedTitle]);

  //カウントダウン
  const handleStart = () => {
    setStage("countdown");
    let timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev === 1) {
          clearInterval(timer);
          setStage("practice");
        }
        return prev - 1;
      });
    }, 1000);
    
  };

  // タイピング入力
  const handleInputChange = (event) => {
    setUserInput(event.target.value);
  };

  const handleCompositionStart = () => {
    setIsComposing(true);
  };

  const handleCompositionEnd = () => {
    setIsComposing(false);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !isComposing) {
      const inputValue = userInput;

      if (inputValue === quote) {
        setIsCorrect(true);
        setScore((prevScore) => prevScore + 1);
      } else {
        setIsCorrect(false);
      }

      setUserInput("");

      const nextIndex = currentIndex + 1;
      if (nextIndex < options.length) {
        setCurrentIndex(nextIndex);
        setQuote(options[nextIndex]);
      } else {
        const finalScore = inputValue === quote ? score + 1 : score;
        const percentageScore = Math.round((finalScore / options.length) * 100);
        setScore(percentageScore);
        setStage("result");
      }
    }
  };

//スコア表示用
  const ScorePercentage = (correctCount, totalWords) => {
  return Math.round((correctCount / totalWords) * 100); 
};

  return (
    <div className="typing-Page">
      <Header />
      
        {stage === "start" && (
        <div className="backglound">
        <p className="plactice-title">{selectedTitle}</p>
        <button className="startbtn selectbtn-text" onClick={handleStart}>
          Typing Start
        </button>
        </div>
        )}
        
        {stage === "countdown" && (
          <> 
            <div className="backglound">
              <p className="plactice-title">{selectedTitle}</p>
              <div className="coundown">{countdown}</div>
            </div>
          </>
        )}

        {stage === "practice" && (
          <>
            <div className="backglound">
              <p className="plactice-title">{selectedTitle}</p>
              <div className="plactice-box"><p className="plactices">{quote}</p></div>
              <input
                type="text"
                value={userInput}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                onCompositionStart={handleCompositionStart}
                onCompositionEnd={handleCompositionEnd}
                placeholder="ここに入力"
                className={isCorrect === false ? "incorrect" : "correct"}
              />
              
            </div>
          </>
        )}
        {stage === "result" && (
          <>
            <div className="backglound">
              <p className="plactice-title">{selectedTitle}</p>
              <div className="scoretitle selectbtn-text">score</div>
              <div className="score selectbtn-text">{score}%</div><div className="scoreline"></div>
              <button className="end-btn selectbtn-text" onClick={() => navigate("/mypage")}>
                END
              </button>
            </div>
          </>
        )}
    </div>
  );
};

export default Typing;