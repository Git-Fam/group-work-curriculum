/**
 * Firebase Timestamp オブジェクトを「YYYY年MM月DD日」形式の文字列にフォーマットします。
 * @param {firebase.firestore.Timestamp} timestamp - フォーマットするFirebase Timestamp オブジェクト。
 * @returns {string} フォーマットされた日付文字列、または「日付なし」。
 */
export const formatTimestamp = (timestamp) => {
  if (!timestamp) return '日付なし';

  let date;
  if (typeof timestamp.toDate === 'function') {
    // Firebase Timestamp オブジェクトの場合
    date = timestamp.toDate();
  } else if (typeof timestamp === 'number') {
    //ミリ秒の数値の場合
    date = new Date(timestamp);
  } else {
    // 想定外の形式の場合
    console.error('formatTimestamp: 無効なタイムスタンプ形式です', timestamp);
    return '日付なし';
  }
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // 月に0を付与
  const day = String(date.getDate()).padStart(2, '0'); // 日に0を付与

  return `${year}年${month}月${day}日`;
};

/**
 * Firebase Timestamp オブジェクトを「YYYY/MM/DD」形式の文字列にフォーマットします。
 * @param {firebase.firestore.Timestamp} timestamp - フォーマットするFirebase Timestamp オブジェクト。
 * @returns {string} フォーマットされた日付文字列、または「日付なし」。
 */
export const formatDateForScore = (timestamp) => {
  if (!timestamp) return '日付なし';
  let date;
  if (typeof timestamp.toDate === 'function') {
    //Firebase Timestamp　オブジェクトの場合
    date = timestamp.toDate();
  } else if (typeof timestamp === 'number') {
    // ミリ秒の数値の場合
    date = new Date(timestamp);
  } else {
    console.error(
      'formatDateForScore: 無効なタイムスタンプ形式です',
      timestamp
    );
    return '日付なし';
  }

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}/${month}/${day}`;
};
