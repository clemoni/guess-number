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

// listen for guess btn
guessBtn.addEventListener("click", function (e) {
  let guessed = parseInt(guessInput.value);

  //test if not NaN of lest than min or greateer than max
  if (isNaN(guessed) || guessed < min || guessed > max) {
    setMessage(
      (parseMessage = `Failed!!!<br/>You did not enter a number between ${min} and ${max}`),
      (color = "#f04343"),
      (colorBackground = "#f0c7c7")
    );
  } else {
    //Remove potential previous message
    message.style.display = "none";

    // test is guessed number is valid
    if (guessed === winningNumb) {
      //change guesses Input
      styleGuessedInput(
        (bool = true),
        (color = "rgba(3, 96, 22, 11)"),
        (colorBackground = "rgba(154, 230, 169, 1)")
      );

      // create winner message
      setMessage(
        (parseMessage = "We have a winner!!!"),
        (color = "rgba(3, 96, 22, 11)"),
        (colorBackground = "rgba(154, 230, 169, 1)")
      );

      // IF it's not expected number and the number of attemps is inferior of the numer of chances left.
    } else if (guessed !== winningNumb && attemptNumb < guessesLeft) {
      //   empty gessInput
      guessInput.value = " ";

      // sent a warning message
      setMessage(
        (parseMessage = `Oups!!! <br/> Not the value that was expected.<br/>${
          guessesLeft - attemptNumb
        } attempt left to win.`),
        (color = "#f58700"),
        (colorBackground = "#f2c185")
      );

      //Increment the number of attempt
      attemptNumb += 1;

      // still incorrect but still attemp left
    } else if (guessed !== winningNumb && attemptNumb == guessesLeft) {
      // disable guessInput and waning message
      styleGuessedInput(
        (bool = true),
        (color = "#f04343"),
        (colorBackground = "#f0c7c7")
      );

      setMessage(
        (parseMessage = `Patrata!!! GAME OVER !!! ALL IS LOST <br/>The expected number was ${winningNumb} attempt(s) left.`),
        (color = "#f04343"),
        (colorBackground = "#f0c7c7")
      );
    }
  }

  e.preventDefault();
});

function setMessage(parseMessage, color, colorBackground) {
  message.style.cssText =
    "border-radius:3px; padding:15px; width: 40vw; font-size:1.5rem";
  message.style.backgroundColor = colorBackground;
  message.style.border = `2px solid ${color}`;
  message.style.color = color;

  message.innerHTML = parseMessage;
  message.style.display = "block";
}

function styleGuessedInput(bool = false, color, colorBackground) {
  guessInput.disabled = bool;
  guessInput.style.borderColor = color;
  guessInput.style.backgroundColor = colorBackground;
  guessInput.style.color = color;
}
