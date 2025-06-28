import React, { useEffect, useState } from 'react';
import { collection, query, orderBy, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import '../assets/styles/global.scss';
import '../assets/styles/scorelist.scss';
import '../assets/styles/button.scss';
import Layout from '../components/Layout';
import { useAuth } from '../assets/contexts/AuthContext.jsx';
import { formatDateForScore } from '../components/dateUtils';

const ScoreList = () => {
  const { currentUser } = useAuth();

  const [scores, setScores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [overallAccuracy, setOverallAccuracy] = useState(0); //正解率
  const [overallInaccuracy, setOverallInaccuracy] = useState(0); //不正解率
  const [shouldAnimate, setShouldAnimate] = useState(false);

  const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';

  useEffect(() => {
    const fetchScores = async () => {
      if (!currentUser?.uid) {
        setError('ログインしているユーザーが見つかりません。');
        setLoading(false);
        return;
      }

      setLoading(true);
      setError('');
      setScores([]);
      setOverallAccuracy(0);
      setOverallInaccuracy(0);
      setShouldAnimate(false);

      try {
        const scoresCollectionRef = collection(
          db,
          'artifacts',
          appId,
          'users',
          currentUser.uid,
          'scores'
        );
        const q = query(scoresCollectionRef, orderBy('Timestamp', 'desc'));
        const querySnapshot = await getDocs(q);

        const fetchedScores = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        let totalAccuracySum = 0;
        let totalInaccuracySum = 0;
        const numberOfSessions = fetchedScores.length;

        if (numberOfSessions > 0) {
          fetchedScores.forEach((scoreDate) => {
            if (typeof scoreDate.accuracy === 'number') {
              totalAccuracySum += scoreDate.accuracy;
            }
            if (typeof scoreDate.inaccuracy === 'number') {
              totalInaccuracySum += scoreDate.inaccuracy;
            }
          });

          // 全体の正解率・不正解率を計算
          const calculatedOverallAccuracy = totalAccuracySum / numberOfSessions;
          const calculatedOverallInaccuracy =
            totalInaccuracySum / numberOfSessions;

          setScores(fetchedScores); // 実際のスコアを設定
          setOverallAccuracy(Math.round(calculatedOverallAccuracy));
          setOverallInaccuracy(Math.round(calculatedOverallInaccuracy));

          setTimeout(() => {
            setShouldAnimate(true);
          }, 50);
        } else {
          // スコアがない場合も0に設定
          setScores([]);
          setOverallAccuracy(0);
          setOverallInaccuracy(0);
        }
      } catch (err) {
        console.error('スコアデータの取得に失敗しました:', err);
        setError('スコアデータの読み込みに失敗しました。');
      } finally {
        setLoading(false);
      }
    };
    fetchScores();
  }, [currentUser, appId]);

  return (
    <Layout>
      <main className="scorelist__body">
        <div className="scorelist__card card">
          <h2 className="scorelist__page-title page-title">Score</h2>
          {loading && (
            <p className="scorelist__message">スコアを読み込み中...</p>
          )}
          {error && (
            <p className="scorelist__message scorelist__message--error">
              {error}
            </p>
          )}
          {!loading && !error && (
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
