# 数组的基本概念
## 基本概念
### 数组的创建
- 字面量方式创建：`const arr = []`;
- 通过 Array 对象创建：`const arr = new Array(n).fill(0)`;

### 二维数组
二维数组其实就是数组套数组，也就是每个元素都是数组的数组。在数学中，如同二维数组一般的长方阵列排列的复数或实数集合也被称为“矩阵”。

在创建二维数组时，不能使用`new Array(n).fill([])`。这是因为给到`fill()`方法传递一个入参时，如果这个入参的类型是引用类型，那么`fill()`在填充坑位时填充的其实就是入参的引用。

因此，在给二维数组初始化的时候，可以用一个`for`循环来解决。
```
const len = arr.length;
for (let i = 0; i < len; i++) {
  arr[i] = [];    // 将数组的每一个下标位置都初始化为一个数组
}
```

访问二维数组和访问一维数组差别不大，区别在于需要的是两层循环：
```
const outerLen = arr.length;    // 缓存外部数组的长度

for (let i = 0; i < outerLen; i++) {
  const innerLen = arr[i].length;    // 缓存内部数组的长度

  for(let j = 0; j < innerLen; j++) {
    console.log(arr[i][j], i, j);    // 输出数组的值和索引
  }
}
```

## 数组的常见操作
### 数组的访问
数组在内存中最为关键的一个特征，就是它一般是对应一段位于自己上界和下界之间的、一段连续的内存空间。

由于数组中的元素是连续的，每个元素的内存地址可以根据其索引距离数组头部的距离来计算出来。因此对数组来说，每一个元素都可以通过数组的索引下标直接定位。即可以直接通过指定索引值来访问对应的元素：`arr[0]`;

但在 JavaScript 中的数组不一定是位于一段连续的内存空间，如果在一个数组中只定义了一种类型的元素，那么对应的确实是连续内存。如果定义了不同类型的元素，对应的就是一段非连续的内存。此时的数组不再具有数组的特征，其底层使用哈希映射分配内存空间，是由对象链表来实现的。因此，也可以说在 JavaScript 中的数组并不一定是真正的数组。

### 数组的遍历
- `for`循环：性能最优；如果没有特殊的需要，统一使用`for`循环来实现遍历
- `forEach`方法
- `map`方法

### 数组的增加和删除
- `unshift()`：添加元素到数组的头部
- `push()`：添加元素到数组的尾部
- `shift()`：删除数组头部的元素
- `pop()`：删除数组尾部元素
- `splice(start, index, item...)`：从`start`位置删除`index`个元素，并添加`item`元素

# 数组的问题案例
与数组相关的题目，基本都会结合排序、二分和动态规划来设计。

## 两数求和
  LeetCode：[1. 两数之和](https://leetcode-cn.com/problems/two-sum/)

### 问题描述
给定一个整数数组`nums`和一个目标值`target`，请你在该数组中找出和为目标值的那两个整数，并返回他们的数组下标。你可以假设每种输入只会对应一个答案。但是，你不能重复利用这个数组中同样的元素。
```
输入：nums = [2, 7, 11, 15], target = 9
输出：[0, 1]
```

### 问题分析
几乎所有的求和问题，都可以转化为求差的问题。

因此可以在遍历数组的时候，增加一个`Map`来记录已经遍历过的数字及其对应的索引值。然后每遍历到一个新数字的时候，都回到`Map`里去查询`targetNum`与该数的差值是否已经在前面的数字中出现过了。若出现过，那么答案已然显现。

### 问题实现
```
/**
  * @param {number[]} nums
  * @param {number} target
  * @return {number[]}
  */
const twoSum = function(nums, target) {
  // 这里用对象来模拟 Map 的能力
  const diffs = {};

  for (let i = 0, len = nums.length; i < len; i++) {
    // 判断当前值对应的 target 差值是否存在（是否已遍历过）
    if (diffs[target - nums[i]] !== undefined) {
      // 若有对应差值，则得到结果
      return [diffs[target - nums[i]], i];
    }

    // 若没有对应差值，则记录当前值
    diffs[nums[i]] = i;
  }
};
```

## 合并两个有序数组
LeetCode：[88. 合并两个有序数组](https://leetcode-cn.com/problems/merge-sorted-array/)

### 问题描述
给你两个有序整数数组`nums1`和`nums2`，请你将`nums2`合并到`nums1`中，使`nums1`成为一个有序数组。

说明：
- 初始化`nums1`和`nums2`的元素数量分别为`m`和`n`
- 你可以假设`nums1`有足够的空间（空间大小大于或等于`m + n`）来保存`nums2`中的元素。
```
输入：nums1 = [1, 2, 3, 0, 0, 0], m = 3, nums2 = [2, 5, 6], n = 3
输出: [1, 2, 2, 3, 5, 6]
```

### 问题分析
首先定义两个指针，各指向两个数组生效部分的尾部。每次只对指针所指的元素进行比较，取其中较大的元素，把它从`nums1`的末尾往前面填补。

因为要把所有的值合并到`nums1`里，所以可以把`nums1`看做是一个已经在前面几个位置有值的容器。从后往前填补，填入的都是没有值的位置。但是由于`nums1`的有效部分和`nums2`并不一定是一样长的。还需要考虑其中一个提前到头的这种情况：
- 如果提前遍历完的是`nums1`的有效部分，剩下的是`nums2`。这时意味着`nums1`的头部空出来了，直接把`nums2`整个补到`nums1`前面去即可
- 如果提前遍历完的是`nums2`，剩下的是`nums1`。由于容器本身就是`nums1`，所以此时不必做任何额外的操作

### 问题实现
```
/**
  * @param {number[]} nums1
  * @param {number} m
  * @param {number[]} nums2
  * @param {number} n
  * @return {void} Do not return anything, modify nums1 in-place instead. 
  */
const merge = function(nums1, m, nums2, n) {
  // 初始化两个指针的指向，初始化 nums1 尾部索引 k
  let i = m - 1, j = n - 1, k = m + n - 1;
  // 当两个数组都没遍历完时，指针同步移动
  while(i >= 0 && j >= 0) {
    // 取较大的值，从末尾往前填补
    if (nums1[i] >= nums2[j]) {
      nums1[k] = nums1[i];
      i--;
      k--;
    } else {
      nums1[k] = nums2[j];
      j--;
      k--;
    }
  }

  // nums2 留下的情况，特殊处理一下
  while (j >= 0) {
    nums1[k] = nums2[j];
    k--;
    j--;
  }
};
```

## 三数求和问题
LeetCode：[15. 三数之和](https://leetcode-cn.com/problems/3sum/)

### 问题描述
给你一个包含`n`个整数的数组`nums`，判断`nums`中是否存在三个元素`a`，`b`，`c`，使得`a + b + c = 0`。请你找出所有满足条件且不重复的三元组。答案中不可以包含重复的三元组。
```
输入：nums = [-1, 0, 1, 2, -1, -4]
输出：[ [-1, 0, 1], [-1, -1, 2] ]
```

### 问题分析
三数求和问题延续两数求和问题的思路，可以把求和问题变成求差问题。即固定其中一个数，在剩下的数中寻找是否有两个数和这个固定数相加是等于`target`的。

双指针法一方面可以做到空间换时间，另一方面也可以帮助降低问题的复杂度。而它在涉及求和、比大小类的数组题目中时，大前提往往是需要对数组进行排序。否则双指针将无法缩小定位范围。

因此，采用双指针的第一步就是将数组进行排序：
```
nums = nums.sort((a, b) => a - b);
```

然后，对数组进行遍历，每次遍历到哪个数字，就固定哪个数字。然后把左指针指向该数字后面一个位置的数字，把右指针指向数组末尾，让左右指针从起点开始，向中间前进。每次指针移动一次位置，就计算一下两个指针指向数字之和加上固定的那个数之后，是否等于`target`的值。如果是，就得到了一个目标组合；否则，分两种情况来看：
- 相加之和大于`target`，说明右侧的数偏大了，右指针左移
- 相加之和小于`target`，说明左侧的数偏小了，左指针右移

这个数组在题目中要求的是不重复的三元组，因此还需要做一个重复元素的跳过处理。

左右指针一起从两边往中间位置相互迫近，这样的特殊双指针形态，被称为对撞指针。一般见到“有序”和“数组”这两个关键字，就要想到双指针法调度。如果无法使用普通的双指针，就要想到对撞指针。

对撞指针可以帮助缩小问题的范围，这一点在“三数求和”问题中体现得淋漓尽致：因为数组有序，所以可以用两个指针“画地为牢”圈出一个范围，这个范围以外的值不是太大就是太小、直接被排除在我们的判断逻辑之外，这样就可以把时间花在真正有意义的计算和对比上。如此一来，不仅节省了计算的时间，更降低了问题本身的复杂度。

### 问题实现
```
/**
  * @param {number[]} nums
  * @return {number[][]}
  */
const threeSum = function(nums) {
  // 用于存放结果数组
  let res = [];
  // 给 nums 排序
  nums = nums.sort((a, b)=>{ return a - b });
  // 缓存数组长度
  const len = nums.length;

  // 遍历到倒数第三个数就足够了，因为左右指针会遍历后面两个数
  for(let i = 0; i < len - 2; i++) {
    // 左指针 j
    let j = i + 1;
    // 右指针 k
    let k = len - 1;
    // 如果遇到重复的数字，则跳过
    if(i > 0 && nums[i] === nums[i - 1]) {
      continue;
    }

    while(j < k) {
      // 三数之和小于 0，左指针前进
      if(nums[i] + nums[j] + nums[k] < 0){
        j++;
        // 处理左指针元素重复的情况
        while(j < k && nums[j] === nums[j - 1]) {
          j++;
        }
      } else if(nums[i] + nums[j] + nums[k] > 0){
        // 三数之和大于 0，右指针后退
        k--;
        // 处理右指针元素重复的情况
        while(j < k && nums[k] === nums[k + 1]) {
          k--;
        }
      } else {
        // 得到目标数字组合，推入结果数组
        res.push([nums[i], nums[j], nums[k]]);
        // 左右指针一起前进
        j++;
        k--; 
        // 若左指针元素重复，跳过
        while(j < k && nums[j] === nums[j - 1]) {
          j++;
        }
        // 若右指针元素重复，跳过
        while(j < k && nums[k] === nums[k + 1]) {
          k--;
        }
      }
    }
  }
  // 返回结果数组
  return res;
};
```

# 字符串的问题案例
## 基础语法问题案例
### 反转字符串
```
// 定义被反转的字符串
const str = ‘juejin’;
// 定义反转后的字符串
const res = str.split('').reverse().join(‘');
```

### 判断一个字符串是否是回文字符串
回文字符串，就是正着读和倒着读都一摸一样的字符串，首先可以使用 JavaScript 提供的 API 来进行判断：
```
function isPalindrome(str) {
  // 先反转字符串
  const reversedStr = str.split('').reverse().join(‘’);
  // 判断反转前后是否相等
  return reversedStr === str;
}
```

当然，回文字符串还有一个完全对称的特性，因此也可以利用这个特性来进行判断：
```
function isPalindrome(str) {
  // 缓存字符串的长度
  const len = str.length;
  // 遍历前半部分，判断和后半部分是否对称
  for(let i = 0; i < len / 2; i++) {
    if(str[i] !== str[len - i - 1]) {
      return false;
    }
  }
  return true;
}
```

## 回文字符串衍生问题
LeetCode：[680. 验证回文字符串 II](https://leetcode-cn.com/problems/valid-palindrome-ii/)

### 问题描述
给定一个非空字符串`s`，最多删除一个字符，判断是否能成为回文字符串。
```
示例1：
    输入："aba"
    输出: True
示例 2：
    输入: "abca"
    输出: True
```

### 问题分析
字符串问题的描述中若有“回文”关键字，那么一定要注意使用它的“对称性”属性和“双指针”方法来解决。

首先是初始化两个指针，一个指向字符串头部，另一个指向尾部。如果两个指针所指的字符恰好相等，那么这两个字符就符合了回文字符串对对称性的要求，跳过它们往下走即可。如果两个指针所指的字符串不等，那么就意味着不对称发生了，意味着这是一个可以“删掉试试看”的操作点。可以分别对左指针字符和右指针字符尝试进行“跳过”，看看区间在`[left+1, right]`或`[left, right-1]`的字符串是否回文。如果是的话，那么就意味着如果删掉被“跳过”那个字符，整个字符串都将回文。

### 问题解决
```
const validPalindrome = function(s) {
  // 缓存字符串的长度
  const len = s.length;
  // i、j 分别为左右指针
  let i = 0, j= len - 1;
  // 当左右指针均满足对称时，一起向中间前进
  while(i < j && s[i] === s[j]) {
    i++;
    j--;
  }
  // 尝试判断跳过左指针元素后字符串是否回文
  if(isPalindrome(i + 1, j)) {
    return true;
  }
  // 尝试判断跳过右指针元素后字符串是否回文
  if(isPalindrome(i, j - 1)) {
    return true;
  }
  // 工具方法，用于判断字符串是否回文
  function isPalindrome(st, ed) {
    while(st < ed) {
      if(s[st] !== s[ed]) {
        return false;
      }
      st++;
      ed--;
    }
    return true;
  }
  // 默认返回 false
  return false;
};
```

## 字符串匹配问题（正则表达式）
LeetCode：[211. 添加与搜索单词 - 数据结构设计](https://leetcode-cn.com/problems/design-add-and-search-words-data-structure/)

### 问题描述
设计一个支持以下两种操作的数据结构：`void addWord(word)`和`bool search(word)`，`search(word)`可以搜索文字或正则表达式字符串，字符串只包含字母`.`或`a-z`；`.`可以表示任何一个字母。
```
示例：
  addWord("bad")
  addWord("dad")
  addWord("mad")
  search("pad") -> false
  search("bad") -> true
  search(".ad") -> true
  search("b..") -> true
```

### 问题分析
这个问题要求字符串既可以被添加、又可以被搜索，这就意味着字符串在添加时一定要被存在某处。键值对存储，可以用`Map`（或对象字面量来模拟`Map`）。这里为了降低查找时的复杂度，还可以考虑以字符串的长度为`key`，相同长度的字符串存在一个数组中，这样可以提高我们后续定位的效率。

难点在于`search`这个 API，它既可以搜索文字，又可以搜索正则表达式。因此我们在搜索前需要额外判断一下，传入的到底是普通字符串，还是正则表达式。若是普通字符串，则直接去`Map`中查找是否有这个`key`；若是正则表达式，则创建一个正则表达式对象，判断`Map`中相同长度的字符串里，是否存在一个能够与这个正则相匹配。

### 问题实现
```
/**
  * 构造函数
  */
const WordDictionary = function () {
  // 初始化一个对象字面量，承担 Map 的角色
  this.words = {};
};

/**
  * 添加字符串的方法
  */
WordDictionary.prototype.addWord = function (word) {
  // 若该字符串对应长度的数组已经存在，则只做添加
  if (this.words[word.length]) {
    this.words[word.length].push(word);
  } else {
    // 若该字符串对应长度的数组还不存在，则先创建
    this.words[word.length] = [word];
  }
};

/**
  * 搜索方法
  */
WordDictionary.prototype.search = function (word) {
  // 若该字符串长度在 Map 中对应的数组根本不存在，则可判断该字符串不存在
  if (!this.words[word.length]) {
    return false;
  }
  // 缓存目标字符串的长度
  const len = word.length;
  // 如果字符串中不包含‘.’，那么一定是普通字符串
  if (!word.includes('.')) {
    // 定位到和目标字符串长度一致的字符串数组，在其中查找是否存在该字符串
    return this.words[len].includes(word);
  }
  // 否则是正则表达式，要先创建正则表达式对象
  const reg = new RegExp(word);
  // 只要数组中有一个匹配正则表达式的字符串，就返回 true
  return this.words[len].some((item) => {
    return reg.test(item);
  });
};
```

---

【 完 】