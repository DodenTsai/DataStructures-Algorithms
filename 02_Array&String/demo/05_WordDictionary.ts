/**
 * Initialize your data structure here.
 */
var WordDictionary = function() {
  this.words = new Map();
};

/**
 * Adds a word into the data structure. 
 * @param {string} word
 * @return {void}
 */
WordDictionary.prototype.addWord = function(word) {
  if (this.words.has(word.length)) {
    const newArrValue = this.words.get(word.length)
    newArrValue.push(word)
    this.words.set(word.length, newArrValue)
  } else {
    this.words.set(word.length, [word]);
  }
};

/**
 * Returns if the word is in the data structure. A word could contain the dot character '.' to represent any one letter. 
 * @param {string} word
 * @return {boolean}
 */
WordDictionary.prototype.search = function(word) {
  if (!this.words.has(word.length)) {
    return false;
  }

  var len = word.length;
  if (!word.includes('.')) {
    return this.words.get(len).includes(word);
  }

  const reg = new RegExp(word);
  return this.words.get(len).some(item => reg.test(item));
};

/**
 * Your WordDictionary object will be instantiated and called as such:
 * var obj = new WordDictionary()
 * obj.addWord(word)
 * var param_2 = obj.search(word)
 */