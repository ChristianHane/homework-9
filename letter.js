module.exports = class Letter {
  constructor(letter) {
    this.letter = letter;
    this.guessed = false;
  }
  correct() {
    if (this.guessed) {
      return this.letter;
    } else if (this.letter !== ' ') {
      return '_';
    } else {
      return ' ';
    }
  }
  checkGuess(letterGuess) {
    let corInc;
    if (this.letter === letterGuess) {
      this.guessed = true;
      corInc = true;
    }
    return corInc;
  }
}

