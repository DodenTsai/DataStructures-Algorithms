/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
function ListNode(val = null) {
  this.val = val;
  this.next = null;
}

/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var reverseList = function(head) {
  var pre = null;
  var cur = head;

  while (cur !== null) {
    var next = cur.next;
    cur.next = pre;
    pre = cur;
    cur = next;
  }

  return pre;
};