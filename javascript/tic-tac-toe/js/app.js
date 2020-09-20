import { Gameboard } from "./Gameboard.js";
import { GameboardView } from "./GameboardView.js";
import { GameController } from "./GameController.js";
import { PlayerFactory } from "./PlayerFactory.js";

const gameElement = document.querySelector(".gameboard");

const gameboard = new Gameboard();
const view = new GameboardView(gameElement);

const player1 = PlayerFactory.createAIPlayer("Player 1", "X")
const player2 = PlayerFactory.createAIPlayer("Player 2", "O")

const currentGame = new GameController(gameboard, view, player1, player2);
