class GameController {
  constructor(gameboard, view, firstPlayer, secondPlayer) {
    this.model = gameboard;
    this.view = view;

    this.firstPlayer = firstPlayer;
    this.secondPlayer = secondPlayer;

    this.currentPlayer = this.firstPlayer;

    this.model.bindGameboardUpdated(this.onGameboardUpdated.bind(this));
    this.view.bindClickCell(this.handleCellClick.bind(this));

    this.view.render(this.model);
  }

  onGameboardUpdated() {
    this._checkEndGame();
    this._swapPlayers();

    this.view.render(this.model);
  }

  _checkEndGame() {
    if (this.model.hasWinner()) {
      console.log("Winner!");
      console.log(this.currentPlayer.name);
      this.model.resetState();
    } else {
      if (this.model.isFull()) {
        console.log("Tie!");
        this.model.resetState();
      }
    }
  }

  _swapPlayers() {
    if (this.currentPlayer == this.firstPlayer) {
      this.currentPlayer = this.secondPlayer;
    } else {
      this.currentPlayer = this.firstPlayer;
    }
  }

  handleCellClick(clickIndex) {
    if (clickIndex != -1) {
      this.model.placeMark(clickIndex, this.currentPlayer.getMarker());
    }
  }
}

export { GameController };
