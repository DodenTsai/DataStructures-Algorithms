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


# 字符串的问题案例