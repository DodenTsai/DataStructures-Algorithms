/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function (nums, target) {
  var diffs = {};

  for (var i = 0, len = nums.length; i < len; i++) {
    if (diffs[target - nums[i]] !== undefined) {
      return [diffs[target - nums[i]], i]
    }

    diffs[nums[i]] = i;
  }
};
