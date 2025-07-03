import { useState, useEffect } from 'react';

const useScoreData = () => {
  const [scores, setScores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDummyScores = async () => {
      try {
        // データ取得の遅延シミュレート
        await new Promise((resolve) => setTimeout(resolve, 1000));

        //ダミーデータ
        const dummyScores = [
          {
            id: 's1',
            score: 95,
            accuracy: 98,
            inaccuracy: 2,
            Timestamp: new Date('2024-07-01T10:00:00Z').getTime(),
          },
          {
            id: 's2',
            score: 88,
            accuracy: 90,
            inaccuracy: 10,
            Timestamp: new Date('2024-06-28T14:30:00Z').getTime(),
          },
          {
            id: 's3',
            score: 72,
            accuracy: 75,
            inaccuracy: 25,
            Timestamp: new Date('2024-06-25T09:15:00Z').getTime(),
          },
          {
            id: 's4',
            score: 99,
            accuracy: 100,
            inaccuracy: 0,
            Timestamp: new Date('2024-06-20T18:00:00Z').getTime(),
          },
          {
            id: 's5',
            score: 80,
            accuracy: 85,
            inaccuracy: 15,
            Timestamp: new Date('2024-06-15T11:45:00Z').getTime(),
          },
        ];

        const sortedScores = dummyScores.sort(
          (a, b) => b.Timestamp - a.Timestamp
        );

        setScores(sortedScores);
        setLoading(false);
      } catch (err) {
        console.error('ダミースコアデータの取得中にエラーが発生しました:', err);
        setError('スコアデータの読み込みに失敗しました。');
        setLoading(false);
      }
    };

    fetchDummyScores();
  }, []); //コンポーネントマウント時に一度だけ実行

  return { scores, loading, error };
};

export default useScoreData;
