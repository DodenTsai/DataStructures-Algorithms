/**
 * @param {number} n
 * @param {number} c
 * @param {number[]} w
 * @param {number[]} value
 * @return {number}
 */
function knapsack(n, c, w, value) {
  var dp = (new Array(c + 1)).fill(0);
  var res = -Infinity;
  for(var i = 1; i <= n;i++) {
    for(var v = c; v >= w[i]; v--) {
      // 写出状态转移方程
      dp[v] = Math.max(dp[v], dp[v - w[i]] + value[i]);
      // 即时更新最大值
      if(dp[v] > res) {
        res = dp[v];
      }
    }
  }
  return res;
}