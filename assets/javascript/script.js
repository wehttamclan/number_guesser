var min = 1;
var max = 100;
var randomNumber = randomNumberGenerator(min, max);
var guessInput = document.getElementById("guess-input");
var submitGuess = document.getElementById("submit-guess");
var displayGuess = document.getElementById("display-guess")
var displayHint = document.getElementById("hint")
var feedback = document.getElementById("feedback")

document.onload = randomNumberGenerator();

function randomNumberGenerator(min, max) {
  return Math.floor(Math.random() * (max + 1 - min)) + min;
};

function checkGuess() {
  let guess = guessInput.value;
  // let guessText = document.createTextNode(guessInput.value);
  if(isNaN(guess) || guess == '') {
    displayHint.innerText = 'Please enter a valid number';
    feedback.style.display = "block";
  } else if(guess > randomNumber) {
    displayGuess.innerText = `${guess}`;
    displayHint.innerText = 'That is too high';
    feedback.style.display = "block";
  } else if(guess < randomNumber) {
    displayGuess.innerText = `${guess}`;
    displayHint.innerText = 'That is too low';
    feedback.style.display = "block";
  } else console.log(`"Try again ${randomNumber}"`)
};

submitGuess.addEventListener('click', checkGuess);