// Get reference to HTML items
var currentWordText = document.getElementById("current-word-text");
var guessesRemainingText = document.getElementById("guesses-remaining-text");
var alreadyGuessedText = document.getElementById("already-guessed-text");
var endGameText = document.getElementById("end-game-text");
var playAgainBtn = document.getElementById("play-again-btn");

// Array of possible words to guess
var words = ["cat", "dog", "tiger", "moose"];

// Copy the array to keep track of which words were already played
var unplayedWords = words.slice();

// Declare variables and initialize the game
var guessedLetters, numGuessesRemaining, numCorrect, gameReady, theWord;
restartGame();

// This function is run when a key is pressed
document.onkeyup = function(event) {
    if(gameReady) {
        // Get the key that was pressed
        var guess = event.key;

        // Check if the key is a letter from a-z
        if(guess.length === 1 && guess.match(/[a-z]/i)) {
            guess = guess.toLowerCase();

            // Check if the letter has already been guessed
            if(guessedLetters.indexOf(guess) === -1) {
                // Add to the array of guessed letters
                guessedLetters.push(guess);

                // Check if there is an instance of the letter in the word
                if (theWord.indexOf(guess) >= 0) {
                    // Loop through the string to find all instances of the letter
                    for (var i = 0; i < theWord.length; i++) {
                        if (theWord[i] === guess) {
                            // Replace the dash with the letter
                            currentWordText.textContent = currentWordText.textContent.substring(0, i) + guess + currentWordText.textContent.substring(i + 1);
                            numCorrect++;
                        }
                    }

                    // Check if the user has won
                    if (numCorrect === theWord.length) {
                        endGameText.textContent = "You Win!"
                        playAgainBtn.style.visibility = "visible";
                        gameReady = false;
                    }
                } else {
                    // Add the letter to the list of incorrect guesses
                    alreadyGuessedText.textContent = alreadyGuessedText.textContent + " " + guess;

                    // Check if the user has lost
                    numGuessesRemaining--;
                    guessesRemainingText.textContent = numGuessesRemaining;
                    if (numGuessesRemaining === 0) {
                        endGameText.textContent = "You Lose."
                        playAgainBtn.style.visibility = "visible";
                        gameReady = false;
                    }
                }
            }
        }
    }
}

function restartGame() {
    // Reset variables
    guessedLetters = [];
    numGuessesRemaining = 13;
    numCorrect = 0;
    gameReady = true;

    // If all of the words have been played, then re-add all the words
    if(unplayedWords.length === 0) {
        unplayedWords = words.slice();
    }
    
    // Choose a word randomly
    iWord = Math.floor(Math.random() * unplayedWords.length)
    theWord = unplayedWords[iWord];
    console.log("The correct word is: " + theWord);

    // Remove the word from the array
    unplayedWords.splice(iWord, 1);

    // Display the length of the word with underscores
    currentWordText.textContent = theWord.replace(/[a-z]/ig, "_");

    // Reset other text
    guessesRemainingText.textContent = numGuessesRemaining;
    alreadyGuessedText.textContent = "";
    endGameText.textContent = "";
    playAgainBtn.style.visibility = "hidden";
}
