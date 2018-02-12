var currentPuzzle = document.getElementById("currentPuzzle");
var userGuess = document.getElementById("userGuess");
var gameCount = document.getElementById("gameCount");
var guessesLeft = document.getElementById("guessesLeft");
var userWins = document.getElementById("userWins");
var userLosses = document.getElementById("userLosses");
var wins = 0;
var losses = 0;
var gameCount = 0;
var guessCount = 0;
var guessesLeft = 5;
var alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S',
    'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
];

var puzzles = ['TOMBSTONE', 'NAVAJO', 'SAGUARO', 'TARANTULA', 'ROADRUNNER', 'CACTUS', 'JAVALINA', 'TORTILLA',
    'BISBEE', 'COYOTE'
];
var currentPuzzle = "";
var correctGuesses = [];
var incorrectGuesses = [];
var guessedLetters = [];
var answerArray = [];
var underscoreArray = [];

function puzzleDisplay() {

    correctGuesses = [];
    guessedLetters = [];

    currentPuzzle = puzzles[Math.floor(Math.random() * puzzles.length)];
    answerArray = currentPuzzle.split("");
    underscoreArray = answerArray.length;

    for (var i = 0; i < underscoreArray; i++) {
        correctGuesses.push("_");
    }
    guessCount = currentPuzzle.length + 5;
    currentPuzzle.innerHTML = correctGuesses.join(" ");
    guessesLeft.innerHTML = guessCount;
};

function checkLetter(userInput) {
    if (alphabet.includes(userInput.toUpperCase())) {
        if (!guessedLetters.includes(userInput)) {
            guessedLetters.push(userInput);
            guessCount--;
            userGuess.innerHTML = guessedLetters;
        }

        var lettersInWord = false;

        for (var i = 0; i < underscoreArray; i++) {
            if (currentPuzzle[i] === userInput) {
                lettersInWord = true;
            }
        }

        if (lettersInWord) {
            for (i = 0; i < underscoreArray; i++) {
                if (currentPuzzle[i] === userInput) {
                    correctGuesses[i] = userInput;
                }
            }
        }
    }
};

function checkWinLoss() {
    currentPuzzle.innerHTML = correctGuesses.join(" ");
    userGuess.innerHTML = guessedLetters.join(" ");
    guessesLeft.innerHTML = guessCount;

    if (answerArray.join(" ") === correctGuesses.join(" ")) {
        wins++;
        gameCount++;
        alert("Hurrah! You're a champ!");
        userWins.innerHTML = wins;
        puzzleDisplay();
    } else if (guessCount <= 0) {
        losses++;
        gameCount++;
        userLosses.innerHTML = losses;
        userGuess.innerHTML = "";
        alert("Oh no, you've ran out of guesses. Too bad! Try again");
        puzzleDisplay();
    }
};

puzzleDisplay()
document.onkeyup = function (event) {
    var userInput = String.fromCharCode(event.keyCode).toUpperCase();
    checkLetter(userInput);
    checkWinLoss();
}