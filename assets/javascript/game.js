var currentHint = document.getElementById("current-hint");
var currentWord = document.getElementById("current-puzzle");
var userGuess = document.getElementById("user-guess");
var gameCount = document.getElementById("gameCount");
var guessesLeft = document.getElementById("guessesLeft");
var userScore = document.getElementById("userscore");
var score = 0;
var gameCount = 0;
var guessCount = 0;
var guessesLeft = 5;
var alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S',
    'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
];
var hints = ['fruit; also an edgy electronic artist', 'extinct mammal; also a metal band',
    'native American tribe of the southwest', 'a fermented food',
    'varietals include: English and Armenian among others', 'motorcycle brand', 'desert dweller',
    'not a martini', 'a country within a country', 'a force of nature'
];
var puzzles = ['PEACHES', 'MASTODON', 'HOPI', 'NATTO', 'CUCUMBERS', 'TRIUMPH', 'JAVALINA', 'MANHATTAN',
    'LESOTHO', 'TSUNAMI'
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

    currentPuzzle = puzzles;
    answerArray = currentPuzzle.split("");
    underscoreArray = answerArray.length;

    currentHint = hints;


    for (var i = 0; i < underscoreArray; i++) {
        correctGuesses.push("_");
    }
    guessCount = puzzle.length + 5;
    currentWord.innerHTML = correctGuesses.join(" ");
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
            if (puzzle[i] === userInput) {
                lettersInWord = true;
            }
        }

        if (lettersInWord) {
            for (i = 0; i < underscoreArray; i++) {
                if (puzzle[i] === userInput) {
                    correctGuess[i] = userInput;
                }
            }
        }
    }
};

function checkWinLoss() {
    currentPuzzle.innerHTML = correctGuess.join(" ");
    userGuess.innerHTML = guessedLetters.join(" ");
    guessesLeft.innerHTML = guessCount;

    setTimeout(function () {
        if (answerArray.join(" ") === correctGuess.join(" ")) {
            wins++;
            alert("Hurrah! You're a champ!");
            userWins.innerHTML = wins;
            puzzleDisplay();
        } else if (guessCount <= 0) {
            losses++;
            userLosses.innerHTML = losses;
            userGuess.innerHTML = "";
            alert("Oh no, you've ran out of guesses. Too bad! Try again");
            puzzleDisplay();
        }

    });
};

puzzleDisplay()
document.onkeyup = function (event) {
    var userInput = String.fromCharCode(event.keyCode).toUpperCase();
    checkLetter(userInput);
    checkWinLoss();
}