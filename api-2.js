// Game values
let min = 1,
  max = 10,
  winningNumb = 2,
  chancesGiven = 3,
  attemptLeft = 0;

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

//functions

// personalised messaged fuction with specific color code
function sentError(parseMessage, status) {
  const statusDic = {
    fail: { color: "rgb(240,67,67)", background: "rgb(249,179,179)" },
    warning: { color: "rgb(220,121,0)", background: "rgb(242,193,133)" },
    success: { color: "rgb(3, 96, 22, 11)", background: "rgb(154, 230, 169)" },
  };

  //message set up
  message.innerHTML = parseMessage;
  message.style.cssText =
    "border-radius:3px; padding:15px; width: 40vw; font-size:1.5rem";
  message.style.display = "block";
  message.style.backgroundColor = statusDic[status].background;
  message.style.border = `2px solid ${statusDic[status].color}`;
  message.style.color = statusDic[status].color;
}

guessBtn.addEventListener("click", function () {
  // remove possible error message
  message.style.display = "none";

  /**fetch guessed number in input #guess-input
   * date in input is a string therefore needs
   * to be parseInt in order to be properley compare in INT
   * */
  let guessedNumber = parseInt(guessInput.value);

  /**
   * three condition needs to be verify
   * an answer has been providerd
   * the answer is higher than the min number
   * the answer is smaller than the max number
   */
  if (isNaN(guessedNumber) || guessedNumber < min || guessedNumber > max) {
    // creat error message specifi to situation
    sentError(
      (parseMessage = `Unexpected value<br/>Please try again.`),
      (status = "fail")
    );
  } else {
    console.log("let's play, add a new turn");
    // new attempt incremented
    attemptLeft++;

    //What the value guessedNumber
    // is hte value correspondung
    if (guessedNumber != winningNumb && attemptLeft == chancesGiven) {
      sentError(
        (parseMessage = `GAME OVER!!!<br/>The expected value was ${winningNumb}.`),
        (status = "fail")
      );
      guessInput.disabled = true;
      guessBtn.disabled = true;
    } else if (guessedNumber != winningNumb && attemptLeft != chancesGiven) {
      console.log(
        "Nope but you can trye " +
          (chancesGiven - attemptLeft) +
          " chances left"
      );

      sentError(
        (parseMessage = `Oups !! It was close <br/>You have ${
          chancesGiven - attemptLeft
        }.`),
        (status = "warning")
      );

      guessInput.value = " ";
    } else if (guessedNumber == winningNumb) {
      sentError(
        (parseMessage = `Well done !!! <br/>We have a winner!`),
        (status = "success")
      );
      guessInput.disabled = true;
      guessBtn.disabled = true;
    }
  }
});
