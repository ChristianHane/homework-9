const Word = require('./word.js');
const inquirer = require('inquirer');

let guessedLetters = [];
let wins = 0;
let losses = 0;
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
      checkResponse(answers);
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
    wins++;
    createNewGame();
  } else if (word.guessesRemaining === 1) {
    console.log()    
    console.log('----------------------------------------------------------------------------');
    console.log()
    console.log('YOU LOSE!!!');
    console.log();
    console.log('NEXT WORD!!');
    losses++;
    createNewGame();
  } else if (word.check(answers.letter.toUpperCase())) {
    console.log();
    console.log('\x1b[5m%s\x1b[0m', 'CORRECT!!');
    console.log();      
    console.log('----------------------------------------------------------------------------');
    word.guessesRemaining--;      
    prompt();
  } else {
    console.log();
    console.log('\x1b[5m%s\x1b[0m', 'INCORRECT!!');
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
    console.log('----------------------------------------------------------------------------');                
    console.log();
    console.log('\x1b[41m%s\x1b[0m', "YOU'VE ALREADY GUESSED THE LETTER " + answers.letter.toUpperCase());
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

function checkResponse(answers) {
  if (answers.letter === 'stats') {
    console.log('----------------------------------------------------------------------------');            
    console.log();
    console.log('YOUR STATS: ');
    console.log('WINS: ' + wins);
    console.log('LOSSES: ' + losses);
    console.log();
    console.log('----------------------------------------------------------------------------');        
    prompt();      
  } else if (answers.letter.length > 1) {
    console.log();
    console.log('PLEASE INPUT ONLY ONE LETTER');
    console.log();
    console.log('----------------------------------------------------------------------------');    
    prompt();
  } else {
    checkRepeatLetter(answers);
  }
}

welcome();
