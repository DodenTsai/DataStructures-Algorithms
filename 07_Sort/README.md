# 基础排序算法
## 冒泡排序
### 算法分析
冒泡排序的过程，就是从第一个元素开始，重复比较相邻的两个项，若第一项比第二项更大，则交换两者的位置；反之不动。

每一轮操作，都会将这一轮中最大的元素放置到数组的末尾。假如数组的长度是`n`，那么当重复完`n`轮的时候，整个数组就有序了。

### 算法实现
基本冒泡排序实现：
```
function bubbleSort(arr) {
  // 缓存数组长度
  const len = arr.length;
  // 外层循环用于控制从头到尾的比较 + 交换到底有多少轮
  for(let i = 0; i < len; i++) {
    // 内层循环用于完成每一轮遍历过程中的重复比较 + 交换
    for(let j = 0; j < len - 1; j++) {
      // 若相邻元素前面的数比后面的大
      if (arr[j] > arr[j + 1]) {
        // 交换两者
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
  // 返回数组
  return arr;
}
```

然而，在基本冒泡排序实现中某一些步骤是无需进行的。随着外层循环的进行，数组尾部的元素会逐渐变得有序，这时候可以不再处理这一部分的元素，避免逻辑冗余。因此，可以对基本泡泡排序实现进行改进：
```
function betterBubbleSort(arr) {
  const len = arr.length;

  for (let i = 0; i < len; i++) {
    // 注意差别在这行，我们对内层循环的范围作了限制
    for (let j = 0; j < len - 1 - i; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }

  return arr;
}
```

在不少资料中，可以看到冒泡排序的时间复杂度最好情况下为`O(n)`，但以上两种冒泡排序方式都无法达到`O(n)`的时间复杂度，它们的最好情况时间复杂度为`O(n ^ 2)`。

但是，对于冒泡排序进行进一步地改进，就可以得到最好情况下时间复杂度为`O(n)`的算法。
```
function bestBubbleSort(arr) {
  const len = arr.length;

  for (let i = 0; i < len; i++) {
    // 区别在这里，我们加了一个标志位
    let flag = false;
    for (let j = 0; j < len - 1 - i; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        // 只要发生了一次交换，就修改标志位
        flag = true;
      }
    }

    // 若一次交换也没发生，则说明数组有序，直接放过
    if (flag === false) {
      return arr;
    }
  }
  return arr;
}
```

标志位可以在第一次冒泡的时候就定位到数组是否完全有序，进而节省掉不必要的判断逻辑，将最好情况下的时间复杂度定向优化为`O(n)`。

### 冒泡排序的时间复杂度
分最好情况、最坏情况和平均情况的时间复杂度分别来看：
- 最好时间复杂度：对应的是数组本身有序这种情况；此时只需要作比较（`n - 1`次），而不需要做交换；时间复杂度为`O(n)`
- 最坏时间复杂度：对应的是数组完全逆序这种情况；此时每一轮内层循环都要执行，重复的总次数是`n * (n - 1) / 2`次；时间复杂度是`O(n ^ 2)`
- 平均时间复杂度：`O(n ^ 2)`

## 插入排序
### 算法分析
插入排序的核心思想是“找到元素在它前面那个序列中的正确位置”。也就是说，插入排序所有的操作都基于当前元素前面的序列是有序的这一前提。在这个前提之下，从后往前去寻找当前元素在前面那个序列里的正确位置。

因此，插入排序的关键点为：
- 当前元素前面的那个序列是有序的
- 正确的位置定义：所有在当前元素前面的数都不大于它，所有在当前元素后面的数都不小于它
- 在有序序列里定位元素位置的时候，是从后往前定位的。只要发现一个比当前元素大的值，就需要为当前元素腾出一个新的位置

### 算法实现
```
function insertSort(arr) {
  // 缓存数组长度
  const len = arr.length;
  // temp 用来保存当前需要插入的元素
  let temp;
  // i用于标识每次被插入的元素的索引
  for(let i = 1;i < len; i++) {
    // j用于帮助 temp 寻找自己应该有的定位
    let j = i;
    temp = arr[i];  
    // 判断 j 前面一个元素是否比 temp 大
    while(j > 0 && arr[j - 1] > temp) {
      // 如果是，则将 j 前面的一个元素后移一位，为 temp 让出位置
      arr[j] = arr[j - 1];
      j--;
    }
    // 循环让位，最后得到的 j 就是 temp 的正确索引
    arr[j] = temp;
  }
  return arr;
}
```

### 插入排序的时间复杂度
- 最好时间复杂度：对应的数组本身就有序这种情况；此时内层循环只走一次，整体复杂度取决于外层循环，时间复杂度就是一层循环对应的`O(n)`
- 最坏时间复杂度：对应的是数组完全逆序这种情况；此时内层循环每次都要移动有序序列里的所有元素，因此时间复杂度对应的就是两层循环的`O(n ^ 2)`
- 平均时间复杂度：`O(n ^ 2)`

## 选择排序
### 算法分析
选择排序的关键字是“最小值”，即循环遍历数组，每次都找出当前范围内的最小值，把它放在当前范围的头部；然后缩小排序范围，继续重复以上操作，直至数组完全有序为止。

### 算法实现
```
function selectSort(arr)  {
  // 缓存数组长度
  const len = arr.length;
  // 定义 minIndex，缓存当前区间最小值的索引，注意是索引
  let minIndex;
  // i 是当前排序区间的起点
  for(let i = 0; i < len - 1; i++) { 
    // 初始化 minIndex 为当前区间第一个元素
    minIndex = i;
    // i、j分别定义当前区间的上下界，i是左边界，j是右边界
    for(let j = i; j < len; j++) {  
      // 若 j 处的数据项比当前最小值还要小，则更新最小值索引为 j
      if(arr[j] < arr[minIndex]) {  
        minIndex = j;
      }
    }
    // 如果 minIndex 对应元素不是目前的头部元素，则交换两者
    if(minIndex !== i) {
      [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
    }
  }
  return arr;
}
```

### 选择排序的时间复杂度
选择排序在时间复杂度方面，无论最好情况还是最坏情况，二者的区别仅仅在于元素交换的次数不同，但都同样要走内层循环作比较。

因此，选择排序的三种时间复杂度都对应两层循环消耗的时间量级：`O(n ^ 2)`。
编码复盘——选择排序的时间复杂度

# 进阶排序算法
此部分的排序与分而治之的“分治”思想相关，所谓“分治”思想，就是将一个大问题分解为若干个子问题，针对子问题分别求解后，再将子问题的解整合为大问题的解。

利用分治思想解决问题，一般有三个步骤：
1. 分解子问题
2. 求解每个子问题
3. 合并子问题的解，得出大问题的解

## 归并排序
### 算法分析
归并排序是对分治思想的典型应用，它按照如下的思路对分治思想“三步走”的框架进行了填充：
- 分解子问题：将需要被排序的数组从中间分割为两半，然后再将分割出来的每个子数组各分割为两半，重复以上操作，直到单个子数组只有一个元素为止
- 求解每个子问题：从粒度最小的子数组开始，两两合并、确保每次合并出来的数组都是有序的
- 合并子问题的解，得出大问题的解：当数组被合并至原有的规模时，就得到了一个完全排序的数组

### 算法实现
可以总结出归并排序中的两个主要动作，即分割和合并。这两个动作是紧密关联的，分割是将达数组反复分解为一个一个的原子项，合并是将原子项反复地装回原有的大数组。这个过程符合两个特征，即重复（递归/迭代）和有去有回（回溯）。

因此，归并排序在实现上依托的就是递归思想。除此之外，这个问题还涉及到了两个有序数组的合并，涉及到双指针方法。

```
function mergeSort(arr) {
  const len = arr.length;
  // 处理边界情况
  if(len <= 1) {
    return arr;
  }   
  // 计算分割点
  const mid = Math.floor(len / 2);
  // 递归分割左子数组，然后合并为有序数组
  const leftArr = mergeSort(arr.slice(0, mid));
  // 递归分割右子数组，然后合并为有序数组
  const rightArr = mergeSort(arr.slice(mid,len));
  // 合并左右两个有序数组
  arr = mergeArr(leftArr, rightArr);
  // 返回合并后的结果
  return arr;
}
  
function mergeArr(arr1, arr2) {  
  // 初始化两个指针，分别指向 arr1 和 arr2
  let i = 0, j = 0;
  // 初始化结果数组
  const res = [];   
  // 缓存 arr1 的长度
  const len1 = arr1.length;
  // 缓存 arr2 的长度
  const len2 = arr2.length;
  // 合并两个子数组
  while(i < len1 && j < len2) {
    if(arr1[i] < arr2[j]) {
      res.push(arr1[i]);
      i++;
    } else {
      res.push(arr2[j]);
      j++;
    }
  }
  // 若其中一个子数组首先被合并完全，则直接拼接另一个子数组的剩余部分
  if(i < len1) {
    return res.concat(arr1.slice(i));
  } else {
    return res.concat(arr2.slice(j));
   }
}
```

### 归并排序的时间复杂度
归并排序的时间复杂度基于分治法来分析，综合考量为`O(n * log(n))`。

## 快速排序
快速排序在基本思想上和归并排序是一致的，仍然坚持“分而治之”的原则不动摇。区别在于，快速排序并不会把真的数组分割开来再合并到一个新数组中去，而是直接在原有的数组内部进行排序。

### 算法分析
快速排序会将原始的数组筛选成较小和较大的两个子数组，然后递归地排序两个子数组。

### 算法实现
```
// 快速排序入口
function quickSort (arr, left = 0, right = arr.length - 1) {
  // 定义递归边界，若数组只有一个元素，则没有排序必要
  if (arr.length > 1) {
      // lineIndex表示下一次划分左右子数组的索引位
      const lineIndex = partition(arr, left, right);
      // 如果左边子数组的长度不小于1，则递归快排这个子数组
      if (left < lineIndex-1) {
        // 左子数组以 lineIndex-1 为右边界
        quickSort(arr, left, lineIndex-1);
      }
      // 如果右边子数组的长度不小于1，则递归快排这个子数组
      if (lineIndex<right) {
        // 右子数组以 lineIndex 为左边界
        quickSort(arr, lineIndex, right);
      }
  }
  return arr;
}

// 以基准值为轴心，划分左右子数组的过程
function partition (arr, left, right) {
  // 基准值默认取中间位置的元素
  let pivotValue = arr[Math.floor(left + (right-left)/2)];
  // 初始化左右指针
  let i = left;
  let j = right;
  // 当左右指针不越界时，循环执行以下逻辑
  while(i<=j) {
    // 左指针所指元素若小于基准值，则右移左指针
    while(arr[i] < pivotValue) {
      i++;
    }
    // 右指针所指元素大于基准值，则左移右指针
    while(arr[j] > pivotValue) {
      j--;
    }

    // 若 i <= j，则意味着基准值左边存在较大元素或右边存在较小元素，交换两个元素确保左右两侧有序
    if(i <= j) {
      swap(arr, i, j);
      i++;
      j--;
    }
  }
  // 返回左指针索引作为下一次划分左右子数组的依据
  return i;
}

// 快速排序中使用 swap 的地方比较多，我们提取成一个独立的函数
function swap (arr, i, j) {
  [arr[i], arr[j]] = [arr[j], arr[i]];
}
```

### 快速排序的时间复杂度
快速排序的时间复杂度的好坏，是由基准值来决定的。
- 最好时间复杂度：即每次选择基准值，都刚好是当前子数组的中间数；此时可以确保每一次分割都能将数组分为两半，进而只需要递归`log(n)`次。时间复杂度分析思路和归并排序相似，最后结果也是`O(n * log(n))`
- 最坏时间复杂度：即每次划分取到的都是当前数组中的最大值或最小值；此时快排已经退化为了冒泡排序，对应的时间复杂度是`O(n ^ 2)`
- 平均时间复杂度：`O(n * log(n))`

---

【 完 】