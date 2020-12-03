/**
 * @param {number[][]} intervals
 * @return {number[][]}
 */
var merge = function(intervals) {
  var result = [];
  var len = intervals.length;

  intervals.sort(function(a, b) {
    return a[0] - b[0];
  });

  if (!intervals || !intervals.length) {
    return [];
  }

  result.push(intervals[0]);

  for (var i = 1; i < len; i++) {
    var prev = result[result.length  - 1];
    if (prev[1] >= intervals[i][0]) {
      prev[1] = Math.max(prev[1], intervals[i][1]);
    } else {
      result.push(intervals[i])
    }
  }

  return result;
};