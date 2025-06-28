import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  collection,
  doc,
  getDoc,
  updateDoc,
  deleteDoc,
  addDoc,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from '../firebase';
import '../assets/styles/global.scss';
import '../assets/styles/roulette-form.scss';
import '../assets/styles/button.scss';
import Layout from '../components/Layout';
import { Button } from '../components/Button';

const RouletteForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [title, setTitle] = useState(''); // タイトルの管理
  const [problems, setProblems] = useState([{ id: 1, text: '' }]); // 問題の管理、問題文はtextに保管
  const [error, setError] = useState(''); // エラー管理
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false); // 編集モードかどうか

  // コンポーネントマウント時、またはIDが変更された時にデータを読み込む
  useEffect(() => {
    if (id) {
      // IDがあれば編集モード
      setIsEditing(true);
      const fetchRoulette = async () => {
        try {
          const docRef = doc(db, 'roulettes', id);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            const data = docSnap.data();
            setTitle(data.title || '');
            // problemsは文字列の配列として保存されているので、適切な形式に変換
            setProblems(
              data.problems.map((text, index) => ({
                id: index + 1, // 仮のIDを付与
                text: text || '',
              }))
            );
            setError('');
          } else {
            setError('指定されたルーレットが見つかりませんでした。');
            navigate('/roulette-list');
          }
        } catch (err) {
          console.error(
            'ルーレットデータの読み込み中にエラーが発生しました:',
            err
          );
          setError('ルーレットデータの読み込みに失敗しました。');
        } finally {
          setLoading(false);
        }
      };
      fetchRoulette();
    } else {
      // IDがなければ新規作成モードへ
      setIsEditing(false);
      setTitle('');
      setProblems([{ id: 1, text: '' }]); // 初期状態にリセット
      setLoading(false);
    }
  }, [id, navigate]);

  const handleAddProblem = () => {
    // 問題追加用ハンドラー
    const newProblemId =
      problems.length > 0 ? Math.max(...problems.map((p) => p.id)) + 1 : 1;
    // 新しい問題のIDは、現在の問題リストの最大ID ＋１とする
    setProblems([...problems, { id: newProblemId, text: '' }]);
  };

  // 問題を削除するハンドラー
  const handleRemoveProblem = (id) => {
    // 指定されたIDの問題をフィルタリングして削除
    setProblems(problems.filter((problem) => problem.id !== id));
  };

  // 問題のテキストが変更された時のハンドラー
  const handleProblemChange = (id, newText) => {
    setProblems(
      problems.map((problem) =>
        problem.id === id ? { ...problem, text: newText } : problem
      )
    );
  };

  // ルーレット登録の送信ハンドラー
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // エラーメッセージをクリア

    // バリデーション
    if (!title.trim()) {
      setError('タイトルは必須です。');
      return;
    }

    // 空でない問題のみを抽出
    const filteredProblems = problems.filter((p) => p.text.trim() !== '');
    if (filteredProblems.length === 0) {
      setError('問題を1つ以上入力してください。');
      return;
    }

    try {
      if (isEditing) {
        // 編集モードの場合： ドキュメントを更新
        const docRef = doc(db, 'roulettes', id);
        await updateDoc(docRef, {
          title: title.trim(),
          problems: filteredProblems.map((p) => p.text.trim()),
        });
        alert('ルーレットが正常に更新されました！');
      } else {
        // 新規作成モードの場合：　新しいドキュメントを追加
        await addDoc(collection(db, 'roulettes'), {
          // cloud Firestoreの　'roulettes' コレクションに新しいドキュメントを保存します。
          title: title.trim(), // タイトルを保存
          problems: filteredProblems.map((p) => p.text.trim()), // 問題のテキストのみを保存する
          createdAt: serverTimestamp(), // Firebaseのサーバースタンプで作成日時を自動追記
        });
        alert('ルーレットが正常に登録されました！'); // 成功メッセージ
      }
      navigate('/roulette-list');
    } catch (err) {
      console.error('ルーレットの登録中にエラーが発生しました:', err);
      setError('ルーレットの登録に失敗しました。もう一度お試しください。');
    }
  };

  // ルーレット削除のハンドラー (編集ページから削除)
  const handleDeleteRouletteFromForm = async () => {
    if (window.confirm('このルーレットを本当に削除しますか？')) {
      try {
        await deleteDoc(doc(db, 'roulettes', id));
        alert('ルーレットが削除されました！');
        navigate('/roulette-list');
      } catch (err) {
        console.error('ルーレットの削除中にエラーが発生しました：', err);
        setError('ルーレットの削除に失敗しました。');
      }
    }
  };

  const formatTimestamp = (timestamp) => {
    if (!timestamp) return '日付なし'; // timestampが存在しない場合

    const date = timestamp.toDate();

    const year = date.getFullYear();

    const month = String(date.getMonth() + 1).padStart(2, '0');

    const day = String(date.getDate()).padStart(2, '0');

    return `${year}年${month}月${day}日`;
  };

  if (loading) {
    return (
      <Layout>
        <main className="roulette-form-body">
          <p>読み込み中... </p>
        </main>
      </Layout>
    );
  }

  return (
    <Layout>
      <main className="roulette-form__body">
        <div className="roulette-form__card card">
          <h2 className="roulette-form__page-title page-title">
            Roulette-Form
          </h2>

          <form onSubmit={handleSubmit}>
            <div className="roulette-form__input-area--title">
              <p className="roulette-form__text-title">タイトル</p>
              <input
                className="roulette-form__input--title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="roulette-form__input-area--quest">
              {/* problems配列をマップして各問題の入力フィールドと削除ボタンを表示/ */}

              {problems.map((problem, index) => (
                <div key={problem.id} className="roulette-form__problem-item">
                  <span className="roulette-form__problem-number">
                    問題{index + 1}
                  </span>
                  <div className="roulette-form__flex-container">
                    <input
                      className="roulette-form__input--quest"
                      type="text"
                      value={problem.text}
                      onChange={(e) =>
                        handleProblemChange(problem.id, e.target.value)
                      }
                    />
                    {/* 問題が1つ以上の場合は削除ボタンを表示 */}
                    {problems.length > 1 && (
                      <div className="roulette-form__button-remove-wrap">
                        <Button
                          type="button"
                          onClick={() => handleRemoveProblem(problem.id)}
                          className="roulette-form__button-remove"
                        >
                          削除
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
              <Button
                type="button"
                onClick={handleAddProblem}
                className="roulette-form__button-add"
              >
                問題追加
              </Button>
            </div>
            {/* エラーメッセージがあれば表示 */}
            {error && <p className="error-message">{error}</p>}

            <Button
              type="submit"
              className={`roulette-form__button-submit ${
                isEditing
                  ? 'roulette-form__button-submit--editing'
                  : 'button-gradient'
              }`}
            >
              {isEditing ? '更新' : '登録'}
            </Button>
            {isEditing && (
              <Button
                type="button"
                onClick={handleDeleteRouletteFromForm}
                className="roulette-form__button-delete-from-form"
              >
                削除
              </Button>
            )}
          </form>
        </div>
      </main>
    </Layout>
  );
};
export default RouletteForm;
