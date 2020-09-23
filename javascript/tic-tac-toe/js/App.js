import { Gameboard } from "./Gameboard.js";
import { GameboardView } from "./GameboardView.js";
import { GameController } from "./GameController.js";
import { UiController } from "./UiController.js";
import { UI } from "./UiView.js";

const gameElement = document.querySelector(".gameboard");

const gameModel = new Gameboard();
const gameView = new GameboardView(gameElement);

const uiView = new UI();

const currentGame = new GameController(gameModel, gameView);
const currentUI = new UiController(uiView, currentGame);

uiView.showForm();
