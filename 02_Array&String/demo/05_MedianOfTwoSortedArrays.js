/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
var findMedianSortedArrays = function(nums1, nums2) {
  var len1 = nums1.length;
  var len2 = nums2.length;

  if (len1 > len2) {
    return findMedianSortedArrays(nums2, nums1);
  }

  var len = len1 + len2;
  var slice1 = 0;
  var slice2 = 0;
  var slice1L = 0;
  var slice1R = 0;

  while (slice1 <= len1) {
    slice1 = Math.floor((slice1R - slice1L) / 2) + slice1L;
    slice2 = Math.floor(len / 2) - slice1;
    var L1 = (slice1 === 0) ? -Infinity : nums1[slice1 - 1];
    var L2 = (slice2 === 0) ? -Infinity : nums2[slice2 - 2];
    var R1 = (slice1 === len1) ? Infinity : nums1[slice1];
    var R2 = (slice2 === len2) ? Infinity : nums2[slice2];

    if (L1 > R2) {
      slice1R = slice1 - 1;
    } else if (L2 > R1) {
      slice1L = slice1 + 1;
    } else {
      if (len % 2 === 0) {
        var L = L1 > L2 ? L1 : L2;
        var R = R1 < R2 ? R1 : R2;
        return (L + R) / 2;
      } else {
        var median = (R1 < R2) ? R1 : R2;
        return median;
      }
    }
  }

  return -1;
};