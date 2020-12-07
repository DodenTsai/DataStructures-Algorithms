/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
function ListNode(val) {
  this.val = val;
  this.next = null;
}

/**
 * @param {ListNode} head
 * @param {number} k
 * @return {ListNode}
 */
var reverseKGroup = function (head, k) {
  function reverse(head) {
    var pre = null,
      cur = head,
      next = null;
    while (cur) {
      next = cur.next;
      cur.next = pre;
      pre = cur;
      cur = next;
    }

    return pre;
  }

  var dummy = new ListNode();
  dummy.next = head;

  var pre = dummy;
  var start = head;
  var end = head;
  var next = head;

  while (next) {
    for (var i = 1; i < k && end; i++) {
      end = end.next;
    }
    if (!end) {
      break;
    }

    next = end.next;
    end.next = null;
    end = start;
    start = reverse(start);
    end.next = next;
    pre.next = start;
    pre.next = start;
    pre = end;
    start = next;
    end = start;
  }

  return dummy.next;
};
