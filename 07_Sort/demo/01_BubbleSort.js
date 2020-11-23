/**
 * @param {number[]} arr
 * @return {number[]}
 */
var bubbleSort = function(arr) {
  var len = arr.length;

  for (var i = 0; i < len; i++) {
    for (var j = 0; j < len - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }

  return arr;
}

/**
 * @param {number[]} arr
 * @return {number[]}
 */
function betterBubbleSort(arr) {
  var len = arr.length;

  for (var i = 0; i < len; i++) {
    for (var j = 0; j < len - 1 - i; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }

  return arr;
}

/**
 * @param {number[]} arr
 * @return {number[]}
 */
function bestBubbleSort(arr) {
  var len = arr.length;

  for (var i = 0; i < len; i++) {
    var flag = false;
    for (var j = 0; j < len - 1 - i; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        flag = true;
      }
    }

    if (flag === false) {
      return arr;
    }
  }
  return arr;
}