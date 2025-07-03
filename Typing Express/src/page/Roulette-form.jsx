import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../assets/styles/global.scss';
import '../assets/styles/roulette-form.scss';
import '../assets/styles/button.scss';
import Layout from '../components/Layout';
import { Button } from '../components/Button';

const RouletteForm = ({
  initialTitle = '',
  initialProblems = [{ id: 1, text: '' }],
  isEditing = false,
  loading = false,
  error: initialError = '',
  onDelete,
}) => {
  const navigate = useNavigate();
  const [title, setTitle] = useState(initialTitle); // タイトルの管理
  const [problems, setProblems] = useState(initialProblems); // 問題の管理、問題文はtextに保管
  const [error, setError] = useState(initialError); // エラーメッセージの管理

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

    //ルーレットの登録、更新ロジック
    try {
      console.log('送信データ:', { title, problems: filteredProblems });

      //ここに登録、更新処理を記述

      //成功した場合の処理
      if (isEditing) {
        //更新完了メッセージ
        alert('ルーレットを更新しました！');
      } else {
        //登録完了メッセージ
        alert('ルーレットを登録しました!');
      }
      navigate('/roulette-list');
    } catch (err) {
      //エラー発生時の処理
      setError('データ保存中にエラーが発生しました。');
      console.error('保存エラー:', err);
    }
  };

  // ルーレット削除のハンドラー (編集ページから削除)
  const handleDeleteRouletteFromForm = async () => {
    if (window.confirm('このルーレットを本当に削除しますか？')) {
      if (onDelete) {
        onDelete();
      } else {
        alert('削除(ダミー)');
        navigate('/roulette-list'); // ルーレット一覧ページに遷移
      }
    }
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
