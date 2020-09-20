import { PlayerFactory } from "./PlayerFactory.js";

class UiController {
  constructor(UiView, currentGame) {
    this.view = UiView;
    this.view.bindClickNewGame(this.handleNewGameClick.bind(this));
    this.view.bindClickStartGame(this.handleStartGameClick.bind(this));
    this.view.bindClickRestartGame(this.handleRestartGameClick.bind(this));
    this.currentGame = currentGame;
  }

  handleNewGameClick() {
    this.view.showForm();
  }

  handleStartGameClick() {
    let gameInfo = this.view.getFormData();
    let playerOne = null;
    let playerTwo = null;

    switch (gameInfo.gameType) {
      case "human-v-human":
        playerOne = PlayerFactory.createHumanPlayer(
          gameInfo.playerOneName,
          "X"
        );
        playerTwo = PlayerFactory.createHumanPlayer(
          gameInfo.playerTwoName,
          "O"
        );
        break;
      case "human-v-ai":
        playerOne = PlayerFactory.createHumanPlayer(
          gameInfo.playerOneName,
          "X"
        );
        playerTwo = PlayerFactory.createAIPlayer(gameInfo.playerTwoName, "O");
        break;
      case "ai-v-ai":
        playerOne = PlayerFactory.createAIPlayer(gameInfo.playerOneName, "X");
        playerTwo = PlayerFactory.createAIPlayer(gameInfo.playerTwoName, "O");
        break;
    }
    this.currentGame.startNewGame(playerOne, playerTwo);
    this.view.showGame();
  }
  handleRestartGameClick() {
    this.currentGame.resetGame();
  }
}

export { UiController };
