import React, { useState, useEffect } from 'react';

// ローマ字からひらがなへの変換関数
const convertRomajiToHiragana = (romajiInput) => {
  let hiraganaOutput = '';
  let i = 0;

  const charMap = {
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
    jo: 'じょ',
    bya: 'びゃ',
    byu: 'びゅ',
    byo: 'びょ',
    pya: 'ぴゃ',
    pyu: 'ぴゅ',
    pyo: 'ぴょ',
    tsu: 'つ',
    chi: 'ち',
    shi: 'し',
    ji: 'じ',
    fu: 'ふ',
    wi: 'ゐ',
    we: 'ゑ',
    za: 'ざ',
    zu: 'ず',
    ze: 'ぜ',
    zo: 'ぞ',
    da: 'だ',
    de: 'で',
    do: 'ど',
    ba: 'ば',
    bi: 'び',
    bu: 'ぶ',
    be: 'べ',
    bo: 'ぼ',
    pa: 'ぱ',
    pi: 'ぴ',
    pu: 'ぷ',
    pe: 'ぺ',
    po: 'ぽ',
    nn: 'ん',
    n: 'ん',
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
    ga: 'が',
    gi: 'ぎ',
    gu: 'ぐ',
    ge: 'げ',
    go: 'ご',
    xa: 'ぁ',
    xi: 'ぃ',
    xu: 'ぅ',
    xe: 'ぇ',
    xo: 'ぉ',
    xtsu: 'っ',
    xya: 'ゃ',
    xyu: 'ゅ',
    xyo: 'ょ',
    la: 'ぁ',
    li: 'ぃ',
    lu: 'ぅ',
    le: 'ぇ',
    lo: 'ぉ',
    ltsu: 'っ',
    lya: 'ゃ',
    lyu: 'ゅ',
    lyo: 'ょ',
  };

  const isVowel = (char) => 'aeiou'.includes(char);

  while (i < romajiInput.length) {
    let matched = false;

    // 促音（っ）の処理
    if (
      i + 1 < romajiInput.length &&
      romajiInput[i] === romajiInput[i + 1] &&
      romajiInput[i] !== 'n' &&
      !isVowel(romajiInput[i])
    ) {
      const lookAheadRomaji = romajiInput.substring(i + 1, i + 1 + 3);
      for (let len = Math.min(lookAheadRomaji.length, 3); len >= 1; len--) {
        const potentialKana = lookAheadRomaji.substring(0, len);
        if (charMap[potentialKana] && potentialKana !== 'n') {
          hiraganaOutput += 'っ';
          i++;
          matched = true;
          break;
        }
      }
      if (matched) continue;
    }

    // 最長一致を試みる
    for (let len = Math.min(romajiInput.length - i, 3); len >= 1; len--) {
      const sub = romajiInput.substring(i, i + len);
      let mapResult = charMap[sub];

      if (mapResult) {
        if (sub === 'n') {
          const nextChar = romajiInput[i + 1];
          if (
            !nextChar ||
            (!isVowel(nextChar) && nextChar !== 'n' && nextChar !== 'y')
          ) {
            hiraganaOutput += 'ん';
            i += len;
            matched = true;
            break;
          }
          if (nextChar === 'n' && romajiInput.substring(i, i + 2) === 'nn') {
            hiraganaOutput += 'ん';
            i += 2;
            matched = true;
            break;
          }
          continue;
        }

        hiraganaOutput += mapResult;
        i += len;
        matched = true;
        break;
      }
    }

    if (!matched) {
      hiraganaOutput += romajiInput[i];
      i++;
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
  return convertRomajiToHiragana(romaji.toLowerCase());
};

// 変換関数自体をエクスポートする
export { convertRomajiToHiragana };
