import { Gameboard } from "./gameboard.js";
import { Player } from "./player.js";

const gameElement = document.querySelector(".gameboard");

let currentGame = new Gameboard(gameElement);
let firstPlayer = new Player("Dave", "O");
let secondPlayer = new Player("Carolyn", "X");
console.log(currentGame.placeMark(4, firstPlayer.getMarker()));
console.log(currentGame.placeMark(4, secondPlayer.getMarker()));

currentGame.setPlayer(secondPlayer);
