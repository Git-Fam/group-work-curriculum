import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Roulette.css";
import Header from "./components/Header/Headerlogout";
import Textanimation from"./components/Textanimation";

const Roulette = () => {
  const navigate = useNavigate();
  const [options, setOptions] = useState([]); //ルーレットの選択肢を格納
  const [selectedOption, setSelectedOption] = useState(""); //選択された項目
  const [isSpinning, setIsSpinning] = useState(false); //ルーレットが回転中かどうか

  //ローカルストレージからルーレットデータを取得
  useEffect(() => {
    const storedRoulettes = JSON.parse(localStorage.getItem("roulettes")) || [];
    //ルーレットのタイトルを配列として取得
    setOptions(storedRoulettes.map((roulette) => roulette.title));
  }, []);

  //回転
  const handleButtonClick = () => {
    if (!isSpinning && !selectedOption) {
      setIsSpinning(true); //スタート
    } else if (isSpinning) {
      setIsSpinning(false); //ストップ
      const randomIndex = Math.floor(Math.random() * options.length);
      setSelectedOption(options[randomIndex]); //ランダムに選択
    } else if (selectedOption) {
      //選ばれた項目をタイピングに渡す
      const storedRoulettes = JSON.parse(localStorage.getItem("roulettes")) || [];
      const selectedRoulette = storedRoulettes.find(
        (roulette) => roulette.title === selectedOption
      );
      navigate("/typing", {
        state: { title: selectedRoulette.title, options: selectedRoulette.options },
      });
    }
  };

  // ボタン
  const getButtonLabel = () => {
    if (!isSpinning && !selectedOption) {
      return "Start";
    } else if (isSpinning) {
      return "Stop";
    } else if (selectedOption) {
      return "Select";
    }
  };

  return (
    <div className="roulette-Page">
      <Header />
      <Textanimation />
      <div className="roulette-container">
        <div className="sankaku">▶</div>
        <div className={`roulette ${isSpinning ? "spinning" : ""}`}>
          {isSpinning ? (
            <div className="roulette-text">
              {options.map((title, index) => (
                <p key={index}>{title}</p>
              ))}
            </div>
          ) : (
            <p>{selectedOption || options[0]}</p>
          )}
        </div>
        <div className="sankaku">◀</div>
      </div>
      <div className="button-container">
        <button className="roulette-button selectbtn-text" onClick={handleButtonClick}>
          {getButtonLabel()}
        </button>
      </div>
    </div>
  );
};

export default Roulette;