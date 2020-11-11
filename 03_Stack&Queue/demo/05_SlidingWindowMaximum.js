/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var maxSlidingWindow = function(nums, k) {
  var len = nums.length;
  var result = [];
  var deque = [];

  for (var i = 0; i < len; i++) {
    while (deque.length && nums[deque[deque.length - 1]] < nums[i]) {
      deque.pop();
    }

    deque.push(i);
    while (deque.length && deque[0] <= i - k) {
      deque.shift();
    }

    if (i >= k - 1) {
      result.push(nums[deque[0]]);
    }
  }

  return result;
};