/**
 * Truncates a given text to a specified length.
 *
 * @param {string} text - The text to be truncated.
 * @param {number} length - The maximum length of the truncated text.
 * @returns {string} The truncated text.
*/

export default function truncateText(text, length) {
  if (text.length <= length) {
    return text;
  }

  return text.substr(0, length) + '\u2026'
}
