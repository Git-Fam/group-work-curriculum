import React, { useState,useEffect} from "react";
import "./Textanimation.css";
import "../../App";

function Textanimation() {
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    const generateRandomCharacters = () => {
      const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわをん';
      const result = [];
      for (let i = 1; i < 20; i++) {
        result.push(chars.charAt(Math.floor(Math.random() * chars.length)));
      }
      return result;
    };

    setCharacters(generateRandomCharacters());
  }, []);

  return (
    <div className="animation-container">
      {characters.map((char, index) => (
        <span
          key={index}
          className="animated-character"
          style={{
            left: `${Math.random() * 80 + 2}%`, // 水平位置
            animationDelay: `${Math.random()}s`, // 開始タイミング
            fontSize: `${Math.random() * 120 + 1}px`, // 文字サイズ
          }}
        >
          {char}
        </span>
      ))}
    </div>
  );
}

export default Textanimation;