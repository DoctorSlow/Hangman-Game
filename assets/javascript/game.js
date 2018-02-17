//set our variables and intialize our arrays
var gameCount = document.getElementById("game-Count");
var userWins = document.getElementById("user-Wins");
var userLosses = document.getElementById("user-Losses");
var userGuesses = document.getElementById("user-Guesses");
var guessesLeft = document.getElementById("guesses-Left");
var currentPuzzle = document.getElementById("current-Puzzle");
var wins = 0;
var losses = 0;
var gameNum = 1;
var guessCount = 0;
var alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S',
    'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
];
var puzzleArray = ['TOMBSTONE', 'NAVAJO', 'SAGUARO', 'TARANTULA', 'ROADRUNNER', 'CACTUS', 'JAVALINA',
    'BURRITO',
    'BISBEE', 'SEDONA'
];
var uniqueArray = [];
var puzzle = "";
var correctGuesses = [];
var guessedLetters = [];
var answerArray = [];
var underscoreArray = 0;

//generate puzzle words
function puzzleDisplay() {

    correctGuesses = [];
    guessedLetters = [];

    puzzle = puzzleArray[Math.floor(Math.random() * puzzleArray.length)];
    //Generate new random words until we find one that is not in the unique array (i.e. not used before)
    while (uniqueArray.indexOf(puzzle) != -1 && uniqueArray.length != puzzleArray.length) {
        puzzle = puzzleArray[Math.floor(Math.random() * puzzleArray.length)];
    }
    //Check for end-game status and alert game over messages
    if (uniqueArray.length == puzzleArray.length) {
        if (wins > losses) {
            alert("Game Over--you won! You really know your Arizona. Congratulations.");
        } else {
            alert("Game Over--you lost! Get outside and get to know Arizona better, already.")
        }
        return;
    }
    //intialize settings for each puzzle
    answerArray = puzzle.split("");
    underscoreArray = answerArray.length;

    for (var i = 0; i < underscoreArray; i++) {
        correctGuesses.push("_");
    }
    guessCount = puzzle.length + 3;
    currentPuzzle.innerHTML = correctGuesses.join(" ");
    guessesLeft.innerHTML = guessCount;
    gameCount.innerHTML = gameNum;
    uniqueArray.push(puzzle);

};
//check userinput vs. puzzle letters
function checkLetter(userInput) {
    if (alphabet.includes(userInput.toUpperCase())) {
        if (!guessedLetters.includes(userInput)) {
            guessedLetters.push(userInput);
            guessCount--;
            userGuesses.innerHTML = guessedLetters;
        }

        var lettersInPuzzle = false;

        for (var i = 0; i < underscoreArray; i++) {
            if (puzzle[i] === userInput) {
                lettersInPuzzle = true;
            }
        }

        if (lettersInPuzzle) {
            for (i = 0; i < underscoreArray; i++) {
                if (puzzle[i] === userInput) {
                    correctGuesses[i] = userInput;
                }
            }
        }
    }
};
//update correct & incorrect user guesses on the page
function checkWinLoss() {
    currentPuzzle.innerHTML = correctGuesses.join(" ");
    userGuesses.innerHTML = guessedLetters.join(" ");
    guessesLeft.innerHTML = guessCount;

    //update & alert win status & refresh page/set next puzzle
    if (answerArray.join(" ") === correctGuesses.join(" ")) {
        wins++;
        gameNum++;
        userWins.innerHTML = wins;
        userGuesses.innerHTML = "";
        //set a timeout to allow last letters to be inputted before alerts trigger
        window.setTimeout(function () {
            alert("Answer = " + puzzle + ". Hurrah! Nice one.");
            puzzleDisplay();
        }, 300);

        //update & alert loss status & refresh page/set next puzzle
    } else if (guessCount <= 0) {
        losses++;
        gameNum++;
        userLosses.innerHTML = losses;
        userGuesses.innerHTML = "";
        //set a timeout to allow last letters to be inputted before alerts trigger
        window.setTimeout(function () {
            alert("Oh no, you've ran out of guesses. Too bad! Answer = " + puzzle + ".");
            puzzleDisplay();
        }, 300);

    }

};

//run/re-run game & convert user guesses to uppercase
puzzleDisplay()
document.onkeyup = function (event) {
    var userInput = String.fromCharCode(event.keyCode).toUpperCase();
    checkLetter(userInput);
    checkWinLoss();
}