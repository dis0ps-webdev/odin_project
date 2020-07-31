const gestureChoices = document.querySelectorAll(".player-choice");
const jumbotron = document.querySelector(".jumbotron");
const playerScore = document.querySelector(".player-score");
const opponentScore = document.querySelector(".opponent-score");
const playerGesture = document.querySelector(".user");
const opponentGesture = document.querySelector(".opponent");

const winning_gestures = { paper: "rock", rock: "scissors", scissors: "paper" };
const game_gestures = ["scissors", "paper", "rock"];
const imageLocation = "images/";
let gameScore = { player: 0, computer: 0 };

function computerPlay() {
  let randNum = Math.floor(Math.random() * 3);
  return game_gestures[randNum];
}

function checkWinner(playerSelection, computerSelection) {
  let result = "";

  if (game_gestures.indexOf(playerSelection) == -1) {
    result = "lose";
  } else if (computerSelection == winning_gestures[playerSelection]) {
    result = "win";
  } else if (computerSelection == playerSelection) {
    result = "draw";
  } else {
    result = "lose";
  }
  return result;
}

function playGame(e) {
  let userChoice = e.target.alt;
  playerGesture.src = `${imageLocation}${userChoice}.png`;

  let computerChoice = computerPlay();
  opponentGesture.src = `${imageLocation}${computerChoice}.png`;

  let result = checkWinner(userChoice, computerChoice);

  if (result == "win") {
    gameScore.player += 1;
    playerScore.textContent = gameScore.player;
  }
  if (result == "lose") {
    gameScore.computer += 1;
    opponentScore.textContent = gameScore.computer;
  }

  jumbotron.innerText = `You ${result} the round!`;


}

gestureChoices.forEach((gesture) => {
  gesture.addEventListener("click", playGame);
});
