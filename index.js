// function setMaxListeners() { require('cluster') };
// setMaxListeners(1);

const Word = require('./word.js');
const inquirer = require('inquirer');

let guessedLetters = [];
const words = ['happy halloween', 'star wars', 'jedi knight', 'peter pan', 'window', 'book', 'table', 'plane', 'space', 'solar system'];  
let randomNumber;
let word;

function createNewGame() {
  guessedLetters = [];
  randomNumber = Math.floor(Math.random() * words.length);
  word = new Word(words[randomNumber]);
  console.log();
  console.log(word.checkWord());
  console.log();
  prompt();
}

function prompt() {
  console.log();
  console.log('Guesses left: ' + word.guessesRemaining);
  console.log();
  inquirer
    .prompt([
      {
        type: 'input',
        message: '? GUESS A LETTER!',
        name: 'letter'
      }
    ])
    .then(function(answers) {
      checkRepeatLetter(answers);
    })
    .catch(function(err) {
      console.log(err);
    })
}

function welcome() {
  console.log();
  console.log();
  console.log();
  console.log();
  console.log();
  console.log();
  console.log('WELCOME TO HANGMAN! ARE YOU READY?! LETS PLAY!!');
  console.log();
  console.log();
  console.log();
  console.log();
  console.log();
  createNewGame();
}

function displayResponse(answers) {
  if (word.displayArray.join('') === word.wordArray.join('')) {
    console.log()    
    console.log('----------------------------------------------------------------------------');
    console.log()
    console.log('YOU WIN!!!');
    console.log();
    console.log('NEXT WORD!!');
    createNewGame();
  } else if (word.guessesRemaining === 1) {
    console.log()    
    console.log('----------------------------------------------------------------------------');
    console.log()
    console.log('YOU LOSE!!!');
    console.log();
    console.log('NEXT WORD!!');
    createNewGame();
  } else if (word.check(answers.letter)) {
    console.log();
    console.log('CORRECT!!');
    console.log();      
    console.log('----------------------------------------------------------------------------');
    word.guessesRemaining--;      
    prompt();
  } else {
    console.log();
    console.log('INCORRECT!!');
    console.log();      
    console.log('----------------------------------------------------------------------------');
    word.guessesRemaining--;  
    prompt();
  }
}

function checkRepeatLetter(answers) {
  let isRepeat = false;
  for (let i = 0; i < guessedLetters.length; i++) {
    if (answers.letter.toUpperCase() === guessedLetters[i]) {
      isRepeat = true;
    }
  }
  if (isRepeat) { 
    console.log();
    console.log("YOU'VE ALREADY GUESSED THE LETTER " + answers.letter.toUpperCase());
    console.log();        
    console.log('----------------------------------------------------------------------------');    
    prompt();
  } else {
    guessedLetters.push(answers.letter.toUpperCase());    
    console.log();
    word.check(answers.letter.toUpperCase());
    console.log('WORD:');
    word.checkWord();
    displayResponse(answers);    
  }
}


welcome();
