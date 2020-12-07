/**
 * @param {number[]} heights
 * @return {number}
 */
var largestRectangleArea = function(heights) {
  if (!heights || !heights.length) return 0;

  var max = -1;
  var len = heights.length;

  for (var i = 0; i < len; i++) {
    if (i === len - 1 || heights[i] > heights[i + 1]) {
      var minHeight = heights[i];
      for (var j = i; j >= 0; j--) {
        minHeight = Math.min(minHeight, heights[j]);
        max = Math.max(max, minHeight * (i - j + 1));
      }
    }
  }

  return max;
};