const words = ["apple", "banana", "orange", "grape", "peach", "mango", "kiwi"];
let secretWord = "";
let attemptsLeft = 5;

const guessInput = document.getElementById("guessInput");
const submitGuess = document.getElementById("submitGuess");
const restartGame = document.getElementById("restartGame");
const message = document.getElementById("message");
const hint = document.getElementById("hint");

function startGame() {
    secretWord = words[Math.floor(Math.random() * words.length)];
    attemptsLeft = 5;
    message.textContent = "";
    guessInput.value = "";
    guessInput.disabled = false;
    submitGuess.disabled = false;
    hint.textContent = `Hint: The word starts with '${secretWord.charAt(0).toUpperCase()}'`;
    document.body.classList.remove("win", "lose");
    console.log("Secret word (for testing):", secretWord);
}

function checkGuess() {
    let guess = guessInput.value.trim().toLowerCase();
    if (guess === "") {
        message.textContent = `Incorrect guess. You have ${attemptsLeft} attempts left. Try again!`;
        return;
    }
    if (guess === secretWord) {
        message.textContent = "Congratulations! You guessed the secret word!";
        document.body.classList.add("win");
        guessInput.disabled = true;
        submitGuess.disabled = true;
    } else {
        attemptsLeft--;
        if (attemptsLeft > 0) {
            message.textContent = `Incorrect guess. You have ${attemptsLeft} attempts left. Try again!`;
        } else {
            message.textContent = `Game over! The secret word was '${secretWord}'.`;
            document.body.classList.add("lose");
            guessInput.disabled = true;
            submitGuess.disabled = true;
        }
    }
    guessInput.value = "";
}

submitGuess.addEventListener("click", checkGuess);

guessInput.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        checkGuess();
    }
});

restartGame.addEventListener("click", startGame);

startGame();
