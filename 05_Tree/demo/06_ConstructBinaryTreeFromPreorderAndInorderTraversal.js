/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
function TreeNode (val) {
  this.val = val;
  this.left = this.right = null;
}

/**
 * @param {number[]} preorder
 * @param {number[]} inorder
 * @return {TreeNode}
 */
var buildTree = function(preorder, inorder) {
  var len = preorder.length;

  function build (preL, preR, inL, inR) {
    if (preL > preR) {
      return null;
    }

    var root = new TreeNode();
    root.val = preorder[preL];

    var k = inorder.indexOf(root.val);
    var numLeft = k - inL;

    root.left = build(preL + 1, preL + numLeft, inL, k - 1);
    root.right = build(preL + numLeft + 1, preR, k + 1, inR);
    return root;
  }

  return build(0, len - 1, 0, len - 1);
};