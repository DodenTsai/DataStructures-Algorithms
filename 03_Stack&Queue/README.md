在 JavaScript 中，栈和队列的实现一般都要依赖于数组，它们也可以被看作是一种特殊的数组。但是，栈和队列作为两种运算受限的线性表，也可以用链表来实现；但在 JavaScript 中为了降低难度，用数组来实现就可以了。

栈和队列的区别在于它们各自对数组的增删操作有着不一样的限制。

# 栈
## 基本概念
栈是一种后进先出（LIFO，Last In First Out）的数据结构，可以看作是一个只用`pop`和`push`完成增删的“数组”。

其特征为：只允许从尾部添加元素、只允许从尾部取出元素。

另外，获取栈顶就对应着取数组尾部的元素。
```
// 栈的初始状态
const stack = [];

// 入栈
stack.push(item);

// 出栈
stack.pop();

// 获取栈顶元素
stack[stack.length - 1];
```

## 栈的问题案例
### 有效括号问题
LeetCode：[20. 有效的括号](https://leetcode-cn.com/problems/valid-parentheses/)

#### 问题描述
给定一个只包括`'('`，`')'`，`'{'`，`'}'`，`'['`，`']'`的字符串，判断字符串是否有效。有效字符串需满足 左括号必须用相同类型的右括号闭合、左括号必须以正确的顺序闭合、注意空字符串可被认为是有效字符串。
```
示例 1：
    输入："()"
    输出：true
示例 2：
    输入："()[]{}"
    输出：true
示例 3：
    输入："(]”
    输出：false
示例 4：
    输入："([)]”
    输出：false
示例 5：
    输入："{[]}"
    输出：true
```

#### 问题分析
这个问题中出现的括号元素代表着对称性，一般首选用栈来解决。根据栈的后进先出原则，一组数据的入栈和出栈顺序刚好是对称的。一般来说，问题描述中涉及到括号问题的，很可能与栈相关。

在遍历字符串的过程中，往栈里`push`括号对应的配对字符。比如如果遍历到了`(`，就往栈里`push )`。假如字符串中所有的括号都成立，那么前期`push`进去的一定全都是左括号、后期`push`进去的一定全都是右括号。而且左括号的入栈顺序，和其对应的右括号的入栈顺序应该是相反的。

因此，可以果断地认为在左括号全部入栈结束时，栈顶的那个左括号，就是第一个需要被配对的左括号。此时需要判断的是接下来入栈的第一个右括号是否和此时栈顶的左括号配对。如果配对成功，那么这一对括号就是有效的，否则直接`return false`。

当判断出一对有效的括号之后，需要及时地将其出栈，去判断其它括号是否有效。每配对成功一对括号，都将这对括号出栈。这样一来就可以确保栈顶的括号总是下一个需要被匹配的左括号。如果说出栈到最后，栈不为空，那么意味着一部分没有被匹配上的括号被剩下来了，说明字符串中并非所有的括号都有效，判断`false`；反之，则说明所有的括号都配对成功了，判断为`true`。

#### 问题实现
```
// 用一个 Map 来维护左括号和右括号的对应关系
const leftToRight = {
  "(": ")”,
  "[": "]”,
  "{": “}”,
};

/**
  * @param {string} s 
  * @return {boolean} 
  */
const isValid = function (s) {
  // 结合题意，空字符串无条件判断为 true
  if (!s) {
    return true;
  }
  // 初始化 stack 数组
  const stack = [];
  // 缓存字符串长度
  const len = s.length;
  // 遍历字符串
  for (let i = 0; i < len; i++) {
    // 缓存单个字符
    const ch = s[i];
    // 判断是否是左括号，这里我为了实现加速，没有用数组的 includes 方法，直接手写判断逻辑
    if (ch === "(" || ch === "{" || ch === "[“) {
      stack.push(leftToRight[ch]);
    }
    // 若不是左括号，则必须是和栈顶的左括号相配对的右括号
    else {
      // 若栈不为空，且栈顶的左括号没有和当前字符匹配上，那么判为无效
      if (!stack.length || stack.pop() !== ch) {
        return false;
      }
    }
  }
  // 若所有的括号都能配对成功，那么最后栈应该是空的
  return !stack.length;
};
```

### 每日温度问题
LeetCode：[739. 每日温度](https://leetcode-cn.com/problems/daily-temperatures/)

#### 问题描述
根据每日气温列表，请重新生成一个列表，对应位置的输出是需要再等待多久温度才会升高超过该日的天数。如果之后都不会升高，请在该位置用`0`来代替。气温列表长度的范围是`[1, 30000]`。

每个气温的值的均为华氏度，都是在`[30, 100]`范围内的整数。

```
输入：temperatures = [73, 74, 75, 71, 69, 72, 76, 73]
输出：[1, 1, 4, 2, 1, 1, 0, 0]
```

#### 问题分析
栈结构可以避免一个数组两层遍历的重复操作，避免重复操作的秘诀就是及时地将不必要的数据出栈，避免它对后续的遍历产生干扰。

对于这个问题来说，就是要尝试去维持一个递减栈。当遍历过的温度，维持的是一个单调递减的态势时，对这些温度的索引下标执行入栈操作；只要出现了一个数字，它打破了这种单调递减的趋势，也就是说它比前一个温度值高，这时就对前后两个温度的索引下标求差，得出前一个温度距离第一次升温的目标差值。

在这个过程中，仅对每一个温度执行最多一次入栈操作、一次出栈操作，整个数组只会被遍历一次，因此时间复杂度就是`O(n)`。

#### 问题实现
```
/**
  * @param {number[]} T
  * @return {number[]}
  */
// 入参是温度数组
const dailyTemperatures = function(T) {
  const len = T.length;
  // 缓存数组的长度
  const stack = [];
  // 初始化一个栈
  const res = (new Array(len)).fill(0);
  // 初始化结果数组，注意数组定长，占位为 0
  for(let i = 0; i < len; i++) {
    // 若栈不为 0，且存在打破递减趋势的温度值
    while (stack.length && T[i] > T[stack[stack.length - 1]]) {
      // 将栈顶温度值对应的索引出栈
      const top = stack.pop();
      // 计算当前栈顶温度值与第一个高于它的温度值的索引差值
      res[top] = i - top;
    }
    // 注意栈里存的不是温度值，而是索引值，这是为了后面方便计算
    stack.push(i);
  }
  // 返回结果数组
  return res;
};
```

### 最小栈问题
LeetCode：[155. 最小栈](https://leetcode-cn.com/problems/min-stack/)

#### 问题描述
设计一个支持`push`，`pop`，`top`操作，并能在常数时间内检索到最小元素的栈。
- `push(x)`将元素`x`推入栈中
- `pop()`删除栈顶的元素
- `top()`获取栈顶元素
- `getMin()`检索栈中的最小元素

```
示例:
    MinStack minStack = new MinStack();
    minStack.push(-2);
    minStack.push(0);
    minStack.push(-3);
    minStack.getMin();    --> 返回 -3.
    minStack.pop();
    minStack.top();       --> 返回 0.
    minStack.getMin();    --> 返回 -2.
```

#### 问题分析
`getMin`要做的事情是从一个栈里找出其中最小的数字。

第一个方法是先初始化一个最小值变量，它的初始值可以设一个非常大的数（如`Infinity`），然后开始遍历整个栈。在遍历的过程中，如果遇到了更小的值，就把最小值变量更新为这个更小的值。这样遍历结束后，我们就能拿到栈中的最小值了。这个过程中，对栈进行了一次遍历，时间复杂度无疑是`O(n)`。

```
/**
  * 初始化你的栈结构
  */
const MinStack = function() {
  this.stack = [];
};

/**
  * @param {number} x
  * @return {void}
  */
// 栈的入栈操作，其实就是数组的 push 方法
MinStack.prototype.push = function(x) {
  this.stack.push(x);
};

/**
  * @return {void}
  */
// 栈的入栈操作，其实就是数组的 pop 方法
MinStack.prototype.pop = function() {
  this.stack.pop();
};

/**
  * @return {number}
  */
// 取栈顶元素
MinStack.prototype.top = function() {
  if(!this.stack || !this.stack.length) {
    return;
  }
  return this.stack[this.stack.length - 1];
};

/**
  * @return {number}
  */
// 按照一次遍历的思路取最小值
MinStack.prototype.getMin = function() {
  let minValue = Infinity;
  const { stack } = this;

  for(let i = 0; i < stack.length; i++) {
    if (stack[i] < minValue) {
      minValue = stack[i];
    }
  }
  return minValue;
};
```

但是，在这个问题里，还可以考虑再搞个栈出来作为辅助，让这个栈去容纳当前的最小值。以空间换时间，将算法的时间复杂度由`O(n)`变为`O(1)`。要让这个辅助栈确切提供最小值，需要实现的是一个从栈底到栈顶呈递减趋势的栈：
- 取最小值：由于整个栈从栈底到栈顶递减，因此栈顶元素就是最小元素
- 若有新元素入栈：判断是不是比栈顶元素还要小，否则不准进入辅助栈
- 若有元素出栈：判断是不是和栈顶元素相等，如果是的话，辅助栈也要出栈

```
const MinStack = function() {
  this.stack = [];
  // 定义辅助栈
  this.stack2 = [];
};

/**
  * @param {number} x
  * @return {void}
  */
MinStack.prototype.push = function(x) {
  this.stack.push(x);
  // 若入栈的值小于当前最小值，则推入辅助栈栈顶
  if (this.stack2.length == 0 || this.stack2[this.stack2.length - 1] >= x) {
    this.stack2.push(x);
  }
};

/**
  * @return {void}
  */
MinStack.prototype.pop = function() {
  // 若出栈的值和当前最小值相等，那么辅助栈也要对栈顶元素进行出栈，确保最小值的有效性
  if (this.stack.pop() == this.stack2[this.stack2.length - 1]) {
    this.stack2.pop();
  }
};

/**
  * @return {number}
  */
MinStack.prototype.top = function() {
  return this.stack[this.stack.length - 1];
};

/**
  * @return {number}
  */
MinStack.prototype.getMin = function() {
  // 辅助栈的栈顶，存的就是目标中的最小值
  return this.stack2[this.stack2.length - 1];
};
```

# 队列
## 队列的基本概念
队列是一种先进先出（FIFO，First In First Out）的数据结构，可以看作是一个只用`push`和`shift`完成增删的“数组”。

其特征为：只允许从尾部添加元素、只允许从头部移除元素。

另外，在出栈的时候关心队尾元素（数组尾部元素），入栈的时候关心队首元素（数组头部元素）。

```
// 队列的初始状态
const queue = [];

// 入队
queue.push(item);

// 出队
queue.shift();

// 获取队首元素
queue[0];

// 获取队尾元素
queue[queue.length - 1];
```

## 队列问题案例
### 用栈实现一个队列
LeetCode：[232. 用栈实现队列](https://leetcode-cn.com/problems/implement-queue-using-stacks/)

#### 问题描述
使用栈实现队列的操作，如`push(x)`将一个元素放入队列的尾部；`pop()`从队列首部移除元素；`peek()`返回队列首部的元素；`empty()`返回队列是否为空。你只能使用标准的栈操作，也就是只有`pushToTop`、`peekOrPopFromTop`、`size`和`isEmpty`操作是合法的；你所使用的语言也许不支持栈，你可以使用`list`或者`deque`（双端队列）来模拟一个栈，只要是标准的栈操作即可。假设所有操作都是有效的（例如，一个空的队列不会调用`pop`或者`peek`操作）。

```
示例：
    MyQueue queue = new MyQueue();
    queue.push(1);
    queue.push(2);
    queue.peek();    // 返回 1
    queue.pop();     // 返回 1
    queue.empty();   // 返回 false
```

#### 问题分析
栈是后进先出（LIFO）的结构；队列是先进先出（FIFO）的结构，两者的进出顺序是相反的。用栈实现队列就是用栈实现先进先出的效果，也就是要让栈底的元素首先被取出，即让出栈序列被逆序。这时候，可以用两个栈来实现。

#### 问题实现
```
/**
  * 初始化构造函数
  */
const MyQueue = function () {
  // 初始化两个栈
  this.stack1 = [];
  this.stack2 = [];
};

/**
  * Push element x to the back of queue.
  * @param {number} x
  * @return {void}
  */
MyQueue.prototype.push = function (x) {
  // 直接调度数组的 push 方法
  this.stack1.push(x);
};

/**
  * Removes the element from in front of queue and returns that element.
  * @return {number}
  */
MyQueue.prototype.pop = function () {
  // 假如 stack2 为空，需要将 stack1 的元素转移进来
  if (this.stack2.length <= 0) {
    // 当 stack1 不为空时，出栈
    while (this.stack1.length !== 0) {
      // 将 stack1 出栈的元素推入 stack2
      this.stack2.push(this.stack1.pop());
    }
  }
  // 为了达到逆序的目的，我们只从 stack2 里出栈元素
  return this.stack2.pop();
};

/**
  * Get the front element.
  * @return {number}
  * 这个方法和 pop 唯一的区别就是没有将定位到的值出栈
  */
MyQueue.prototype.peek = function () {
  if (this.stack2.length <= 0) {
    // 当 stack1 不为空时，出栈
    while (this.stack1.length != 0) {
      // 将 stack1 出栈的元素推入 stack2
      this.stack2.push(this.stack1.pop());
    }
  }
  // 缓存 stack2 的长度
  const stack2Len = this.stack2.length;
  return stack2Len && this.stack2[stack2Len - 1];
};

/**
  * Returns whether the queue is empty.
  * @return {boolean}
  */
MyQueue.prototype.empty = function () {
  // 若 stack1 和 stack2 均为空，那么队列空
  return !this.stack1.length && !this.stack2.length;
};
```

### 滑动窗口（双端队列）
LeetCode：[239. 滑动窗口最大值](https://leetcode-cn.com/problems/sliding-window-maximum/)

双端队列就是允许在队列的两端进行插入和删除的队列，最常见的载体是既允许使用`pop`、`push`同时又允许使用`shift`、`unshift`的数组。

#### 问题描述
给定一个数组`nums`和滑动窗口的大小`k`，请找出所有滑动窗口里的最大值。你可以假设`k`总是有效的，在输入数组不为空的情况下，`1 ≤ k ≤ 输入数组的大小`。
```
输入：nums = [1,3,-1,-3,5,3,6,7]，k = 3
输出：[3,3,5,5,6,7]
```

#### 问题分析
首先可以用双指针遍历法来实现，问题要求在遍历数组的过程当中，约束一个窗口，其本质其实就是一个范围。因此这里定义一个 left 左指针、定义一个 right 右指针，分别指向窗口的两端。

接下来可以把这个窗口里的数字取出来，直接遍历一遍、求出最大值，然后把最大值存进结果数组。

反复执行上面这个过程，直到数组完全被滑动窗口遍历完毕，也就得到了问题的答案。

```
/**
  * @param {number[]} nums
  * @param {number} k
  * @return {number[]}
  */
const maxSlidingWindow = function (nums, k) {
  // 缓存数组的长度
  const len = nums.length;
  // 定义结果数组
  const res = [];
  // 初始化左指针
  let left = 0;
  // 初始化右指针
  let right = k - 1;
  // 当数组没有被遍历完时，执行循环体内的逻辑
  while (right < len) {
    // 计算当前窗口内的最大值
    const max = calMax(nums, left, right);
    // 将最大值推入结果数组
    res.push(max);
    // 左指针前进一步
    left++;
    // 右指针前进一步
    right++;
  }
  // 返回结果数组
  return res;
};

// 这个函数用来计算最大值
function calMax (arr, left, right) {
  // 处理数组为空的边界情况
  if (!arr || !arr.length) {
    return;
  }
  // 初始化 maxNum 的值为窗口内第一个元素
  let maxNum = arr[left];
  // 遍历窗口内所有元素，更新 maxNum 的值
  for (let i = left; i <= right; i++) {
    if (arr[i] > maxNum) {
      maxNum = arr[i];
    }
  }
  // 返回最大值
  return maxNum;
}
```

这个操作里其实涉及了两层循环，外层循环是`while`，它和滑动窗口前进的次数有关，因此这个解法的时间复杂度为`O(kn)`。但是，这里可以用双端队列的方法将时间复杂度降为`O(n)`。

使用双端队列法，核心的思路是维护一个有效的递减队列。在遍历数组的前期，尝试将遍历到的每一个元素都推入队列内部。每尝试推入一个元素前，都把这个元素与队列尾部的元素作对比。根据对比结果的不同，采取不同的措施：
- 如果试图推入的元素（当前元素）大于队尾元素，则意味着队列的递减趋势被打破了。此时需要将队列尾部的元素依次出队，直到队尾元素大于等于当前元素为止，此时再将当前元素入队
- 如果试图推入的元素小于队列尾部的元素，那么就不需要额外的操作，直接把当前元素入队即可

维持递减队列的目的，就在于确保队头元素始终是当前窗口的最大值。当遍历到的元素个数达到了`k`个时，意味着滑动窗口的第一个最大值已经产生了，把它`push`进结果数组里。

需要注意的是，队列本身只维护滑动窗口内的元素，如果超出了窗口范围，需要将多余的元素出队。
1. 检查队尾元素，看是否满足大于等于当前元素的条件；如果是，直接将当前元素入队，否则，将队尾元素逐个出队，直到队尾元素大于等于当前元素为止（维持队列的递减性，确保队头元素是当前滑动窗口的最大值）
2. 将当前元素入队
3. 检查队头元素，看队头元素是否已经被排除在滑动窗口的范围之外了；如果是，则将队头元素出队（维持队列的有效性，确保队列中所有的元素都在滑动窗口圈定的范围内）
4. 判断滑动窗口的状态：看当前遍历过的元素个数是否小于`k`。如果元素个数小于`k`，这意味着第一个滑动窗口内的元素都还没遍历完，第一个最大值还没出现，此时还不能动结果数组，只能继续更新队列；如果元素个数大于等于`k`，这意味着滑动窗口的最大值已经出现了，此时每遍历到一个新元素，也就是滑动窗口每往前走一步，都要及时地往结果数组里添加当前滑动窗口对应的最大值，即队头元素（排除掉滑动窗口还没有初始化完成、第一个最大值还没有出现的特殊情况）

```
/**
  * @param {number[]} nums
  * @param {number} k
  * @return {number[]}
  */
const maxSlidingWindow = function (nums, k) {
  // 缓存数组的长度
  const len = nums.length;
  // 初始化结果数组
  const res = [];
  // 初始化双端队列
  const deque = [];
  // 开始遍历数组
  for (let i = 0; i < len; i++) {
    // 当队尾元素小于当前元素时
    while (deque.length && nums[deque[deque.length - 1]] < nums[i]) {
      // 将队尾元素（索引）不断出队，直至队尾元素大于等于当前元素
      deque.pop();
    }
    // 入队当前元素索引（注意是索引）
    deque.push(i);
    // 当队头元素的索引已经被排除在滑动窗口之外时
    while (deque.length && deque[0] <= i - k) {
      // 将队头元素索引出队
      deque.shift();
    }
    // 判断滑动窗口的状态，只有在被遍历的元素个数大于 k 的时候，才更新结果数组
    if (i >= k - 1) {
      res.push(nums[deque[0]]);
    }
  }
  // 返回结果数组
  return res;
};
```

---

【完】
