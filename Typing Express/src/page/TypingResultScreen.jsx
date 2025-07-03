import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Layout from '../components/Layout';
import { Button } from '../components/Button';
import '../assets/styles/typing-result.scss';
import { truncateText } from '../components/Long-text-limit';

const TypingResultScreen = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location; // TypingPracticeから渡されたstate

  const [title, setTitle] = useState('');
  const [score, setScore] = useState(0);
  const [totalProblemChars, setTotalProblemChars] = useState(0); //全体の問題文字数
  const [accuracy, setAccuracy] = useState(0); //正解数
  const [inaccuracy, setInaccuracy] = useState(0); //不正解率
  const [displayedScore, setDisplayedScore] = useState(0);
  const [finalScore, setFinalScore] = useState(0);

  // 各ゲームセッションに一意のIDを割り当てるためのRef
  // これにより、コンポーネントの再レンダリング時にIDがリセットされず、重複保存を防ぐ
  const sessionDocIdRef = useRef(null);

  useEffect(() => {
    if (
      !state ||
      typeof state.score !== 'number' ||
      !Array.isArray(state.problems)
    ) {
      setTitle('結果が取得できませんでした');
      setScore(0);
      setTotalProblemChars(0);
      setAccuracy(0);
      setInaccuracy(0);
      console.warn('結果データが不完全です。', state);
      return;
    }

    setTitle(state.title);
    const roundedScore = Math.round(state.score);
    setFinalScore(roundedScore);

    //全体の問題数を計算
    const calculatedTotalProblemChars = state.problems.reduce(
      (acc, problem) => acc + problem.length,
      0
    );
    setTotalProblemChars(calculatedTotalProblemChars);

    // 正解率と不正解率の計算
    // totalCharCountが0の場合は0%とする
    const calculatedAccuracy = roundedScore;
    const calculatedInaccuracy = Math.max(0, 100 - calculatedAccuracy);

    setAccuracy(calculatedAccuracy);
    setInaccuracy(calculatedInaccuracy);
  }, [state]);

  //カウントアニメーション用
  useEffect(() => {
    if (finalScore === 0 && state?.score !== 0) return; //スコアが０の場合、アニメーションなしにする

    let start = 0;
    const duration = 600;
    const increment = finalScore / (duration / 10); //滑らかさの為の計算式

    const timer = setInterval(() => {
      start += increment;
      if (start >= finalScore) {
        setDisplayedScore(finalScore);
        clearInterval(timer);
      } else {
        setDisplayedScore(Math.round(start));
      }
    }, 10);

    return () => clearInterval(timer);
  }, [finalScore, state?.score]);

  const handleEndPractice = () => {
    navigate('/mypage');
  };

  return (
    <Layout>
      <div className="result-screen__container-wrap">
        <div className="result-screen__container">
          <h2 className="result-screen__title">{truncateText(title, 15)}</h2>
          <div className="result-screen__score-display">
            <p className="result-screen__score-label app-font">score</p>
            <p className="result-screen__score-value app-font pop-in">
              {displayedScore}%
            </p>
          </div>
          <Button
            className="result-screen__end-button app-font"
            onClick={handleEndPractice}
          >
            END
          </Button>
        </div>
      </div>
    </Layout>
  );
};
export default TypingResultScreen;
