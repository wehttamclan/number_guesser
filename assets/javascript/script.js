/* 
min and max are defaults here.  
min, max, and randomNumber should be set from the beginning.
I used var so they will be accessible by other functions to change their value.
*/
var min = 1;
var max = 100;
var randomNumber = randomNumberGenerator(min, max);

/* 
Here I'm grabbing page elements and set to a variable 
so they can by manipulated by various functions.
*/
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

/* 
I needed a way to start the game when the page loaded.
Now that I think about it, this might be redundant with randomNumber above.
*/
document.onload = randomNumberGenerator();

// This is a random number generator, basically from w3schools Math.random page
function randomNumberGenerator(min, max) {
  return Math.floor(Math.random() * (max + 1 - min)) + min;
};

function checkGuess() {
  // I just wanted to reuse the value of the guessInput field so I labelled it.
  let guess = guessInput.value;
  // This checks if the guess input is not a number or empty string.
  if(isNaN(parseInt(guess)) || guess == '') {
    // Helper method that displays the guess and feedback about the guess.
    // This branch relays that the input is not a valid number.
    giveFeedback('-', 'Please enter a valid number');
    /* This checks if the guess is in range.
    This had to be checked before the next two branches or else 
    the feedback would say too high or too low instead of out of range */ 
  } else if (guess > max || guess < min) {
    // Helper method to give out of range feedback.
    giveFeedback('out of range.', '');
    // Check to see if the guess is too high.
  } else if(guess > randomNumber) {
    // Feedback hint that the guess is too high.
    giveFeedback(`${guess}`, 'That is too high');
    // Check to see if the number is too low.
  } else if(guess < randomNumber) {
    // Feedback hint that the guess is too low.
    giveFeedback(`${guess}`, 'That is too low')
    // Check to see if the answer is right. Maybe this could be an else branch?
  } else if(guess == randomNumber) {
    // Game winning line.
    giveFeedback(`${guess}`, 'BOOM');
    // Decrements the lower bound of the range.
    min -= 10;
    // Increments the upper bound of the range.
    max += 10;
    // Resets the guess input field min and max attributes.
    guessInput.min = min;
    guessInput.max = max;
    // Generates a new random number with the new bounds.
    randomNumber = randomNumberGenerator(min, max);
  }
  // After any guess is made, the reset button is enabled.
  enableReset();
};

// The helper method used in the guessCheck method if/else block.
function giveFeedback(guessText, hintText) {
  // This changes the text of the HTML element to display the last guess.
  displayGuess.innerText = `${guessText}`;
  // This changes the text of the HTML element to display feedback or hints.
  displayHint.innerText = `${hintText}`;
  // This unhides the HTML elements that contain the feedback.
  feedback.style.display = "block";
};

// This enables the reset button.
function enableReset() {
  resetButton.disabled = false;
}

// Resets the game without page reload.
function resetGame() {
  // Reassignes min, max, and randomNumber to defaults.
  min = 1;
  max = 100;
  randomNumber = randomNumberGenerator(min, max);
  // Clears the input fields, disables buttons, and hides feedback HTML.
  clearGuess();
  clearRanges();
  clearFeedback();
}

// Helper method to reset the feedback content and HTML elements.
function clearFeedback() {
  // Defaults the guess display element text to '-'
  displayGuess.innerText = `-`;
  // Hides the HTML.
  feedback.style.display = "none";
  // Disables the reset button.
  resetButton.disabled = true;
}

// Helper method to clear the guess input field and disables the guess buttons.
function clearGuess() {
  // Clears guess input field.
  guessInput.value = '';
  // Because the guess input field is now clear, the guess buttons will be disabled.
  enableGuessButtons();
}

// Helper method to clear range input fields and disables the set range button.
function clearRanges() {
  minRange.value = '';
  maxRange.value = '';
  // Because the range input fields are clear, this disables the set range button.
  enableRangeButton();
}

// Helper method to enable/disable the Guess and Clear buttons.
function enableGuessButtons() {
  // This disables (or keeps them disabled) the buttons if the input isn't a number.
  if (isNaN(parseInt(guessInput.value))) {
    guessButton.disabled = true;
    clearButton.disabled = true;
    // This enables the buttons if the above is false.
  } else {
    guessButton.disabled = false;
    clearButton.disabled = false;
  };
};

// Resets the min, max, and randomNumber if the user chooses their own.
function setRange() {
  // This handles just the lower bound of the range.
  // It is separate from the upper bound so the user can set them independently.
  if (minRange.value) {
    min = parseInt(minRange.value);
  };
  // This handles the upper bound of the range.
  if (maxRange.value) {
    max = parseInt(maxRange.value);    
  };
  // This resets the min and max properties of the guess input field.
  guessInput.min = min;
  guessInput.max = max;
  // These reset the guess and feedback parts of the page.
  // It leaves the range fields filled in so the user can see the customer bounds.
  clearGuess();
  clearFeedback();
  randomNumber = randomNumberGenerator(min, max);
}

// Helper method to enable/disable set range button.
function enableRangeButton() {
  // Checks if minimum input field is an integer.
  if (Number.isInteger(parseInt(minRange.value))) {
    // Enables the set range button.
    rangeButton.disabled = false;
    // Checks if the max input field is an integer.
  } else if (Number.isInteger(parseInt(maxRange.value))){
    // Enables the set range button
    rangeButton.disabled = false;
    // Disables the set range button.
  } else rangeButton.disabled = true;
}

// Event triggered by click on Guess button.
guessButton.addEventListener('click', checkGuess);
// Event triggered by click on reset button.
resetButton.addEventListener('click', resetGame)
// Event triggered by input of guess input field.
guessInput.addEventListener('input', enableGuessButtons)
// Event triggered by click on set range button.
rangeButton.addEventListener('click', setRange)
// Event triggered by inpt of minimum input field
minRange.addEventListener('input', enableRangeButton)
// Event triggered by inpt of maximum input field
maxRange.addEventListener('input', enableRangeButton)
