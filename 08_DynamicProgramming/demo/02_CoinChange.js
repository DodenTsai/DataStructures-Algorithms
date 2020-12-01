/**
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */
var coinChange = function(coins, amount) {
  var f = [];
  f[0] = 0;

  for (var i = 1; i <= amount; i++) {
    f[i] = Infinity;

    for (var j = 0; j < coins.length; j++) {
      if (i - coins[j] >= 0) {
        f[i] = Math.min(f[i], f[i - coins[j]] + 1);
      }
    }
  }

  if (f[amount] === Infinity) {
    return -1;
  }

  return f[amount];
};