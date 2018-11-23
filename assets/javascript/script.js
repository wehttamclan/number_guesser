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
var rangeButton = document.getElementById("set-range");
var minRange = document.getElementById("min");
var maxRange = document.getElementById("max");

document.onload = randomNumberGenerator();

function randomNumberGenerator(min, max) {
  return Math.floor(Math.random() * (max + 1 - min)) + min;
};

function checkGuess() {
  let guess = guessInput.value;
  if(isNaN(parseInt(guess)) || guess == '') {
    giveFeedback('-', 'Please enter a valid number');
  } else if (guess > max || guess < min) {
    giveFeedback('out of range.', '');
  } else if(guess > randomNumber) {
    giveFeedback(`${guess}`, 'That is too high');
  } else if(guess < randomNumber) {
    giveFeedback(`${guess}`, 'That is too low')
  } else if(guess == randomNumber) {
    giveFeedback(`${guess}`, 'BOOM');
    min -= 10;
    max += 10;
    guessInput.min = min;
    guessInput.max = max;
    randomNumber = randomNumberGenerator(min, max);
  }
  enableReset();
};

function giveFeedback(guessText, hintText) {
  displayGuess.innerText = `${guessText}`;
  displayHint.innerText = `${hintText}`;
  feedback.style.display = "block";
};

function enableReset() {
  resetButton.disabled = false;
}

function resetGame() {
  randomNumber = randomNumberGenerator(min, max);
  min = 1;
  max = 100;
  clearGuess();
  clearRanges();
  clearFeedback();
}

function clearFeedback() {
  displayGuess.innerText = `-`;
  feedback.style.display = "none";
  resetButton.disabled = true;
}

function clearGuess() {
  guessInput.value = '';
  enableGuessButtons();
}

function clearRanges() {
  minRange.value = '';
  maxRange.value = '';
  enableRangeButton();
}

function enableGuessButtons() {
  if (isNaN(parseInt(guessInput.value))) {
    guessButton.disabled = true;
    clearButton.disabled = true;
  } else {
    guessButton.disabled = false;
    clearButton.disabled = false;
  };
};

function setRange() {
  if (minRange.value) {
    min = parseInt(minRange.value);
  };
  if (maxRange.value) {
    max = parseInt(maxRange.value);    
  };
  guessInput.min = min;
  guessInput.max = max;
  clearGuess();
  clearFeedback();
  randomNumber = randomNumberGenerator(min, max);
}

function enableRangeButton() {
  if (Number.isInteger(parseInt(minRange.value))) {
    rangeButton.disabled = false;
  } else if (Number.isInteger(parseInt(maxRange.value))){
    rangeButton.disabled = false;
  } else rangeButton.disabled = true;
}

guessButton.addEventListener('click', checkGuess);
resetButton.addEventListener('click', resetGame)
guessInput.addEventListener('input', enableGuessButtons)
rangeButton.addEventListener('click', setRange)
minRange.addEventListener('input', enableRangeButton)
maxRange.addEventListener('input', enableRangeButton)
