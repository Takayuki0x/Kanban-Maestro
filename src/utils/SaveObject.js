/**
 * Saves an object to the local storage.
 * @param {string} objectName - The name of the object to be saved.
 * @param {object} dataObject - The object to be saved.
*/

export function SaveObject(objectName, dataObject){
    localStorage.setItem(objectName, JSON.stringify(dataObject));
}
