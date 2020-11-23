/**
 * @param {number[]} arr
 * @return {number[]}
 */
function mergeSort(arr) {
  var len = arr.length;

  if (len <= 1) {
    return arr;
  }

  var mid = Math.floor(len / 2);
  var leftArr = mergeSort(arr.slice(0, mid));
  var rightArr = mergeSort(arr.slice(mid, len));

  arr = mergeArr(leftArr, rightArr);
  return arr;
}
  
function mergeArr(arr1, arr2) {  
  var i = 0, j = 0;
  var result = [];
  var len1 = arr1.length, len2 = arr2.length;

  while (i < len1 && j < len2) {
    if (arr1[i] < arr2[j]) {
      result.push(arr1[i]);
      i++;
    } else {
      result.push(arr2[j]);
      j++;
    }
  }

  if(i < len1) {
    return res.concat(arr1.slice(i));
  } else {
    return res.concat(arr2.slice(j));
   }
}