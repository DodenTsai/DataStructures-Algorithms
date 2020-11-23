/**
 * @param {number[]} arr
 * @return {number[]}
 */
function insertSort(arr) {
  var len = arr.length;
  var temp;

  for (var i = 1; i < len; i++) {
    var j = i;
    temp = arr[i];

    while (j > 0 && arr[j - 1] > temp) {
      arr[j] = arr[j - 1];
      j--;
    }
    arr[j] = temp;
  }

  return arr;
}