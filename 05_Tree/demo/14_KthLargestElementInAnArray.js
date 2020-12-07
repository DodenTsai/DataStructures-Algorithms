/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var findKthLargest = function(nums, k) {
  var heap = [];
  var n = 0;
  var len = nums.length;

  function createHeap () {
    for (var i = 0; i < k; i++) {
      insert(nums[i])
    }
  }

  function updateHeap () {
    for (var i = k; i < len; i++) {
      if (nums[i] > heap[0]) {
        heap[0] = nums[i];
        downHeap(0, k);
      }
    }
  }

  function downHeap(low, high) {
    var i = low, j = i * 2 + 1;
    while (j <= high) {
      if (j + 1 <= high && heap[j + 1] < heap[j]) {
        j = j + 1;
      }

      if (heap[i] > heap[j]) {
        var temp = heap[j];
        heap[j] = heap[i];
        heap[i] = temp;

        i = j;
        j = j * 2 + 1;
      } else {
        break;
      }
    }
  }

  function upHeap (low, high) {
    var i = high;
    var j = Math.floor((i - 1) / 2);

    while (j >= low) {
      if (heap[j] > heap[i]) {
        var temp = heap[j];
        heap[j] = heap[i];
        heap[i] = temp;

        i = j;
        j = Math.floor((i - 1) / 2);
      } else {
        break;
      }
    }
  }

  function insert(x) {
    heap[n] = x;
    upHeap(0, n);
    n++;
  }

  createHeap()
  updateHeap()
  return heap[0]
};