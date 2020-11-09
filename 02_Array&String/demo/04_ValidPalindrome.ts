/**
 * @param {string} s
 * @return {boolean}
 */
var validPalindrome = function(s) {
  var len = s.length;
  var i = 0, j = len - 1;

  var isPalindroom = function (st, ed) {
    while (st < ed) {
      if (s[st] !== s[ed]) {
        return false;
      }
      st++;
      ed--;
    }
    return true;
  }

  while (i < j && s[i] === s[j]) {
    i++;
    j--;
  }

  if (isPalindroom(i + 1, j)) {
    return true;
  }
  if (isPalindroom(i, j - 1)) {
    return true;
  }

  return false;
};