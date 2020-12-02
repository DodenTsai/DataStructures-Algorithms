/**
 * @param {number[]} nums
 * @return {number}
 */
var lengthOfLIS = function(nums) {
  var len = nums.length;

  if (!len) return 0;

  var dp = new Array(len).fill(1);
  var maxLen = 1;

  for (var i = 1; i < len; i++) {
    for (var j = 0; j < i; j++) {
      if (nums[j] < nums[i]) {
        dp[i] = Math.max(dp[i], dp[j] + 1);
      }
    }

    if (dp[i] > maxLen) {
      maxLen = dp[i];
    }
  }

  return maxLen;
};