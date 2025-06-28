//文字量の多いものを文字数制限して末尾に...を記載
export function truncateText(text, maxLength) {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
}
