const prompt = require("prompt-sync")({ sigint: true });
const winning_gestures = { paper: "rock", rock: "scissors", scissors: "paper" };
const game_gestures = ["scissors", "paper", "rock"];

function userPlay() {
  let game_choice = "";
  do {
    game_choice = prompt("Rock, Paper, Or Scissors? ");
  } while (game_choice == "");
  return game_choice.toLocaleLowerCase();
}

function computerPlay() {
  let rand_num = Math.floor(Math.random() * 3);
  return game_gestures[rand_num];
}

function playGame(playerSelection, computerSelection) {
  let game_details = {};

  if (game_gestures.indexOf(playerSelection) == -1) {
    game_details.result = "lose";
    game_details.reason = "not a valid gesture";
  } else if (computerSelection == winning_gestures[playerSelection]) {
    game_details.result = "win";
    game_details.reason = `${playerSelection} beats ${computerSelection}`;
  } else if (computerSelection == playerSelection) {
    game_details.result = "draw";
    game_details.reason = `${playerSelection} same as ${computerSelection}`;
  } else {
    game_details.result = "lose";
    game_details.reason = `${computerSelection} beats ${playerSelection}`;
  }
  return game_details;
}

function game() {
  game_score = { player: 0, computer: 0 };
  for (let y = 1; y <= 5; y++) {
    user_choice = userPlay();
    game_details = playGame(user_choice, computerPlay());
    if (game_details.result == "win") {
      game_score.player += 1;
    }
    if (game_details.result == "lose") {
      game_score.computer += 1;
    }
    console.log(`You ${game_details.result}, ${game_details.reason}`);
    console.log(game_score);
  }
}

game();
