var min = 1;
var max = 100;
var guessInput = document.getElementById("guess-input");
var submitGuess = document.getElementById("submit-guess");

function randomNumberGenerator(min, max) {
  return Math.floor(Math.random() * (max + 1 - min)) + min;
};

function checkGuess() {
  console.log("hello")
};

submitGuess.addEventListener('click', checkGuess);