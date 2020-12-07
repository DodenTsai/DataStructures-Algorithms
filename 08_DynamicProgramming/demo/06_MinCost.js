/**
 * @param {number[][]} costs
 * @return {number}
 */
function minCost (costs) {
  if (!costs || !costs.length) return 0;

  var len = costs.length;

  for (var i = 1; i < len; i++) {
    var now = costs[i];
    var prev = costs[i - 1];
    now[0] += Math.min(prev[1], prev[2]);
    now[1] += Math.min(prev[0], prev[2]);
    now[2] += Math.min(prev[1], prev[0]);
  }

  return Math.min(costs[len - 1][0], costs[len - 1][1], costs[len - 1][2]);
}