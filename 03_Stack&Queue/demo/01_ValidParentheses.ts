var leftToRight = {
  "(": ")",
  "[": "]",
  "{": "}",
};

/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function(s) {
  if (!s) return true;

  var stack = [];
  var len = s.length;

  for (var i = 0; i < len; i++) {
    var ch = s[i];

    if (ch === "(" || ch === "{" || ch === "[") {
      stack.push(leftToRight[ch])
    } else {
      if (!stack.length || stack.pop() !== ch) {
        return false;
      }
    }
  }

  return !stack.length;
};