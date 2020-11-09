/**
 * Initialize your data structure here.
 */
var WordDictionary = function() {
  this.words = {};
};

/**
 * Adds a word into the data structure. 
 * @param {string} word
 * @return {void}
 */
WordDictionary.prototype.addWord = function(word) {
  if (this.words[word.length]) {
    this.words[word.length].push(word);
  } else {
    this.words[word.length] = [word];
  }
};

/**
 * Returns if the word is in the data structure. A word could contain the dot character '.' to represent any one letter. 
 * @param {string} word
 * @return {boolean}
 */
WordDictionary.prototype.search = function(word) {
  if (!this.words[word.length]) {
    return false;
  }

  var len = word.length;
  if (!word.includes('.')) {
    return this.word[len].includes(word);
  }

  const reg = new RegExp(word);
  return this.word[len].some(item => reg.test(item));
};

/**
 * Your WordDictionary object will be instantiated and called as such:
 * var obj = new WordDictionary()
 * obj.addWord(word)
 * var param_2 = obj.search(word)
 */