/**
 * @param {number} n
 * @return {number}
 */
var climbStairs = function(n) {
  var f = [];
  f[1] = 1;
  f[2] = 2;

  for (var i = 3; i <= n; i++) {
    f[i] = f[i - 2] + f[i - 1];
  }

  return f[n];
};