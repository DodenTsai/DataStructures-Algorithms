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
 * @return {TreeNode}
 */
var balanceBST = function(root) {
  var nums = [];
  function inorder(root) {
    if (!root) return;

    inorder(root.left);
    nums.push(root.val);
    inorder(root.right);
  }

  function buildAVL(low, high) {
    if (low > high) return null;

    var mid = Math.floor(low + (high - low) / 2);
    var cur = new TreeNode(nums[mid]);
    cur.left = buildAVL(low, mid - 1);
    cur.right = buildAVL(mid + 1, high);
    return cur;
  }

  inorder(root);
  return buildAVL(0, nums.length - 1);
};