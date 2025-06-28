import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import Layout from '../components/Layout';
import { Button} from '../components/Button';
import '../assets/styles/typing-practice.scss';
import '../assets/styles/global.scss';
import { useAuth } from '../assets/contexts/AuthContext';
import { truncateText } from '../components/Long-text-limit';

import { convertRomajiToHiragana } from '../components/RomajiToHiraganaConverter';

// インポートした関数を toHiragana 変数に割り当てる
const toHiragana = convertRomajiToHiragana;

const TypingPractice = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;

  const [title, setTitle] = useState('');
  const [problems, setProblems] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [input, setInput] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isCompleted, setIsCompleted] = useState(false);
  const [countdown, setCountdown] = useState(3);
  const [isPracticeStarted, setIsPracticeStarted] = useState(false);
  const [correctCharCount, setCorrectCharCount] = useState(0);
  const [typedCharCount, setTypedCharCount] = useState(0);
  const [mistakeCount, setMistakeCount] = useState(0);

  const inputRef = useRef(null);

  useEffect(() => {
    const fetchProblems = async () => {
      setIsLoading(true);
      setErrorMessage('');
      setIsCompleted(false);
      setInput('');
      setCurrentIndex(0);
      setCountdown(3);
      setIsPracticeStarted(false);
      setCorrectCharCount(0);
      setTypedCharCount(0);
      setMistakeCount(0);

      let fetchedProblems = [];
      let fetchedTitle = '';

      if (
        state &&
        state.title &&
        Array.isArray(state.problems) &&
        state.problems.length > 0
      ) {
        fetchedTitle = state.title;
        fetchedProblems = state.problems;
      } else if (id) {
        try {
          const docRef = doc(db, 'roulettes', id);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            const data = docSnap.data();
            fetchedTitle = data.title;
            fetchedProblems = Array.isArray(data.problems) ? data.problems : [];
          } else {
            setErrorMessage('指定されたルーレットが見つかりませんでした。');
            fetchedTitle = 'エラー';
            fetchedProblems = [];
          }
        } catch (error) {
          console.error(
            'Firestoreからのデータ取得中にエラーが発生しました:',
            error
          );
          setErrorMessage(
            'ルーレットの取得に失敗しました。ネットワーク接続を確認してください。'
          );
          fetchedTitle = 'エラー';
          fetchedProblems = [];
        }
      } else {
        try {
          const res = await fetch('http://api.quotable.io/random');
          if (!res.ok) {
            const errorText = await res.text();
            throw new Error(
              `APIエラー！ ステータス: ${res.status}, レスポンス: ${errorText}`
            );
          }
          const data = await res.json();
          fetchedTitle = 'default';
          fetchedProblems = [data.content];
        } catch (err) {
          console.error('APIエラー:', err.message);
          setErrorMessage(err.message || '取得に失敗しました。');
          fetchedTitle = 'エラー';
          fetchedProblems = [];
        }
      }

      setTitle(fetchedTitle);
      setProblems(fetchedProblems);
      setIsLoading(false);
    };
    fetchProblems();
  }, [id, state]);

  useEffect(() => {
    let timer;
    if (
      !isLoading &&
      problems.length > 0 &&
      countdown > 0 &&
      !isPracticeStarted
    ) {
      timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            setIsPracticeStarted(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [isLoading, problems, countdown, isPracticeStarted]);

  useEffect(() => {
    if (isPracticeStarted && !isCompleted) {
      const handleDocumentClick = () => {
        if (inputRef.current && document.activeElement !== inputRef.current) {
          inputRef.current.focus();
        }
      };

      document.addEventListener('click', handleDocumentClick);

      return () => {
        document.removeEventListener('click', handleDocumentClick);
      };
    }
  }, [isPracticeStarted, isCompleted]);

  useEffect(() => {
    if (
      inputRef.current &&
      !isLoading &&
      isPracticeStarted &&
      !isCompleted &&
      problems.length > 0
    ) {
      inputRef.current.focus();
    }
  }, [currentIndex, problems, isLoading, isCompleted, isPracticeStarted]);

  const handleChange = useCallback(
    (e) => {
      if (e.nativeEvent.isComposing) {
        return;
      }

      const typedValue = e.target.value;
      const currentProblem = problems[currentIndex];

      if (problems.length === 0 || !isPracticeStarted || isCompleted) return;

      const isJapaneseProblem = /[ぁ-ゔァ-ヴ一-龯]/u.test(currentProblem);

      if (!isJapaneseProblem) {
        // 全角文字（記号、英数、スペース、ひらがな、カタカナ）を検出する正規表現
        const fullWidthRegex = /[！-～ａ-ｚＡ-Ｚ０-９]/;
        const kanaRegex = /[ぁ-んァ-ヶ]/;
        if (fullWidthRegex.test(typedValue) || kanaRegex.test(typedValue)) {
          setMistakeCount((prev) => prev + 1);
          setErrorMessage('半角で入力してください');
          e.target.value = input; // 入力を以前の値に戻す
          return;
        }
      }

      let problemToCompare = currentProblem;
      let typedValueProcessed = typedValue;
      let valueToSetInputState = typedValue;
      let isCorrect = false;

      if (isJapaneseProblem) {
        typedValueProcessed = toHiragana(typedValue);
        isCorrect = currentProblem.startsWith(typedValueProcessed);

        valueToSetInputState = typedValueProcessed;
      } else {
        problemToCompare = currentProblem.toLowerCase();
        typedValueProcessed = typedValue.toLowerCase();
        isCorrect = problemToCompare.startsWith(typedValueProcessed);

        valueToSetInputState = typedValue;
      }

      if (isCorrect) {
        setInput(valueToSetInputState);
        setErrorMessage('');
      } else {
        setMistakeCount((prev) => prev + 1);
        setErrorMessage('入力が間違っています');
        e.target.value = input;
        return;
      }

      let completionValue = isJapaneseProblem
        ? toHiragana(typedValue)
        : typedValue.toLowerCase();

      if (completionValue === problemToCompare) {
        setCorrectCharCount((prev) => prev + currentProblem.length);

        if (currentIndex + 1 < problems.length) {
          setCurrentIndex(currentIndex + 1);
          setInput('');
          setErrorMessage('');
        } else {
          setIsCompleted(true);
          setInput('');
          setErrorMessage('');
        }
      }
    },
    [problems, currentIndex, isPracticeStarted, isCompleted, input]
  );

  const calculateScore = useCallback(() => {
    const totalProblemChars = problems.reduce(
      (acc, problem) => acc + problem.length,
      0
    );
    if (totalProblemChars === 0) return 0;

    const accuracy = Math.max(
      0,
      ((totalProblemChars - mistakeCount) / totalProblemChars) * 100
    );

    return Math.min(100, accuracy);
  }, [mistakeCount, problems]);

  useEffect(() => {
    if (isCompleted) {
      const score = calculateScore();
      navigate('/practice-result', {
        state: {
          title: title,
          score: score,
          problems: problems,
          correctCharCount: correctCharCount,
          typedCharCount: typedCharCount,
          mistakeCount: mistakeCount,
        },
      });
    }
  }, [
    isCompleted,
    calculateScore,
    navigate,
    title,
    problems,
    correctCharCount,
    typedCharCount,
    mistakeCount,
  ]);

  const renderProblem = () => {
    if (problems.length === 0 || currentIndex >= problems.length) return null;

    const currentProblem = problems[currentIndex];
    const isJapaneseProblem = /[ぁ-ゔァ-ヴ一-龯]/u.test(currentProblem);

    let typedPartForDisplay = '';
    let untypedPartForDisplay = '';

    if (isJapaneseProblem) {
      let correctCharsCount = 0;
      for (let i = 0; i < input.length; i++) {
        if (i < currentProblem.length && input[i] === currentProblem[i]) {
          correctCharsCount++;
        } else {
          break;
        }
      }
      typedPartForDisplay = currentProblem.substring(0, correctCharsCount);
      untypedPartForDisplay = currentProblem.substring(correctCharsCount);
    } else {
      let problemLower = currentProblem.toLowerCase();
      let inputLower = input.toLowerCase();

      let correctCharsCount = 0;
      for (let i = 0; i < inputLower.length; i++) {
        if (i < problemLower.length && inputLower[i] === problemLower[i]) {
          correctCharsCount++;
        } else {
          break;
        }
      }
      typedPartForDisplay = currentProblem.substring(0, correctCharsCount);
      untypedPartForDisplay = currentProblem.substring(correctCharsCount);
    }
    //エラーがある場合、未入部分の最初の文字にご入力スタイル適用
    const firstUntypedChar = untypedPartForDisplay.charAt(0);
    const restUntypedChars = untypedPartForDisplay.substring(1);

    return (
      <p className="current-problem">
        <span className="typed-correct">{typedPartForDisplay}</span>
        {errorMessage ? (
          <>
            <span className="untyped error-char">{firstUntypedChar}</span>
            <span className="untyped">{restUntypedChars}</span>
          </>
        ) : (
          <span className="untyped">{untypedPartForDisplay}</span>
        )}
      </p>
    );
  };

  const handleGoBack = () => {
    navigate('/roulette-select');
  };

  return (
    <Layout>
      <div className="typing-practice__container-wrap">
        <div className="typing-practice__container practice-container">
          <h2 className="typing-practice__title problems-title">
            {truncateText(title, 15)}
          </h2>

          {isLoading ? (
            <p className="typing-practice__loading-message">
              問題データを読み込み中...
            </p>
          ) : errorMessage && problems.length === 0 ? (
            <div className="typing-practice__error-display-area">
              <p className="typing-practice__error-message">{errorMessage}</p>
              <p>データが読み込みませんでした。</p>
              <Button
                onClick={handleGoBack}
                className="typing-practice__back-button"
              >
                ルーレット選択に戻る
              </Button>
            </div>
          ) : problems.length === 0 && !errorMessage ? (
            <div className="typing-practice__no-problems-message">
              <p>練習問題が登録されていません。</p>
              <Button
                onClick={handleGoBack}
                className="typing-practice__back-button"
              >
                ルーレット選択に戻る
              </Button>
            </div>
          ) : countdown > 0 ? (
            <div className="typing-practice__countdown-display">
              <p className="typing-practice__countdown-text app-font">
                {countdown}
              </p>
            </div>
          ) : isCompleted ? (
            <div className="typing-practice__completion-message">
              <p>練習が完了しました。結果画面へ遷移します...</p>
            </div>
          ) : (
            <>
              <div className="typing-practice__problems-display">
                {renderProblem()}
              </div>
              <input
                type="text"
                value={input}
                onChange={handleChange}
                className={`typing-practice__typing-input ${
                  errorMessage ? 'error' : ''
                }`}
                ref={inputRef}
                disabled={!isPracticeStarted || isCompleted}
                placeholder={
                  isPracticeStarted
                    ? 'ここにタイプしてください...'
                    : '準備中...'
                }
                autoFocus
                inputMode="verbatim"
              />
              {errorMessage && (
                <p className="typing-practice__input-error-message">
                  {errorMessage}
                </p>
              )}
            </>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default TypingPractice;
