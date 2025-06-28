import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { collection, serverTimestamp, doc, setDoc } from 'firebase/firestore';
import { db } from '../firebase';
import Layout from '../components/Layout';
import { Button } from '../components/Button';
import '../assets/styles/typing-result.scss';
import { truncateText } from '../components/Long-text-limit';
import { useAuth } from '../assets/contexts/AuthContext';

const TypingResultScreen = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location; // TypingPracticeから渡されたstate
  const { currentUser } = useAuth(); // ユーザー情報の取得

  const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';

  const [title, setTitle] = useState('');
  const [score, setScore] = useState(0);
  const [totalProblemChars, setTotalProblemChars] = useState(0); //全体の問題文字数
  const [accuracy, setAccuracy] = useState(0); //正解数
  const [inaccuracy, setInaccuracy] = useState(0); //不正解率
  const [scoreSaved, setScoreSaved] = useState(false); // スコアが保存されたかを追跡するステート
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

    // sessionDocIdRef がまだ設定されていない場合は、初回マウント時に一度だけ生成
    if (!sessionDocIdRef.current) {
      // state.scoreと現在のタイムスタンプ、ランダムな文字列を組み合わせてよりユニークなIDを生成
      sessionDocIdRef.current = `${state.score}-${Date.now()}-${Math.random()
        .toString(36)
        .substring(2, 9)}`;
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

    // スコアがまだ保存されておらず、ユーザーがログインしている場合にのみ保存処理を実行
    if (!scoreSaved && currentUser?.uid) {
      const saveScore = async () => {
        try {
          const scoresCollectionRef = collection(
            db,
            'artifacts',
            appId,
            'users',
            currentUser.uid,
            'scores'
          );

          await setDoc(doc(scoresCollectionRef, sessionDocIdRef.current), {
            title: state.title,
            score: roundedScore,
            correctCharCount: state.correctCharCount || 0,
            totalCharCount: calculatedTotalProblemChars,
            accuracy: calculatedAccuracy,
            inaccuracy: calculatedInaccuracy,
            mistakeCount: state.mistakeCount || 0,
            Timestamp: serverTimestamp(), // Firestore側でサーバータイムスタンプを使用
          });
          console.log('スコアが正常に保存されました。');
          setScoreSaved(true); // スコア保存フラグをtrueに設定
        } catch (error) {
          console.error('スコアの保存中にエラーが発生しました:', error);
        }
      };
      saveScore();
    } else if (!currentUser?.uid && !scoreSaved) {
      // ユーザーがログインしていない場合
      console.warn(
        'ユーザーがログインしていないため、スコアは保存されません。'
      );
    }
  }, [state, currentUser, appId, scoreSaved]);

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
