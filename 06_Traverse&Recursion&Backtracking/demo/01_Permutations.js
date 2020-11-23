/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var permute = function(nums) {
  var len = nums.length;
  var curr = [];
  var result = [];
  var visited = {};

  function dfs(nth) {
    if (nth === len) {
      result.push(curr.slice())
      return;
    }

    for (var i = 0; i < len; i++) {
      if (!visited[nums[i]]) {
        visited[nums[i]] = 1;
        curr.push(nums[i]);
        dfs(nth + 1);
        curr.pop();
        visited[nums[i]] = 0;
      }
    }
  }

  dfs(0);
  return result;
};

