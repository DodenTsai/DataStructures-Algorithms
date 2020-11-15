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
var detectCycle = function(head) {
    while (head) {
      if (head.flag) {
        return head;
      } else {
        head.flag = true;
        head = head.next;
      }
    }
    return null;
};