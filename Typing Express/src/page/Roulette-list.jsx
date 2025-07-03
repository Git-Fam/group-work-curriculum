import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/styles/global.scss';
import '../assets/styles/roulette-list.scss';
import Layout from '../components/Layout';
import { Button } from '../components/Button';
import { truncateText } from '../components/Long-text-limit';
import { formatDateForScore } from '../components/dateUtils.jsx';

const dummyRoulettes = [
  {
    id: '1',
    title: 'ダミールーレット1',
    createdAt: new Date(),
  },
  {
    id: '2',
    title: 'ダミールーレット2',
    createdAt: new Date(),
  },
];

const RouletteList = ({
  initialRoulettes = dummyRoulettes,
  loading = false,
  error = '',
}) => {
  const navigate = useNavigate();
  const [roulettes, setRoulettes] = useState(initialRoulettes);

  const handleDeleteRoulette = (id) => {
    if (window.confirm('このルーレットを削除しますか？')) {
      setRoulettes(roulettes.filter((r) => r.id !== id));
      alert('削除（ダミー）');
    }
  };

  if (loading) {
    return (
      <Layout>
        <main className="roulette-list-body">
          <p>読み込み中...</p>
        </main>
      </Layout>
    );
  }

  return (
    <Layout>
      <main className="roulette-list__body">
        <div className="roulette-list__card card">
          <h2 className="roulette-list__title page-title">Roulette</h2>

          <div className="roulette-list__field">
            <div className="roulette-list__table--outside">
              <p className="roulette-list__topic">ルーレット</p>
              <Button
                className="roulette-list__button--new button-gradient"
                onClick={() => navigate('/roulette-form')}
              >
                新規作成
              </Button>
            </div>
            <div className="roulette-list__table-wrapper">
              <table className="roulette-list__table">
                <thead className="roulette-list__thead">
                  <tr className="roulette-list__tr">
                    <th className="roulette-list__th--title roulette-list__th">
                      ルーレットタイトル
                    </th>
                    <th className="roulette-list__th--data roulette-list__th">
                      作成日
                    </th>
                    <th className="roulette-list__th--blank roulette-list__th"></th>
                    <th className="roulette-list__th--blank roulette-list__th"></th>
                  </tr>
                </thead>
                <tbody className="roulette-list__tbody">
                  {roulettes.length === 0 ? (
                    <tr>
                      <td
                        colSpan="4"
                        style={{ textAlign: 'center', padding: '20px' }}
                      >
                        まだルーレットがありません。新規作成してください。
                      </td>
                    </tr>
                  ) : (
                    roulettes.map((roulette) => (
                      <tr key={roulette.id}>
                        <td>{truncateText(roulette.title, 12)}</td>
                        <td>{formatDateForScore(roulette.createdAt)}</td>
                        <td className="roulette-list__edit-button-area">
                          <Button
                            className="roulette-list__edit-button roulette-list__tbody--action"
                            onClick={() =>
                              navigate(`/roulette-form/${roulette.id}`)
                            }
                          >
                            編集
                          </Button>
                        </td>
                        <td className="roulette-list__delete-button-area">
                          <Button
                            className="roulette-list__delete-button roulette-list__tbody--action"
                            onClick={() => handleDeleteRoulette(roulette.id)}
                          >
                            削除
                          </Button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default RouletteList;
