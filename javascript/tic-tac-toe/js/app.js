import { Gameboard } from "./Gameboard.js";
import { GameboardView } from "./GameboardView.js";
import { GameController } from "./GameController.js";
import { Player } from "./Player.js";

const gameElement = document.querySelector(".gameboard");

const gameboard = new Gameboard();
const view = new GameboardView(gameElement);

const player1 = new Player("Dave", "X", false);
const player2 = new Player("Carolyn", "O", false);

const currentGame = new GameController(gameboard, view, player1, player2);
