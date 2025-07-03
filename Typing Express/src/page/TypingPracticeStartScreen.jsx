import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Layout from '../components/Layout';
import { Button } from '../components/Button';
import '../assets/styles/global.scss';
import '../assets/styles/typing-practice-start.scss';

import { truncateText } from '../components/Long-text-limit';

const TypingPracticeStartScreen = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;

  // ルーレットから渡されたデータを保持するstate
  const [practiceData, setPracticeData] = useState(null);
  // 表示するタイトル。初期値を'default'として、useEffectで適切に設定する
  const [displayTitle, setDisplayTitle] = useState('default');

  useEffect(() => {
    // stateにタイトルと問題データが存在し、問題が配列で空でない場合
    if (
      state &&
      state.title &&
      Array.isArray(state.problems) &&
      state.problems.length > 0
    ) {
      // ルーレットからデータが渡された場合
      setPracticeData({
        title: state.title,
        problems: state.problems,
      });
      setDisplayTitle(state.title); // ルーレット名を開始画面のタイトルに設定
    } else {
      // ルーレットからのデータがない場合（Default choiceの場合）
      setPracticeData(null); // practiceDataをnullに設定し、TypingPracticeがランダムAPIを呼び出すようにする
      setDisplayTitle('Default');
    }
  }, [state]);

  const handleStartPractice = () => {
    // practiceDataがnullの場合、TypingPracticeはAPI取得する
    navigate('/practice', {
      state: practiceData, // stateがnullの場合、navigateはstateを渡さない
    });
  };

  return (
    <Layout>
      <div className="start-screen__container-wrap">
        <div className="start-screen__container practice-container">
          <h2 className="start-screen__title problems-title">
            {truncateText(displayTitle, 14)}
          </h2>
          <Button
            className="start-screen__start-button app-font"
            onClick={handleStartPractice}
          >
            Typing Start
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default TypingPracticeStartScreen;
