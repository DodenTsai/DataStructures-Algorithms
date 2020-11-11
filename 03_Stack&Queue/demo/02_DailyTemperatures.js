/**
 * @param {number[]} T
 * @return {number[]}
 */
var dailyTemperatures = function(T) {
  var len = T.length;
  var stack = [];
  var result = new Array(len).fill(0);

  for (var i = 0; i < len; i++) {
    while (stack.length && T[i] > T[stack[stack.length - 1]]) {
      var top = stack.pop();
      result[top] = i - top;
    }
    stack.push(i);
  }

  return result;
};