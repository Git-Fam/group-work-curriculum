import React from 'react';

const convertRomajiToHiragana = (romajiInput) => {
  let hiraganaOutput = '';
  let i = 0;

  const charMap = {
    // 拗音
    kya: 'きゃ',
    kyu: 'きゅ',
    kyo: 'きょ',
    sha: 'しゃ',
    shu: 'しゅ',
    sho: 'しょ',
    cha: 'ちゃ',
    chu: 'ちゅ',
    cho: 'ちょ',
    nya: 'にゃ',
    nyu: 'にゅ',
    nyo: 'にょ',
    hya: 'ひゃ',
    hyu: 'ひゅ',
    hyo: 'ひょ',
    mya: 'みゃ',
    myu: 'みゅ',
    myo: 'みょ',
    rya: 'りゃ',
    ryu: 'りゅ',
    ryo: 'りょ',
    gya: 'ぎゃ',
    gyu: 'ぎゅ',
    gyo: 'ぎょ',
    ja: 'じゃ',
    ju: 'じゅ',
    jyo: 'じょ', // jyoは標準的ではないが、よく使われるローマ字
    bya: 'びゃ',
    byu: 'びゅ',
    byo: 'びょ',
    pya: 'ぴゃ',
    pyu: 'ぴゅ',
    pyo: 'ぴょ',
    // 特殊な音
    tsu: 'つ',
    tu: 'つ', // tsuの別表記
    chi: 'ち',
    ti: 'ち', // chiの別表記
    shi: 'し',
    si: 'し', // shiの別表記
    ji: 'じ',
    zi: 'じ', // jiの別表記
    fu: 'ふ',
    hu: 'ふ', // fuの別表記
    wi: 'ゐ',
    we: 'ゑ',
    wo: 'を',
    // ザ行
    za: 'ざ',
    zu: 'ず',
    ze: 'ぜ',
    zo: 'ぞ',
    // ダ行
    da: 'だ',
    de: 'で',
    do: 'ど',
    // バ行
    ba: 'ば',
    bi: 'び',
    bu: 'ぶ',
    be: 'べ',
    bo: 'ぼ',
    // パ行
    pa: 'ぱ',
    pi: 'ぴ',
    pu: 'ぷ',
    pe: 'ぺ',
    po: 'ぽ',
    // 小文字
    xa: 'ぁ',
    xi: 'ぃ',
    xu: 'ぅ',
    xe: 'ぇ',
    xo: 'ぉ',
    xtsu: 'っ',
    xtu: 'っ',
    xya: 'ゃ',
    xyu: 'ゅ',
    xyo: 'ょ',
    la: 'ぁ',
    li: 'ぃ',
    lu: 'ぅ',
    le: 'ぇ',
    lo: 'ぉ',
    ltsu: 'っ',
    ltu: 'っ',
    lya: 'ゃ',
    lyu: 'ゅ',
    lyo: 'ょ',
    // 単音
    a: 'あ',
    i: 'い',
    u: 'う',
    e: 'え',
    o: 'お',
    ka: 'か',
    ki: 'き',
    ku: 'く',
    ke: 'け',
    ko: 'こ',
    sa: 'さ',
    su: 'す',
    se: 'せ',
    so: 'そ',
    ta: 'た',
    te: 'て',
    to: 'と',
    na: 'な',
    ni: 'に',
    nu: 'ぬ',
    ne: 'ね',
    no: 'の',
    ha: 'は',
    hi: 'ひ',
    he: 'へ',
    ho: 'ほ',
    ma: 'ま',
    mi: 'み',
    mu: 'む',
    me: 'め',
    mo: 'も',
    ya: 'や',
    yu: 'ゆ',
    yo: 'よ',
    ra: 'ら',
    ri: 'り',
    ru: 'る',
    re: 'れ',
    ro: 'ろ',
    wa: 'わ',
    // 撥音 'n' は別途ロジックで処理するため、ここでは基本的な 'n' は含めない
    ga: 'が',
    gi: 'ぎ',
    gu: 'ぐ',
    ge: 'げ',
    go: 'ご',
    // その他の追加ルール（必要に応じて）
    // 例: dzu -> づ, du -> づ など
    dzu: 'づ',
    du: 'づ',
  };

  const isVowel = (char) => 'aeiou'.includes(char);
  const isConsonant = (char) => 'bcdfghjklmnpqrstvwxyz'.includes(char);

  while (i < romajiInput.length) {
    let matched = false;

    // 最長一致を試みる (最大3文字)
    // まずは最長のマッチから試す
    for (let len = Math.min(romajiInput.length - i, 3); len >= 1; len--) {
      const sub = romajiInput.substring(i, i + len);

      // 撥音 'n' の特殊処理
      // 'n'単独で'ん'になる条件をより厳密に
      // - 次の文字がない（末尾）
      // - 次の文字が母音でない
      // - 次の文字が'y'でない (例: nya)
      // - 次の文字が'n' (例: nn)
      if (sub === 'n') {
        const nextChar = romajiInput[i + 1];
        if (
          !nextChar ||
          (!isVowel(nextChar) && nextChar !== 'y') || // 'n'の後に母音でもyでもない場合
          (nextChar === 'n' && romajiInput.substring(i, i + 2) === 'nn') // 'nn'の場合
        ) {
          hiraganaOutput += 'ん';
          i += len;
          matched = true;
          break;
        }
        // 'n' の後に母音や 'y' が続く場合は、ここでは「ん」と確定しない。
        // 例: 'na' (な), 'nyu' (にゅ)。これらは下の charMap マッチングで処理される。
        continue;
      }

      // 促音 (sokuon) の処理 'っ'
      // 同じ子音が続く場合 (例: kk, tt, ppなど)
      if (
        len === 1 && // 現在の文字が1文字
        isConsonant(sub) && // その1文字が子音
        romajiInput[i + 1] === sub && // 次の文字が同じ子音
        romajiInput[i] !== 'n' // 'n' 以外
      ) {
        // 同じ子音が続いた後、その次の文字がさらに有効なローマ字の開始であるか確認
        // 例: `k` + `k` + `a` -> `っ` + `か`
        const lookAheadForNextSyllable = romajiInput.substring(
          i + 2,
          i + 2 + 3
        );
        let isValidNextSyllable = false;
        for (
          let l = Math.min(lookAheadForNextSyllable.length, 3);
          l >= 1;
          l--
        ) {
          if (charMap[lookAheadForNextSyllable.substring(0, l)]) {
            isValidNextSyllable = true;
            break;
          }
        }
        if (isValidNextSyllable) {
          hiraganaOutput += 'っ';
          i++; // 1文字だけ進めて、次のループで残りの子音と母音を処理させる
          matched = true;
          break;
        }
      }

      // 通常の文字マッピング
      if (charMap[sub]) {
        hiraganaOutput += charMap[sub];
        i += len;
        matched = true;
        break;
      }
    }

    if (!matched) {
      // どのルールにもマッチしない場合、その文字は変換できず、
      // タイピング練習においては未確定（あるいは誤入力）として扱う。
      // ここでは、部分的な変換を返すため、マッチしない場合はそれ以上進まない。
      // これにより、例えば "kya" の "k" の時点では何も変換されず、
      // "ky" でも何も変換されず、"kya" で初めて"きゃ"に変換される挙動になる。
      // この関数の目的は「入力されたローマ字から確定できるひらがな部分を返す」であるため、
      // マッチしない文字は出力に追加しない。
      break;
    }
  }

  return hiraganaOutput;
};

/**
 * RomajiToHiraganaConverter コンポーネント
 * ローマ字の文字列を受け取り、対応するひらがなを表示します。
 *
 * @param {object} props - コンポーネントのプロパティ
 * @param {string} props.romaji - 変換するローマ字の文字列
 * @returns {string} ひらがなに変換されたテキスト
 */
const RomajiToHiraganaConverter = ({ romaji }) => {
  // 入力を小文字に変換してから変換関数を呼び出す
  return convertRomajiToHiragana(romaji.toLowerCase());
};

// 変換関数自体をエクスポートする
export { convertRomajiToHiragana };
