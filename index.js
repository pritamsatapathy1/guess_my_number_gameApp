// const prevGusses = document.querySelector(".prevGuesses");
// const remainGuess = document.getElementById("remainGuess");

// ***********************Global Variable Start***********************
const Game = document.getElementById("gamePannel");
const start = document.getElementById("startGame");
const submit = document.getElementById("submitBtn");
const pages = document.querySelectorAll(".page");
const remainGuessContainer = document.querySelector(".remainGuessContainer");
const remainCount = document.getElementById("remainCount");
const userActionBox = document.querySelector(".userAction");
const gameTitle = document.querySelector(".top");
const description = document.querySelector(".bottom");
const prevGuessesContainer = document.querySelector(".prevGuessesContainer");
const prevGuesses = document.querySelector(".prevGuesses");
const result = document.querySelector(".result-page");
const resultTitle = document.querySelector(".resultTitle");
const resultBtn = document.querySelector(".resultBtn");
const userGuessElem = document.getElementById("userGuess");
const hintContainer = document.querySelector(".hintContainer");
const warnHigh = document.querySelector(".hintContainer>.hintWarn>.high");
const warnLow = document.querySelector(".hintContainer>.hintWarn>.low");

// const userInput = document.createElement("input");
const userInput = document.getElementById("userGuess");
const startGameStr = "Generate a Random Number";
const playGameStr = "Send Your Guess";
let chances;
let computerGuess;
const prevGuessesArray = [];
// ***********************Global Variable End***********************

window.addEventListener("load", () => {
  // Turn Active FullScreen if window.innerWidth <= 500
  if(window.innerWidth <= 500){
    Game.requestFullscreen()
}

// Codes for to enter game page
start.addEventListener("click", (e) => {

  // Hide input, hint & remainGuess
  userInput.style.opacity = "0";
  userInput.style.transition = "none";
  userInput.style.pointerEvents = "none";
  remainGuessContainer.style.opacity = "0";
  remainGuessContainer.style.transition = "none";
  hintContainer.style.opacity = "0";
  hintContainer.style.transition = "none";
  prevGuessesArray.length = 0;
  prevGuesses.innerHTML = "";

  // Enter into game page by sliding the entry page
  pages.forEach((page) => {
    page.style.transform = "translateX(-100%)";
  });

  // Show gameTitle, game Description & prevGuesses Container
  gameTitle.style.transform = "translateY(0)";
  // description.style.transform = "translateY(0)";
  prevGuessesContainer.style.transform = "translateY(0)";

  // Give chances to user that can he use to play game
  chances = 5;
});

submit.addEventListener("click", (e) => {
  // First of All Ask user to click the generate random number and show him the inputBox, remainingGuess element
  if (startGameStr === e.target.value) {
    // Generating an Random Number For user
    computerGuess = Math.floor(Math.random() * 10 + 1);
    e.target.value = "Send Your Guess";

    // Creating an container for Store user's previous guesses

    // Making visible the remaining chances for user
    userInput.style.opacity = "1";
    userInput.style.pointerEvents = "visible";
    userInput.style.transition = "0.9s ease-in-out";
    remainGuessContainer.style.opacity = "1";
    remainGuessContainer.style.transition = "0.9s ease-in-out";
    remainCount.innerHTML = chances;
    userInput.style.opacity = "0";
    userInput.value = 0;


    // to Give hints user he is low OR high ***********************
    // hintContainer.style.opacity = "1";
    // hintContainer.style.transition = "0.9s ease-in-out";

    // Making vissible the input Element for user
    userInput.style.opacity = "1";
    userInput.style.pointerEvents = "visible";

    description.style.transform = "translateY(0)";
  } else {
    // Checking user Guess is Right OR Wrong
    if (playGameStr === e.target.value) {
      const userGuess = +document.getElementById("userGuess").value;
      console.log(userGuess);
      console.log(computerGuess);

      remainCount.innerHTML =
        chances <= 5 && chances >= 1 ? --chances : (chances = 0);
      prevGuessesArray.push(userGuess);
      prevGuesses.innerHTML = `<span>${prevGuessesArray
        .toString()
        .split(",")
        .join(" ")}</span>`;

      // IF Player Loose
      if (chances < 1) {
        resultTitle.style.color = "#ee0000";
        resultTitle.innerHTML = "Sorry GAME OVER </br> ☹ !";
        resultTitle.style.transition = "none";
        resultBtn.value = "Try Again";

        pages.forEach((page) => {
          page.style.transform = "translateX(-200%)";
        });

        gameTitle.style.transform = "translateY(-150%)";
        description.style.transform = "translateY(150%)";
        prevGuessesContainer.style.transform = "translateY(-150%)";
      } else {
        // IF Player Win
        if (userGuess === computerGuess) {
          resultTitle.style.color = "#3afa31";
          resultTitle.innerHTML = "Congratulations </br> You Win The Game 🎉🎉🎉";
          resultTitle.style.transition = "none";
          resultBtn.value = "Play Again";

          pages.forEach((page) => {
            page.style.transform = "translateX(-200%)";
          });

          gameTitle.style.transform = "translateY(-150%)";
          description.style.transform = "translateY(150%)";
          prevGuessesContainer.style.transform = "translateY(-150%)";
        }
      }

      // Checking the difference or High & Low from the userGuess OR ComputerGuess
      if (userGuess > computerGuess) {
        hintContainer.style.opacity = 1;
        warnLow.style.opacity = 0;
        warnLow.style.transition = "none";
        warnHigh.style.opacity = 1;
        warnHigh.style.transition = "0.9s all ease-in-out";
        window.navigator.vibrate(500)
      } else {
        hintContainer.style.opacity = 1;
        warnHigh.style.opacity = 0;
        warnHigh.style.transition = "none";
        warnLow.style.opacity = 1;
        warnLow.style.transition = "0.9s all ease-in-out";
        window.navigator.vibrate(500)
      }
    }
  }
});

resultBtn.addEventListener("click", () => {
  pages.forEach((page) => {
    page.style.transform = "translateX(0)";
    submit.value = startGameStr;
  });
});

});