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

## “合并区间”问题
LeetCode：[56. 合并区间](https://leetcode-cn.com/problems/merge-intervals/)

### 题目描述
给出一个区间的集合，请合并所有重叠的区间。
```
示例 1：
      输入: [[1, 3], [2, 6], [8, 10], [15, 18]]
      输出: [[1, 6], [8, 10], [15, 18]]
示例 2：
      输入: [[1, 4], [4, 5]]
      输出: [[1, 5]]
```

### 问题分析
在这个问题中，需要注意“区间”二字。对于对于区间类问题，尝试以区间内的第一个元素为索引进行排序，往往可以帮助找到问题的突破点。对于有序区间，其实可以从头开始，逐个合并首尾有交集的区间。

### 问题实现
```
/**
 * @param {number[][]} intervals
 * @return {number[][]}
 */
const merge = function(intervals) {
  // 定义结果数组
  const res = [];
  // 缓存区间个数
  const len = intervals.length;
  // 将所有区间按照第一个元素大小排序
  intervals.sort(function(a, b) {
    return a[0] - b[0];
  });
  // 处理区间的边界情况
  if (!intervals || !intervals.length) {
    return [];
  }
  // 将第一个区间（起始元素最小的区间）推入结果数组（初始化）
  res.push(intervals[0]);
  // 按照顺序，逐个遍历所有区间
  for (let i = 1; i < len; i++) {
    // 取结果数组中的最后一个元素，作为当前对比的参考
    prev = res[res.length-1];
    // 若满足交错关系（前一个的尾部 >= 下一个的头部）
    if(prev[1] >= intervals[i][0]) {
      prev[1] = Math.max(prev[1], intervals[i][1]);
    } else {
      res.push(intervals[i]);
    }
  }
  return res;
}
```

## 寻找两个正序数组的中位数
LeetCode：[4. 寻找两个正序数组的中位数](https://leetcode-cn.com/problems/median-of-two-sorted-arrays/)

### 问题描述
给定两个大小为`m`和`n`的正序（从小到大）数组`nums1`和`nums2`，请你找出这两个正序数组的中位数，并且要求算法的时间复杂度为`O(log(m + n))`。你可以假设`nums1`和`nums2`不会同时为空。
```
示例 1：
      输入：nums1 = [1, 3], nums2 = [2]
      输出：2.00000
示例 2：
      输入：nums1 = [1, 2], nums2 = [3, 4]
      输出：2.50000
示例 3：
      输入：nums1 = [0, 0], nums2 = [0, 0]
      输出：0.00000
示例 4：
      输入：nums1 = [], nums2 = [1]
      输出：1.00000
示例 5：
      输入：nums1 = [2], nums2 = []
      输出：2.00000
```

### 问题分析
问题描述中若要求`log`级别的时间复杂度，则优先使用二分法来解决问题。既然这个问题要求的是`log`级别的时间复杂度，那么首先考虑的就不再是“遍历”，而是“切割”。

如果只允许用切割的方式来定位两个正序数组的中位数，首先应该想到从元素的数量上入手。
- 如果数组的长度为偶数，偶数个数字的中位数，按照定义需要取中间两个元素的平均值
- 如果数组的长度为奇数，那么中间位数就是它的中位数

具体到这个问题中，确定分割点时要先想到让`nums1 切割后左侧的元素个数 + nums2 切割后左侧元素的个数 === 两个数组长度和的一半`，即：
```
slice1 + slice2 === Math.floor((nums1.length + nuns.length) / 2);
```
此时，`nums1`、`nums2`的长度是已知的，这也就意味着只要求出`slice1`和`slice2`中的一个，另一个值就能求出来了。

这时明确一下解决这个问题的大方向，即用二分法定位出其中一个数组的`slice1`，然后通过做减法求出另一个数组的`slice2`。那么，其中一个数组到底以`nums1`为准还是以`nums2`为准是以长度较短的数组为准。这样做，可以减少二分计算的范围提高算法的效率。

因此，解决问题的开局就是要校验两个数组的长度大小关系：
```
const findMedianSortedArrays = function (nums1, nums2) {  
  const len1 = nums1.length;
  const len2 = nums2.length;   
  // 确保直接处理的数组（第一个数组）总是较短的数组
  if(len1 > len2) {
    return findMedianSortedArrays(nums2, nums1);
  }
  ...
}
```

从而确保较短的数组始终占据`nums1`的位置，后续就拿`nums1`来做二分计算。

用二分法解决问题，首先需要明确二分的两个端点。在没有任何多余线索的情况下，只能把二分的端点定义为`nums1`的起点和终点:
```
// 初始化第一个数组二分范围的左端点
let slice1L = 0;
// 初始化第一个数组二分范围的右端点
let slice1R = len1;
```
基于此去计算`slice1`的值：
```
slice1 = Math.floor((slice1R - slice1L)/2) + slice1L; 
```
然后通过做减法求出`slice2`：
```
slice2 = Math.floor(len/2) - slice1;
```
确认二分是否合理的标准只有一个：分割后，需要确保左侧的元素都比右侧的元素小，也就是说两个分割线要间接地把两个数组按照正序分为两半。这个标准用变量关系可以表示如下：
```
L1 <= R1  
L1 <= R2  
L2 <= R1 
L2 <= R2  
```
由于数组本身是正序的，所以`L1 <= R1`、`L2 <= R2`是必然的，需要判断的是剩下两个不等关系：
- 若发现`L1 > R2`，则说明`slice1`取大了，需要用二分法将`slice1`适当左移
- 若发现`L2 > R1`，则说明`slice1`取小了，需要用二分法将`slice1`适当右移
```
// 处理 L1 > R2 的错误情况
 if(L1 > R2) {
  // 将 slice1R 左移，进而使 slice1 对应的值变小
  slice1R = slice1 - 1;
} else if(L2 > R1) {
  // 反之将 slice1L 右移，进而使 slice1 对应的值变大
  slice1L = slice1 + 1;
}
```
只有当以上两种偏差情况都不发生时，分割线才算定位得恰到好处，此时就可以执行取中位数的逻辑了：
```
// len 表示两个数组的总长度
if (len % 2 === 0) {
  // 偶数长度对应逻辑（取平均值）
  const L = L1 > L2 ? L1 : L2;
  const R = R1 < R2 ? R1 : R2;
  return  (L + R) / 2;
} else {
  // 奇数长度对应逻辑（取中间值）
  const median = (R1 < R2) ? R1 : R2;
  return median;
}
```

### 问题实现
```
/**
  * @param {number[]} nums1
  * @param {number[]} nums2
  * @return {number}
  */
const findMedianSortedArrays = function (nums1, nums2) {
  const len1 = nums1.length;
  const len2 = nums2.length;
  // 确保直接处理的数组（第一个数组）总是较短的数组
  if (len1 > len2) {
    return findMedianSortedArrays(nums2, nums1);
  }
  // 计算两个数组的总长度
  const len = len1 + len2;
  // 初始化第一个数组“下刀”的位置
  let slice1 = 0;
  // 初始化第二个数组“下刀”的位置
  let slice2 = 0;
  // 初始化第一个数组二分范围的左端点
  let slice1L = 0;
  // 初始化第一个数组二分范围的右端点
  let slice1R = len1;
  let L1, L2, R1, R2;
  // 当 slice1 没有越界时
  while (slice1 <= len1) {
    // 以二分原则更新 slice1
    slice1 = Math.floor((slice1R - slice1L) / 2) + slice1L;
    // 用总长度的 1/2 减去 slice1，确定 slice2
    slice2 = Math.floor(len / 2) - slice1;
    // 计算 L1、L2、R1、R2
    const L1 = (slice1 === 0) ? -Infinity : nums1[slice1 - 1];
    const L2 = (slice2 === 0) ? -Infinity : nums2[slice2 - 1];
    const R1 = (slice1 === len1) ? Infinity : nums1[slice1];
    const R2 = (slice2 === len2) ? Infinity: nums2[slice2];
    // 处理 L1 > R2 的错误情况
    if (L1 > R2) {
      // 将 slice1R 左移，进而使 slice1 对应的值变小
      slice1R = slice1 - 1;
    } else if (L2 > R1) {
      // 反之将 slice1L 右移，进而使 slice1 对应的值变大
      slice1L = slice1 + 1;
    } else {
      // 如果已经符合取中位数的条件（L1 < R2 && L2 < R1)，则直接取中位数
      if (len % 2 === 0) {
        const L = L1 > L2 ? L1 : L2;
        const R = R1 < R2 ? R1 : R2;
        return (L + R) / 2;
      } else {
        const median = (R1 < R2) ? R1 : R2;
        return median;
      }
    }
  }
  return -1;
};
```

## “接雨水”问题
LeetCode：[42. 接雨水](https://leetcode-cn.com/problems/trapping-rain-water/)

### 问题描述
给定`n`个非负整数表示每个宽度为 1 的柱子的高度图，计算按此排列的柱子，下雨之后能接多少雨水。
```
示例 1：
      输入：height = [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]
      输出：6
示例 2：
      输入：height = [4, 2, 0, 3, 2, 5]
      输出：9
```

### 问题分析
对于这个问题来说，一般使用双指针法来解决。这个问题是一个与现实生活结合得比较紧密的应用题，拿到手要做的第一件事就是要结合问题描述和问题示例抽离解题模型。

从示例来说，这个问题给到的一个关键信息是它的入参是一个数组，因此肯定是需要使用“遍历”方式来解决。雨水是由柱子“围起来”的，每滩雨水的两侧都有两根柱子，雨水是否能够接住，能接住多少雨水，涉及到两根柱子的综合分析。因此，这个问题需要使用两个指针来对数组进行遍历。

对于数组问题来说，双指针未必总是作为单指针解法的改进技巧存在，它也是有对口解决问题的场景。所以在解决数组一类的问题（尤其是比较复杂的数组问题）时，双指针法必须在备选方案里存在。

对于这个问题本身来说，双指针的作用就是帮助更加直接地处理“柱子高度和雨水量”之间的关系，实现对现实问题的模拟。所以说要想弄清楚双指针怎么用，首先得捋清楚“柱子高度和雨水量”之间的关系。找关系的这个过程很关键，考验的是观察能力和归纳总结能力。

如果对“柱子高度和雨水量”之间的关系这个大问题感到懵逼，那么不妨把它拆解成更加具体的小问题。终极目标是统计雨水量，要想做到这点，有两个前提：一是要能接到雨水，二是要知道接到了多少雨水。拆解出来的问题就可以是这样的：
- 什么情况下能接到雨水
- 接到的雨水的量的多少是由谁来决定的

由这两个问题带入问题描述中，不难得出如下的结论：
- 两个柱子之间有“凹槽”时，可以接到雨水
- 雨水的量由左右两边较矮的柱子的高度决定

因为这个问题中的“凹槽”是在对撞的过程中“夹”出来的，因此需要选择对撞指针。由问题描述可知，对于左右两边来说，“凹槽”的高度就是相邻两根柱子之间的高度差，但是对于中间的“凹槽”来说，它的高度是当前柱子和它左侧最高的那个柱子之间的高度差。因此，“凹槽”的深度不是由与它相邻的柱子来决定的，而是由某一侧的最高的柱子来决定的。

由此可以得到一个这样的结论：对于“凹槽”来说，决定它高度的不是与它相邻的那个柱子，而是左侧最高柱子和右侧最高柱子中，较矮的那个柱子。因此在指针对撞的过程中，主要任务有两个：
- 维护一对`leftCur`（左指针）和`rightCur`（右指针），以对撞的形式从两边向中间遍历所有的柱子
- 在遍历的过程中，维护一对`leftMax`和`rightMax`，时刻记录当前两侧柱子高度的最大值。以便在遇到“凹槽”时，结合`leftCur`与`rightCur`各自指向的柱子高度，完成凹槽深度（也就是蓄水量）的计算

### 问题实现
```
/**
  * @param {number[]} height
  * @return {number}
  */
const trap = function (height) {
  // 初始化左指针
  let leftCur = 0;
  // 初始化右指针
  let rightCur = height.length - 1;
  // 初始化最终结果
  let res = 0;
  // 初始化左侧最高的柱子 let
  leftMax = 0;
  // 初始化右侧最高的柱子
  let rightMax = 0;
  // 对撞指针开始走路
  while (leftCur < rightCur) {
    // 缓存左指针所指的柱子的高度
    const left = height[leftCur];
    // 缓存右指针所指的柱子的高度
    const right = height[rightCur];
    // 以左右两边较矮的柱子为准，选定计算目标
    if (left < right) {
      // 更新 leftMax
      leftMax = Math.max(left, leftMax);
      // 累加蓄水量
      res += leftMax - left;
      // 移动左指针
      leftCur++;
    } else {
      // 更新 rightMax
      rightMax = Math.max(right, rightMax);
      // 累加蓄水量
      res += rightMax - right;
      // 移动右指针
      rightCur--;
    }
  }
  // 返回计算结果
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

## 字符串与数字之间的转换问题（正则表达式）
LeetCode：[8. 字符串转换整数 (atoi)](https://leetcode-cn.com/problems/string-to-integer-atoi/)

### 问题描述
请你来实现一个`atoi`函数，使其能将字符串转换成整数。首先，该函数会根据需要丢弃无用的开头空格字符，直到寻找到第一个非空格的字符为止。当我们寻找到的第一个非空字符为正或者负号时，则将该符号与之后面尽可能多的连续数字组合起来，作为该整数的正负号；假如第一个非空字符是数字，则直接将其与之后连续的数字字符组合起来，形成整数。

该字符串除了有效的整数部分之后也可能会存在多余的字符，这些字符可以被忽略，它们对于函数不应该造成影响。假如该字符串中的第一个非空格字符不是一个有效整数字符、字符串为空或字符串仅包含空白字符时，则你的函数不需要进行转换。在任何情况下，若函数不能进行有效的转换时，请返回 0。假设我们的环境只能存储`32`位大小的有符号整数，那么其数值范围为`[−2^31,  2^31 − 1]`。如果数值超过这个范围，请返回`INT_MAX (2^31 − 1)`或`INT_MIN (−2^31)`。
```
示例 1：
    输入: "42"
    输出: 42
示例 2：
    输入: " -42"
    输出: -42
示例 3：
    输入: "4193 with words"
    输出: 4193
示例 4：
    输入: "words and 987"
    输出: 0
示例 5：
    输入: "-91283472332"
    输出: -2147483648
```

### 问题分析
【第一步】计算卡口：

因为要求数值范围为`[−2^31,  2^31 − 1]`，所以要先计算这个卡口。计算某个数的`n`次方，要用到`Math.pow`这个方法：
```
// 计算最大值
const max = Math.pow(2, 31) - 1;
// 计算最小值
const min = -max - 1;
```

【第二步】解析字符串：

这个问题推荐使用正则表达式来解析字符串，因为问题要求了许多字符串的约束条件。以下对问题描述进行分析：
- 该函数会根据需要丢弃无用的开头空格字符，直到寻找到第一个非空格的字符为止：需要去除字符串头部的空格字符
- 当寻找到的第一个非空字符为正或者负号时，则将该符号与之后面尽可能多的连续数字组合起来，作为该整数的正负号：允许字符串的第一个有效字符为`+`或者`-`
- 该字符串除了有效的整数部分之后也可能会存在多余的字符，这些字符可以被忽略，它们对于函数不应该造成影响：匹配的时候，连续整数之外的部分都应该被摘除

根据以上的分析，得出正则表达式： `/\s*([-\+]?[0-9]*).*/`。
- `\s`代表空白字符，`*`表示前面的符号出现`0`次或多次
- `()`匹配的是一个捕获区域
- `[]`中的匹配之间是或的关系
- `.`表示任意字符的意思，在`()`外表示不被捕获

【第三步】获取捕获结果：

JavaScript 的正则相关方法中，`test()`方法返回的是一个布尔值，单纯判断“是否匹配”。要想获取匹配的结果，需要调度`match()`方法：
```
const reg = /\s*([-\+]?[0-9]*).*/
const groups = str.match(reg)
```

`match()`方法是一个在字符串中执行查找匹配的`String`方法，它返回一个数组，在未匹配到时会返回`null`。如果正则表达式尾部有`g`标志，`match()`会返回与完整正则表达式匹配的所有结果，但不会返回捕获组；如果没有使用`g`标志，`match()`就会返回第一个完整匹配及其相关的捕获组。

这里只定义了一个捕获组，因此可以从`groups[1]`里拿到捕获的结果。

【第四步】判断卡口：

最后一步，就是把捕获的结果转换成数字，看看是否超出了题目要求的范围。

### 问题实现
```
// 入参是一个字符串
const myAtoi = function(str) {
  // 编写正则表达式
  const reg = /\s*([-\+]?[0-9]*).*/;
  // 得到捕获组
  const groups = str.match(reg);
  // 计算最大值
  const max = Math.pow(2,31) - 1;
  // 计算最小值
  const min = -max - 1;
  // targetNum 用于存储转化出来的数字
  let targetNum = 0;
  // 如果匹配成功
  if(groups) {
    // 尝试转化捕获到的结构
    targetNum = +groups[1];
    // 注意，即便成功，也可能出现非数字的情况，比如单一个'+'
    if(isNaN(targetNum)) {
      // 不能进行有效的转换时，请返回 0
      targetNum = 0;
    }
  }
  // 卡口判断
  if(targetNum > max) {
    return max;
  } else if( targetNum < min) {
    return min;
  }


  // 返回转换结果
  return targetNum;
};
```

---

【 完 】