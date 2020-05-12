//functions
function sentError(parseMessage, status) {
  const statusDic = {
    'fail': { color: "rgb(240,67,67)", background: "rgb(249,179,179)" },
    'warning': { color: "rgba(245, 135, 0)", background: "rgb(242,193,133)" },
    'success': { color: "rgba(3, 96, 22, 11)", background: "rgb(154, 230, 169)" }
  }
  message.innerHTML = parseMessage;
  message.style.backgroundColor = statusDic.status.background;
  message.style.border = `1px solid ${statusDic.status.color}`;
  message.style.color = statusDic.status.color;


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

  guessBtn.addEventListener("click", function () {
    //test that the player has still enough possible attempt left

    /**fetch guessed number in input #guess-input
      date in input is a string therefore needs
      to be parseInt in order to be properley compare in INT*/
    let guessedNumber = parseInt(guessInput.value);

    /**
     * three condition needs to be verify
     * an answer has been providerd
     * the answer is higher than the min number
     * the answer is smaller than the max number
     */
    if (isNaN(guessedNumber) || guessedNumber < min || guessedNumber > max) {
      // creat error message specifi to situation
      sentError(parseMessage = `Unexpected value<br/>Please try again.`, status = 'fail');

    } else {
      console.log("let's play, add a new turn");
      // new attempt incremented
      attemptLeft++;

      //What the value guessedNumber
      // is hte value correspondung
      if (guessedNumber != winningNumb && attemptLeft == chancesGiven) {
        console.log("Lost STOP GAME");
        guessInput.disabled = true;
        guessBtn.disabled = true;
      } else if (guessedNumber != winningNumb && attemptLeft != chancesGiven) {
        console.log(
          "Nope but you can trye " +
          (chancesGiven - attemptLeft) +
          " chances left"
        );

        guessInput.value = " ";
      } else if (guessedNumber == winningNumb) {
        console.log("big winner STOP GAME");
        guessInput.disabled = true;
        guessBtn.disabled = true;
      }
    }
  });
