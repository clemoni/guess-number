// Game values
let min = 1,
  max = 10,
  winningNumb = 2,
  guessesLeft = 3,
  attemptNumb = 0;

//UI Element
const gameUI = document.querySelector("#game"),
  minNumUI = document.querySelector(".min-num"),
  maxNumUI = document.querySelector(".max-num"),
  guessBtn = document.querySelector("#guess-btn"),
  guessInput = document.querySelector("#guess-input"),
  message = document.querySelector(".message");

//assin UI Min max
minNumUI.textContent = min;
maxNumUI.textContent = max;

while (attemptNumb < guessesLeft) {
  guessBtn.addEventListener("click", function (event) {
    console.log("get the value, did he win");
    attemptNumb++;
  });
}
console.log("too bad");
