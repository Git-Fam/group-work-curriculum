import { useState, useEffect } from 'react';

// ダミーのルーレットデータを非同期的に取得するカスタムフック

const useRouletteData = () => {
  const [rouletteOptions, setRouletteOptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRoulettes = async () => {
      try {
        //データ取得の遅延シミュレート
        await new Promise((resolve) => setTimeout(resolve, 1000));

        //ダミーデータ
        const dummyData = [
          {
            id: '1',
            title: 'ダミー1',
            problems: ['かきくけこ', 'えお', 'あいう'],
          },
          { id: '2', title: 'ダミー2', problems: ['abc', 'efg', 'hij'] },
          { id: '3', title: 'ダミー3', problems: ['123', '456', '789'] },
        ];

        setRouletteOptions(dummyData);
        setLoading(false);
      } catch (err) {
        console.error('ルーレットデータの取得にエラーが発生しました:', err);
        setError('ルーレットデータの取得に失敗しました。');
        setLoading(false);
      }
    };

    fetchRoulettes();
  }, []); //コンポーネントマウント時に一度だけ実行

  return { rouletteOptions, loading, error };
};

export default useRouletteData;
