var min = 1;
var max = 100;
var randomNumber = randomNumberGenerator(min, max);
var guessInput = document.getElementById("guess-input");
var displayGuess = document.getElementById("display-guess");
var displayHint = document.getElementById("hint");
var feedback = document.getElementById("feedback");
var guessButton = document.getElementById("submit-guess");
var resetButton = document.getElementById("reset-button");
var clearButton = document.getElementById("clear-guess");

document.onload = randomNumberGenerator();

function randomNumberGenerator(min, max) {
  return Math.floor(Math.random() * (max + 1 - min)) + min;
};

function checkGuess() {
  let guess = guessInput.value;
  if(isNaN(parseInt(guess)) || guess == '') {
    displayGuess.innerText = `-`;
    displayHint.innerText = 'Please enter a valid number';
    feedback.style.display = "block";
  } else if (guess > max || guess < min) {
    displayGuess.innerText = `out of range.`;
    displayHint.innerText = '';
  } else if(guess > randomNumber) {
    displayGuess.innerText = `${guess}`;
    displayHint.innerText = 'That is too high';
    feedback.style.display = "block";
  } else if(guess < randomNumber) {
    displayGuess.innerText = `${guess}`;
    displayHint.innerText = 'That is too low';
    feedback.style.display = "block";
  } else if(guess == randomNumber) {
    displayGuess.innerText = `${guess}`;
    displayHint.innerText = 'BOOM';
    feedback.style.display = "block";
  }
};

function resetGame() {
  randomNumber = randomNumberGenerator(min, max);
  clearGuess();
  displayGuess.innerText = `-`;
  feedback.style.display = "none";
}

function clearGuess() {
  guessInput.value = '';
  enableButtons();
}

function enableButtons() {
  if(isNaN(parseInt(guessInput.value))) {
    guessButton.disabled = true;
    clearButton.disabled = true;
  } else {
    guessButton.disabled = false;
    clearButton.disabled = false;
  };
};

guessButton.addEventListener('click', checkGuess);
resetButton.addEventListener('click', resetGame)
guessInput.addEventListener('input', enableButtons)
