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
    'TORTILLA',
    'BISBEE', 'COYOTE'
];
var uniqueArray = puzzleArray.filter(function (itm, i, puzzleArray) {
    return i == puzzleArray.indexOf(itm);
});
var puzzle = "";
var correctGuesses = [];
var guessedLetters = [];
var answerArray = [];
var underscoreArray = 0;

function puzzleDisplay() {

    correctGuesses = [];
    guessedLetters = [];

    puzzle = puzzleArray[Math.floor(Math.random() * puzzleArray.length)];
    answerArray = puzzle.split("");
    underscoreArray = answerArray.length;

    for (var i = 0; i < underscoreArray; i++) {
        correctGuesses.push("_");
    }
    guessCount = puzzle.length + 3;
    currentPuzzle.innerHTML = correctGuesses.join(" ");
    guessesLeft.innerHTML = guessCount;
    gameCount.innerHTML = gameNum;
    uniqueArray.push();

};

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

function checkWinLoss() {
    currentPuzzle.innerHTML = correctGuesses.join(" ");
    userGuesses.innerHTML = guessedLetters.join(" ");
    guessesLeft.innerHTML = guessCount;

    if (answerArray.join(" ") === correctGuesses.join(" ")) {
        wins++;
        gameNum++;
        alert("Answer = " + puzzle + ". Hurrah! You're a champ! Ready for another?");
        userWins.innerHTML = wins;
        userGuesses.innerHTML = "";
        puzzleDisplay();
    } else if (guessCount <= 0) {
        losses++;
        gameNum++;
        userLosses.innerHTML = losses;
        userGuesses.innerHTML = "";
        alert("Oh no, you've ran out of guesses. Too bad! Answer = " + puzzle + ". Try again.");
        puzzleDisplay();
    }
};

puzzleDisplay()
document.onkeyup = function (event) {
    var userInput = String.fromCharCode(event.keyCode).toUpperCase();
    checkLetter(userInput);
    checkWinLoss();
}