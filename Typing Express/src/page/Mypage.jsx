import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/styles/global.scss';
import '../assets/styles/mypage.scss';
import '../assets/styles/button.scss';
import Layout from '../components/Layout';
import { Button } from '../components/Button';
import { truncateText } from '../components/Long-text-limit';
import { formatDateForScore } from '../components/dateUtils.jsx';

const Mypage = ({
  user = { displayName: '未設定', email: '未設定' },
  highestScore = 0,
  highestScoreTimestamp = null,
  roulettes = [],
  loading = false,
  error = '',
}) => {
  const navigate = useNavigate();

  // 仮のデータを使用しているため、実際のデータ取得ロジックは省略

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
                {user.displayName || '未設定'}
              </div>
            </div>
            <div className="mypage__wrap--email">
              <p className="mypage__wrap--text">メールアドレス</p>
              <div className="mypage__wrap--accout-email mypage__wrap--accout">
                {user.email || '未設定'}
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
