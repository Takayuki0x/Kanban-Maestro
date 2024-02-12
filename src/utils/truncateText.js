export default function truncateText(text, length) {
  if (text.length <= length) {
    return text;
  }

  return text.substr(0, length) + '\u2026'
}
