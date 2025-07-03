import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';

import Layout from '../components/Layout';
import { Button } from '../components/Button';
import '../assets/styles/typing-practice.scss';
import '../assets/styles/global.scss';
import { truncateText } from '../components/Long-text-limit';

import { convertRomajiToHiragana } from '../components/RomajiToHiraganaConverter';

const fetchProblemsFromAPI = async () => {
  try {
    const response = await fetch('http://api.quotable.io/random');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();

    return {
      title: data.author || 'Default',
      problems: [data.content.trim()],
    };
  } catch (error) {
    console.error('問題の取得に失敗しました:', error);
    return { title: 'エラー', problems: [] };
  }
};

const toHiragana = convertRomajiToHiragana;

const TypingPractice = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;
  const [title, setTitle] = useState('');
  const [problems, setProblems] = useState([]);
  const [input, setInput] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isCompleted, setIsCompleted] = useState(false);
  const [countdown, setCountdown] = useState(3);
  const [isPracticeStarted, setIsPracticeStarted] = useState(false);
  const [correctCharCount, setCorrectCharCount] = useState(0);
  const [typedCharCount, setTypedCharCount] = useState(0);
  const [mistakeCount, setMistakeCount] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);

  const inputRef = useRef(null);

  useEffect(() => {
    const load = async () => {
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

      try {
        let fetchedTitle = '';
        let fetchedProblemsData = [];

        if (
          state?.title &&
          Array.isArray(state.problems) &&
          state.problems.length > 0
        ) {
          fetchedTitle = state.title;
          fetchedProblemsData = state.problems;
        } else {
          const data = await fetchProblemsFromAPI();
          fetchedTitle = data.title;
          fetchedProblemsData = data.problems;
        }

        setTitle(fetchedTitle);
        setProblems(fetchedProblemsData);
      } catch (e) {
        setErrorMessage('データ取得に失敗しました。');
        setProblems([]);
      } finally {
        setIsLoading(false);
      }
    };
    load();
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
      const typedRomaji = e.target.value;
      const currentProblem = problems[currentIndex];

      if (!isPracticeStarted || isCompleted || !currentProblem) {
        setInput(typedRomaji);
        return;
      }

      setTypedCharCount((prev) => prev + 1);

      const isJapaneseProblem = /[ぁ-ゔァ-ヴ一-龯]/u.test(currentProblem);

      let convertedText = '';
      let correctInputMatch = true;

      if (isJapaneseProblem) {
        const tempConvertedHiragana = toHiragana(typedRomaji);
        const problemSubstring = currentProblem.substring(
          0,
          tempConvertedHiragana.length
        );
        if (tempConvertedHiragana !== problemSubstring) {
          correctInputMatch = false;
        }
        convertedText = tempConvertedHiragana;
      } else {
        const problemSubstring = currentProblem
          .toLowerCase()
          .substring(0, typedRomaji.length);
        if (typedRomaji.toLowerCase() !== problemSubstring) {
          correctInputMatch = false;
        }
        convertedText = typedRomaji;
      }

      if (!correctInputMatch) {
        setMistakeCount((prev) => prev + 1);
        setErrorMessage('入力が間違っています');
      } else {
        setInput(typedRomaji);
        setErrorMessage('');
      }

      const finalCheckText = isJapaneseProblem ? convertedText : typedRomaji;
      if (
        finalCheckText.length === currentProblem.length &&
        correctInputMatch
      ) {
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
    [problems, currentIndex, isPracticeStarted, isCompleted, toHiragana]
  );

  const calculateScore = useCallback(() => {
    const totalProblemChars = problems.reduce(
      (acc, problem) => acc + problem.length,
      0
    );
    if (totalProblemChars === 0) return 0;

    // スコア計算にタイプミス数を考慮する
    // 正しくタイプされた文字数からタイプミス数を減算し、それを総文字数で割る
    const effectiveCorrectChars = Math.max(0, correctCharCount - mistakeCount);
    const accuracy = (effectiveCorrectChars / totalProblemChars) * 100;

    return Math.min(100, Math.max(0, accuracy)); // 0%から100%の範囲に制限
  }, [correctCharCount, problems, mistakeCount]); // mistakeCountを依存配列に追加

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

  const renderProblem = useCallback(() => {
    if (problems.length === 0 || currentIndex >= problems.length) return null;

    const currentProblem = problems[currentIndex];
    const isJapaneseProblem = /[ぁ-ゔァ-ヴ一-龯]/u.test(currentProblem);

    let typedPartForDisplay = '';
    let untypedPartForDisplay = '';

    if (isJapaneseProblem) {
      const convertedHiraganaFromInput = toHiragana(input);

      // 正解部分の長さをカウント
      let matchLength = 0;
      for (let i = 0; i < convertedHiraganaFromInput.length; i++) {
        if (
          i < currentProblem.length &&
          convertedHiraganaFromInput[i] === currentProblem[i]
        ) {
          matchLength++;
        } else {
          break;
        }
      }

      // ✅ 表示は「ユーザーが入力したローマ字をひらがなに変換した文字列」
      typedPartForDisplay = convertedHiraganaFromInput.substring(
        0,
        matchLength
      );
      untypedPartForDisplay = currentProblem.substring(matchLength);
    } else {
      // 英語の処理は現状維持
      const problemLower = currentProblem.toLowerCase();
      const inputLower = input.toLowerCase();

      let correctCharsCount = 0;
      for (let k = 0; k < inputLower.length; k++) {
        if (k < problemLower.length && inputLower[k] === problemLower[k]) {
          correctCharsCount++;
        } else {
          break;
        }
      }

      typedPartForDisplay = currentProblem.substring(0, correctCharsCount);
      untypedPartForDisplay = currentProblem.substring(correctCharsCount);
    }

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
  }, [input, currentIndex, problems, errorMessage, toHiragana]);

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
