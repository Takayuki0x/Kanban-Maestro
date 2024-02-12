export function SaveObject(objectName, dataObject){
    localStorage.setItem(objectName, JSON.stringify(dataObject));
}
