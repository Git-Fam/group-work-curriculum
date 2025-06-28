import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { Button } from '../components/Button';
import '../assets/styles/roulette-select.scss';
import { truncateText } from '../components/Long-text-limit';

// Firestore関連のインポート
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase'; // Firebaseのdbインスタンスをインポート

const RouletteSelectScreen = () => {
  const navigate = useNavigate();
  // Firestoreから取得したルーレット項目を保持するステート
  const [rouletteOptions, setRouletteOptions] = useState([]);
  // データの読み込み状態を管理するステート
  const [loading, setLoading] = useState(true);
  // ルーレットが回転中かどうかを管理するステート
  const [isSpinning, setIsSpinning] = useState(false);
  // 選択されたルーレット項目を保持するステート
  const [selectedItem, setSelectedItem] = useState(null);
  // ルーレット要素への参照
  const rouletteRef = useRef(null);
  // ルーレットの最終的な停止位置（translateY）を管理するステート
  const [finalStopPosition, setFinalStopPosition] = useState(0);

  // // カスタムモーダル表示用のステート
  // const [showModal, setShowModal] = useState(false);
  // const [modalMessage, setModalMessage] = useState('');

  // // カスタムモーダルを表示する関数
  // const showCustomModal = (message) => {
  //   setModalMessage(message);
  //   setShowModal(true);
  // };

  // // カスタムモーダルを非表示にする関数
  // const hideCustomModal = () => {
  //   setShowModal(false);
  //   setModalMessage('');
  // };

  // コンポーネントがマウントされた時にFirestoreからルーレットデータを取得
  useEffect(() => {
    const fetchRoulettes = async () => {
      try {
        // 'roulettes' コレクションからすべてのドキュメントを取得
        const querySnapshot = await getDocs(collection(db, 'roulettes'));
        const fetchedOptions = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          title: doc.data().title,
          problems: doc.data().problems, // 問題文の配列
        }));

        setRouletteOptions(fetchedOptions);
        setLoading(false); // 読み込み完了
      } catch (error) {
        console.error('ルーレットデータの取得中にエラーが発生しました:', error);
        showCustomModal('ルーレットデータの取得に失敗しました。');
        setLoading(false);
      }
    };

    fetchRoulettes();
  }, []); // 空の依存配列で一度だけ実行

  const itemHeight = 80; // 各ルーレット項目の高さ (CSSと合わせる)
  const windowHeight = 90; // roulette-windowの高さ (CSSと合わせる)
  const windowCenterOffset = (windowHeight - itemHeight) / 2; // 中央に配置するためのオフセット (5px)

  // ルーレットの項目を繰り返し表示するための配列
  // 無限に近い回転をシミュレートするため、十分な数の繰り返しを確保
  const numRepeats = 15;
  const repeatedOptions = [];
  for (let i = 0; i < numRepeats; i++) {
    rouletteOptions.forEach((item, innerIndex) =>
      repeatedOptions.push({
        ...item,
        displayId: `${item.id}-${i}-${innerIndex}`, // keyは`item.id`と繰り返しの`i`と`innerIndex`で生成
      })
    );
  }

  // ルーレットを回転させる関数
  const startSpinning = () => {
    // 回転中か、ルーレット項目がない場合は何もしない
    if (isSpinning || rouletteOptions.length === 0) {
      if (rouletteOptions.length === 0) {
        showCustomModal(
          'ルーレットに表示するデータがありません。先にルーレットを登録してください。'
        );
      }
      return;
    }

    setIsSpinning(true);
    setSelectedItem(null); // 選択状態をリセット

    if (rouletteRef.current) {
      // 現在適用されているかもしれないtransitionを一時的にnoneにする
      rouletteRef.current.style.transition = 'none';
      // アニメーションを常に0pxから開始させる（スムーズなループのため）
      rouletteRef.current.style.transform = `translateY(0px)`;

      // @keyframes アニメーションの継続サイクル高さを設定
      // `--roulette-cycle-height` は CSS で `to { transform: translateY(var(--roulette-cycle-height)); }` で使用

      rouletteRef.current.style.setProperty(
        '--roulette-cycle-height',
        `-${rouletteOptions.length * itemHeight}px`
      );

      // CSSアニメーションクラスを追加して回転を開始
      rouletteRef.current.classList.add('is-spinning');
      // アニメーションの速度を設定 (例: 0.5sで1サイクル)
      rouletteRef.current.style.animationDuration = '0.2s';
      //ルーレット回転方向
      rouletteRef.current.style.animationDirection = 'normal';
    }
  };

  // ルーレットを停止させる関数（手動停止用）
  const stopSpinning = () => {
    if (!isSpinning) return; // すでに停止中の場合は何もしない

    setIsSpinning(false);

    // 1. CSSアニメーションを即座に停止し、現在の表示位置を固定
    // `getComputedStyle` でアニメーション中の現在の `transform` 値を取得
    const currentTransform = window.getComputedStyle(
      rouletteRef.current
    ).transform;

    // `is-spinning` クラスを削除して `@keyframes` アニメーションを停止
    rouletteRef.current.classList.remove('is-spinning');

    // 取得した `transform` 値を直接要素に設定し、`transition` を `none` にすることでその場に固定
    rouletteRef.current.style.transition = 'none';
    rouletteRef.current.style.transform = currentTransform;
    // ここで animationDirection もリセット
    rouletteRef.current.style.animationDirection = 'normal';

    // 2. ブラウザが上記スタイル変更を適用するのを待ってから、次のアニメーションを開始
    requestAnimationFrame(() => {
      // 3. ランダムな停止位置を計算
      const randomStopItemIndex = Math.floor(
        Math.random() * rouletteOptions.length
      );
      setSelectedItem(rouletteOptions[randomStopItemIndex]);

      // 4. 最終的にスナップする位置を計算
      // 停止時の「少し流れてから止まる」効果を出すため、現在の位置から最低数サイクル分は回って停止させる
      const numCyclesToSnap = 3; // 例えば、停止ボタンを押してから最低3周分回って停止

      // 最終的に停止するアイテムが `repeatedOptions` 配列のどこに位置するか
      // (特定のサイクル + randomStopItemIndex)
      const targetItemAbsoluteIndex =
        rouletteOptions.length * numCyclesToSnap + randomStopItemIndex;

      // 最終的な `translateY` 値を計算 (目標アイテムの上端が `roulette-window` の中央にくるように調整)
      const finalTranslateY = -(
        targetItemAbsoluteIndex * itemHeight -
        windowCenterOffset
      );

      // 5. 新しい最終位置へのスムーズな減速アニメーションを設定
      rouletteRef.current.style.transition =
        'transform 2s cubic-bezier(0.25, 0.46, 0.45, 0.94)';

      // 6. 新しい最終位置に設定
      rouletteRef.current.style.transform = `translateY(${finalTranslateY}px)`;
    });
  };

  // 選択した練習内容でタイピングスタート画面へ遷移する関数
  const handleStartPractice = () => {
    if (selectedItem) {
      navigate('/practice-start', {
        state: {
          title: selectedItem.title,
          problems: selectedItem.problems,
        },
      });
    }
  };

  // データの読み込み中の表示
  if (loading) {
    return (
      <Layout>
        <main className="roulette-select__body">
          <p>Loading...</p>
        </main>
      </Layout>
    );
  }

  return (
    <Layout>
      <main className="roulette-select__body">
        {rouletteOptions.length === 0 ? (
          // ルーレットデータがない場合の表示
          <div className="roulette-no-data-message">
            <p>ルーレットに表示するデータがありません。</p>
            <Button
              className="roulette-select__button roulette-select__button--nav"
              onClick={() => navigate('/roulette-form')}
            >
              ルーレットを登録する
            </Button>
          </div>
        ) : (
          // ルーレットデータがある場合の表示
          <>
            <div className="roulette-select__container">
              <div className="roulette-select__window">
                <div
                  className="roulette-select__wheel"
                  ref={rouletteRef}
                  // `style.transform` はJSで動的に設定されるため、ここでは初期値のみ
                  style={{ transform: `translateY(${finalStopPosition}px)` }}
                >
                  {repeatedOptions.map((item) => (
                    <div
                      key={item.displayId} // 重複IDを避けるためdisplayIdを使用
                      className="roulette-select__item"
                    >
                      <span>{truncateText(item.title, 10)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="roulette-select__button-controls">
              {/* スタートボタン */}
              {!isSpinning && !selectedItem && (
                <Button
                  className="roulette-select__button roulette-select__button--start start-button app-font"
                  onClick={startSpinning}
                >
                  Start
                </Button>
              )}

              {/* ストップボタン */}
              {isSpinning && (
                <Button
                  className="roulette-select__button roulette-select__button--stop stop-button app-font"
                  onClick={() => stopSpinning()}
                >
                  Stop
                </Button>
              )}

              {/* 選択された内容の表示と関連ボタン */}
              {selectedItem && !isSpinning && (
                <>
                  <Button
                    className="roulette-select__button roulette-select__button--nav select-button app-font"
                    onClick={handleStartPractice}
                  >
                    Select
                  </Button>
                </>
              )}
            </div>
          </>
        )}
      </main>
    </Layout>
  );
};

export default RouletteSelectScreen;
