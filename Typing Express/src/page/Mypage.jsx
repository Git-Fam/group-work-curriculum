import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, query, orderBy, limit, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import '../assets/styles/global.scss';
import '../assets/styles/mypage.scss';
import '../assets/styles/button.scss';
import Layout from '../components/Layout';
import { Button } from '../components/Button';
import { useAuth } from '../assets/contexts/AuthContext.jsx';
import { truncateText } from '../components/Long-text-limit';
import {
  formatTimestamp,
  formatDateForScore,
} from '../components/dateUtils.jsx';

const Mypage = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  // ルーレットデータを管理するステート
  const [roulettes, setRoulettes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  //最高スコアを管理するステート
  const [highestScore, setHighestScore] = useState(0);
  //最高スコアタイムスタンプ管理ステート
  const [highestScoreTimestamp, setHigestScoreTimestamp] = useState(null);

  const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';

  // コンポーネントがマウントされたときにルーレットデータとスコアデータを取得
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError('');

      //ルーレットデータの取得
      try {
        const qRoulerres = query(
          collection(db, 'roulettes'),
          orderBy('createdAt', 'desc'), //作成日時の新しい順にソート
          limit(3) //最大表示数;
        );
        const querySnapshotRoulettes = await getDocs(qRoulerres);
        const fetchedRoulettes = querySnapshotRoulettes.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setRoulettes(fetchedRoulettes);
      } catch (err) {
        console.error('ルーレットデータの取得にエラーが発生しました:', err);
        setError('ルーレットデータの読み込みに失敗しました。');
      }

      //最高スコアの取得
      if (currentUser?.uid) {
        try {
          const scoresCollectionRef = collection(
            db,
            'artifacts',
            appId,
            'users',
            currentUser.uid,
            'scores'
          );
          const qScores = query(scoresCollectionRef);
          const querySnapshotScores = await getDocs(qScores);

          let maxScore = 0;
          let maxScoreTs = null; //最高スコアのタイムスタンプを一時的に保存
          if (!querySnapshotScores.empty) {
            querySnapshotScores.docs.forEach((doc) => {
              const scoreData = doc.data();
              if (scoreData.score > maxScore) {
                maxScore = scoreData.score;
                maxScoreTs = scoreData.Timestamp;
              }
            });
          }
          setHighestScore(maxScore);
          setHigestScoreTimestamp(maxScoreTs); //最高タイムのタイムスタンプを設定
        } catch (err) {
          console.error('最高スコアの取得にエラーが発生しました:', err);
          setError((prev) =>
            prev
              ? prev + 'また、最高スコアの読み込みにも失敗しました。'
              : '最高スコアの読み込みに失敗しました。'
          );
        }
      } else {
        console.warn(
          'ユーザーがログインしていないため、最高スコアは表示されませせん。'
        );
        setHighestScore(0);
        setHigestScoreTimestamp(null);
        //念のため、ログインしていない時の為の処理
      }
      setLoading(false);
    };

    fetchData();
  }, [currentUser, appId]);

  return (
    <Layout>
      {/* main */}
      <main className="mypage__body">
        <div className="mypage__card card">
          <h2 className="mypage__page-title page-title">Mypage</h2>

          <div className="mypage__field--user-info">
            <p className="mypage__topic mypage__topic--user-info">
              ユーザー情報
            </p>
            <div className="mypage__wrap--name">
              <p className="mypage__wrap--text">ユーザー名</p>
              <div className="mypage__wrap--accout-name mypage__wrap--accout">
                {currentUser?.displayName || '未設定'}
              </div>
            </div>
            <div className="mypage__wrap--email">
              <p className="mypage__wrap--text">メールアドレス</p>
              <div className="mypage__wrap--accout-email mypage__wrap--accout">
                {currentUser?.email || '未設定'}
              </div>
            </div>
          </div>

          <div className="mypage__field--score">
            <p className="mypage__topic mypage__topic--score">最高スコア</p>
            <div className="mypage__score-bar-container">
              <div
                className="mypage__score-bar-fill"
                style={{ width: `${highestScore}%` }}
              ></div>
              <div className="mypage__wrap--score-bar">
                <span className="mypage__score-value">
                  {loading ? '読み込み中...' : `${highestScore}%`}
                </span>
                {highestScoreTimestamp && (
                  <span className="mypage__score-date">
                    {formatDateForScore(highestScoreTimestamp)}
                  </span>
                )}
              </div>
              <div className="mypage__button--score-list">
                <span
                  className="mypage__button--title mypage__button--title--score"
                  onClick={() => navigate('/score-list')}
                >
                  スコア一覧へ
                </span>
              </div>
            </div>
          </div>

          <div className="mypage__field--roulette">
            <p className="mypage__topic mypage__topic--roulette">ルーレット</p>
            <div className="mypage__table--roulette-wrapper">
              <table className="mypage__table--roulette">
                <thead className="mypage__thead">
                  <tr className="mypage__tr">
                    <th className="mypage__th--title">ルーレットタイトル</th>
                    <th className="mypage__th--data">作成日</th>
                    {/* ルーレットを最大３表示 */}
                  </tr>
                </thead>
                <tbody className="mypage__tbody">
                  {roulettes.length > 0 ? (
                    roulettes.map((roulette) => (
                      <tr key={roulette.id}>
                        <td className="mypage__td--title">
                          {truncateText(roulette.title, 12)}
                        </td>
                        <td className="mypage__td--data">
                          {formatDateForScore(roulette.createdAt)}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="3" className="mypage__no-data">
                        登録されたルーレットはありません。
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
              <div
                className="mypage__button--roulette-list"
                onClick={() => navigate('/roulette-list')}
              >
                <span className="mypage__button--title mypage__button--title--roulette">
                  ルーレット一覧へ
                </span>
                <span className="mypage__button--arrow"></span>
              </div>
            </div>
          </div>

          <div className="mypage__button-area">
            <Button
              onClick={() => navigate('/practice-select')}
              className="mypage__button-try button-gradient"
            >
              TRY
            </Button>
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default Mypage;
