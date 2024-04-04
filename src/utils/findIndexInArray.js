
/**
 * Finds the index of an object in an array based on a specified key-value pair.
 *
 * @param {Array} obj - The array to search in.
 * @param {string} key - The key to match against.
 * @param {*} value - The value to match against.
 * @returns {number} - The index of the first matching object, or -1 if no match is found.
 */

export default function findIndexInArray(obj, key, value) {
  return obj.findIndex(function(v){ return v[key] === value});
}
