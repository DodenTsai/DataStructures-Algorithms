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
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {TreeNode}
 */
var lowestCommonAncestor = function(root, p, q) {
  function dfs (root) {
    if (!root || root == p || root === q) {
      return root;
    }
    const leftNode = dfs(root.left);
    const rightNode = dfs(root.right);

    if (leftNode && rightNode) {
      return root;
    }

    return leftNode || rightNode;
  }


  return dfs(root);
};