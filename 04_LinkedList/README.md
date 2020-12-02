# 链表
## 基本概念
链表和数组相似，都是有序的列表、都是线性结构（有且仅有一个前驱、有且仅有一个后继）。不同点在于，链表中，数据单位的名称叫做“结点”，而结点和结点的分布，在内存中可以是离散的。

链表中的结点，允许散落在内存空间的各个角落里。对它来说，元素和元素之间毫无内存上的关联。因此，在链表的各个结点之间，需要为它们创建关联指针。链表中的每一个结点都包含了数据域和指针域两个部分。

JavaScript 中的链表，是以嵌套的形式实现的，形如：

```
{
  // 数据域
  val: 1,
  // 指针域，指向下一个结点
  next: {
    val: 2,
    next: …
  }
}
```

## 链表的操作
### 创建链表结点
创建链表结点，需要一个构造函数。在使用构造函数创建结点时，传入`val`（数据域对应的值内容）、指定`next`（下一个链表结点）即可。

```
function ListNode(val) {
  this.val = val;
  this.next = null;
}

const node = new ListNode(1);
node.next = new ListNode(2);
```

### 添加链表结点
链表的结点间关系是通过`next`指针来维系的。因此，链表元素的添加和删除操作，本质上都是在围绕`next`指针做文章。

- 直接在链表的尾部添加结点，直接将原尾部结点的`next`指针指向添加的结点即可。
- 如果在任意两个结点之间插入一个新的结点，需要变更前驱结点和后继结点的`next`指针。

```
// 如果目标结点本来不存在，那么记得手动创建
const node3 = new ListNode(3);
// 把 node3 的 next 指针指向 node2（即 node1.next）
node3.next = node1.next;
// 把 node1 的 next 指针指向 node3
node1.next = node3;
```

### 删除链表结点
链表结点的删除标准为在链表的遍历过程中，无法再遍历到某个结点的存在。因此可以直接让它的前驱结点的`next`跳过它指向它的`next`指针指向的结点。当结点成为一个完全无法访问的结点之后，JavaScript 的垃圾回收机制将会将其回收。

在涉及链表删除操作的题目中，重点不是定位目标结点，而是定位目标结点的前驱结点。

```
// 利用 node1 可以定位到 node3
const target = node1.next;
node1.next = target.next;
```

## 链表与数组
假设数组的长度是`n`，那么因增加/删除操作导致需要移动的元素数量，就会随着数组长度`n`的增大而增大，呈一个线性关系。所以说数组增加/删除操作对应的复杂度就是`O(n)`。

相对于数组来说，链表有一个明显的优点，就是添加和删除元素都不需要挪动多余的元素。在链表中，添加和删除操作的复杂度是固定的。不管链表里面的结点个数`n`有多大，只要明确了要插入或删除的目标位置，那么只需要改变目标结点及其前驱或后继结点的指针指向。因此链表的增删操作的复杂度是常数级别的复杂度，用大`O`表示法表示为`O(1)`。

但是链表也有一个弊端，即试图读取某一个特定的链表结点时，必须遍历整个链表来查找它。随着链表长度的增加，搜索的范围也会变大、遍历其中任意元素的时间成本自然随之提高。这个变化的趋势呈线性规律，用大`O`表示法表示为`O(n)`。

而在数组中可以直接访问索引，这个操作的复杂度会被降级为常数级别`O(1)`。

结合上述分析，不难得出结论：链表的插入/删除效率较高，而访问效率较低；数组的访问效率较高，而插入效率较低。

# 链表的问题案例
链表相关的问题，一般分为三类，即链表的处理（合并、删除等）、链表的反转及其衍生和链表成环及其衍生。

## 链表的合并
LeetCode：[21. 合并两个有序链表](https://leetcode-cn.com/problems/merge-two-sorted-lists/)

### 问题描述
将两个有序链表合并为一个新的有序链表并返回。新链表是通过拼接给定的两个链表的所有结点组成的。
``` 
输入：1 -> 2 -> 4, 1 -> 3 -> 4
输出：1 -> 1 -> 2 -> 3 -> 4 -> 4
```

### 问题分析
处理链表的本质，是处理链表结点之间的指针关系。两个链表如果想要合并为一个链表，恰当地补齐双方之间结点`next`指针的指向关系，就能达到目的。同时还要考虑`l1`和`l2`两个链表长度不等的情况：若其中一个链表已经完全被串进新链表里了，而另一个链表还有剩余结点，考虑到该链表本身就是有序的，可以直接把它整个拼到目标链表的尾部。

### 问题实现
```
/**
  * @param {ListNode} l1
  * @param {ListNode} l2
  * @return {ListNode}
  */
const mergeTwoLists = function(l1, l2) {
  // 定义头结点，确保链表可以被访问到
  let head = new ListNode();
  // cur 这里就是咱们那根“针”
  let cur = head;
  // “针”开始在 l1 和 l2 间穿梭了
  while(l1 && l2) {
    // 如果 l1 的结点值较小
    if(l1.val <= l2.val) {
      // 先串起 l1 的结点
      cur.next = l1;
      // l1 指针向前一步
      l1 = l1.next;
    } else {
      // l2 较小时，串起 l2 结点
      cur.next = l2;
      // l2 向前一步
      l2 = l2.next;
    }
    // “针”在串起一个结点后，也会往前一步
    cur = cur.next;
  }
  // 处理链表不等长的情况
  cur.next = l1 !== null ? l1 : l2;
  // 返回起始结点
  return head.next;
};
```

## 链表结点的删除
LeetCode：[83. 删除排序链表中的重复元素](https://leetcode-cn.com/problems/remove-duplicates-from-sorted-list/)

### 问题描述
给定一个排序链表，删除所有重复的元素，使得每个元素只出现一次。

```
示例 1：
    输入：1 -> 1 -> 2
    输出：1 -> 2
示例 2：
    输入：1 -> 1 -> 2 -> 3 -> 3
    输出：1 -> 2 -> 3
```

### 问题分析
链表的删除是一个基础且关键的操作，将需要删除的目标结点的前驱结点`next`指针往后指一格。另外需要判断两个元素是否重复，由于此处是已排序的链表，直接判断前后两个元素值是否相等即可。

### 问题实现
```
/**
  * @param {ListNode} head
  * @return {ListNode}
  */
const deleteDuplicates = function(head) {
  // 设定 cur 指针，初始位置为链表第一个结点
  let cur = head;
  // 遍历链表
  while(cur != null && cur.next != null) {
    // 若当前结点和它后面一个结点值相等（重复）
    if(cur.val === cur.next.val) {
      // 删除靠后的那个结点（去重）
      cur.next = cur.next.next;
    } else {
      // 若不重复，继续遍历
      cur = cur.next;
    }
  }
  return head;
};
```

## dummy 结点问题（链表结点的删除问题延伸）
LeetCode：[82. 删除排序链表中的重复元素 II](https://leetcode-cn.com/problems/remove-duplicates-from-sorted-list-ii/)

### 问题描述
给定一个排序链表，删除所有含有重复数字的结点，只保留原始链表中没有重复出现的数字。
```
示例 1：
    输入：1 -> 2 -> 3 -> 3 -> 4 -> 4 -> 5
    输出：1 -> 2 -> 5
示例 2：
    输入：1 -> 1 -> 1 -> 2 -> 3
    输出：2 -> 3
```

### 问题分析
要删除链表中某一个目标结点时，必须知道它的前驱结点，但这个问题是需要将前驱或后继一起删除掉，这时就可以用一个`dummy`结点来解决这个问题。

`dummy`结点是一个人为制造出来的第一个结点的前驱结点，这样链表中所有的结点都能确保有一个前驱结点，也就都能够用同样的逻辑来处理了。`dummy`结点能够降低链表处理过程的复杂度，处理链表时，不设`dummy`结点思路可能会打不开；设了`dummy`结点的话，就算不一定用得上，也不会出错。

### 问题实现
```
/**
  * @param {ListNode} head
  * @return {ListNode}
  */
const deleteDuplicates = function(head) {
  // 极端情况：0 个或 1 个结点，则不会重复，直接返回
  if(!head || !head.next) {
    return head;
  }
  // dummy 登场
  let dummy = new ListNode();
  // dummy 永远指向头结点
  dummy.next = head;
  // cur 从 dummy 开始遍历
  let cur = dummy;
  // 当 cur 的后面有至少两个结点时
  while(cur.next && cur.next.next) {
    // 对 cur 后面的两个结点进行比较
    if(cur.next.val === cur.next.next.val) {
      // 若值重复，则记下这个值
      let val = cur.next.val;
      // 反复地排查后面的元素是否存在多次重复该值的情况
      while(cur.next && cur.next.val===val) {
        // 若有，则删除
        cur.next = cur.next.next;
      }
    } else {
      // 若不重复，则正常遍历
      cur = cur.next;
    }
  }
  // 返回链表的起始结点
  return dummy.next;
};
```

## 删除链表的倒数第 N 个结点（快慢指针）
LeetCode：[19. 删除链表的倒数第N个节点](https://leetcode-cn.com/problems/remove-nth-node-from-end-of-list/)

### 问题描述
给定一个链表，删除链表的倒数第`n`个结点，并且返回链表的头结点。
```
输入：1 -> 2 -> 3 -> 4 -> 5，n = 2
输出：1 -> 2 -> 3 -> 5
```

### 问题分析
可以利用`dummy`结点来处理调头结点为空的边界问题。在涉及到链表操作（尤其是结点删除）的问题时尽量都使用`dummy`结点。

```
const dummy = new ListNode();
// 这里的 head 是链表原有的第一个结点
dummy.next = head;
```    

这个问题考虑到遍历不可能从后往前走，因此这个“倒数第`n`个” 可以转换为“正数第`len - n + 1`”个。那么其实可以遍历两次，第一次设置一个变量`count = 0`，每遍历到一个不为空的结点，`count`就加`1`，一直遍历到链表结束为止，得出链表的总长度`len`；根据这个总长度，就可以算出倒数第`n`个到底是正数第几个了（`M = len - n + 1`），当遍历到第`M - 1`（即`len - n`）个结点的时候就可以停下来，执行删除操作。

但是，超过一次的遍历性能会有所损耗，这时就需要双指针来帮助处理了。

首先两个指针`slow`和`fast`，全部指向链表的起始位，即`dummy`结点。快指针先出发走上`n`步，在第`n`个结点处停止。然后，快慢指针一起前进，当快指针前进到最后一个结点处时，两个指针再一起停下来。此时，慢指针所指的位置，就是倒数第`n`个结点的前一个结点。基于这个结点来做删除，会非常方便。

链表删除问题中，若走两次遍历，会先求长度，再做减法、找定位。

若用快慢指针，其实是把做减法和找定位这个过程给融合了。通过快指针先行一步、接着快慢指针一起前进这个操作，巧妙地把两个指针之间的差值保持在了`n`上，这样当快指针走到链表末尾（第`len`个）时，慢指针刚好就在`len - n`这个地方稳稳落地。

### 问题实现
```
/**
  * @param {ListNode} head
  * @param {number} n
  * @return {ListNode}
  */
const removeNthFromEnd = function(head, n) {
  // 初始化 dummy 结点
  const dummy = new ListNode();
  // dummy 指向头结点
  dummy.next = head;
  // 初始化快慢指针，均指向 dummy
  let fast = dummy;
  let slow = dummy;
  // 快指针闷头走 n 步
  while (n !== 0) {
    fast = fast.next;
    n--;
  }
  // 快慢指针一起走
  while (fast.next) {
    fast = fast.next;
    slow = slow.next;
  }
  // 慢指针删除自己的后继结点
  slow.next = slow.next.next;
  // 返回头结点
  return dummy.next;
};
```

## 链表的完全反转（多指针法）
LeetCode：[206. 反转链表](https://leetcode-cn.com/problems/reverse-linked-list/)

### 问题描述
定义一个函数，输入一个链表的头结点，反转该链表并输出反转后链表的头结点。
```
输入：1 -> 2 -> 3 -> 4 -> 5 -> NULL
输出：5 -> 4 -> 3 -> 2 -> 1 -> NULL
```

### 问题分析
处理链表的本质，是处理链表结点之间的指针关系。

链表的反转，本质上是将结点的`next`指针反转。这个问题需要用到三个指针，分别指向目标结点（`cur`）、目标结点的前驱结点（`pre`）、目标结点的后继结点（`next`）。只需要一个简单的`cur.next = pre`，就做到了`next`指针的反转，再用`next`指着`cur`原本的后继结点，从第一个结点开始，每个结点都给它进行一次`next`指针的反转。到最后一个结点时，整个链表就已经被彻底反转掉了。

### 问题实现
```
/**
  * @param {ListNode} head
  * @return {ListNode}
  */
const reverseList = function(head) {
  // 初始化前驱结点为 null
  let pre = null;
  // 初始化目标结点为头结点
  let cur = head;
  // 只要目标结点不为 null，遍历就得继续
  while (cur !== null) {
    // 记录一下 next 结点
    let next = cur.next;
    // 反转指针
    cur.next = pre;
    // pre 往前走一步
    pre = cur;
    // cur 往前走一步
    cur = next;
  }
  // 反转结束后，pre 就会变成新链表的头结点
  return pre;
};
```

## 局部反转一个链表
LeetCode：[92. 反转链表 II](https://leetcode-cn.com/problems/reverse-linked-list-ii/)

### 问题描述
反转从位置`m`到`n`的链表。请使用一趟扫描完成反转。`1 ≤ m ≤ n ≤ 链表长度`。
```
输入：1 -> 2 -> 3 -> 4 -> 5 -> NULL, m = 2, n = 4
输出：1 -> 4 -> 3 -> 2 -> 5 -> NULL
```

### 问题分析
这个问题仍然是从指针反转来入手，因为需要反转的是链表的第`m`到`n`之间的结点，这之间的反转可以采用与全部反转一样的逻辑。但是在让`m - 1`个结点指向`n`，`m`节点指向`n + 1`个节点时，还需要对`m - 1`和`n + 1`结点做额外的处理。

由于遍历链表的顺序是从前往后遍历，为了避免结点`m - 1`和结点`m`随着遍历向后推进被遗失，需要提前把`m - 1`结点缓存下来。而结点`n + 1`在随着遍历的进行，当完成了结点`n`的指针反转后，此时`cur`指针就恰好指在结点`n + 1`上。此时将结点`m`的`next`指针指向`cur`、将结点`m - 1`的`next`指针指向`pre`即可。

### 问题实现
```
/**
  * @param {ListNode} head
  * @param {number} m
  * @param {number} n
  * @return {ListNode}
*/
// 入参是头结点、m、n
const reverseBetween = function (head, m, n) {
  // 定义 pre、cur，用 leftHead 来承接整个区间的前驱结点
  let pre, cur, leftHead;
  // 别忘了用 dummy
  const dummy = new ListNode();
  // dummy 后继结点是头结点
  dummy.next = head;
  // p 是一个游标，用于遍历，最初指向 dummy
  let p = dummy;
  // p 往前走 m-1 步，走到整个区间的前驱结点处
  for (let i = 0; i < m - 1; i++) {
    p = p.next;
  }
  // 缓存这个前驱结点到 leftHead 里
  leftHead = p;
  // start 是反转区间的第一个结点
  let start = leftHead.next;
  // pre 指向 start
  pre = start;
  // cur 指向 start 的下一个结点
  cur = pre.next;
  // 开始重复反转动作
  for (let i = m; i < n; i++) {
    let next = cur.next;
    cur.next = pre;
    pre = cur;
    cur = next;
  }
  // leftHead 的后继结点此时为反转后的区间的第一个结点
  leftHead.next = pre;
  // 将区间内反转后的最后一个结点 next 指向cur
  start.next=cur;
  // dummy.next 永远指向链表头结点
  return dummy.next;
};
```

## 如何判断链表是否成环
LeetCode：[141. 环形链表](https://leetcode-cn.com/problems/linked-list-cycle/)

### 问题描述
给定一个链表，判断链表中是否有环。

如果链表中有某个节点，可以通过连续跟踪`next`指针再次到达，则链表中存在环。

为了表示给定链表中的环，使用整数`pos`来表示链表尾连接到链表中的位置（索引从`0`开始）。 如果`pos`是`-1`，则在该链表中没有环。注意：`pos`不作为参数进行传递，仅仅是为了标识链表的实际情况。

如果链表中存在环，则返回`true` 。 否则，返回`false`。

```
示例 1：
      输入：head = [3, 2, 0, -4]
      输出：TRUE
示例 2：
      输入：head = [1, 2]
      输出：TRUE
示例 3：
      输入：head = [1]
      输出：FALSE
```

### 问题分析
一个环形链表的基本修养，是能够让遍历它的游标回到原点，从`flag`出发，只要能够再回到`flag`处，那么就意味着，正在遍历一个环形链表。

### 问题实现
```
/**
  * @param {ListNode} head
  * @return {boolean}
*/
// 入参是头结点
const hasCycle = function(head) {
  // 只要结点存在，那么就继续遍历
  while (head) {
    // 如果 flag 已经立过了，那么说明环存在
    if (head.flag) {
      return true;
    } else {
      // 如果 flag 没立过，就立一个 flag 再往下走
      head.flag = true;
      head = head.next;
    }
  }
  return false;
};
```

## 定位环的起点（环形链表衍生问题）
LeetCode：[142. 环形链表 II](https://leetcode-cn.com/problems/linked-list-cycle-ii/)

### 问题描述
给定一个链表，返回链表开始入环的第一个结点。 如果链表无环，则返回`null`。

为了表示给定链表中的环，我们使用整数`pos`来表示链表尾连接到链表中的位置（索引从`0`开始）。 如果`pos`是`-1`，则在该链表中没有环。注意，`pos`仅仅是用于标识环的情况，并不会作为参数传递到函数中。

```
示例 1：
    输入：head = [3, 2, 0, -4]
    输出：tail connects to node index 1
示例 2：
    输入：head = head = [1,2]
    输出：tail connects to node index 0
示例 3：
    输入：head = [1]
    输出：no cycle
```

### 问题分析
这个问题在判断是否成环的基础上，增加了一个返回链表的成环起点。如果一个结点是环形链表成环的起点，那么它一定是第一个被发现`flag`标志已存在的结点。

当从头开始遍历一个链表，如果途中进入了一个环，那么首先被打上`flag`标签的其实就是环的起点。待遍历完这个环时，即便环上所有的结点都已经被立了`flag`，但起点处的`flag`一定最先被定位到。因此，只需要在第一次发现`flag`已存在时，将对应的结点返回即可。

### 问题实现
```
/**
  * @param {ListNode} head
  * @return {ListNode}
*/
const detectCycle = function (head) {
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
```

## 复制带随机指针的链表
LeetCode：[138. 复制带随机指针的链表](https://leetcode-cn.com/problems/copy-list-with-random-pointer/)

### 问题描述
给定一个链表，每个节点包含一个额外增加的随机指针，该指针可以指向链表中的任何节点或空节点。要求返回这个链表的深拷贝。我们用一个由`n`个节点组成的链表来表示输入/输出中的链表。每个节点用一个`[val, random_index]`表示：
- `val`：一个表示`Node.val`的整数
- `random_index`：随机指针指向的节点索引（范围从`0`到`n - 1`）；如果不指向任何节点，则为`null`

```
示例 1：
      输入：head = [[7, null], [13, 0], [11, 4], [10, 2], [1, 0]]
      输出：[[7, null], [13, 0], [11, 4], [10, 2], [1, 0]]
示例 2：
      输入：head = [[1, 1], [2, 1]]
      输出：[[1, 1], [2, 1]]
示例 3：
      输入：head = [[3, null], [3, 0], [3, null]]
      输出：[[3, null], [3, 0], [3, nul]]
示例 4：
      输入：head = []
      输出：[]
```

### 问题分析
这个问题首先要思考深拷贝，深深拷贝是相对于引用拷贝来说的，对于 JavaScript 中的对象`a`和对象`b`，假如单纯赋值`a = b`，那么`a`和`b`其实是指向了同一个引用，这就是引用拷贝。深拷贝的意思是说`a`和`b`的内容相同，但是占据两块不同的内存空间，也就是拥有两个不同的引用。对于链表中的 Node 对象（假设对象中的属性分别是数据域`val`和指针域`next`）来说，可以这样做：
```
// 先开辟一块新的内存空间
const copyNode = new Node();
// copy旧结点的值
copyNode.val = curr.val;
// copy旧结点的next指针
copyNode.next = curr.next ? new Node() : null;
```

然后考虑如何处理深拷贝过程中的结点关系，在这里可以使用`Map`结构。在这个问题中，除了`next`指针还有`random`指针，结点关系相对复杂。这就意味着在处理结点关系的过程中必然会遇到“根据原结点定位它对应的 copy 结点”的需求，而`Map`结构可以做到这一点。

最后还要考虑`next`指针和`random`指针各自应该如何处理，可以先走一遍普通链表（也就是没有`random`指针）的复制流程。在这个过程中，一方面是完成对结点的复制和存储工作，另一方面也用`next`指针把新链表串了起来。这一步做完之后，新链表和老链表之间唯一的区别就在于`random`指针了。此时只需要同步遍历新旧两个链表，把`random`的指向映射到新链表上去即可。

### 问题实现
```
/**
 * // Definition for a Node.
 * function Node(val, next, random) {
 *  this.val = val;
 *  this.next = next;
 *  this.random = random;
 * };
 */


/**
 * @param {Node} head
 * @return {Node}
 */
const copyRandomList = (head) => {
  // 处理边界条件
  if (!head) return null;
  // 初始化copy的头部结点
  let copyHead = new Node();
  // 初始化copy的游标结点
  let copyNode = copyHead;
  // 初始化hashMap
  const hashMap = new Map();
  let curr = head;
  // 首次循环，正常处理链表的复制
  while (curr) {
    copyNode.val = curr.val;
    copyNode.next = curr.next ? new Node() : null;
    hashMap.set(curr, copyNode);
    curr = curr.next;
    copyNode = copyNode.next;
  }
  // 将游标复位到 head
  curr = head;
  // 将copy链表的游标也复位到 copyHead
  copyNode = copyHead;
  // 再搞个循环，特殊处理 random 关系
  while (curr) {
    // 处理random的指向
    copyNode.random = curr.random ? hashMap.get(curr.random) : null;
    // copyNode 和 curr 两个游标一起前进
    copyNode = copyNode.next;
    curr = curr.next;
  }

  // 注意这里返回的是 copyHead 而不是 head
  return copyHead;
};
```

---

【 完 】