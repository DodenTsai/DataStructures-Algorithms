# 树的结构
数据结构中的树，首先是对现实世界中树的一层简化：把树根抽象为“根结点”，树枝抽象为“边”，树枝的两个端点抽象为“结点”，树叶抽象为“叶子结点”。

其基本特性为：
- 树的层次计算规则：根结点所在的那一层记为第一层，其子结点所在的就是第二层，以此类推
- 结点和树的“高度”计算规则：叶子结点高度记为 1，每向上一层高度就加 1，逐层向上累加至目标结点时，所得到的的值就是目标结点的高度。树中结点的最大高度，称为“树的高度”
- “度”的概念：一个结点子树的个数
- “叶子结点”：度为 0 的结点

# 二叉树
## 二叉树的结构
二叉树是指满足以下要求的树：
- 它可以没有根结点，作为一棵空树存在
- 如果它不是空树，那么必须由根结点、左子树和右子树组成，且左右子树都是二叉树

二叉树不能被简单定义为每个结点的度都是 2 的树，在二叉树中，左右子树的位置是严格约定、不能交换的。

在 JavaScript 中，二叉树使用对象来定义。它的结构分为数据域、左侧子结点（左子树根结点）的引用和右侧子结点（右子树根结点）的引用。
```
// 二叉树结点的构造函数
function TreeNode(val) {
  this.val = val;
  this.left = this.right = null;
}
```

## 二叉树的遍历
以一定的顺序规则，逐个访问二叉树的所有结点，这个过程就是二叉树的遍历。按照顺序规则的不同，遍历方式有四种。分别为先序遍历、中序遍历、后序遍历和层次遍历。

按照实现方式的不同，遍历方式又可以分为两种，分别为递归遍历（先、中、后序遍历）和迭代遍历（层次遍历）。

### 递归遍历
编程语言中，函数`func(params)`直接或间接调用函数本身，则该函数称为递归函数。

二叉树的定义，就可以理解为是一个递归式的定义。如果要创建一个二叉树结点作为根结点，那么它左侧的子结点和右侧的子结点也都必须符合二叉树结点的定义，这意味着需要反复地执行“创建一个由数据域、左右子树组成的结点”这个动作，直到数据被分配完为止。
- 先序遍历：根结点 -> 左子树 -> 右子树
- 中序遍历：左子树 -> 根结点 -> 右子树
- 后序遍历：左子树 -> 右子树 -> 根结点

编写一个递归函数之前，首先要明确：递归式、递归边界
- 递归式：每一次重复的内容
- 递归边界，什么时候停止

在遍历的场景下，当发现遍历的目标树为空的时候，就意味着递归要停止了。

#### 先序遍历
```
// 所有遍历函数的入参都是树的根结点对象
function preorder(root) {
  // 递归边界，root 为空
  if(!root) {
    return;
  }
  // 输出当前遍历的结点值
  console.log('当前遍历的结点值是：', root.val);
  // 递归遍历左子树
  preorder(root.left);
  // 递归遍历右子树
  preorder(root.right);
}
```

#### 中序遍历
```
// 所有遍历函数的入参都是树的根结点对象
function inorder(root) {
  // 递归边界，root 为空
  if(!root) {
    return;
  }
  // 递归遍历左子树
  inorder(root.left);
  // 输出当前遍历的结点值
  console.log('当前遍历的结点值是：', root.val);
  // 递归遍历右子树
  inorder(root.right);
}
```

#### 后序遍历
```
function postorder(root) {
  // 递归边界，root 为空
  if(!root) {
    return;
  }
  // 递归遍历左子树
  postorder(root.left);
  // 递归遍历右子树
  postorder(root.right);
  // 输出当前遍历的结点值
  console.log('当前遍历的结点值是：', root.val);
}
```

### 迭代遍历（层次遍历）
待续...

## 二叉树的问题案例
### 二叉树的先序遍历
LeetCode：[144. 二叉树的前序遍历](https://leetcode-cn.com/problems/binary-tree-preorder-traversal/)

#### 问题描述：
给你二叉树的根节点`root`，返回它节点值的前序遍历。
```
示例 1：
      输入：root = [1, null, 2, 3]
      输出：[1, 2, 3]
示例 2：
      输入：root = []
      输出：[]
示例 3：
      输入：root = [1]
      输出：[1]
示例 4：
      输入：root = [1, 2]
      输出：[1, 2]
示例 5：
      输入：root = [1, null, 2]
      输出：[1, 2]
```

#### 问题分析：
在第 2 节中的二叉树遍历案例是通过简单的递归方式实现的，在这里将通过迭代方式实现。而递归一直和栈有关联，如果不使用简单的递归方式实现，那么可以通过栈来解决。

这个问题的输出案例中，很像一个栈的出栈的序列。因此，通过合理地安排入栈和出栈的时机，使栈的出栈序列符合二叉树的前序遍历规则。   

先序遍历的规则是，先遍历根结点、然后遍历左孩子、最后遍历右孩子，这就是所期望的出栈序列。按道理，入栈序列和出栈序列相反，似乎应该按照“右、左、根”这样的顺序将结点入栈。不过需要注意的是，先序遍历的起点就是根结点，因此出入栈顺序应该是这样的：  
1. 将根结点入栈
2. 取出栈顶结点，将结点值`push`进结果数组
3. 若栈顶结点有右孩子，则将右孩子入栈；若栈顶结点有左孩子，则将左孩子入栈

这整个过程，本质上是将当前子树的根结点入栈、出栈，随后再将其对应左右子树入栈、出栈的过程。重复2、3步骤，直至栈空，就能得到一个先序遍历序列。    

#### 问题实现
```
/**
  * @param {TreeNode} root
  * @return {number[]}
  */
const preorderTraversal = function(root) {
  // 定义结果数组
  const res = [];

  // 处理边界条件
  if(!root) {
    return res;
  }

  // 初始化栈结构
  const stack = [];
  // 首先将根结点入栈
  stack.push(root);

  // 若栈不为空，则重复出栈、入栈操作
  while(stack.length) {
    // 将栈顶结点记为当前结点
    const cur = stack.pop();
    // 当前结点就是当前子树的根结点，把这个结点放在结果数组的尾部
    res.push(cur.val);
    // 若当前子树根结点有右孩子，则将右孩子入栈
    if (cur.right) {
      stack.push(cur.right);
    }
    // 若当前子树根结点有左孩子，则将左孩子入栈
    if (cur.left) {
      stack.push(cur.left);
    }
  }
  // 返回结果数组
  return res;
};
```

### 二叉树的后序遍历
LeetCode：[145. 二叉树的后序遍历](https://leetcode-cn.com/problems/binary-tree-postorder-traversal/)

#### 问题描述
给定一个二叉树，返回它的后序遍历。
```
示例：
    输入：[1, null, 2, 3]
    输出：[3, 2, 1]
```
#### 问题分析
后序遍历的出栈序列，按照规则应该是“左、右、根” 。这个顺序相对于先序遍历，最明显的变化就是根结点的位置从第一个变成了倒数第一个。在这里，可以直接把先序遍历中`pop`出来的当前结点`unshift`进`res`的头部。

由于填充`res`结果数组的顺序是从后往前填充（每次增加一个头部元素），因此先出栈的结点反而会位于`res`数组相对靠后的位置。出栈的顺序是“当前结点、当前结点的左孩子、当前结点的右孩子”，其对应的`res`序列顺序就是“右、左、根”。这样一来， 根结点就成功地被转移到了遍历序列的最末尾。

现在唯一的问题就是右孩子和左孩子的顺序了，这两个孩子结点进入结果数组的顺序与其被`pop`出栈的顺序是一致的，而出栈顺序又完全由入栈顺序决定，因此只需要相应地调整两个结点的入栈顺序就好了。如此一来，右孩子就会相对于左孩子优先出栈，进而被放在`res`结果数组相对靠后的位置，“左、右、根”的排序规则就稳稳地实现出来了。   

#### 问题实现
```
/**
  * @param {TreeNode} root
  * @return {number[]}
  */
const postorderTraversal = function(root) {
  // 定义结果数组
  const res = [];
  // 处理边界条件
  if (!root) {
    return res;
  }

  // 初始化栈结构
  const stack = [];
  // 首先将根结点入栈
  stack.push(root);

  // 若栈不为空，则重复出栈、入栈操作
  while(stack.length) {
    // 将栈顶结点记为当前结点
    const cur = stack.pop();
    // 当前结点就是当前子树的根结点，把这个结点放在结果数组的头部
    res.unshift(cur.val);
    // 若当前子树根结点有左孩子，则将左孩子入栈
    if (cur.left) {
      stack.push(cur.left);
    }
    // 若当前子树根结点有右孩子，则将右孩子入栈
    if (cur.right) {
      stack.push(cur.right);
    }
  }
  // 返回结果数组
  return res;
};
```

### 二叉树的中序遍历
LeetCode：[94. 二叉树的中序遍历](https://leetcode-cn.com/problems/binary-tree-inorder-traversal/)

#### 问题描述
给定一个二叉树的根节点`root`，返回它的中序遍历。
```
示例 1：
      输入：root = [1, null, 2, 3]
      输出：[1, 3, 2]
示例 2：
      输入：root = []
      输出：[]
示例 3：
      输入：root = [1]
      输出：[1]
示例 4：
      输入：root = [1, 2]
      输出：[2, 1]
示例 5：
      输入：root = [1, null, 2]
      输出：[1, 2]
``` 

#### 问题分析
先序遍历和后序遍历实现的方式基本一致，它们遵循的都是同一套框架。但是中序遍历则不能用同一套康佳来实现，本质上是因为先序、后序的出栈与入栈逻辑基本不大（都是先处理根结点，然后处理孩子结点）。

但是在中序遍历中，根结点不再出现在遍历序列的边界，而是在遍历序列的中间。这就意味着不能将根结点作为第一个被`pop`出来的元素处理了，也就是随着出栈时机的改变，入栈的逻辑也需要调整。    

中序遍历的序列规则是“左、中、右”，因此必须首先定位到最左的叶子结点。在这个定位的过程中，必然会途径目标结点的父结点、爷爷结点和各种辈分的祖宗结点。途径过的每一个结点，都要及时地把它入栈。这样当最左的叶子结点出栈时，第一个回溯到的就是它的父结点。有了父结点，就能够找到兄弟结点，遍历结果就出来了。

#### 问题实现
```
/**
  * @param {TreeNode} root
  * @return {number[]}
  */
const inorderTraversal = function(root) {
  // 定义结果数组
  const res = [];
  // 初始化栈结构
  const stack = [];

  // 用一个 cur 结点充当游标
  let cur = root;
  // 当 cur 不为空、或者 stack 不为空时，重复以下逻辑
  while (cur || stack.length) {
    // 这个 while 的作用是把寻找最左叶子结点的过程中，途径的所有结点都记录下来
    while(cur) {
      // 将途径的结点入栈
      stack.push(cur);
      // 继续搜索当前结点的左孩子
      cur = cur.left;
    }
    // 取出栈顶元素
    cur = stack.pop();
    // 将栈顶元素入栈
    res.push(cur.val);
    // 尝试读取 cur 结点的右孩子
    cur = cur.right;
  }
  // 返回结果数组
  return res;
};
```

### 二叉树的层序遍历衍生问题
LeetCode：[102. 二叉树的层序遍历](https://leetcode-cn.com/problems/binary-tree-level-order-traversal/)

层序遍历即按照层次的顺序，从上到下，从左到右地遍历一个二叉树。

#### 问题描述
给你一个二叉树，请你返回其按层序遍历得到的节点值。（即逐层地，从左到右访问所有节点）。
```
示例：
    输入：root = [3, 9, 20, null, null, 15, 7]
    输出：[
          [3],
          [9, 20],
          [25, 7],
         ]
```

#### 问题分析
看到层序遍历，第一时间想到采用 BFS 和队列，只是它需要在 BFS 的过程中围绕结果数组的内容进行部分修改。这个问题要求在对层序遍历结果进行分层，也就是说只要能在 BFS 的过程中感知到当前层级，同时用不同的数组把不同的层级区分开，这个问题就解决了。   

在对二叉树进行层序遍历时，每一次`while`循环其实都对应着二叉树的某一层。只要在进入`while`循环之初，记录下这一层结点个数，然后将这个数量范围内的元素`push`进同一个数组，就能够实现二叉树的分层。

#### 问题实现
```
/**
  * @param {TreeNode} root
  * @return {number[][]}
  */
const levelOrder = function(root) {
  // 初始化结果数组
  const res = [];
  // 处理边界条件
  if(!root) {
    return res;
  }

  // 初始化队列
  const queue = [];
  // 队列第一个元素是根结点
  queue.push(root);

  // 当队列不为空时，反复执行以下逻辑
  while (queue.length) {
    // level 用来存储当前层的结点
    const level = [];
    // 缓存刚进入循环时的队列长度，这一步很关键，因为队列长度后面会发生改变
    const len = queue.length;

    // 循环遍历当前层级的结点
    for(let i = 0; i < len; i++) {
      // 取出队列的头部元素
      const top = queue.shift();  
      // 将头部元素的值推入 level 数组
      level.push(top.val);
      // 如果当前结点有左孩子，则推入下一层级
      if (top.left) {
        queue.push(top.left);
      }
      // 如果当前结点有右孩子，则推入下一层级
      if (top.right) {
        queue.push(top.right);
      }
    }
    // 将 level 推入结果数组
    res.push(level);
  }
  // 返回结果数组
  return res;
};
```

### 二叉树的翻转
LeetCode：[226. 翻转二叉树](https://leetcode-cn.com/problems/invert-binary-tree/)

#### 问题描述：
翻转一棵二叉树。
```
示例：
    输入：root = [4, 2, 7, 1, 3, 6, 9]
    输出：[4, 7, 2, 9, 6, 3, 1]
```

#### 问题分析
这个问题是一个非常经典的递归应用类问题。一棵二叉树，经过翻转后，每一棵子树的左孩子和右孩子都发生了交换。既然是“每一棵子树”，那么就意味着重复，既然涉及了重复，就没有理由不用递归。

于是这个问题的解决思路就是以递归的方式，遍历树中的每一个结点，并将每一个结点的左右孩子进行交换。

#### 问题实现
```
/**
  * @param {TreeNode} root
  * @return {TreeNode}
  */
const invertTree = function(root) {
  // 定义递归边界
  if(!root) {
    return root;
  }

  // 递归交换右孩子的子结点
  let right = invertTree(root.right);
  // 递归交换左孩子的子结点
  let left = invertTree(root.left);
  // 交换当前遍历到的两个左右孩子结点
  root.left = right;
  root.right = left;
  return root;
};
```

### 从前序（先序）与中序遍历序列构造二叉树
LeetCode：[105. 从前序与中序遍历序列构造二叉树](https://leetcode-cn.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/)

#### 问题描述
根据一棵树的前序遍历与中序遍历构造二叉树；你可以假设树中没有重复的元素。
```
示例：
    输入：preorder = [3, 9, 20, 15, 7]，inorder = [9, 3, 15, 20, 7]
    输出：[3, 9, 20, null, null, 15, 7]
```

#### 问题分析
这个问题的一个切入点，就是前序遍历序列和中序遍历之间的关系。假设前序遍历序列中的元素分别为`p1、p2、...、pn`，中序遍历序列中的元素分别为`i1、i2、...、in`。那么两个序列之间就有以下关系：
```
        root  |<-左子树->|  |<- 右子树 ->|  
         ↓
前序序列  p1    p2......pk   p(k+1)......pn  


         |<- 左子树 ->|      root  |<- 右子树 ->|  
                             ↓
中序序列  i1 i2......i(k-1)   ik   i(k+1)......in
```

它们之间的关系蕴含着两个重要的规律：
- 前序序列头部的元素`p1`，一定是当前二叉树的根结点
- 中序遍历序列中，以二叉树的根结点为界划分出的两个子序列，分别对应着二叉树的左子树和二叉树的右子树

基于以上两个规律，不难明确在中序序列中定位到根结点`p1`对应的坐标，然后基于这个坐标划分出左右子树对应的两个子序列，进而明确到左右子树各自在前序、中序遍历序列中对应的索引区间，由此构造左右子树。

以上面的示意简图为例，根结点`p1`在中序序列中的坐标索引为`k`，于是左子树的结点个数就可以通过计算得出：`numLeft = k - 1`。

为了确保逻辑的通用性，把前序序列当前范围的头部索引记为`preL`，尾部索引记为`preR`；把中序序列当前范围的头部索引记为`inL`，尾部索引记为`inR`。那么左子树在前序序列中的索引区间就是`[preL + 1, preL + numLeft]`，在中序序列中的索引区间是`[inL, k - 1]`；右子树在前序序列的索引区间是`[preL + numLeft + 1, preR]`，在中序序列中的索引区间是`[k + 1, inR]`。

此时会发现，基于左子树和右子树各自对应的前序、中序子序列，完全可以直接重复执行上面的逻辑来定位到左右子树各自的根结点和子树的序列区间。通过反复重复这套定位 + 构造的逻辑，就能够完成整个二叉树的构建。

二叉树类题目中的重复逻辑，90% 都是用递归来完成的。

#### 问题实现
```
/**
 * 预定义树的结点结构.
 * function TreeNode(val) {
 *   this.val = val;
 *   this.left = this.right = null;
 * }
 */
/**
 * @param {number[]} preorder
 * @param {number[]} inorder
 * @return {TreeNode}
 */
const buildTree = function(preorder, inorder) {
  // 缓存结点总个数（遍历序列的长度）
  const len = preorder.length;
  // 定义构造二叉树结点的递归函数
  function build (preL, preR, inL, inR) {
    // 处理越界情况
    if (preL > preR) {
      return null;
    }
    // 初始化目标结点
    const root = new TreeNode();
    // 目标结点映射的是当前前序遍历序列的头部结点（也就是当前范围的根结点）
    root.val = preorder[preL];
    // 定位到根结点在中序遍历序列中的位置
    const k = inorder.indexOf(root.val);  
    // 计算出左子树中结点的个数
    const numLeft = k - inL;
    // 构造左子树
    root.left = build(preL+1, preL+numLeft, inL, k-1); 
    // 构造右子树
    root.right = build(preL+numLeft+1, preR, k+1, inR);
    // 返回当前结点
    return root;
  }   
  // 递归构造二叉树
  return build(0, len - 1, 0, len - 1);
};
```

### 寻找二叉树的最近公共祖先
LeetCode：[236. 二叉树的最近公共祖先](https://leetcode-cn.com/problems/lowest-common-ancestor-of-a-binary-tree/)

#### 问题描述
给定一个二叉树, 找到该树中两个指定节点的最近公共祖先。最近公共祖先的定义为：“对于有根树`T`的两个结点`p`、`q`，最近公共祖先表示为一个结点`x`，满足`x`是`p`、`q`的祖先且`x`的深度尽可能大（一个节点也可以是它自己的祖先）。”
```
示例 1：
      输入：root = [3, 5, 1, 6, 2, 0, 8, null, null, 7, 4], p = 5, q = 1
      输出：3
示例 2：
      输入：root = [3, 5, 1, 6, 2, 0, 8, null, null, 7, 4], p = 5, q = 4
      输出：5
```

#### 问题分析
这个问题的最优思路是从子结点开始寻找父结点，但是必须首先明确子结点和父结点之间的关系，从而尝试去将不同的关系和“公共祖先”这个概念建立关联。

现在定义为某个节点下有目标结点作为子结点为“有效汇报”，因此这个问题的“有效汇报个数”就成了解决问题的抓手。由于一个结点最多有两个子结点，它拿到的有效汇报个数也无非只有 0、1、2 这三种可能性：
- 若有效汇报个数为 0，则`p`和`q`完全不存在与当前结点的后代中，当前结点一定不是最近公共祖先
- 若有效汇报个数为 2，则意味着`p`和`q`所在的两个分支刚好在当前结点交错了，当前结点就是`p`和`q`的最近公共祖先
- 若有效汇报个数为 1：
  - 当前结点的左子树/右子树中，包含了`p`或者`q`中的一个。此时需要将`p`或者`q`所在的那棵子树的根结点作为有效结点上报，继续向上去寻找`p`和`q`所在分支的交错点
  - 当前结点的左子树/右子树中，同时包含了`p`和`q`。在有效汇报数为 1 的前提下，这种假设只可能对应一种情况，那就是`p`和`q`之间互为父子关系。此时仍然是需要将`p`和`q`所在的那个子树的根结点（其实就是`p`或者`q`中作为父结点存在那个）作为有效结点给上报上去

因此可以得到如下结论：
- 若有效汇报个数为 2，直接返回当前结点
- 若有效汇报个数为 1，返回 1 所在的子树的根结点
- 若有效汇报个数为 0，则返回空（空就是无效汇报）

现在把这个判定规则，揉进二叉树递归的层层上报的逻辑里去，就可以解决这个问题。

#### 问题实现
```
/**
  * 二叉树结点的结构定义如下
  * function TreeNode(val) {
  *   this.val = val;
  *   this.left = this.right = null;
  * }
  */
/**
  * @param {TreeNode} root
  * @param {TreeNode} p
  * @param {TreeNode} q
  * @return {TreeNode}
  */
const lowestCommonAncestor = function(root, p, q) {
  // 编写 dfs 逻辑
  function dfs(root) {
    // 若当前结点不存在（意味着无效）或者等于 p / q（意味着找到目标），则直接返回
    if (!root || root === p || root === q) {
      return root;
    } 
    // 向左子树去寻找 p 和 q
    const leftNode = dfs(root.left);
    // 向右子树去寻找 p 和 q
    const rightNode = dfs(root.right);
    // 如果左子树和右子树同时包含了 p 和 q，那么这个结点一定是最近公共祖先
    if (leftNode && rightNode) {
      return root;
    }
    // 如果左子树和右子树其中一个包含了 p 或者 q，则把对应的有效子树汇报上去，等待进一步的判断；否则返回空
    return leftNode || rightNode;
  }
  // 调用 dfs 方法
  return dfs(root);
};
```

# 二叉搜索树
二叉搜索树（Binary Search Tree）简称 BST，是二叉树的一种特殊形式。它有很多别名，比如排序二叉树、二叉查找树等等。

对于二叉搜索树，只要能够把握好它的限制条件和特性，就足以应对大部分的问题。

## 二叉搜索树的结构
树的定义总是以递归的形式出现，二叉搜索树也不例外，它的递归定义如下：
- 是一棵空树
- 是一棵由根结点、左子树、右子树组成的树，同时左子树和右子树都是二叉搜索树，且左子树上所有结点的数据域都小于等于根结点的数据域，右子树上所有结点的数据域都大于等于根结点的数据域

满足以上两个条件之一的二叉树，就是二叉搜索树。

从这个定义可以看出，二叉搜索树强调的是数据域的有序性。也就是说，二叉搜索树上的每一棵子树，都应该满足“左孩子 <= 根结点 <= 右孩子”这样的大小关系。

## 二叉搜索树的代码实现
关于二叉搜索树，需要掌握以下高频操作：
- 查找数据域为某一特定值的结点
- 插入新结点
- 删除指定结点

### 查找数据域为某一特定值的结点
假设这个目标结点的数据域值为`n`，借助二叉搜索树数据域的有序性，可以有以下查找思路：
1. 递归遍历二叉树，若当前遍历到的结点为空，就意味着没找到目标结点，直接返回
2. 若当前遍历到的结点对应的数据域值刚好等于`n`，则查找成功，返回
3. 若当前遍历到的结点对应的数据域值大于目标值`n`，则应该在左子树里进一步查找，设置下一步的遍历范围为`root.left`后，继续递归
4. 若当前遍历到的结点对应的数据域值小于目标值`n`，则应该在右子树里进一步查找，设置下一步的遍历范围为`root.right`后，继续递归

```
function search(root, n) {
  // 若 root 为空，查找失败，直接返回
  if(!root) {
    return;
  }

  // 找到目标结点，输出结点对象
  if (root.val === n) {
    console.log('目标结点是：', root);
  } else if (root.val > n) {
    // 当前结点数据域大于n，向左查找
    search(root.left, n);
  } else {
    // 当前结点数据域小于n，向右查找
    search(root.right, n);
  }
}
```

### 插入新结点
插入结点的思路其实和寻找结点非常相似。在上面寻找结点的时候，当判定当前结点为空时，就认为查找失败了。这是因为，二叉搜索树的查找路线是一个非常明确的路径：根据当前结点值的大小，决定路线应该是向左走还是向右走。如果最后走到了一个空结点处，这就意味着我们没有办法再往深处去搜索了，也就没有了找到目标结点的可能性。

如果这个空结点所在的位置恰好有一个值为`n`的结点，就可以查找成功了。那么如果把`n`值塞到这个空结点所在的位置，就会刚好符合二叉搜索树的排序规则。

二叉搜索树插入结点的过程，和搜索某个结点的过程几乎是一样的。即从根结点开始，把希望插入的数据值和每一个结点作比较。若大于当前结点，则向右子树探索；若小于当前结点，则向左子树探索。最后找到的那个空位，就是它合理的栖身之所。

这个操作可以在 LeetCode 的 [701. 二叉搜索树中的插入操作](https://leetcode-cn.com/problems/insert-into-a-binary-search-tree/) 验证。

```
function insertIntoBST(root, n) {
  // 若 root 为空，说明当前是一个可以插入的空位
  if(!root) { 
    // 用一个值为n的结点占据这个空位
    root = new TreeNode(n);
    return root;
  }
    
  if(root.val > n) {
    // 当前结点数据域大于n，向左查找
    root.left = insertIntoBST(root.left, n);
  } else {
    // 当前结点数据域小于n，向右查找
    root.right = insertIntoBST(root.right, n);
  }

  // 返回插入后二叉搜索树的根结点
  return root;
}
```

### 删除指定结点
想要删除某个结点，首先要找到这个结点。在定位结点后，需要考虑以下情况：
- 结点不存在，定位到了空结点：直接返回即可
- 需要删除的目标结点没有左孩子也没有右孩子：它是一个叶子结点，删掉它不会对其它结点造成任何影响，直接删除即可
- 需要删除的目标结点存在左子树：那么就去左子树里寻找小于目标结点值的最大结点，用这个结点覆盖掉目标结点
- 需要删除的目标结点存在右子树：那么就去右子树里寻找大于目标结点值的最小结点，用这个结点覆盖掉目标结点
- 需要删除的目标结点既有左子树、又有右子树，这时就有两种做法了：要么取左子树中值最大的结点；要么取右子树中取值最小的结点。两个结点中任取一个覆盖掉目标结点，都可以维持二叉搜索树的数据有序性

这个问题可以在 LeetCode 的 [450. 删除二叉搜索树中的节点](https://leetcode-cn.com/problems/delete-node-in-a-bst/) 验证。

```
function deleteNode(root, n) {
  // 如果没找到目标结点，则直接返回
  if(!root) {
    return root;
  }

  // 定位到目标结点，开始分情况处理删除动作
  if(root.val === n) {
    // 若是叶子结点，则不需要想太多，直接删除
    if(!root.left && !root.right) {
      root = null;
    } else if(root.left) {
      // 寻找左子树里值最大的结点
      const maxLeft = findMax(root.left);
      // 用这个 maxLeft 覆盖掉需要删除的当前结点  
      root.val = maxLeft.val;
      // 覆盖动作会消耗掉原有的 maxLeft 结点
      root.left = deleteNode(root.left, maxLeft.val);
    } else {
      // 寻找右子树里值最小的结点
      const minRight = findMin(root.right);
      // 用这个 minRight 覆盖掉需要删除的当前结点  
      root.val = minRight.val;
      // 覆盖动作会消耗掉原有的 minRight 结点
      root.right = deleteNode(root.right, minRight.val);
    }
  } else if(root.val > n) {
    // 若当前结点的值比 n 大，则在左子树中继续寻找目标结点
    root.left = deleteNode(root.left, n);
  } else  {
    // 若当前结点的值比 n 小，则在右子树中继续寻找目标结点
    root.right = deleteNode(root.right, n);
  }
  return root;
}


// 寻找左子树最大值
function findMax(root) {
  while(root.right) {
    root = root.right;
  }
  return root;
}


// 寻找右子树的最小值
function findMin(root) {
  while(root.left) {
    root = root.left;
  }
  return root;
}
```

## 二叉搜索树的问题案例
### 对定义的考察：二叉搜索树的验证
LeetCode：[98. 验证二叉搜索树](https://leetcode-cn.com/problems/validate-binary-search-tree/)

#### 问题描述
给定一个二叉树，判断其是否是一个有效的二叉搜索树。假设一个二叉搜索树具有如下特征：
- 节点的左子树只包含小于当前节点的数
- 节点的右子树只包含大于当前节点的数
- 所有左子树和右子树自身必须也是二叉搜索树

```
示例 1：
      输入：[2, 1, 3]
      输出：TRUE
示例 2：
      输入：[5, 2, 4, null, null, 3, 6]
      输出：FALSE
```

#### 问题分析
对于这个问题，需要熟悉二叉搜索树的定义：
- 它可以是一棵空树
- 它可以是一棵由根结点、左子树、右子树组成的树，同时左子树和右子树都是二叉搜索树，且左子树上所有结点的数据域都小于等于根结点的数据域，右子树上所有结点的数据域都大于等于根结点的数据域

只有符合以上两种情况之一的二叉树，可以称之为二叉搜索树。

空树的判定比较简单，关键在于非空树的判定：需要递归地对非空树中的左右子树进行遍历，检验每棵子树中是否都满足“左 < 根 < 右”这样的关系。

#### 问题实现
```
/**
  * @param {TreeNode} root
  * @return {boolean}
  */
const isValidBST = function(root) {
  // 定义递归函数
  function dfs(root, minValue, maxValue) {
    // 若是空树，则合法
    if(!root) {
      return true;
    }
    // 若右孩子不大于根结点值，或者左孩子不小于根结点值，则不合法
    if(root.val <= minValue || root.val >= maxValue) return false;
    // 左右子树必须都符合二叉搜索树的数据域大小关系
    return dfs(root.left, minValue,root.val) && dfs(root.right, root.val, maxValue);
  }
  // 初始化最小值和最大值为极小或极大
  return dfs(root, -Infinity, Infinity);
};
```

### 对特性的考察：将排序数组转化为二叉搜索树
LeetCode：[108. 将有序数组转换为二叉搜索树](https://leetcode-cn.com/problems/convert-sorted-array-to-binary-search-tree/)

#### 问题描述
将一个按照升序排列的有序数组，转换为一棵高度平衡二叉搜索树。在这个问题中，一个高度平衡二叉树是指一个二叉树每个节点的左右两个子树的高度差的绝对值不超过`1`。
```
示例：
    输入：root = [-10, -3, 0, 5, 9]
    输出：[0, -3, 9, -10, null, 5, null]
```


#### 问题分析
这个问题不仅是一道典型的二叉搜索树应用，还涉及到了平衡二叉树的基本知识。在解决这个问题之前，可以先观察一下输入和输出。

输入为`[-10, -3, 0, 5, 9]`，输出为`[0, -3, 9, -10, null, 5, null]`，从形状上来看，很像把数组从`0`这个中间位置提了起来。能够做到这一点，是因为：
- 二叉搜索树的特性：即它的中序遍历是有序的，输入也是有序的，因此可以认为输入数组就是目标二叉树的中序遍历序列。中序遍历“左、根、右”，因此数组中间位置的元素一定对应着目标二叉树的根结点。
- 平衡二叉树的特性：一个高度平衡二叉树是指一个二叉树每个节点的左右两个子树的高度差的绝对值不超过`1`

要做到这一点，需要当以有序数组的中间元素为根结点，生成二叉树时可能会出现两种情况：
- 数组中元素为奇数个，此时以数组中间元素为界，两侧元素个数相同；此时，左右子树的高度差为`0`
* 数组中元素为偶数个，此时无论选择中间靠左的元素为界，还是选择中间靠右的元素为界，两侧元素的个数差值的绝对值都是`1`

为了保证根结点左右两侧的子树高度绝对值不大于`1`，需要对有序数组的每一个对半分出来的子序列都递归地执行这个操作。

#### 问题实现
```
/**
 * @param {number[]} nums
 * @return {TreeNode}
 */
const sortedArrayToBST = function(nums) {
  // 处理边界条件
  if(!nums.length) {
    return null;
  }
    
  // root 结点是递归“提”起数组的结果
  const root = buildBST(0, nums.length-1);

  // 定义二叉树构建函数，入参是子序列的索引范围
  function buildBST(low, high) {
    // 当 low > high 时，意味着当前范围的数字已经被递归处理完全了
    if(low > high) {
      return null;
    }
    // 二分一下，取出当前子序列的中间元素
    const mid = Math.floor(low + (high - low)/2)  
    // 将中间元素的值作为当前子树的根结点值
    const cur = new TreeNode(nums[mid]) 
    // 递归构建左子树，范围二分为[low,mid)
    cur.left = buildBST(low,mid-1)
    // 递归构建左子树，范围二分为为(mid,high]
    cur.right = buildBST(mid+1, high)
    // 返回当前结点
    return cur
  }
  // 返回根结点
  return root
};
```

# 平衡二叉树
二叉搜索树是二叉树的特例，平衡二叉树则是二叉搜索树的特例。

## 基本概念
平衡二叉树（又称 AVL Tree）指的是任意结点的左右子树高度差绝对值都不大于1的二叉搜索树。

平衡二叉树的出现，是为了降低二叉搜索树的查找时间复杂度。对于同样一个遍历序列，二叉搜索树的造型可以有很多种，平衡二叉树比非平衡二叉树的查找效率更高。

二叉搜索树在于把“二分”思想以数据结构的形式表达出来，在一个构造合理的二叉搜索树里，可以通过对比当前结点和目标值之间的大小关系，缩小下一步的搜索范围（如只搜索左子树或只搜索右子树），进而规避不必要的查找步骤，降低搜索过程的复杂度。

如果一棵二叉树不平衡，可能会带来高达`O(n)`的时间复杂度，而平衡二叉树由于利用了二分思想，查找操作的时间复杂度仅为`O(log n)`。因此，为了保证二叉搜索树能够确实为查找操作带来效率上的提升，有必要再构造二叉搜索树的过程中维持其平衡度，这就是平衡二叉树的由来。

## 平衡二叉树的问题案例
平衡二叉树和二叉搜索树一样，都被归类为“特殊”的二叉树。对于这样的数据结构来说，其“特殊”之处也正是其考点所在，因此真题往往稳定地分布在以下两个方向：
- 对特性的考察
- 对操作的考察

### 平衡二叉树的判定
LeetCode：[110. 平衡二叉树](https://leetcode-cn.com/problems/balanced-binary-tree/)
#### 问题描述
给定一个二叉树，判断它是否是高度平衡的二叉树。在这里，一棵高度平衡二叉树定义为一个二叉树每个节点的左右两个子树的高度差的绝对值不超过`1`。
```
示例 1：
      输入：root = [3, 9, 20, null, null, 15, 7]
      输出：TRUE
示例 2：
      输入：root = [1, 2, 2, 3, 3, null, null, 4, 4]
      输出：FALSE
```

#### 问题分析
平衡二叉树是任意结点的左右子树高度差绝对值都不大于`1`的二叉搜索树；其关键点为任意结点、左右子树高度差绝对值都不大于`1`、二叉搜索树。在这个问题中，只需要对任意结点和左右子树高度差绝对值不大于`1`进行验证。

因此，任意结点即暗示需要使用递归，而左右子树高度差绝对值不大于`1`就是递归式。所以这个问题的解决思路就是从下往上递归遍历树中的每一个结点，计算其左右子树的高度并进行对比，只要有一个高度差的绝对值大于`1`，那么整棵树都会被判为不平衡。

#### 问题实现
```
const isBalanced = function(root) {
  // 立一个flag，只要有一个高度差绝对值大于1，这个flag就会被置为false
  let flag = true;
  // 定义递归逻辑
  function dfs(root) {
    // 如果是空树，高度记为0；如果flag已经false了，那么就没必要往下走了，直接return
    if(!root || !flag) {
      return 0;
    }
    // 计算左子树的高度
    const left = dfs(root.left);
    // 计算右子树的高度
    const right = dfs(root.right);  
    // 如果左右子树的高度差绝对值大于1，flag就破功了
    if(Math.abs(left-right) > 1) {
      flag = false;
      // 后面再发生什么已经不重要了，返回一个不影响回溯计算的值
      return 0;
    }
    // 返回当前子树的高度
    return Math.max(left, right) + 1;
  }
  
  // 递归入口
  dfs(root);
  // 返回flag的值
  return flag;
};
```

### 平衡二叉树的构造
LeetCode：[1382. 将二叉搜索树变平衡](https://leetcode-cn.com/problems/balance-a-binary-search-tree/)

#### 问题描述
给你一棵二叉搜索树，请你返回一棵平衡后的二叉搜索树，新生成的树应该与原来的树有着相同的节点值。如果一棵二叉搜索树中，每个节点的两棵子树高度差不超过`1`，我们就称这棵二叉搜索树是平衡的。如果有多种构造方法，请你返回任意一种。
```
示例：
    输入：root = [1, null, 2, null, 3, null, 4, null, null]
    输出：[2, 1, 3, null, null, null, 4] 或 [3, 1, 4, null, 2, null, null]
```

#### 问题分析
这个问题的核心诉求就是要求构造一棵平衡的二叉搜索树，而二叉搜索树的中序比那里是有序的。所以，在这里可以先求出输入二叉树的中序遍历的有序数组，再逐个将二分出来的数组子序列提起来变成二叉搜索树。

#### 问题实现
```
/**
 * @param {TreeNode} root
 * @return {TreeNode}
 */
const balanceBST = function(root) {
  // 初始化中序遍历序列数组
  const nums = [];
  // 定义中序遍历二叉树，得到有序数组
  function inorder(root) {
    if(!root) {
      return;
    }
    inorder(root.left)  
    nums.push(root.val);
    inorder(root.right);
  }
    
  // 这坨代码的逻辑和上一节最后一题的代码一模一样
  function buildAVL(low, high) {
    // 若 low > high，则越界，说明当前索引范围对应的子树已经构建完毕
    if(low>high) {
      return null;
    }
    // 取数组的中间值作为根结点值
    const mid = Math.floor(low + (high -low)/2);
    // 创造当前树的根结点
    const cur = new TreeNode(nums[mid]);  
    // 构建左子树
    cur.left = buildAVL(low, mid-1);
    // 构建右子树
    cur.right = buildAVL(mid+1, high);
    // 返回当前树的根结点 
    return cur;
  }
  // 调用中序遍历方法，求出 nums
  inorder(root);
  // 基于 nums，构造平衡二叉树
  return buildAVL(0, nums.length-1);
};
```

# 堆结构及其排序的应用
## 前置：完全二叉树
完全二叉树是指同时满足下面两个条件的二叉树：
- 从第一层到倒数第二层，每一层都是满的，也就是说每一层的结点数都达到了当前层所能达到的最大值
- 最后一层的结点是从左到右连续排列的，不存在跳跃排列的情况（也就是说这一层的所有结点都集中排列在最左边）

完全二叉树中有着这样的索引规律：假如从左到右、从上到下依次对完全二叉树中的结点从`0`开始进行编码，那么对于索引为`n`的结点来说：
- 索引为`(n - 1) / 2`的结点是它的父结点
- 索引为`2 * n + 1`的结点是它的左孩子结点
- 索引为`2 * n + 2`的结点是它的右孩子结点

## 堆的基本概念
堆是完全二叉树的一种特例。根据约束规则的不同，堆又分为大顶堆和小顶堆两种。
- 如果对一棵完全二叉树来说，它每个结点的结点值都不小于其左右孩子的结点值，这样的完全二叉树就叫做“大顶堆”
- 若树中每个结点值都不大于其左右孩子的结点值，这样的完全二叉树就叫做“小顶堆”

## 堆的基本操作
大顶堆和小顶堆除了约束条件中的大小关系规则完全相反以外，其它方面都保持高度一致。很多时候，为了考察对完全二叉树索引规律的掌握情况，问题中与堆结构同时出现的，还有层序遍历序列。

此时需要关注的动作有：
- 如何取出堆顶元素（删除操作）
- 往堆里追加一个元素（插入操作）

至于堆的初始化，也只不过是从空堆开始，重复执行追加元素的动作而已。因此，上面这两个动作就是堆操作的核心。

### 取出堆顶元素
取出元素本身并不难，难的是如何在删除元素的同时，保持住队的“大顶”结构特性。为了做到这点，需要执行以下操作：
- 用堆里的最后一个元素替换掉堆顶元素
- 对比新的堆顶元素与其左右孩子的值，如果其中一个孩子大于堆顶元素，则交换两者的位置：交换后，继续向下对比它与当前左右孩子的值，如果其中一个大于它，则交换两者的位置

重复这个向下对比和交换的过程，直到无法继续交换为止，这样就得到了一个符合“大顶”原则的新的堆结构。

上述这个反复向下对比 + 交换的过程，用编码实现如下：
```
// 入参是堆元素在数组里的索引范围，low 表示下界，high 表示上界
function downHeap(low, high) {
  // 初始化 i 为当前结点，j 为当前结点的左孩子
  let i = low, j = i * 2 + 1;
  // 当 j 不超过上界时，重复向下对比+交换的操作
  while(j <= high) {
    // 如果右孩子比左孩子更大，则用右孩子和根结点比较
    if(j + 1 <= high && heap[j + 1] > heap[j]) {
      j = j + 1;
    }
        
    // 若当前结点比孩子结点小，则交换两者的位置，把较大的结点“拱上去”
    if(heap[i] < heap[j]) {
      // 交换位置
      const temp = heap[j];
      heap[j] = heap[i];
      heap[i] = temp;
            
      // i 更新为被交换的孩子结点的索引
      i = j;  
      // j 更新为孩子结点的左孩子的索引
      j = j * 2 + 1;
    } else {
      break;
    }
  }
}
```

### 往堆里追加一个元素
当添加一个新元素进堆的时候，同样需要考虑堆结构的排序原则：
1. 新来的数据首先要追加到当前堆里最后一个元素的后面
2. 不断进行向上对比和交换的操作：如果发现它比父结点的结点值要大，那么就和父结点的元素相互交换，再接着往上进行比较，直到无法再继续交换为止。

上述这个反复向上对比 + 交换的过程，用编码实现如下：
```
// 入参是堆元素在数组里的索引范围，low表示下界，high表示上界
function upHeap(low, high) {
  // 初始化 i（当前结点索引）为上界
  let i = high;
  // 初始化 j 为 i 的父结点
  let j = Math.floor((i - 1)/2);  
  // 当 j 不逾越下界时，重复向上对比+交换的过程
  while(j> = low)  {
    // 若当前结点比父结点大
    if(heap[j] < heap[i]) {
      // 交换当前结点与父结点，保持父结点是较大的一个
      const temp = heap[j];
      heap[j] = heap[i];
      heap[i] = temp;
            
      // i 更新为被交换父结点的位置
      i = j;   
      // j 更新为父结点的父结点
      j = Math.floor((i - 1) / 2);  
    } else {
      break;
    }
  }
}
```
    
上面的过程，需要记住的是：“删除”就是“向下比较和交换”，“添加”就是“向上比较和交换”。

## 问题案例：优先队列
LeetCode：[215. 数组中的第K个最大元素](https://leetcode-cn.com/problems/kth-largest-element-in-an-array/)

### 问题描述
在未排序的数组中找到第`k`个最大的元素。请注意，你需要找的是数组排序后的第`k`个最大的元素，而不是第`k`个不同的元素。
```
示例 1：
      输入: [3, 2, 1, 5, 6, 4] 和 k = 2
      输出: 5
示例 2：
      输入: [3, 2, 3, 1, 2, 4, 5, 5, 6] 和 k = 4
      输出: 4
```

### 问题分析
这道题的诉求非常直接，就是要求对给定数组进行排序。在排序的过程中，很难去明确元素之间的大小关系，只有在排序彻底完成后才能找出第`k`大的元素是哪个。

对整个数组进行排序、然后按顺序返回索引为`k - 1`的元素，正是第一种解法。

```
/**
  * @param {number[]} nums
  * @param {number} k
  * @return {number}
*/
const findKthLargest = function(nums, k) {
  // 将数组逆序
  const sorted = nums.sort((a, b) => {
    return b - a;
  });
  // 取第 k 大的元素
  return sorted[k - 1];
};
```

但是在这里是调用了 JavaScript 中的`sort` API，还可以使用堆结构来不对所有元素进行排序的情况下，提前定位到第`k`大的元素。

对于这个问题，要想求出第`k`大的元素，可以维护一个大小为`k`的小顶堆。这个堆的初始化过程可以通过遍历并插入数组的前`k`个元素来实现。当堆被填满后，再尝试用数组的第`k + 1`到末尾的这部分元素来更新这个小顶堆，更新过程中遵循以下原则：
- 若遍历到的数字比小顶堆的堆顶元素值大，则用该数字替换掉小顶堆的堆顶元素值
- 若遍历到的数字比小顶堆的堆顶元素值小，则忽略这个数字

假设数组中元素的总个数是`n`，那么：
- 维护大小为`k`的小顶堆的目的，是为了确保堆中除了堆顶元素之外的`k - 1`个元素值都大于堆顶元素
- 当用数组的`[0, k - 1]`区间里的 数字初始化完成这个堆时，堆顶元素值就对应着前 k 个数字里的最小值
- 紧接着尝试用索引区间为`[k, n - 1]`的数字来更新堆，在这个过程中，只允许比堆顶元素大的值进入堆。这一波操作过后，堆里的`k`个数字就是整个数组中最大的`k`个数字，而堆顶的数字正是这`k`个数中最小的那个

在解决问题的过程中，会使用到之前提及的`downHeap`方法和`upHeap`方法。但是需要注意的是，大顶堆和小顶堆的大小关系规则是相反的。
```
/**
* @param {number[]} nums
* @param {number} k
* @return {number}
*/
const findKthLargest = function (nums, k) {
 // 初始化一个堆数组
 const heap = [];
 // n 表示堆数组里当前最后一个元素的索引
 let n = 0;
 // 缓存 nums 的长度
 const len = nums.length;
 // 初始化大小为 k 的堆
 function createHeap () {
   for(let i = 0; i < k; i++) {
     // 逐个往堆里插入数组中的数字
     insert(nums[i]);
   }
 }
   
 // 尝试用 [k, n-1] 区间的元素更新堆
 function updateHeap () {
   for(let i = k; i < len; i++) {
     // 只有比堆顶元素大的才有资格进堆
       if(nums[i] > heap[0]) {
         // 用较大数字替换堆顶数字
         heap[0] = nums[i]; 
         // 重复向下对比+交换的逻辑
         downHeap(0, k);
       }
     }
   }
   
   // 向下对比函数
   function downHeap (low, high) {
     // 入参是堆元素在数组里的索引范围，low 表示下界，high 表示上界
     let i = low, j = i * 2 + 1;
     // 当 j 不超过上界时，重复向下对比 + 交换的操作
     while (j <= high) {
       // 如果右孩子比左孩子更小，则用右孩子和根结点比较
       if(j + 1 <= high && heap[j + 1] < heap[j]) {
         j = j + 1;
       }
           
       // 若当前结点比孩子结点大，则交换两者的位置，把较小的结点“拱上去”
       if(heap[i] > heap[j]) {
         // 交换位置
         const temp = heap[j];
         heap[j] = heap[i];  
         heap[i] = temp;
               
         // i 更新为被交换的孩子结点的索引
         i = j;  
         // j 更新为孩子结点的左孩子的索引
         j = j * 2 + 1;
       } else {
         break;
       }
     }
   }
   
   // 入参是堆元素在数组里的索引范围，low 表示下界，high 表示上界
   function upHeap(low, high) {
     // 初始化 i（当前结点索引）为上界
     let i = high;
     // 初始化 j 为 i 的父结点
     let j = Math.floor((i - 1) / 2);  
     // 当 j 不逾越下界时，重复向上对比+交换的过程
     while(j >= low)  {
       // 若当前结点比父结点小
       if(heap[j] > heap[i]) {
         // 交换当前结点与父结点，保持父结点是较小的一个
         const temp = heap[j];
         heap[j] = heap[i];
         heap[i] = temp;
               
         // i 更新为被交换父结点的位置
         i = j;   
         // j 更新为父结点的父结点
         j = Math.floor((i - 1) / 2);  
       } else {
         break;
       }
     }
   }


   // 插入操作 = 将元素添加到堆尾部 + 向上调整元素的位置
   function insert(x) {
     heap[n] = x;
     upHeap(0, n);
     n++;
   }
   
   // 调用 createHeap 初始化元素个数为k的队
   createHeap();
   // 调用 updateHeap 更新堆的内容，确保最后堆里保留的是最大的 k 个元素
   updateHeap();
   // 最后堆顶留下的就是最大的 k 个元素中最小的那个，也就是第 k 大的元素
   return heap[0];
};
```

在这问题的实现方式中出现的`heap`数组，就是一个优先队列。优先队列的本质是二叉堆结构，它具有以下特性：
- 队列的头部元素，也即索引为`0`的元素，就是整个数组里的最值，即最大值或者最小值
- 对于索引为`i`的元素来说，它的父结点下标是`(i - 1) / 2`（这与完全二叉树的特性相关）
- 对于索引为`i`的元素来说，它的左孩子下标应为`2 * i + 1`，右孩子下标应为`2 * i + 2`

当问题描述中出现类似于“第`k`大”或者“第`k`高“这样的关键字时，就是在暗示用优先队列或堆结构来解决。这样的手法可以允许在不对序列进行完全排序的情况下，找到第`k`个最值。

---

【 完 】