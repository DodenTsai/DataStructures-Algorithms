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
 * @return {number[][]}
 */
var levelOrder = function(root) {
  var reuslt = [];
  if (!root) return reuslt;

  var queue = [];
  queue.push(root);

  while (queue.length) {
    var level = [];
    var len =  queue.length;

    for (var i = 0; i < len; i++) {
      var top = queue.shift();
      level.push(top.val);
      if (top.left) {
        queue.push(top.left);
      }
      if (top.right) {
        queue.push(top.right);
      }
    }

    reuslt.push(level);
  }

  return reuslt;
};