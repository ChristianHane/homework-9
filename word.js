var Letter = require('./letter.js');

module.exports = class Word {
  constructor(word) {
    this.guessesRemaining = 15;
    this.displayArray = [];
    this.letterArray = [];
    this.wordArray = word.toUpperCase().split('');
    for (var i = 0; i < this.wordArray.length; i++) {
      this.letterArray.push(new Letter(this.wordArray[i]));  
    }
  }
  checkWord() {
    this.displayArray = [];
    for (var i = 0; i < this.letterArray.length; i++) {
      this.displayArray.push(this.letterArray[i].correct());
    }
    console.log(this.displayArray.join(' '));
  }
  check(guess) {
    let corIncor = false;
    this.letterArray.forEach(function(element) {
      element.checkGuess(guess);
      if (guess === element.letter) {
        corIncor = true;
      }
    })
    if (corIncor) {
      return true;
    }
  }
}