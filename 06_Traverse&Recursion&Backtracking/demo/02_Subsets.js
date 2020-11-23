/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var subsets = function(nums) {
  var result = [];
  var len = nums.length;
  var subset = [];

  function dfs (index) {
    result.push(subset.slice());

    for (var i = index; i < len; i++) {
      subset.push(nums[i]);
      dfs(i + 1);
      subset.pop();
    }
  }
  dfs(0);

  return result;
};