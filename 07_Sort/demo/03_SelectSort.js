/**
 * @param {number[]} arr
 * @return {number[]}
 */
function selectSort(arr)  {
  var len = arr.length;
  var minIndex;

  for (var i = 0; i < len - 1; i++) {
    minIndex = i;

    for (var j = i; j < len; j++) {
      if (arr[j] < arr[minIndex]) {
        minIndex = j;
      }
    }

    if (minIndex !== i) {
      [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
    }
  }

  return arr;
}