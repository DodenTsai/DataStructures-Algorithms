/**
 * @param {number[]} height
 * @return {number}
 */
var trap = function(height) {
  var leftCur = 0;
  var rightCur = height.length - 1;
  var result = 0;
  var leftMax = 0;
  var rightMax = 0;

  while (leftCur < rightCur) {
    var left = height[leftCur];
    var right = height[rightCur];

    if (left < right) {
      leftMax = Math.max(left, leftMax);
      result += leftMax - left;
      leftCur++;
    } else {
      rightMax = Math.max(right, rightMax);
      result += rightMax - right;
      rightCur--;
    }
  }

  return result;
};