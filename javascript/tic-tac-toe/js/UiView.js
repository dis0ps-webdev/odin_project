class UI {
  constructor() {
    //major divs
    this.gameForm = document.querySelectorAll(".new-game-form");
    this.gameView = document.querySelectorAll(".gameboard");
    this.scoreBoards = document.querySelectorAll(".scoreboard");

    //form elements
    this.gameType = document.querySelector("#game-type");
    this.playerOneNameBox = document.querySelector("#player-one-name");
    this.playerTwoNameBox = document.querySelector("#player-two-name");

    //buttons
    this.newGameButton = document.querySelector("#new-game");
    this.startGameButton = document.querySelector("#start-game");
    this.restartGameButton = document.querySelector("#restart-game");
  }

  showGame() {
    this._hideDiv(this.gameForm);
    this._showDiv(this.scoreBoards);
    this._showDiv(this.gameView);
  }
  showForm() {
    this._showDiv(this.gameForm);
    this._hideDiv(this.scoreBoards);
    this._hideDiv(this.gameView);
  }

  getFormData() {
    return {
      gameType: this.gameType.value,
      playerOneName: this.playerOneNameBox.value,
      playerTwoName: this.playerTwoNameBox.value,
    };
  }

  bindClickStartGame(callback) {
    this._addClickHandler(this.startGameButton, callback);
  }
  bindClickRestartGame(callback) {
    this._addClickHandler(this.restartGameButton, callback);
  }
  bindClickNewGame(callback) {
    this._addClickHandler(this.newGameButton, callback);
  }

  _showDiv(element) {
    element.forEach((node) => {
      node.classList.remove("hidden");
    });
  }
  _hideDiv(element) {
    element.forEach((node) => {
      node.classList.add("hidden");
    });
  }

  _addClickHandler(element, handler) {
    element.addEventListener("click", handler);
  }
}

export { UI };
