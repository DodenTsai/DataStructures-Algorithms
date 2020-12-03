/**
 * @param {string} s
 * @return {number}
 */
var myAtoi = function(s) {
  var reg = /\s*([-\+]?[0-9]*).*/;
  var groups = s.match(reg)

  var max = Math.pow(2, 31) - 1;
  var min = -max - 1;

  var targetNum = 0;

  if (groups) {
    targetNum = +groups[1];

    if (isNaN(targetNum)) {
      targetNum = 0;
    }
  }

  if (targetNum > max) {
    return max;
  } else if (targetNum < min) {
    return min;
  }
  
  return targetNum;
};