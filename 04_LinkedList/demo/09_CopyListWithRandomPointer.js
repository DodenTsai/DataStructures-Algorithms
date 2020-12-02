/**
 * // Definition for a Node.
 * function Node(val, next, random) {
 *    this.val = val;
 *    this.next = next;
 *    this.random = random;
 * };
 */
function Node(val, next, random) {
  this.val = val;
  this.next = next;
  this.random = random;
}

/**
 * @param {Node} head
 * @return {Node}
 */
var copyRandomList = function(head) {
    if (!head) return null;
    var copyHead = new Node();
    var copyNode = copyHead;
    var hashMap = new Map();
    var curr = head;

    while (curr) {
      copyNode.val = curr.val;
      copyNode.next = curr.next ? new Node() : null;
      hashMap.set(curr, copyNode);
      curr = curr.next;
      copyNode = copyNode.next;
    }

    curr = head;

    copyNode = copyHead;
    while (curr) {
      copyNode.random = curr.random ? hashMap.get(curr.random) : null;
      copyNode = copyNode.next;
      curr = curr.next;
    }

    return copyHead;
};