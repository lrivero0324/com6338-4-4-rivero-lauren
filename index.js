var words = [
  'bananas',
  'grapes',
  'carousel',
  'milkshake',
  'javascript',
  'limousine',
  'chocolate',
  'programming',
  'meatloaf',
  'ukulele',
  'mango'
]

let currentWord = '';
let guessedLetters = new Set();
let incorrectLetters = [];
let remainingGuesses = 10;
let wins = 0;
let losses = 0;

const wordToGuessEl = document.getElementById('word-to-guess');
const previousWordEl = document.getElementById('previous-word');
const incorrectLettersEl = document.getElementById('incorrect-letters');
const remainingGuessesEl = document.getElementById('remaining-guesses');
const winsEl = document.getElementById('wins');
const lossesEl = document.getElementById('losses');

function initGame() {
  currentWord = words[Math.floor(Math.random() * words.length)];
  guessedLetters.clear();
  incorrectLetters = [];
  remainingGuesses = 10;

  updateDisplay();
}

function updateDisplay() {
  const displayWord = currentWord
    .split('')
    .map(letter => guessedLetters.has(letter) ? letter : '_')
    .join('');
  wordToGuessEl.textContent = displayWord;

  incorrectLettersEl.textContent = incorrectLetters.join(', ');
  remainingGuessesEl.textContent = remainingGuesses;
  winsEl.textContent = wins;
  lossesEl.textContent = losses;

  if (displayWord === currentWord) {
    wins++;
    previousWordEl.textContent = currentWord;
    initGame();
  }

  else if (remainingGuesses === 0) {
    losses++;
    previousWordEl.textContent = currentWord;
    initGame();
  }
}

document.addEventListener('keyup', function(event) {
  const letter = event.key.toLowerCase();
  if (!/^[a-z]$/.test(letter)) return;

  if (guessedLetters.has(letter)) return;

  guessedLetters.add(letter);

  if (currentWord.includes(letter)) {
    updateDisplay();
  } else {
    incorrectLetters.push(letter);
    remainingGuesses--;
    updateDisplay();
  }
});

initGame();