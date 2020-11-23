/**
 * @param {number} n
 * @param {number} k
 * @return {number[][]}
 */
var combine = function(n, k) {
  var result = [];
  var subset = [];

  function dfs(index) {
    if (subset.length === k) {
      result.push(subset.slice());
      return;
    }

    for (var i = index; i <= n; i++) {
      subset.push(i);
      dfs(i + 1);
      subset.pop();
    }
  }

  dfs(1);
  return result;
};