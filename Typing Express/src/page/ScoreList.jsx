import React, { useEffect, useState } from 'react';
import '../assets/styles/global.scss';
import '../assets/styles/scorelist.scss';
import '../assets/styles/button.scss';
import Layout from '../components/Layout';
import { formatDateForScore } from '../components/dateUtils';
import useScoreData from '../hooks/useScoreData.jsx';

const ScoreList = () => {
  const { scores, loading, error: fetchError } = useScoreData();
  const [overallAccuracy, setOverallAccuracy] = useState(0); //正解率
  const [overallInaccuracy, setOverallInaccuracy] = useState(0); //不正解率
  const [shouldAnimate, setShouldAnimate] = useState(false);

  useEffect(() => {
    if (!loading && !fetchError) {
      let totalAccuracySum = 0;
      let totalInaccuracySum = 0;
      const numberOfSessions = scores.length;

      if (numberOfSessions > 0) {
        scores.forEach((scoreData) => {
          if (typeof scoreData.accuracy === 'number') {
            totalAccuracySum += scoreData.accuracy;
          }
          if (typeof scoreData.inaccuracy === 'number') {
            totalInaccuracySum += scoreData.inaccuracy;
          }
        });

        // 全体の正解率・不正解率を計算
        const calculatedOverallAccuracy = totalAccuracySum / numberOfSessions;
        const calculatedOverallInaccuracy =
          totalInaccuracySum / numberOfSessions;

        setOverallAccuracy(Math.round(calculatedOverallAccuracy));
        setOverallInaccuracy(Math.round(calculatedOverallInaccuracy));

        setTimeout(() => {
          setShouldAnimate(true);
        }, 50);
      } else {
        setOverallAccuracy(0);
        setOverallInaccuracy(0);
        setShouldAnimate(false);
      }
    } else if (fetchError) {
      // データ取得エラー時は統計情報をリセット
      setOverallAccuracy(0);
      setOverallInaccuracy(0);
      setShouldAnimate(false);
    }
  }, [scores, loading, fetchError]);

  return (
    <Layout>
      <main className="scorelist__body">
        <div className="scorelist__card card">
          <h2 className="scorelist__page-title page-title">Score</h2>
          {loading && (
            <p className="scorelist__message">スコアを読み込み中...</p>
          )}
          {fetchError && (
            <p className="scorelist__message scorelist__message--error">
              {fetchError}
            </p>
          )}
          {!loading && !fetchError && (
            <>
              <div className="scorelist__individual-scores-container">
                <p className="scorelist__individual-lavel">スコア</p>
                {scores.length > 0 ? (
                  scores.map((score) => (
                    <div
                      key={score.id}
                      className="scorelist__individual-score-item"
                    >
                      <div className="scorelist__item-score-bar-wrap">
                        <div className="scorelist__item-score-bar-container">
                          <div
                            className="scorelist__item-score-bar-fill"
                            style={{
                              width: shouldAnimate ? `${score.score}%` : '0%',
                            }}
                          ></div>
                          <span className="scorelist__item-score-value">
                            {score.score}%
                          </span>
                        </div>
                        {score.Timestamp && (
                          <span className="scorelist__item-score-date">
                            {formatDateForScore(score.Timestamp)}
                          </span>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="scorelist__no-data">
                    <p>まだスコアがありません。</p>
                  </div>
                )}
              </div>

              <div className="scorelist__overall-stats">
                <div className="scorelist__oacuracy-item">
                  <div className="scorelist__overall-label">正解率</div>
                  <div className="scorelist__progress-bar-wrap">
                    <div className="scorelist__item-score-bar-container">
                      <div
                        className="scorelist__progress-fill scorelist__progress-fill--accuracy"
                        style={{
                          width: shouldAnimate ? `${overallAccuracy}%` : '0%',
                        }}
                      ></div>
                      <span className="scorelist__item-score-value">
                        {overallAccuracy}%
                      </span>
                    </div>
                  </div>
                </div>
                <div className="scorelist__inaccuracy-item">
                  <div className="scorelist__overall-label">不正解率</div>
                  <div className="scorelist__progress-bar-wrap">
                    <div className="scorelist__item-score-bar-container">
                      <div
                        className="scorelist__progress-fill scorelist__progress-fill--inaccuracy"
                        style={{
                          width: shouldAnimate ? `${overallInaccuracy}%` : '0%',
                        }}
                      ></div>
                      <div className="scorelist__overall-value scorelist__overall-value--inaccuracy scorelist__item-score-value">
                        {overallInaccuracy}%
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </main>
    </Layout>
  );
};

export default ScoreList;
