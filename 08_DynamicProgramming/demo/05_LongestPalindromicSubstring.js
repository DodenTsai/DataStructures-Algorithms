/**
 * @param {string} s
 * @return {string}
 */
var longestPalindrome = function(s) {
  var dp = [];
  var len = s.length;

  for (var i = 0; i < len; i++) {
    dp[i] = [];
  }

  var st = 0, end = 0;
  for (var i = 0; i < len; i++) {
    dp[i][i] = 1;
  }

  for (var i = 0; i < len - 1; i++) {
    if (s[i] === s[i + 1]) {
      dp[i][i + 1] = 1;
      st = i;
      end = i + 1;
    }
  }

  for (var n = 3; n <= len; n++) {
    for(let i = 0; i <= len - n; i++) {
      var j = i + n - 1;
      if (dp[i + 1][j - 1]) {
        if (s[i] === s[j]) {
          dp[i][j] = 1;
          st = i;
          end = j;
        }
      }
    }
  }

  return s.substring(st, end + 1);
};