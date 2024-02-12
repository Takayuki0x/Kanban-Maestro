export default function findIndexInArray(obj, key, value) {
  return obj.findIndex(function(v){ return v[key] === value});
}
