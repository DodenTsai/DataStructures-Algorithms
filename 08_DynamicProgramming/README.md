# 动态规划的基本概念
## 基本概念
分治问题的核心思想是：把一个问题分解为相互独立的子问题，逐个解决子问题后，再组合子问题的答案，就得到了问题的最终解。

而动态规划的思想和“分治”有点相似。不同之处在于，“分治”思想中，各个子问题之间是独立的：比如说归并排序中，子数组之间的排序并不互相影响。而动态规划划分出的子问题，往往是相互依赖、相互影响的。

在使用动态规划解决问题时，要抓以下两个关键特征：
- 最优子结构：问题的最优解包含着子问题的最优解，不管前面的决策如何，此后的状态必须是基于当前状态的最优决策
- 重叠子问题：在递归的过程中，出现了反复计算的情况

## 分析技巧
动态规划就是一种自底向上的思维方式，但是在解决问题的时候，还是需要通过递归来思考问题的解决方案。

树形思维模型将能够更迅速地定位到状态转移关系，边界条件往往对应的就是已知子问题的解；基于树形思维模型，结合记忆化搜索，最后再将递归转换成迭代，就可以通过动态规划思想来解决问题了。

然后，动态规划思想是比较复杂的，利用递归和记忆化搜索的思想只是帮助简化问题，但它仍存在一些难点：
- 状态转移方程不好确定
- 已知的状态可能不明显
- 递归转换成迭代比较困难

因此，对于动态规划，这里可以选择如下的分析路径：
1. 递归思想明确树形思维模型：找到问题的终点，思考回溯的方式，可以更快速地明确状态间的关系
2. 结合记忆化搜索，明确状态转移方程
3. 递归代码转化为迭代表达

# 动态规划问题案例
## 爬楼梯
LeetCode：[70. 爬楼梯](https://leetcode-cn.com/problems/climbing-stairs/)

### 问题描述
假设你正在爬楼梯。需要`n`阶你才能到达楼顶。每次你可以爬 1 或 2 个台阶。你有多少种不同的方法可以爬到楼顶呢？
```
示例 1：
      输入： 2
      输出： 2
示例 2：
      输入： 3
      输出： 3
```

### 问题分析
这个问题有两个关键的特征，因此可以用动态规划的思想来解决问题：
- 要求给出达成某个目的的解法个数
- 不要求给出每一种解法对应的具体路径

#### 递归思想分析
基于动态规划的思想来解决问题，首先要想到的思维工具就是“倒着分析问题”，其分为两步：
1. 定位到问题的终点
2. 站在终点这个视角，思考后退的可能性

在这个问题中，“问题的终点”指的就是走到第`n`阶楼梯这个目标对应的路径数，把它记为`f(n)`；站在第`n`阶楼梯这个视角，按问题要求，一次只能后退 1 步或者 2 步，因此可以定位到从第`n`阶楼梯只能后退到第`n - 1`或者第`n - 2`阶。

现在把抵达第`n - 1`阶楼梯对应的路径数记为`f(n - 1)`；把抵达第`n - 2`阶楼梯对应的路径数记为`f(n - 2)`，不难得出`f(n) = f(n - 1) + f(n - 2)`。要想求出`f(n)`，必须求出`f(n - 1)`和`f(n - 2)`。

接着站在第`n - 1`阶台阶上，也只能是退到`n - 1 - 1`层台阶或`n - 1 - 2`层台阶上，所以`f(n - 1)`和`f(n - 2)`、`f(n - 3)`间同样具有`f(n - 1) = f(n - 2) + f(n - 3)`的关系。同理，`f(n - 2)`也可以按照同样的规则拆分为`f(n - 2) = f(n - 3) + f(n - 4)`。

随着拆分的进行，一定会有一个时刻，求解到了`f(1)`或`f(2)`。按照问题的规则，第 1 阶楼梯只能走 1 步抵达，第 2 阶楼梯可以走 1 步或者走 2 步抵达，因此不难得出`f(1)`和`f(2)`的值为`f(1) = 1`; `f(2) = 2`。

遇到“树形思维模型”，就要想办法往递归上靠。这个问题明显用到了树形思维模型，有着明确的重复内容，同时有着明确的边界条件，因此不难写出其对应的递归解法代码：
```
/**
* @param {number} n
* @return {number}
*/
const climbStairs = function(n) {
  // 处理递归边界
  if(n === 1) {
    return 1;
  }
  if(n === 2){
    return 2;
  }
  // 递归计算
  return climbStairs(n - 1) + climbStairs(n - 2);
};
```

但是这个解法会导致多个结点被重复计算，造成算法超时的问题。

#### 记忆化搜索来提效
重复计算带来了时间效率上的问题，要想解决这类问题，最直接的思路就是用空间换时间，也就是想办法记住之前已经求解过的结果。这里只需要定义一个数组`const f = []`，每计算出一个`f(n)`的值，都把它塞进`f`数组里。下次要用到这个值的时候，直接取出来就行了：
```
/**
* @param {number} n
* @return {number}
*/
// 定义记忆数组 f
const f = [];
const climbStairs = function(n) {
  if(n === 1) {
    return 1;
  }
  if(n === 2) {
    return 2;
  }
  // 若 f[n] 不存在，则进行计算
  if(f[n]===undefined) {
    f[n] = climbStairs(n - 1) + climbStairs(n - 2);
  }
  // 若 f[n] 已经求解过，直接返回
  return f[n];    
};
```
以上这种在递归的过程中，不断保存已经计算出的结果，从而避免重复计算的手法，叫做记忆化搜索。

#### 记忆化搜索转化为动态规划
记忆化搜索可以理解为优化过后的递归，而递归往往可以基于树形思维模型来解决，是一个明显的自顶向下的过程；而动态规划则刚好相反，是一个自底向上的过程。

### 问题实现
```
/**
* @param {number} n
* @return {number}
*/
const climbStairs = function(n) {
  // 初始化状态数组
  const f = [];
  
  // 初始化已知值
  f[1] = 1;
  f[2] = 2;

  // 动态更新每一层楼梯对应的结果
  for(let i = 3;i <= n;i++){
    f[i] = f[i-2] + f[i-1];
  }
  
  // 返回目标值
  return f[n];
};
```

## 如何优雅地找硬币
LeetCode：[322. 零钱兑换](https://leetcode-cn.com/problems/coin-change/)

### 问题描述
给定不同面额的硬币`coins`和一个总金额`amount`。编写一个函数来计算可以凑成总金额所需的最少的硬币个数。如果没有任何一种硬币组合能组成总金额，返回`-1`。你可以认为每种硬币的数量是无限的。
```
示例 1：
      输入：coins = [1, 2, 5]，amount = 11
      输出：3i
示例 2：
      输入：coins = [2]，amount = 3
      输出：-1
示例 3：
      输入：coins = [1]，amount = 0
      输出：0
示例 4：
      输入：coins = [1]，amount = 1
      输出：1
示例 5：
      输入：coins = [1]，amount = 2
      输出：2
```

### 问题分析
这个问题首先要确认状态转移方程，因此需要的是站在`amount`这个组合结果上的回溯方式，即可以把问题转化为从`amount`减到`0`这个问题。

从`amount`总额中减去`coins`中的某一个面额的硬币这个动作，经过重复地往前推到这个拿走的过程，如果用`f(x)`表示每一个`amount`数字对应的最少硬币数，可以得到对应关系：`f(x) = Math.min(f(x - c1) + 1, f(x - c2) + 1, …, f(x - cn) + 1)`。

这个对应关系，就是这个问题的状态转移方程。

既然得出了状态转移方程，接下来就需要思考递归的边界条件。在这个问题中，需要考虑的是硬币总额为`0`的情况，这种情况下对应的硬币个数也会是`0`。即`f[0] = 0`。

### 问题实现
```
const coinChange = function(coins, amount) {
  // 用于保存每个目标总额对应的最小硬币个数
  const f = [];
  // 提前定义已知情况
  f[0] = 0;
  // 遍历 [1, amount] 这个区间的硬币总额
  for(let i = 1; i <= amount; i++) {
    // 求的是最小值，因此我们预设为无穷大，确保它一定会被更小的数更新
    f[i] = Infinity;
    // 循环遍历每个可用硬币的面额
    for(let j = 0;j < coins.length; j++) {
      // 若硬币面额小于目标总额，则问题成立
      if(i - coins[j] >= 0) {
        // 状态转移方程
        f[i] = Math.min(f[i], f[i - coins[j]] + 1);
      }
    }
  }

  // 若目标总额对应的解为无穷大，则意味着没有一个符合条件的硬币总数来更新它，本题无解，返回-1
  if (f[amount] === Infinity) {
    return -1;
  }
  // 若有解，直接返回解的内容
  return f[amount];
};
```
