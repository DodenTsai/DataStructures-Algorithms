/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
function TreeNode(val) {
  this.val = val;
  this.left = this.right = null;
}

/**
 * @param {number[]} nums
 * @return {TreeNode}
 */
var sortedArrayToBST = function(nums) {
  if (!nums.length) return null;

  var root = buildBST(0, nums.length - 1);

  function buildBST(low, high) {
    if (low > high) return null;

    var mid = Math.floor(low + (high - low) / 2);
    var cur = new TreeNode(nums[mid]);
    cur.left = buildBST(low, mid - 1);
    cur.right = buildBST(mid + 1, high);

    return cur;
  }

  return root;
};