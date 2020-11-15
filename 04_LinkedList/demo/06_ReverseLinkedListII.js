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
 * @param {number} m
 * @param {number} n
 * @return {ListNode}
 */
var reverseBetween = function(head, m, n) {
  var pre, cur, leftHead;
  var dummy = new ListNode();
  dummy.next = head;
  
  var p = dummy;
  for (var i = 0; i < m - 1; i++) {
    p = p.next;
  }

  leftHead = p;

  var start = leftHead.next;
  pre = start;
  cur = pre.next;

  for (var i = m; i < n; i++) {
    var next = cur.next;
    cur.next = pre;
    pre = cur;
    cur = next;
  }

  leftHead.next = pre;
  start.next = cur;
  return dummy.next;
};