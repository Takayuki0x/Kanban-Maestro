
/**
 * Calculates the size of the data stored in the local storage.
 * @returns {string} The size of the data stored in the local storage in KB, along with the maximum allowed size.
*/

export default function getLocalStorageSize (){
  let allStrings = '';
  for (const key of Object.keys(window.localStorage)) {
    allStrings += window.localStorage[key];
  }
  return allStrings ? Math.round((3 + ((allStrings.length * 16) / (8 * 1024))) * 100) / 100 + ' KB / 5000 KB' : 'Empty (0 KB) / 5000 KB';
}
