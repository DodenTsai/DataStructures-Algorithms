/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
function ListNode(val = null) {
  this.val = val;
  this.next = null
}

/**
 * @param {ListNode} head
 * @return {boolean}
 */
var hasCycle = function(head) {
  while (head) {
    if (head.flag) {
      return true;
    } else {
      head.flag = true;
      head = head.next;
    }
  }

  return false;
};