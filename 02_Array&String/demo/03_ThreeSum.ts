/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function(nums) {
  var result = [];
  nums = nums.sort((a, b) => a - b);

  for (var i = 0, len = nums.length; i < len - 2; i++) {
    var j = i + 1;
    var k = len - 1;
    if (i > 0 && nums[i] === nums[i - 1]) {
      continue;
    }

    while (j < k) {
      if (nums[i] + nums[j] + nums[k] < 0) {
        j++;
        while (j < k && nums[j] === nums[j - 1]) {
          j++;
        }
      } else if (nums[i] + nums[j] + nums[k] > 0) {
        k--;
        while (j < k && nums[k] === nums[k + 1]) {
          k--;
        }
      } else {
        result.push([ nums[i], nums[j], nums[k] ])
        j++;
        k--;
        while (j < k && nums[j] === nums[j - 1]) {
          j++;
        }
        while(j < k && nums[k] === nums[k + 1]) {
          k--;
        }
      }
    }
  }

  return result;
};