/**
 * FUNCTION
 */

/**
 * Personalised messaged fuction with specific color code
 * @param {string} parseMessage Message to send
 * @param {string} status Type of message: fail, warning, success
 */
function sentMessage(parseMessage, status) {
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

/**
 * Generate ramdom number
 * @param {int} min
 * @param {int} max
 */
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

/**
 * Scratch number that has been already guessed by player.
 * @param {int} guessedNumber
 */
function scratchUsedNumber(guessedNumber) {
  const spanIdNumber = "num" + guessedNumber;
  const helperListUI = document.querySelectorAll("p.helper-list span");
  helperListUI.forEach(function (span) {
    if (span.id == spanIdNumber) {
      span.style.color = "#686463";
      span.style.textDecoration = "line-through";
    }
  });
}

/**
 * Variables declarations
 */

// Game values
let min = 15,
  max = 20,
  winningNumb = getRandomNumber(min, max),
  chancesGiven = 3,
  attemptLeft = 0,
  numbList = "";

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

const helper = document.querySelector(".helper h6");
// generate a new element span number from min to max
for (let i = min; i <= max; i++) {
  if (i == max) {
    numbList += `<span id=num${i}>${i}</span>`;
  } else {
    numbList += `<span id=num${i}>${i}</span> - `;
  }
}

let helperList = document.createElement("p");
helperList.className = "helper-list";
helperList.innerHTML = numbList;
helper.appendChild(helperList);

/** playAgain eventListener
 *   Need to use a parent since
 *  the btn "plain again" has been
 * created actively with JS
 * eventlistener on the parent
 * */

gameUI.addEventListener("mousedown", function (e) {
  console.log(e.target.id);
  //filter to the event to be only on the btn
  if (e.target.id == "play-again") {
    // message.style.display = "none";
    location.reload(true);
    //reload the page
    // history.go(0);
  }
});

/**
 * Main event, each click new turn of the game
 * max turn per game 3
 */

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
    sentMessage(
      (parseMessage = `Unexpected value<br/>Please try again.`),
      (status = "fail")
    );
  } else {
    // new attempt incremented
    attemptLeft++;
    scratchUsedNumber(guessedNumber);

    //What the value guessedNumber
    // is hte value correspondung
    if (guessedNumber != winningNumb && attemptLeft == chancesGiven) {
      sentMessage(
        (parseMessage = `GAME OVER!!!<br/>The expected value was ${winningNumb}.`),
        (status = "fail")
      );
      guessInput.disabled = true;
      // guessBtn.disabled = true;

      /**
       * Reload the once Game over
       */
      // Reload the game
      guessBtn.value = "Play again.";
      //appen class to other class
      guessBtn.id = "play-again";
    } else if (guessedNumber != winningNumb && attemptLeft != chancesGiven) {
      sentMessage(
        (parseMessage = `Oups !! It was close <br/>You have ${
          chancesGiven - attemptLeft
        } chance(s) left to win.`),
        (status = "warning")
      );

      guessInput.value = "";
    } else if (guessedNumber == winningNumb) {
      sentMessage(
        (parseMessage = `Well done !!! <br/>We have a winner!`),
        (status = "success")
      );
      guessInput.disabled = true;
      /**
       * Reload the once Game over
       */
      // Reload the game
      guessBtn.value = "Play again.";
      //appen class to other class
      guessBtn.id = "play-again";
      // guessBtn.disabled = true;
    }
  }
});
