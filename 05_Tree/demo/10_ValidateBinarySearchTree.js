
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
 * @param {TreeNode} root
 * @return {boolean}
 */
var isValidBST = function(root) {
  function dfs (root, minValue, maxValue) {
    if (!root) {
      return true;
    }

    if (root.val <= minValue || root.val >= maxValue) {
      return false;
    }

    return dfs(root.left, minValue, root.val) && dfs(root.right, root.val, maxValue);
  }

  return dfs(root, -Infinity, Infinity);
};