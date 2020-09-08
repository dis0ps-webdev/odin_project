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
    if (this.model.hasWinner()) {
      console.log("Winner!");
      console.log(this.currentPlayer.name);
    }

    if (this.model.isFull()) {
      console.log("Full!");
    }

    if (this.currentPlayer == this.firstPlayer) {
      this.currentPlayer = this.secondPlayer;
    } else {
      this.currentPlayer = this.firstPlayer;
    }

    this.view.render(this.model);
  }

  handleCellClick(clickIndex) {
    if (clickIndex != -1) {
      this.model.placeMark(clickIndex, this.currentPlayer.getMarker());
    }
  }
}

export { GameController };
